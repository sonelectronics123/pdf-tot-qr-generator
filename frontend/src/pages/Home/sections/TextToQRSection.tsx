import { useState } from "react";
import Button from "../../../components/Button/Button";
import TextArea from "../../../components/TextArea/TextArea";
import QRResultCard from "../../../components/QRResultCard/QRResultCard";

const TextToQRSection = () => {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setGeneratedText(inputText.trim());
  };

  return (
    <section className="py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          {/* <h2 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Create QR Codes from Text
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Need a simple QR code for a name, wifi password, or short message? 
            Just type it below and instantly generate a downloadable QR code. No Google sign-in required!
          </p> */}

          <div className="mt-8 space-y-6">
            <TextArea
              label="Enter text or name"
              placeholder="e.g. John Doe, or a secret message..."
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <Button variant="primary" onClick={handleGenerate}>
              Generate QR Code
            </Button>
          </div>
        </div>

        <div>
          {generatedText ? (
            <div className="flex justify-center">
              <QRResultCard
                shareableLink={generatedText}
                fileName="text-qr"
                scanLabel="Scan to read text"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 rounded-3xl border bg-white p-12 shadow-sm text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-400">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-500">Enter text to preview your QR code</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextToQRSection;
