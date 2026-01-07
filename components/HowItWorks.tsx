import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { title: t('section.howItWorks.step1Title'), desc: t('section.howItWorks.step1Body') },
    { title: t('section.howItWorks.step2Title'), desc: t('section.howItWorks.step2Body') },
    { title: t('section.howItWorks.step3Title'), desc: t('section.howItWorks.step3Body') }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-[#F5F7FB] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Process</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041229] mb-4">How ClearVisa UK works</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            A simple three-step flow from questions to clear outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="app-card flex flex-col p-8 hover-card group border-slate-200/60">
              <div className="w-12 h-12 bg-white border-2 border-slate-100 text-[#041229] rounded-2xl flex items-center justify-center text-base font-black mb-8 group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-[#1877F2] transition-all">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold text-[#041229] mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">
            YOU STAY IN CONTROL: NO AUTOMATIC REFERRALS, NO UNEXPECTED CALLS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;