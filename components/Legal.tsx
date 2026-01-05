
import React from 'react';

const Legal: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-navy mb-6">Important information</h3>
          <div className="space-y-6 text-slate-600 text-base leading-relaxed">
            <p>
              ClearVisa UK is not a law firm and does not provide legal advice. Our service is not a replacement for advice from a qualified immigration solicitor or OISC-regulated adviser.
            </p>
            <p>
              Your pre-check result is generated from your answers and publicly available Home Office guidance at the time of use. We strive for accuracy, but immigration rules change frequently and we cannot guarantee any visa outcome.
            </p>
            <p>
              Final decisions are made only by UK Visas and Immigration (UKVI) caseworkers. For complex situations, including previous refusals, criminal records, or overstays, you should seek professional legal representation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;
