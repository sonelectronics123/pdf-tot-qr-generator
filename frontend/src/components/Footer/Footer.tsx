import { Link } from "react-router-dom";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-gray-50 py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PDF QR Generator. All rights reserved.
          </p>
          
          <nav className="flex gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
