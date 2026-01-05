import React from 'react';

const Legal: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2FBF71]"></div>
          <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-tight">Legal Disclosure</h3>
          <div className="space-y-8 text-slate-600 text-base leading-relaxed font-bold">
            <p>
              <strong className="text-navy">ClearVisa UK – Immigration Eligibility Pre-Check Report</strong> is not a law firm and does not provide legal advice. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser.
            </p>
            <p>
              Your assessment is generated from your answers and publicly available Home Office caseworker guidance. Immigration rules can change without notice and no specific outcome can be guaranteed.
            </p>
            <p>
              Final decisions are made solely by UK Visas and Immigration (UKVI) caseworkers. For complex cases, consult a qualified immigration solicitor or OISC-regulated adviser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;