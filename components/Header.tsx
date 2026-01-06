import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

interface HeaderProps {
  onStartCheck: () => void;
  onNavigateHome: () => void;
  onScrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onStartCheck, onNavigateHome, onScrollToSection }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.howItWorks'), id: 'how-it-works' },
    { name: t('nav.whosItFor'), id: 'who-its-for' },
    { name: t('nav.pricing'), id: 'pricing' },
    { name: t('nav.faq'), id: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white/0 lg:bg-transparent py-5'
    }`}>
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={onNavigateHome} 
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
              aria-label="Home"
            >
              <span className="text-lg font-black uppercase tracking-tighter text-[#0B1F3B]">
                {t('nav.logo')}
              </span>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className={`text-[13px] font-bold px-4 py-2 uppercase tracking-wide transition-colors ${
                  isScrolled ? 'text-slate-600 hover:text-[#0B1F3B]' : 'text-slate-700 lg:text-slate-600 hover:text-[#0B1F3B]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button onClick={onStartCheck} size="sm" className="ml-4">
              {t('nav.startCheck')}
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#0B1F3B] p-2" aria-label="Toggle menu">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 absolute w-full left-0 top-full p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => { setIsMenuOpen(false); onScrollToSection(link.id); }} 
              className="block w-full text-left text-base font-bold text-[#0B1F3B] uppercase tracking-wide"
            >
              {link.name}
            </button>
          ))}
          <Button onClick={onStartCheck} fullWidth>
            {t('nav.startCheck')}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
