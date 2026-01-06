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
    <section id="pricing" className="section-py bg-[#F5F7FB] scroll-mt-20">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#041229] mb-4">Simple, one-time pricing</h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">No subscriptions. No hidden fees. Pay once per pre-check.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col app-card p-7 sm:p-8 relative overflow-hidden transition-all duration-300 h-full ${
                plan.id === 'full' 
                ? 'md:scale-[1.02] border-[#2BB24C]/40 ring-4 ring-[#2BB24C]/5 z-10' 
                : 'bg-white'
              }`}
            >
              <div className="mb-6">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block ${
                  plan.id === 'full' ? 'bg-[#2BB24C] text-white' : 
                  plan.id === 'pro_plus' ? 'bg-[#041229] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {plan.id === 'basic' ? 'BUDGET' : plan.id === 'full' ? 'RECOMMENDED' : 'BEST FOR COMPLEX CASES'}
                </span>
                
                <h3 className="text-lg font-bold text-[#041229] mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-bold text-[#041229]">£{plan.priceGBP}</span>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">once</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed italic min-h-[40px]">
                  {plan.description}
                </p>
              </div>
              
              <div className="flex-grow pt-4 border-t border-slate-50">
                <ul className="space-y-3 mb-8">
                  {plan.includedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-snug">
                      <svg className="w-4 h-4 text-[#2BB24C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4">
                <Button 
                  onClick={() => onStartCheck(plan.id)}
                  fullWidth
                  variant={plan.id === 'full' ? 'primary' : 'outline'}
                  size="md"
                >
                  Choose {plan.name}
                </Button>
                <div className="mt-4 text-center space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Secure Payment by Stripe
                  </p>
                  <p className="text-[9px] text-slate-400 font-medium leading-tight">
                    By proceeding, you agree to our <a href="/terms" className="underline">Terms</a>, <a href="/privacy" className="underline">Privacy</a>, and <a href="/refunds" className="underline">Refund Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;