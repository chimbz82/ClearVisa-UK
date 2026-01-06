import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="app-container">
        <div className="max-w-3xl mx-auto">
          <div className="app-card p-8 sm:p-10 border-l-4 border-l-[#1877F2]">
            <h3 className="text-lg font-bold text-[#041229] mb-6 uppercase tracking-wider">Important Information</h3>
            <div className="space-y-5 text-slate-500 text-sm leading-relaxed font-medium">
              <p className="flex items-start gap-3">
                <span className="text-[#1877F2] font-black">•</span>
                <span>{t('legal.item1')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#1877F2] font-black">•</span>
                <span>{t('legal.item2')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#1877F2] font-black">•</span>
                <span>{t('legal.item3')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#1877F2] font-black">•</span>
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