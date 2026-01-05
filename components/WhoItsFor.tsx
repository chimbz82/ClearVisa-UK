import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhoItsFor: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('section.whoFor.spouseTitle'),
      desc: t('section.whoFor.spouseBody'),
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      )
    },
    {
      title: t('section.whoFor.skilledTitle'),
      desc: t('section.whoFor.skilledBody'),
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      )
    },
    {
      title: t('section.whoFor.reapplyTitle'),
      desc: t('section.whoFor.reapplyBody'),
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      )
    },
    {
      title: t('section.whoFor.plannersTitle'),
      desc: t('section.whoFor.plannersBody'),
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      )
    }
  ];

  return (
    <section id="who-its-for" className="py-16 md:py-24 bg-white scroll-mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tight">{t('section.whoFor.title')}</h2>
          <p className="text-lg text-slate-600 font-bold">{t('section.whoFor.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="flex flex-col bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-accent/20 transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="text-xl font-black text-navy mb-3 uppercase tracking-tight">{card.title}</h3>
              <p className="text-slate-600 text-sm font-bold leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;