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
    <footer className="bg-[#041229] text-white pt-16 pb-10 no-print">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center text-white font-black text-sm">C</div>
              <span className="text-lg font-bold tracking-tight">ClearVisa UK</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              Helping you check UK visa eligibility before spending thousands on applications.
            </p>
            <a href="mailto:support@clearvisa.co.uk" className="text-slate-300 hover:text-[#1877F2] text-xs font-semibold underline underline-offset-4 transition-colors">
              support@clearvisa.co.uk
            </a>
          </div>
          
          <div className="md:pl-12">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-300 text-sm font-medium">
              <li><button onClick={() => onScrollToSection('how-it-works')} className="hover:text-white transition-colors">How it works</button></li>
              <li><button onClick={() => onScrollToSection('who-its-for')} className="hover:text-white transition-colors">Who it's for</button></li>
              <li><button onClick={() => onScrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => onScrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#1877F2] mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-300 text-sm font-medium">
              <li><button onClick={onPrivacyClick} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="hover:text-white transition-colors">Terms of Use</button></li>
              <li><a href="/refunds" className="hover:text-white transition-colors">Refund & Payment Policy</a></li>
              <li className="pt-2 text-[10px] text-slate-500 leading-tight italic uppercase tracking-wider">
                Not affiliated with the UK Government or Home Office.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 ClearVisa UK. All rights reserved.
          </p>
          <div className="flex gap-4 items-center opacity-30 grayscale hover:opacity-100 transition-opacity">
             <span className="text-[9px] font-black uppercase tracking-widest">Stripe Secure</span>
             <span className="text-[9px] font-black uppercase tracking-widest">SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;