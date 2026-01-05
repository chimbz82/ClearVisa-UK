import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PartnerSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    { title: t('partner.benefit1'), icon: "📊" },
    { title: t('partner.benefit2'), icon: "🔗" },
    { title: t('partner.benefit3'), icon: "📅" },
    { title: t('partner.benefit4'), icon: "🛡️" }
  ];

  return (
    <section className="py-20 bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">{t('partner.title')}</h2>
          <p className="text-lg text-slate-400 font-bold">{t('partner.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <p className="font-black uppercase tracking-widest text-xs leading-relaxed">{benefit.title}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-accent/10 border border-accent/20 px-8 py-4 rounded-2xl mb-10">
            <p className="text-accent font-black uppercase tracking-[0.2em] text-sm">
              {t('partner.commission')}
            </p>
          </div>
          <br />
          <button className="bg-white text-navy px-12 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all shadow-2xl">
            {t('partner.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;