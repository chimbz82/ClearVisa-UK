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
    <section id="how-it-works" className="pt-4 pb-20 bg-slate-50/50 scroll-mt-[140px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-5 leading-tight uppercase tracking-tight">
            {t('section.howItWorks.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-bold">
            {t('section.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100 h-full hover:shadow-2xl hover:border-accent/20 transition-all duration-500">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-navy text-white rounded-2xl flex items-center justify-center text-xl lg:text-2xl font-black mb-8 lg:mb-10 group-hover:bg-accent transition-colors shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-black text-navy mb-3 lg:mb-4 leading-tight uppercase">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-[13px] lg:text-sm font-bold">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;