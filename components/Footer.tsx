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
    <footer className="bg-[#0B1F3B] text-white pt-20 pb-10 no-print">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xl font-black uppercase tracking-tighter text-white">
                {t('nav.logo')}
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-10 font-medium">
              {t('footer.mission')}
            </p>
            <div className="flex gap-4">
              <a href="mailto:support@ukvisacheck.com" className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm font-bold transition-colors">
                Contact Support
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-teal-500 mb-8">Navigation</h4>
            <ul className="space-y-4 text-slate-300 text-sm font-bold uppercase tracking-wider">
              <li><button onClick={() => onScrollToSection('how-it-works')} className="hover:text-teal-500 transition-colors">How it works</button></li>
              <li><button onClick={() => onScrollToSection('who-its-for')} className="hover:text-teal-500 transition-colors">Who it's for</button></li>
              <li><button onClick={() => onScrollToSection('pricing')} className="hover:text-teal-500 transition-colors">Pricing</button></li>
              <li><button onClick={() => onScrollToSection('faq')} className="hover:text-teal-500 transition-colors">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-teal-500 mb-8">Legal</h4>
            <ul className="space-y-4 text-slate-300 text-sm font-bold uppercase tracking-wider">
              <li><button onClick={onPrivacyClick} className="hover:text-teal-500 transition-colors">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="hover:text-teal-500 transition-colors">Terms of Use</button></li>
              <li className="pt-4 opacity-40 text-[11px] leading-tight font-black tracking-widest uppercase">
                {t('footer.disclaimer')}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 {t('nav.logo')}. All rights reserved.
          </p>
          <div className="flex gap-6 items-center grayscale opacity-30">
             <span className="text-xs font-black uppercase tracking-widest">Stripe Secure</span>
             <span className="text-xs font-black uppercase tracking-widest">SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
