import Container from "../../components/Container/Container";

const PrivacyPolicy = () => {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to QR Generator. We respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we handle your information when you use our service to convert PDFs to QR codes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. How It Works</h2>
              <p>
                Our application operates entirely on the frontend and interacts directly with the Google Drive API. 
                We do not have a backend server, and we do not store, process, or view the files you upload on our own servers. 
                When you upload a PDF, it is sent directly from your browser to your personal Google Drive account into a folder named "PDF-TO-QR-UPLOADS".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Google Data Usage</h2>
              <p>
                To provide our service, we require authorization to access your Google Drive via Google OAuth. 
                We only request the scopes necessary to upload files and modify their permissions so they can be viewed via the generated QR code. 
                The application's use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Security</h2>
              <p>
                Because files are uploaded directly to your Google Drive, the security of your files is managed by Google. 
                Please be aware that by using this service, the uploaded PDF files are marked as publicly readable ("anyone with the link can view") so that the QR code functions properly for anyone who scans it. Do not upload sensitive or confidential information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Any changes will be posted on this page.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default PrivacyPolicy;
