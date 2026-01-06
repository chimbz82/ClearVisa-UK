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
    <section className="section-py bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="app-container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-h2 mb-4 uppercase tracking-tight">{t('partner.title')}</h2>
          <p className="text-body text-slate-400 font-medium">{t('partner.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm transition-all group">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <p className="text-caption leading-relaxed">{benefit.title}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-white text-navy px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-small hover:bg-accent hover:text-white transition-all shadow-xl">
            {t('partner.cta')}
          </button>
          <div className="mt-8">
            <button className="text-accent font-black uppercase tracking-widest text-caption hover:underline">
              {t('partner.commission')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;