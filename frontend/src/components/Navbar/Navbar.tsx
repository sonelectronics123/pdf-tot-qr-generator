import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../Container/Container';

const Navbar = () => {
  const [isAboutOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-semibold" : "text-gray-600 hover:text-primary transition-colors";
  };

  return (
    <nav className="border-b bg-white py-4 sticky top-0 z-50 shadow-sm">
      <Container>
        <div className="flex items-center justify-between">
          {/* <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
            <img src="/favicon.png" alt="PDF QR Generator Logo" className="w-8 h-8 object-contain" />
            PDF QR Generator
          </Link> */}

          <div className="flex items-center gap-6">
            <Link to="/" className={`text-sm ${isActive('/')}`}>
              PDF to QR
            </Link>
            <Link to="/text-to-qr" className={`text-sm ${isActive('/text-to-qr')}`}>
              Text to QR
            </Link>
            
            <div className="relative">
              {/* <button 
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                onBlur={() => setTimeout(() => setIsAboutOpen(false), 200)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors focus:outline-none"
              >
                About
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button> */}
              
              {isAboutOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link 
                    to="/privacy" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/terms" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
