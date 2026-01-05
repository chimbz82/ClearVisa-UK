
import React from 'react';

const Legal: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-navy mb-4">Important information</h3>
          <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
            <p>
              UK Visa Pre-Check is not a law firm and does not provide legal advice. Our services are not a replacement for advice from a qualified immigration solicitor or OISC-regulated advisor.
            </p>
            <p>
              The tool is designed as a preliminary pre-check based solely on the information you provide and publicly available UK Home Office rules at the time of use. We strive for accuracy but immigration rules change frequently.
            </p>
            <p>
              This tool cannot guarantee any visa outcome. Final decisions are made by UK Visas and Immigration (UKVI) caseworkers. For complex situations, including previous refusals, criminal records, or overstays, we strongly advise you to seek professional legal representation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;
