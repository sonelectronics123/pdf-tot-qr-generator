const AboutAppSection = () => {
  return (
    <section className="py-16 bg-gray-50 rounded-3xl px-8 lg:px-16 my-8 border border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* How it Works */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How it Works</h2>
          <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700">
            <li><strong>Sign in with Google:</strong> Authenticate securely using your Google account.</li>
            <li><strong>Select a PDF:</strong> Choose the document you want to share.</li>
            <li><strong>Upload the PDF to your Google Drive:</strong> We securely transfer the file to a dedicated folder in your Drive.</li>
            <li><strong>Generate a shareable link:</strong> The file is made publicly viewable so anyone with the link can see it.</li>
            <li><strong>Generate a QR code:</strong> A unique QR code is created pointing to your new shareable link.</li>
            <li><strong>Download or share the QR code:</strong> Save the QR code image and share it in the physical world!</li>
          </ol>
        </div>

        {/* Why Google Sign-In is Required */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Google Sign-In is Required?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Authentication is required before uploading files to ensure they are stored in your own secure environment. 
            By signing in, the app can upload files <strong>only to your own Google Drive</strong>. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
            The app never accesses Gmail, Google Photos, Contacts, Calendar, or any other Google services.
          </p>
        </div>

        {/* Google Permissions Requested */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Google Permissions Requested</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 font-mono mb-2">drive.file</h3>
              <p className="text-gray-600">Used only to upload the PDF selected by the user into their Google Drive.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 font-mono mb-2">drive.metadata.readonly</h3>
              <p className="text-gray-600">Used only to retrieve metadata for uploaded files so a shareable link can be generated.</p>
            </div>
          </div>
        </div>

        {/* Your Privacy */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy</h2>
          <ul className="space-y-4">
            {[
              "Files remain in the user's Google Drive.",
              "Files are never stored on our servers.",
              "Only the uploaded file's sharing settings are modified to generate a publicly accessible QR code.",
              "No other files in Google Drive are accessed or modified."
            ].map((text, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-lg text-gray-700">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Data We Access */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Data We Access</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                We access only:
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• Name</li>
                <li>• Email address</li>
                <li>• Profile picture</li>
                <li>• The PDF the user explicitly selects</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                We do NOT access:
              </h3>
              <ul className="space-y-2 text-red-700">
                <li>• Gmail</li>
                <li>• Google Photos</li>
                <li>• Google Contacts</li>
                <li>• Google Calendar</li>
                <li>• Existing Google Drive files</li>
                <li>• Any personal information unrelated to the uploaded PDF</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-900 text-white p-8 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-300 text-lg mb-2">Developer: <span className="text-white font-semibold">GAUTAM LODHA</span></p>
          <p className="text-gray-300 text-lg">Email: <a href="mailto:iamgautam9363@gmail.com" className="text-white hover:underline font-semibold">iamgautam9363@gmail.com</a></p>
        </div>

      </div>
    </section>
  );
};

export default AboutAppSection;
