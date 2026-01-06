import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TrustStrip: React.FC = () => {
  const { t } = useLanguage();
  
  const chips = [
    { text: t('badges.stripe'), icon: "💳" },
    { text: t('badges.gdpr'), icon: "🔐" },
    { text: t('badges.confidential'), icon: "🛡️" },
    { text: t('badges.publicGuidance'), icon: "⚖️" }
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-8">
      <div className="app-container">
        <h3 className="text-center text-caption text-slate-400 mb-6 font-bold uppercase tracking-widest">
          {t('badges.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chips.map((chip, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center p-4 rounded-xl bg-slate-50/50 border border-slate-100">
              <span className="text-xl">{chip.icon}</span>
              <span className="text-caption text-slate-600 font-bold">{chip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;