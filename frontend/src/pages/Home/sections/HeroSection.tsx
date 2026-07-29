import { useState } from "react";
import Button from "../../../components/Button/Button";
import PreviewCard from "../../../components/PreviewCard/PreviewCard";
import QRResultCard from "../../../components/QRResultCard/QRResultCard";
import { useGoogleLogin } from "@react-oauth/google";
import type { GoogleAuthResponse } from "../../../types/auth";
import { getDriveAbout } from "../../../services/googleDrive";
import { useDriveUpload } from "../../../hooks/useDriveUpload";

type HeroSectionProps = {
  auth: GoogleAuthResponse | null;
  setAuth: (auth: GoogleAuthResponse | null) => void;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const HeroSection = ({
  auth,
  setAuth,
  setSelectedFile,
}: HeroSectionProps) => {

  const [selectedFile, setLocalFile] = useState<File | null>(null);
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);

  const {
    isUploading,
    uploadedFileId,
    shareableLink,
    errorMessage: uploadErrorMessage,
    uploadedFileName,
    uploadFile,
    resetUploadState
  } = useDriveUpload(auth, setAuth);

  const errorMessage = authErrorMessage || uploadErrorMessage;

  const login = useGoogleLogin({
    scope: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
    ].join(" "),
    prompt: "consent",

    onSuccess: async (tokenResponse) => {
      const authResponse = tokenResponse as GoogleAuthResponse;

      const hasDriveScope = authResponse.scope && authResponse.scope.includes("https://www.googleapis.com/auth/drive.file");

      if (!hasDriveScope) {
        setAuthErrorMessage("You must check the box to grant Google Drive access during sign-in so we can upload the PDF.");
        setAuth(null);
        return;
      }

      setAuth(authResponse);
      setAuthErrorMessage(null);

      console.log("Google Login Success:", authResponse);

      try {
        const driveInfo = await getDriveAbout(authResponse.access_token);
        console.log("Drive About:", driveInfo);
      } catch (error) {
        console.error("Drive API Error:", error);
      }
    },

    onError: () => {
      setAuthErrorMessage("Google sign in failed. Please try again.");
      console.error("Google Login Failed");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setLocalFile(file);
    setSelectedFile(file);
    setAuthErrorMessage(null);
    resetUploadState(); // Reset upload state on new file selection
    console.log("File selected:", file.name);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    await uploadFile(selectedFile);
  };

  const handleLogout = () => {
    setAuth(null);
    setSelectedFile(null);
    setLocalFile(null);
    setAuthErrorMessage(null);
    resetUploadState();
  };

  return (
    <section className="min-h-screen py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-primary text-5xl font-bold leading-tight lg:text-7xl">
            Turn PDFs Into Shareable QR Codes
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Upload PDFs directly to Google Drive and instantly generate
            shareable QR codes for seamless document access.
          </p>

          <div className="mt-8 space-y-4">
            {!auth ? (
              <>
                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-600">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <Button variant="primary" onClick={() => login()}>
                  Sign in with Google
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600">
                    ✓ Signed in successfully
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 underline underline-offset-4 transition-colors"
                  >
                    Sign out
                  </button>
                </div>

                <label className="block">
                  <span className="sr-only">Choose a PDF file</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:rounded-xl file:border-0
                      file:bg-primary file:px-6 file:py-3
                      file:text-sm file:font-semibold file:text-white
                      hover:file:opacity-90 cursor-pointer"
                  />
                </label>

                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-600">
                      {errorMessage}
                    </p>
                  </div>
                )}

                {selectedFile && !uploadedFileId && (
                  <Button
                    variant="primary"
                    onClick={handleUpload}
                  >
                    {isUploading ? "Uploading..." : `Upload ${selectedFile.name}`}
                  </Button>
                )}

                {shareableLink && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-600">
                      ✓ Uploaded and link generated
                    </p>

                    <a
                      href={shareableLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline break-all"
                    >
                      {shareableLink}
                    </a>
                  </div>
                )}
              </>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Your PDFs stay in your Google Drive. We don't store files on our
            servers.
          </p>
        </div>

        <div>
          {shareableLink && uploadedFileName ? (
            <QRResultCard 
              shareableLink={shareableLink}
              fileName={uploadedFileName}
            />
          ) : (
            <PreviewCard />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;