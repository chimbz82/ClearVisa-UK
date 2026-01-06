import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';
import { PLANS } from '../App';

interface PricingProps {
  onStartCheck: (planId: any) => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="section-py bg-slate-50 scroll-mt-[80px]">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-h2 text-[#0B1F3B] mb-4 uppercase tracking-tight">{t('pricing.title')}</h2>
          <p className="text-body text-slate-600 font-medium">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1140px] mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col bg-white p-10 rounded-[2.5rem] border shadow-xl relative overflow-hidden group transition-all hover:translate-y-[-4px] ${
                plan.id === 'full' 
                ? 'ring-2 ring-teal-600 scale-105 z-10 border-teal-600/20 shadow-2xl' 
                : 'border-slate-200 shadow-lg'
              }`}
            >
              {/* Design accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[100px]"></div>
              
              <div className="mb-10 text-center">
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] mb-4 block ${
                  plan.id === 'full' ? 'text-teal-600' : 
                  plan.id === 'humanReview' ? 'text-navy' : 'text-slate-400'
                }`}>
                  {t(`pricing.tier.${plan.id}.badge`)}
                </span>
                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-h1 text-[#0B1F3B] text-5xl leading-none">£{plan.priceGBP}</span>
                  <span className="text-caption text-slate-400 font-bold tracking-widest lowercase">once</span>
                </div>
                <h3 className="text-h3 text-[#0B1F3B] mb-2 uppercase tracking-tight leading-tight min-h-[3rem] flex items-center justify-center">
                  {plan.name}
                </h3>
                <p className="text-small text-slate-500 font-bold leading-relaxed max-w-[280px] mx-auto italic">
                  {plan.description}
                </p>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-12">
                  {plan.includedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-small text-slate-700 font-semibold leading-tight">
                      <span className="text-teal-600 font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => onStartCheck(plan.id)}
                className="w-full py-5 text-base"
                variant={plan.id === 'full' ? 'primary' : 'outline'}
                size="lg"
              >
                Select {plan.id === 'basic' ? 'Basic' : plan.id === 'full' ? 'Audit' : 'Plus'}
              </Button>

              <div className="mt-8 text-center">
                <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">
                  {t('pricing.reassurance')}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-caption text-slate-400 font-black uppercase tracking-[0.25em] mb-6">Legal firms or agencies?</p>
          <a href="mailto:b2b@clearvisa.co.uk" className="text-teal-600 hover:text-teal-700 font-black uppercase tracking-widest text-[13px] border-b-2 border-teal-600/20 hover:border-teal-700 transition-all pb-1">
            Contact us for bulk licensing
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
