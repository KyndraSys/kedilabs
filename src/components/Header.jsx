import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import KediLabsSearch from './kediLabsSearch';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Kedi Labs" className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/about') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About
              </Link>
              <Link 
                to="/programs" 
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/programs') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Programs
              </Link>
              <Link 
                to="/partners" 
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/partners') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Partners
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink('/contact') 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Contact
              </Link>
              
              {/* Search Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleSearch}
                className="p-2 mr-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button 
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200" 
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="px-6 py-4">
              <div className="space-y-1">
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                    isActiveLink('/') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                    isActiveLink('/about') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
                <Link
                  to="/programs"
                  className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                    isActiveLink('/programs') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Programs
                </Link>
                <Link
                  to="/partners"
                  className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                    isActiveLink('/partners') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Partners
                </Link>
                <Link
                  to="/contact"
                  className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                    isActiveLink('/contact') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Contact
                </Link>
                
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    toggleSearch();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md transition-colors font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Search Component */}
      {isSearchOpen && <KediLabsSearch onClose={toggleSearch} />}
    </>
  );
}

export default Header;