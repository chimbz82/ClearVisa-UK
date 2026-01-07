
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onRefundClick: () => void;
  onRiskNoticeClick: () => void;
  onScrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick, onRefundClick, onRiskNoticeClick, onScrollToSection }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-white pt-8 pb-8 no-print border-t border-white/5 text-left">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white font-black text-base">C</div>
              <span className="text-xl font-bold tracking-tight">ClearVisa UK</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 font-medium">
              Helping you check UK visa eligibility before spending thousands on applications.
            </p>
            <a href="mailto:clearvisauk@protonmail.com" className="text-slate-200 hover:text-accent text-xs font-bold uppercase tracking-widest underline underline-offset-8 transition-colors">
              clearvisauk@protonmail.com
            </a>
          </div>
          
          <div className="md:pl-16">
            <h4 className="font-black text-[10px] uppercase tracking-[0.25em] text-accent mb-4">Navigation</h4>
            <ul className="space-y-2 text-slate-300 text-[13px] font-bold">
              <li><button onClick={() => onScrollToSection('how-it-works')} className="hover:text-white transition-colors uppercase tracking-tight">How it works</button></li>
              <li><button onClick={() => onScrollToSection('who-its-for')} className="hover:text-white transition-colors uppercase tracking-tight">Who it's for</button></li>
              <li><button onClick={() => onScrollToSection('pricing')} className="hover:text-white transition-colors uppercase tracking-tight">Pricing</button></li>
              <li><button onClick={() => onScrollToSection('faq')} className="hover:text-white transition-colors uppercase tracking-tight">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.25em] text-accent mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-300 text-[13px] font-bold">
              <li><button onClick={onRiskNoticeClick} className="text-rose-400 hover:text-white transition-colors uppercase tracking-tight">Legal Disclaimer & Risk Notice</button></li>
              <li><button onClick={onPrivacyClick} className="hover:text-white transition-colors uppercase tracking-tight">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="hover:text-white transition-colors uppercase tracking-tight">Terms of Use</button></li>
              <li><button onClick={onRefundClick} className="hover:text-white transition-colors uppercase tracking-tight">Refund & Payment Policy</button></li>
              <li className="pt-2 text-[9px] text-slate-500 leading-relaxed font-black uppercase tracking-[0.1em]">
                Not affiliated with the UK Government or Home Office.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.25em]">
            © 2026 ClearVisa UK. All rights reserved.
          </p>
          <div className="flex gap-6 items-center opacity-30 grayscale hover:opacity-80 transition-opacity">
             <span className="text-[9px] font-black uppercase tracking-[0.2em]">Stripe Secure</span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em]">SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
