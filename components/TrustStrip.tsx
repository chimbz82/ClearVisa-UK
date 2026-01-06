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
    <section className="bg-slate-50 border-y border-slate-100 py-10">
      <div className="app-container">
        <h3 className="text-center text-caption text-slate-400 mb-8 font-bold uppercase tracking-[0.15em]">
          {t('badges.title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chips.map((chip, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center lg:justify-start p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
              <span className="text-xl flex-shrink-0">{chip.icon}</span>
              <span className="text-[12px] font-bold text-slate-700 leading-tight">{chip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
