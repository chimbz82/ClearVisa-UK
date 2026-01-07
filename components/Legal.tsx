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
    <section className="py-12 lg:py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="app-card p-8 md:p-12 border-l-8 border-l-[#1877F2] bg-slate-50/50 shadow-sm">
          <h3 className="text-xl font-black text-[#041229] mb-8 uppercase tracking-widest">Important Information</h3>
          <div className="space-y-5 text-slate-600 text-sm leading-relaxed font-bold">
            {items.map((item, idx) => (
              <p key={idx} className="flex items-start gap-4">
                <span className="text-[#1877F2] font-black text-xl leading-none mt-1">•</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;