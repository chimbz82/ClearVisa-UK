import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    "ClearVisa UK is not a law firm and does not provide legal advice.",
    "The tool is based on public rules and guidance, and cannot guarantee any visa outcome.",
    "Your result is a preliminary pre-check only. Final decisions are made by the UK Home Office.",
    "For complex histories (previous refusals, overstays, criminal issues), you should speak to a qualified immigration solicitor."
  ];

  return (
    <section className="section-py bg-slate-50 border-t border-slate-100">
      <div className="app-container">
        <div className="max-w-3xl mx-auto">
          <div className="app-card p-6 sm:p-8 border-l-4 border-l-[#1877F2]">
            <h3 className="text-base font-bold text-[#07162A] mb-5 uppercase tracking-wider">Important Information</h3>
            <div className="space-y-4 text-slate-500 text-xs leading-relaxed font-medium">
              {items.map((item, idx) => (
                <p key={idx} className="flex items-start gap-3">
                  <span className="text-[#1877F2] font-black">•</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;