import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TrustStrip: React.FC = () => {
  const { t } = useLanguage();
  
  const chips = [
    { text: t('badges.route'), icon: "🇬🇧" },
    { text: t('badges.guidance'), icon: "⚖️" },
    { text: t('badges.instant'), icon: "⚡" },
    { text: t('badges.disclaimer'), icon: "🛡️" }
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-100 py-6">
      <div className="app-container">
        <div className="flex flex-wrap justify-center gap-3">
          {chips.map((chip, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
              <span className="text-sm">{chip.icon}</span>
              <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">{chip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;