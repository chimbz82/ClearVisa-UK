import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LegalProps {
  onNavigateLegal?: (view: 'privacy' | 'terms' | 'refunds') => void;
}

const Legal: React.FC<LegalProps> = ({ onNavigateLegal }) => {
  const { t } = useLanguage();

  const items = [
    "ClearVisa UK is not a law firm and does not provide legal advice.",
    "The tool is based on public rules and guidance, and cannot guarantee any visa outcome.",
    "Your result is a preliminary pre-check only. Final decisions are made by the UK Home Office.",
    "For complex histories (previous refusals, overstays, criminal issues), you should speak to a qualified immigration solicitor."
  ];

  return (
    <section id="legal" className="py-10 lg:py-14 bg-white border-t border-slate-50 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border-l-8 border-l-accent border border-slate-200/50 shadow-sm">
          <h3 className="text-lg font-black text-navy mb-6 uppercase tracking-widest">Important Information</h3>
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-bold mb-10">
            {items.map((item, idx) => (
              <p key={idx} className="flex items-start gap-4 uppercase tracking-tight">
                <span className="text-accent font-black text-xl leading-none mt-1">•</span>
                <span>{item}</span>
              </p>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-4 sm:gap-10 justify-center">
            <button 
              onClick={() => onNavigateLegal?.('terms')} 
              className="text-xs font-black text-accent uppercase tracking-widest hover:text-navy transition-colors flex items-center gap-2 group"
            >
              Full Terms of Use
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={() => onNavigateLegal?.('privacy')} 
              className="text-xs font-black text-accent uppercase tracking-widest hover:text-navy transition-colors flex items-center gap-2 group"
            >
              Privacy Policy
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={() => onNavigateLegal?.('refunds')} 
              className="text-xs font-black text-accent uppercase tracking-widest hover:text-navy transition-colors flex items-center gap-2 group"
            >
              Refund Policy
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;