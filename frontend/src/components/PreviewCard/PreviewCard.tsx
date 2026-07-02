const PreviewCard = () => {
  return (
    <div className="space-y-6 rounded-3xl border bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-gray-500">PDF Uploaded</p>

      <p className="text-xl font-semibold text-gray-900">
        document.pdf
      </p>

      <div className="flex items-center justify-center rounded-2xl border-2 border-dashed p-16 text-gray-400">
        QR Preview
      </div>

      <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        Ready to Share
      </div>
    </div>
  );
};

export default PreviewCard;