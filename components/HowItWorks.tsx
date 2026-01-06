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
    <section id="how-it-works" className="section-py bg-white scroll-mt-[80px]">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-h2 text-[#0B1F3B] mb-4 uppercase tracking-tight">
            {t('section.howItWorks.title')}
          </h2>
          <p className="text-body text-slate-600 font-medium">
            {t('section.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md group">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-lg">
                {idx + 1}
              </div>
              <h3 className="text-h3 text-[#0B1F3B] mt-2 mb-4 leading-tight uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-small text-slate-600 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-caption text-slate-400 font-bold uppercase tracking-widest italic">
            {t('section.howItWorks.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
