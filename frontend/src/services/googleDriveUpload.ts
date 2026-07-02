import axios from "axios";

const DRIVE_API_URL = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD_URL =
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
const FOLDER_NAME = "PDF-TO-QR-UPLOADS";

const findOrCreateFolder = async (accessToken: string): Promise<string> => {
  const searchResponse = await axios.get(DRIVE_API_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
    },
  });

  const existingFolders = searchResponse.data.files;

  if (existingFolders.length > 0) {
    console.log("Folder already exists. ID:", existingFolders[0].id);
    return existingFolders[0].id;
  }

  const createResponse = await axios.post(
    DRIVE_API_URL,
    {
      name: FOLDER_NAME,
      mimeType: "application/vnd.google-apps.folder",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Folder created. ID:", createResponse.data.id);
  return createResponse.data.id;
};

const checkDuplicateFile = async (
  accessToken: string,
  folderId: string,
  fileName: string
): Promise<boolean> => {
  const response = await axios.get(DRIVE_API_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
      fields: "files(id, name)",
    },
  });

  const matches = response.data.files;

  if (matches.length > 0) {
    console.log("Duplicate file found:", fileName);
    return true;
  }

  return false;
};

const setFilePublic = async (
  accessToken: string,
  fileId: string
): Promise<void> => {
  await axios.post(
    `${DRIVE_API_URL}/${fileId}/permissions`,
    {
      role: "reader",
      type: "anyone",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("File permission set to public.");
};

const fetchShareableLink = async (
  accessToken: string,
  fileId: string
): Promise<string> => {
  const response = await axios.get(`${DRIVE_API_URL}/${fileId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      fields: "webViewLink",
    },
  });

  console.log("Shareable link:", response.data.webViewLink);
  return response.data.webViewLink;
};

export type UploadResult = {
  fileId: string;
  shareableLink: string;
};

export class DuplicateFileError extends Error {
  constructor(fileName: string) {
    super(`"${fileName}" already exists in your PDF-TO-QR-UPLOADS folder.`);
    this.name = "DuplicateFileError";
  }
}

export class ExpiredTokenError extends Error {
  constructor() {
    super("Your session has expired. Please sign in again.");
    this.name = "ExpiredTokenError";
  }
}

export const uploadFileToDrive = async (
  accessToken: string,
  file: File
): Promise<UploadResult> => {

  try {
    // Step 1: Get or create the uploads folder
    const folderId = await findOrCreateFolder(accessToken);

    // Step 2: Check for duplicate file name in that folder
    const isDuplicate = await checkDuplicateFile(
      accessToken,
      folderId,
      file.name
    );

    if (isDuplicate) {
      throw new DuplicateFileError(file.name);
    }

    // Step 3: Upload file into that folder
    const metadata = {
      name: file.name,
      mimeType: "application/pdf",
      parents: [folderId],
    };

    const form = new FormData();

    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );

    form.append("file", file);

    const response = await axios.post(DRIVE_UPLOAD_URL, form, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const fileId = response.data.id;

    // Step 4: Set file permission to public
    await setFilePublic(accessToken, fileId);

    // Step 5: Fetch the shareable link
    const shareableLink = await fetchShareableLink(accessToken, fileId);

    return { fileId, shareableLink };

  } catch (error) {
    // Re-throw our own custom errors without wrapping them
    if (error instanceof DuplicateFileError) {
      throw error;
    }

    // Detect 401 Unauthorized from any Drive API call
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new ExpiredTokenError();
    }

    // All other errors
    throw error;
  }
};