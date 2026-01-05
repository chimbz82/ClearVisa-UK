
import React from 'react';

const TrustStrip: React.FC = () => {
  const chips = [
    { text: "Supports UK spouse & skilled worker routes", icon: "🇬🇧" },
    { text: "Based on public Home Office guidance", icon: "⚖️" },
    { text: "Instant result, no waiting for callbacks", icon: "⚡" },
    { text: "Clear disclaimer: we are not a law firm", icon: "🛡️" }
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
          Built for applicants who want clarity before they apply
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {chips.map((chip, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center md:justify-start lg:justify-center p-4 rounded-xl bg-slate-50/50 border border-slate-50">
              <span className="text-xl">{chip.icon}</span>
              <span className="text-sm font-medium text-slate-600">{chip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
