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
    <section id="pricing" className="section-py bg-white scroll-mt-20">
      <div className="app-container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07162A] mb-3">{t('pricing.title')}</h2>
          <p className="text-sm text-slate-600 font-medium">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col app-card p-6 sm:p-7 min-h-[300px] relative overflow-hidden transition-all duration-300 ${
                plan.id === 'full' 
                ? 'md:scale-[1.02] border-[#16A34A]/40 ring-4 ring-[#16A34A]/5 z-10' 
                : 'bg-white'
              }`}
            >
              <div className="mb-5">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block ${
                  plan.id === 'full' ? 'bg-[#16A34A] text-white' : 
                  plan.id === 'humanReview' ? 'bg-[#07162A] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {plan.id === 'basic' ? 'BUDGET' : plan.id === 'full' ? 'RECOMMENDED' : 'ENHANCED'}
                </span>
                
                <h3 className="text-base font-bold text-[#07162A] mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-bold text-[#07162A]">£{plan.priceGBP}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">once</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                  {plan.description}
                </p>
              </div>
              
              <div className="flex-grow pt-4 border-t border-slate-50">
                <ul className="space-y-2.5 mb-6">
                  {plan.includedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-slate-600 leading-snug font-medium">
                      <svg className="w-4 h-4 text-[#16A34A] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button 
                  onClick={() => onStartCheck(plan.id)}
                  fullWidth
                  variant={plan.id === 'full' ? 'primary' : 'outline'}
                  size="md"
                >
                  Get Started
                </Button>
                <p className="mt-4 text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                  Secure Payment by Stripe
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;