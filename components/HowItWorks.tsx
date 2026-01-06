import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      title: t('section.howItWorks.step1Title'),
      desc: t('section.howItWorks.step1Body')
    },
    {
      title: t('section.howItWorks.step2Title'),
      desc: t('section.howItWorks.step2Body')
    },
    {
      title: t('section.howItWorks.step3Title'),
      desc: t('section.howItWorks.step3Body')
    }
  ];

  return (
    <section id="how-it-works" className="section-py bg-slate-50/50 scroll-mt-[80px]">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-h2 text-navy mb-4">
            {t('section.howItWorks.title')}
          </h2>
          <p className="text-body text-slate-600 font-medium">
            {t('section.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center text-xl font-black mb-6 shadow-sm">
                {idx + 1}
              </div>
              <h3 className="text-h3 text-navy mb-4 uppercase">{step.title}</h3>
              <p className="text-small text-slate-600 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;