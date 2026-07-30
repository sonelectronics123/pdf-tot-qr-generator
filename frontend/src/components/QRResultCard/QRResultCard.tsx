import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Button from "../Button/Button";

type QRResultCardProps = {
  shareableLink: string;
  fileName: string;
  scanLabel?: string;
};

const QRResultCard = ({ shareableLink, fileName, scanLabel }: QRResultCardProps) => {
  const qrRef = useRef<SVGSVGElement>(null);

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
      const downloadName = fileName.replace(".pdf", "") ?? "qr-code";

      downloadLink.href = pngUrl;
      downloadLink.download = `${downloadName}-qr.png`;
      downloadLink.click();
    };

    image.src = svgUrl;
  };

  return (
    <div className="flex flex-col items-center space-y-4 rounded-3xl border bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-gray-500">Your QR Code</p>

      <QRCodeSVG
        ref={qrRef}
        value={shareableLink}
        size={240}
        marginSize={2}
      />

      <p className="text-center text-sm text-gray-500">
        {scanLabel ? (
          scanLabel
        ) : (
          <>Scan to open <span className="font-medium text-gray-900">{fileName}</span></>
        )}
      </p>

      <Button variant="primary" onClick={handleDownloadQR}>
        Download QR Code
      </Button>
    </div>
  );
};

export default QRResultCard;
