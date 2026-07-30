import { Link } from "react-router-dom";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-gray-50 py-8">
      <Container>
        <div className="flex flex-col items-center justify-center py-8 mb-4 border-b border-gray-200 text-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
          <Link to="/privacy" className="text-base font-semibold text-primary hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-base font-semibold text-primary hover:underline">
            Terms of Service
          </Link>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pb-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PDF QR Generator. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Home
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
