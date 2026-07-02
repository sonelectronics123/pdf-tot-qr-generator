import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Button from "../../../components/Button/Button";
import PreviewCard from "../../../components/PreviewCard/PreviewCard";
import { useGoogleLogin } from "@react-oauth/google";
import type { GoogleAuthResponse } from "../../../types/auth";
import { getDriveAbout } from "../../../services/googleDrive";
import {
  uploadFileToDrive,
  DuplicateFileError,
  ExpiredTokenError,
} from "../../../services/googleDriveUpload";

type HeroSectionProps = {
  auth: GoogleAuthResponse | null;
  setAuth: React.Dispatch<React.SetStateAction<GoogleAuthResponse | null>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const HeroSection = ({
  auth,
  setAuth,
  setSelectedFile,
}: HeroSectionProps) => {

  const [selectedFile, setLocalFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const qrRef = useRef<SVGSVGElement>(null);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/drive.file",

    onSuccess: async (tokenResponse) => {
      const authResponse = tokenResponse as GoogleAuthResponse;
      setAuth(authResponse);
      setErrorMessage(null);

      console.log("Google Login Success:", authResponse);

      try {
        const driveInfo = await getDriveAbout(authResponse.access_token);
        console.log("Drive About:", driveInfo);
      } catch (error) {
        console.error("Drive API Error:", error);
      }
    },

    onError: () => {
      setErrorMessage("Google sign in failed. Please try again.");
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
    setErrorMessage(null);
    console.log("File selected:", file.name);
  };

  const handleUpload = async () => {
    if (!auth || !selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const result = await uploadFileToDrive(
        auth.access_token,
        selectedFile
      );

      setUploadedFileId(result.fileId);
      setShareableLink(result.shareableLink);

      console.log("Upload complete.");
      console.log("File ID:", result.fileId);
      console.log("Shareable link:", result.shareableLink);

    } catch (error) {
      if (error instanceof DuplicateFileError) {
        setErrorMessage(error.message);
        console.warn("Duplicate file blocked:", error.message);

      } else if (error instanceof ExpiredTokenError) {
        setErrorMessage(error.message);
        setAuth(null);
        console.warn("Token expired. Auth state reset.");

      } else {
        setErrorMessage("Upload failed. Please try again.");
        console.error("Upload failed:", error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 480;
      canvas.height = 480;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(svgUrl);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      const fileName = selectedFile?.name.replace(".pdf", "") ?? "qr-code";

      downloadLink.href = pngUrl;
      downloadLink.download = `${fileName}-qr.png`;
      downloadLink.click();

      console.log("QR code downloaded:", `${fileName}-qr.png`);
    };

    image.src = svgUrl;
  };

  const handleLogout = () => {
    setAuth(null);
    setSelectedFile(null);
    setLocalFile(null);
    setUploadedFileId(null);
    setShareableLink(null);
    setErrorMessage(null);
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
          {shareableLink ? (
            <div className="flex flex-col items-center space-y-4 rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Your QR Code</p>

              <QRCodeSVG
                ref={qrRef}
                value={shareableLink}
                size={240}
                marginSize={2}
              />

              <p className="text-center text-sm text-gray-500">
                Scan to open <span className="font-medium text-gray-900">{selectedFile?.name}</span>
              </p>

              <Button variant="primary" onClick={handleDownloadQR}>
                Download QR Code
              </Button>
            </div>
          ) : (
            <PreviewCard />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;