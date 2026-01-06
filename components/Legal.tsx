import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section-py bg-slate-50 border-t border-slate-100">
      <div className="app-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200"></div>
            <h3 className="text-h3 text-[#0B1F3B] mb-8 uppercase tracking-tight leading-none">{t('legal.title')}</h3>
            <div className="space-y-6 text-slate-500 text-[13px] leading-relaxed font-semibold uppercase tracking-wide">
              <p className="flex items-start gap-4">
                <span className="text-slate-300 font-bold text-lg">•</span>
                <span>{t('legal.item1')}</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-slate-300 font-bold text-lg">•</span>
                <span>{t('legal.item2')}</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-slate-300 font-bold text-lg">•</span>
                <span>{t('legal.item3')}</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-slate-300 font-bold text-lg">•</span>
                <span>{t('legal.item4')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;
