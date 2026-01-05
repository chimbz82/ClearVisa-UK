import React, { useState, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';

interface HeaderProps {
  onStartCheck: () => void;
  onNavigateHome: () => void;
  onScrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onStartCheck, onNavigateHome, onScrollToSection }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

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

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
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

          <div className="hidden md:flex items-center space-x-6">
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

            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-black text-navy uppercase tracking-widest hover:bg-slate-100 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  {language.toUpperCase()}
                  <svg className={`w-3 h-3 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-20 bg-white border border-slate-100 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                    {languages.map((l) => (
                      <button 
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setIsLangOpen(false); }}
                        className={`w-full text-center px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors ${language === l.code ? 'text-accent' : 'text-navy'}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={onStartCheck}
                className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-sm whitespace-nowrap"
              >
                {t('nav.startCheck')}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
             <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-black text-navy uppercase tracking-widest"
              >
                {language.toUpperCase()}
              </button>
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

      {/* Mobile Language Overlay */}
      {isLangOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 py-4 px-6 flex justify-around items-center shadow-lg">
          {languages.map((l) => (
            <button 
              key={l.code}
              onClick={() => { setLanguage(l.code); setIsLangOpen(false); }}
              className={`px-4 py-2 text-sm font-black uppercase tracking-[0.2em] transition-colors ${language === l.code ? 'text-accent border-b-2 border-accent' : 'text-navy'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;