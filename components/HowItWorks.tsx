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
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Process</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07162A] mb-3">How ClearVisa UK works</h2>
          <p className="text-sm text-slate-600">
            A simple three-step flow from questions to clear outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <div key={idx} className="app-card flex flex-col min-h-[180px] md:min-h-[210px] p-6 hover-card">
              <div className="w-8 h-8 bg-[#F5F7FB] border border-slate-100 text-[#07162A] rounded-lg flex items-center justify-center text-xs font-bold mb-4">
                {idx + 1}
              </div>
              <h3 className="text-base font-bold text-[#07162A] mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
            You stay in control: no automatic referrals, no unexpected calls.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;