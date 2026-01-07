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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/50' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <button onClick={onNavigateHome} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-[#041229] rounded flex items-center justify-center text-white font-black group-hover:bg-[#1877F2] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#041229]">
                ClearVisa <span className="text-[#1877F2]">UK</span>
              </span>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-[13px] font-semibold px-4 py-2 transition-all rounded-full hover:text-[#1877F2] text-slate-600"
              >
                {link.name}
              </button>
            ))}
            <div className="w-px h-4 bg-slate-200 mx-3"></div>
            <Button onClick={onStartCheck} size="sm">
              {t('nav.startCheck')}
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#041229] p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 absolute w-full left-0 top-full p-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => { setIsMenuOpen(false); onScrollToSection(link.id); }} className="block w-full text-left py-3 text-sm font-semibold text-[#041229] border-b border-slate-50 last:border-0">
              {link.name}
            </button>
          ))}
          <Button onClick={onStartCheck} fullWidth size="md" className="mt-4">
            {t('nav.startCheck')}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;