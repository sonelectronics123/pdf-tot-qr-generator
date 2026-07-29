import Container from "../../components/Container/Container";

const TermsOfService = () => {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using QR Generator, you agree to be bound by these Terms of Service. 
                If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Service Description</h2>
              <p>
                QR Generator is a tool that allows users to authenticate with their Google account, upload PDF documents to their personal Google Drive, 
                and generate a shareable QR code linked to that document. We provide this service "as is" and without any warranties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
              <p>
                You are solely responsible for the files you upload using our service. You agree not to upload any content that is illegal, 
                violates intellectual property rights, or is otherwise objectionable. Because the uploaded files are made publicly accessible via link to enable the QR code, 
                you must ensure you have the right to share the content publicly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Limitation of Liability</h2>
              <p>
                In no event shall QR Generator or its creators be liable for any indirect, incidental, special, consequential or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default TermsOfService;
