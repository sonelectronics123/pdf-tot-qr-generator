import { useState } from "react";
import type { GoogleAuthResponse } from "../types/auth";
import {
  uploadFileToDrive,
  DuplicateFileError,
  ExpiredTokenError,
} from "../services/googleDriveUpload";

export const useDriveUpload = (
  auth: GoogleAuthResponse | null,
  setAuth: (auth: GoogleAuthResponse | null) => void
) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const resetUploadState = () => {
    setUploadedFileId(null);
    setShareableLink(null);
    setErrorMessage(null);
    setUploadedFileName(null);
  };

  const createRenamedFile = (originalFile: File, attemptNumber: number): File => {
    const nameParts = originalFile.name.split(".");
    const extension = nameParts.length > 1 ? nameParts.pop() : "";
    const baseName = nameParts.join(".");
    const newName = `${baseName} (${attemptNumber})${extension ? `.${extension}` : ""}`;
    return new File([originalFile], newName, { type: originalFile.type });
  };

  const uploadFile = async (selectedFile: File) => {
    if (!auth) return;

    setIsUploading(true);
    setErrorMessage(null);

    let currentFile = selectedFile;
    let attempt = 0;
    const MAX_RETRIES = 3;

    while (attempt <= MAX_RETRIES) {
      try {
        const result = await uploadFileToDrive(auth.access_token, currentFile);
        
        setUploadedFileId(result.fileId);
        setShareableLink(result.shareableLink);
        setUploadedFileName(currentFile.name);
        setIsUploading(false);
        return; // Success
      } catch (error) {
        if (error instanceof DuplicateFileError) {
          if (attempt < MAX_RETRIES) {
            attempt++;
            currentFile = createRenamedFile(selectedFile, attempt);
            console.warn(`Duplicate file found. Retrying as ${currentFile.name}...`);
            continue; // Loop again
          } else {
            setErrorMessage(`Failed to upload: A file with this name already exists and max retries (${MAX_RETRIES}) reached.`);
            break; // Stop retrying
          }
        } else if (error instanceof ExpiredTokenError) {
          setErrorMessage(error.message);
          setAuth(null);
          break; // Stop on auth error
        } else {
          setErrorMessage("Upload failed. Please try again.");
          console.error("Upload failed:", error);
          break; // Stop on generic error
        }
      }
    }
    
    setIsUploading(false);
  };

  return {
    isUploading,
    uploadedFileId,
    shareableLink,
    errorMessage,
    uploadedFileName,
    uploadFile,
    resetUploadState
  };
};
