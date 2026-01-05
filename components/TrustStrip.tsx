import React from 'react';

const TrustStrip: React.FC = () => {
  const chips = [
    { text: "Secure payment by Stripe", icon: "💳" },
    { text: "GDPR ready & Encrypted", icon: "🔐" },
    { text: "Confidential assessment", icon: "🛡️" },
    { text: "Based on public Home Office guidance", icon: "⚖️" }
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-6">
          Reliable Immigration Eligibility Pre-Check Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {chips.map((chip, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center md:justify-start lg:justify-center p-3.5 rounded-xl bg-slate-50/50 border border-slate-50">
              <span className="text-xl">{chip.icon}</span>
              <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{chip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;