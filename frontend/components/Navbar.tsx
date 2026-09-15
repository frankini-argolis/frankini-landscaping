import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Icon } from './Icons';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <Icon name="Leaf" className="h-8 w-8 text-brand-green mr-2" />
            <span className="font-serif text-2xl font-bold text-brand-green tracking-tight">
              Frankini <span className="text-brand-slate font-sans text-lg font-medium uppercase tracking-widest ml-1">Landscaping</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors hover:text-brand-green ${
                  currentPage === link.id ? 'text-brand-green border-b-2 border-brand-green' : 'text-brand-slate'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="bg-brand-green text-white px-6 py-2 rounded-sm font-medium hover:bg-green-800 transition-colors flex items-center shadow-md"
            >
              <Icon name="CheckCircle" className="w-4 h-4 mr-2" />
              Get Instant Quote
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-slate hover:text-brand-green focus:outline-none"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.id ? 'text-brand-green bg-brand-light' : 'text-brand-slate hover:text-brand-green hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3 py-2 mt-4 bg-brand-green text-white rounded-md font-medium flex items-center justify-center"
            >
              <Icon name="CheckCircle" className="w-4 h-4 mr-2" />
              Get Instant Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};