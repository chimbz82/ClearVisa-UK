import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onScrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick, onScrollToSection }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#081C2D] text-white pt-24 pb-12 no-print relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="text-xl font-black flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white text-navy rounded flex items-center justify-center font-serif flex-shrink-0 shadow-lg">C</div>
              <span className="leading-tight tracking-tight uppercase">ClearVisa UK – Immigration Eligibility<br/>Pre-Check Report</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-bold mb-8">
              {t('footer.mission')}
            </p>
            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Agencies or law firms?</p>
              <a href="mailto:b2b@clearvisa.co.uk" className="text-accent hover:text-white transition-colors text-sm font-bold underline cursor-pointer">Contact us for bulk pricing or white-label options.</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">{t('footer.nav')}</h4>
            <ul className="space-y-5 text-slate-300 text-sm font-bold">
              <li><button onClick={() => onScrollToSection('how-it-works')} className="hover:text-accent transition-colors focus:outline-none cursor-pointer p-0 text-left" aria-label="How it works section">{t('nav.howItWorks')}</button></li>
              <li><button onClick={() => onScrollToSection('who-its-for')} className="hover:text-accent transition-colors focus:outline-none cursor-pointer p-0 text-left" aria-label="Who it's for section">{t('nav.whosItFor')}</button></li>
              <li><button onClick={() => onScrollToSection('pricing')} className="hover:text-accent transition-colors focus:outline-none cursor-pointer p-0 text-left" aria-label="Pricing section">{t('nav.pricing')}</button></li>
              <li><button onClick={() => onScrollToSection('faq')} className="hover:text-accent transition-colors focus:outline-none cursor-pointer p-0 text-left" aria-label="FAQ section">{t('nav.faq')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">{t('footer.support')}</h4>
            <ul className="space-y-5 text-slate-300 text-sm font-bold">
              <li><button onClick={onPrivacyClick} className="hover:text-accent transition-colors text-left focus:outline-none cursor-pointer p-0" aria-label="Privacy Policy">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="hover:text-accent transition-colors text-left focus:outline-none cursor-pointer p-0" aria-label="Terms of Use">Terms of Use</button></li>
              <li><a href="mailto:support@clearvisa.co.uk" className="hover:text-accent transition-colors cursor-pointer" aria-label="Contact Support">Support Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-4 text-center">
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">
            {t('footer.rights')}
          </p>
          <p className="text-slate-600 text-[9px] uppercase tracking-[0.3em] font-black">
            {t('legal.footer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;