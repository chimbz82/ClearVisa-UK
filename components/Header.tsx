
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onStartCheck: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartCheck }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Who it’s for', href: '#who-its-for' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#top" className="text-xl font-bold text-navy flex items-center gap-2">
              <span className="w-8 h-8 bg-navy text-white rounded flex items-center justify-center font-serif">C</span>
              <span>ClearVisa UK</span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={onStartCheck}
              className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
            >
              Start eligibility check
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-navy p-2"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full left-0 top-full p-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-base font-medium text-slate-600 hover:text-navy"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              onStartCheck();
            }}
            className="w-full bg-navy text-white px-5 py-3 rounded-lg text-base font-semibold"
          >
            Start eligibility check
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
