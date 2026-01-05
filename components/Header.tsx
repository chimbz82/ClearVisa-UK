import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <button 
              onClick={(e) => { e.preventDefault(); onNavigateHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="text-xl font-bold text-navy flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-navy text-white rounded flex items-center justify-center font-serif flex-shrink-0">C</div>
              <span className="hidden lg:inline text-sm tracking-tight">ClearVisa UK – Immigration Eligibility Pre-Check Report</span>
              <span className="lg:hidden text-lg">ClearVisa UK</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="text-sm font-bold text-slate-600 hover:text-navy transition-colors whitespace-nowrap focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <button 
              onClick={onStartCheck}
              className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-sm whitespace-nowrap"
            >
              {t('nav.startCheck')}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-navy p-2">
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
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full left-0 top-full p-6 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => { setIsMenuOpen(false); onScrollToSection(link.id); }} 
              className="block w-full text-left text-lg font-bold text-navy focus:outline-none"
            >
              {link.name}
            </button>
          ))}
          <button onClick={() => { setIsMenuOpen(false); onStartCheck(); }} className="w-full bg-navy text-white px-5 py-4 rounded-xl text-base font-bold">
            {t('nav.startCheck')}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;