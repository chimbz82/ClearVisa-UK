import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PartnerSection: React.FC = () => {
  const { t } = useLanguage();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            t('partner.benefit1'),
            t('partner.benefit2'),
            t('partner.benefit3'),
            t('partner.benefit4')
          ].map((benefit, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="font-black uppercase tracking-widest text-xs">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-accent/10 border border-accent/20 px-8 py-4 rounded-2xl mb-8">
            <p className="text-accent font-black uppercase tracking-[0.2em] text-sm">
              {t('partner.commission')}
            </p>
          </div>
          <br />
          <button className="bg-white text-navy px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all shadow-xl">
            {t('partner.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;