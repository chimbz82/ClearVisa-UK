import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhoItsFor: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('section.whoFor.spouseTitle'),
      desc: t('section.whoFor.spouseBody'),
      icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    },
    {
      title: t('section.whoFor.skilledTitle'),
      desc: t('section.whoFor.skilledBody'),
      icon: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    },
    {
      title: t('section.whoFor.reapplyTitle'),
      desc: t('section.whoFor.reapplyBody'),
      icon: <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    },
    {
      title: t('section.whoFor.plannersTitle'),
      desc: t('section.whoFor.plannersBody'),
      icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    }
  ];

  return (
    <section id="who-its-for" className="section-py bg-white scroll-mt-20">
      <div className="app-container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Target Audience</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07162A] mb-3">Who this tool is for</h2>
          <p className="text-sm text-slate-600">Built for real people making serious life decisions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => (
            <div key={idx} className="app-card hover-card flex flex-col p-6 min-h-[220px] lg:min-h-[240px] group">
              <div className="mb-4 w-10 h-10 rounded-lg bg-[#1877F2]/5 text-[#1877F2] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#1877F2] group-hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">{card.icon}</svg>
              </div>
              <h3 className="text-[15px] font-bold text-[#07162A] mb-2 leading-tight">
                {card.title}
              </h3>
              <p className="text-[12px] text-slate-500 leading-relaxed flex-grow italic font-medium">
                {card.desc}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-50 text-[10px] font-bold uppercase tracking-widest text-[#1877F2]">
                Available now
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;