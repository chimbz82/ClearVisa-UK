import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PricingProps {
  onStartCheck: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="pt-4 pb-20 bg-slate-50/50 scroll-mt-[140px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">{t('pricing.title')}</h2>
          <p className="text-lg text-slate-600 font-medium">{t('pricing.subtitle')}</p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform hover:scale-[1.01] transition-transform">
            <div className="p-8 lg:p-10 text-center bg-slate-50 border-b border-slate-100">
              <h3 className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] mb-3 lg:mb-4">{t('pricing.card.title')}</h3>
              <div className="flex items-center justify-center gap-1 mb-3 lg:mb-4">
                <span className="text-4xl font-black text-navy">£29</span>
                <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{t('pricing.card.priceSuffix')}</span>
              </div>
              <p className="text-slate-600 text-[13px] lg:text-sm font-bold leading-relaxed">{t('pricing.card.desc')}</p>
            </div>
            <div className="p-8 lg:p-10">
              <ul className="space-y-3.5 lg:space-y-4 mb-8 lg:mb-10">
                {[
                  "Route-specific compliance questionnaire",
                  "Full eligibility verdict & explanation",
                  "Detailed risk flag breakdown",
                  "Downloadable summary (PDF report)",
                  "Home Office guidance references"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onStartCheck}
                className="w-full bg-navy text-white py-4 rounded-xl text-lg font-black hover:bg-slate-800 transition-all shadow-lg uppercase tracking-widest"
              >
                {t('pricing.card.cta')}
              </button>
            </div>
          </div>
          <p className="mt-7 text-center text-[9px] lg:text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
            {t('pricing.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;