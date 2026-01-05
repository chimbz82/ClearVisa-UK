import React from 'react';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick }) => {
  return (
    <footer className="bg-dark-section text-white pt-24 pb-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="text-xl font-black flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white text-navy rounded flex items-center justify-center font-serif flex-shrink-0 shadow-lg shadow-white/5">C</div>
              <span className="leading-tight tracking-tight uppercase">ClearVisa UK – Immigration Eligibility<br/>Pre-Check Report</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-bold mb-8">
              Helping applicants understand their standing before they apply. Check your UK visa eligibility before you spend money on applications or professional advice.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">Navigation</h4>
            <ul className="space-y-5 text-slate-300 text-sm font-bold">
              <li><a href="#how-it-works" className="hover:text-accent transition-colors">How it works</a></li>
              <li><a href="#who-its-for" className="hover:text-accent transition-colors">Who it's for</a></li>
              <li><a href="#pricing" className="hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">Support</h4>
            <ul className="space-y-5 text-slate-300 text-sm font-bold">
              <li><button onClick={onPrivacyClick} className="hover:text-accent transition-colors">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="hover:text-accent transition-colors">Terms of Use</button></li>
              <li><a href="mailto:support@clearvisa.co.uk" className="hover:text-accent transition-colors">Support Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">
            © 2024 ClearVisa UK – Immigration Eligibility Pre-Check Report.
          </p>
          <p className="text-slate-600 text-[9px] uppercase tracking-[0.3em] font-black">
            Not affiliated with the UK Government or Home Office.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;