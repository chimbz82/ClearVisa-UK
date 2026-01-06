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
    <section id="how-it-works" className="section-py bg-[#F5F7FB] scroll-mt-20">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Process</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#041229] mb-4">How ClearVisa UK works</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A simple three-step flow from questions to clear outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="app-card flex flex-col min-h-[220px] p-6 hover-card">
              <div className="w-10 h-10 bg-white border border-slate-100 text-[#041229] rounded-lg flex items-center justify-center text-sm font-bold mb-6">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold text-[#041229] mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic">
            YOU STAY IN CONTROL: NO AUTOMATIC REFERRALS, NO UNEXPECTED CALLS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
