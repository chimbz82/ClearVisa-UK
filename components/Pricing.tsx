import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';
import { PLANS } from '../App';

interface PricingProps {
  onStartCheck: (planId: any) => void;
  onNavigateLegal: (view: 'privacy' | 'terms' | 'refunds') => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck, onNavigateLegal }) => {
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
          {PLANS.map((plan) => {
            const isProPlus = plan.id === 'pro_plus';
            const isFull = plan.id === 'full';
            
            return (
              <div 
                key={plan.id} 
                className={`flex flex-col app-card relative overflow-hidden transition-all duration-300 h-full ${
                  isProPlus 
                  ? 'md:scale-[1.05] border-[#1877F2]/60 shadow-2xl z-10 ring-2 ring-[#1877F2]/10' 
                  : isFull 
                  ? 'border-[#2BB24C]/40 shadow-sm' 
                  : 'bg-white border-slate-100 shadow-none'
                }`}
              >
                {/* Header Section */}
                <div className={`p-7 sm:p-8 ${isProPlus ? 'bg-gradient-to-b from-[#1877F2]/10 to-transparent' : ''}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 inline-block ${
                    isProPlus ? 'bg-[#1877F2] text-white shadow-md' : 
                    isFull ? 'bg-[#2BB24C] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {plan.id === 'basic' ? 'BUDGET' : isFull ? 'RECOMMENDED' : 'FULL CASE DEEP AUDIT'}
                  </span>
                  
                  <h3 className="text-xl font-bold text-[#041229] mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 my-4">
                    <span className={`text-4xl font-black text-[#041229] ${isProPlus ? 'text-[#1877F2]' : ''}`}>£{plan.priceGBP}</span>
                    <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">once</span>
                  </div>
                  <p className="text-xs text-slate-600 font-bold leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>
                </div>
                
                {/* Features Section */}
                <div className="flex-grow p-7 sm:p-8 pt-4 border-t border-slate-50">
                  <ul className="space-y-4 mb-8">
                    {plan.includedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-slate-700 font-semibold leading-tight tracking-tight">
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isProPlus ? 'text-[#1877F2]' : 'text-[#2BB24C]'}`} fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Section */}
                <div className="mt-auto p-7 sm:p-8 pt-0">
                  <Button 
                    onClick={() => onStartCheck(plan.id)}
                    fullWidth
                    variant={isProPlus ? 'secondary' : isFull ? 'primary' : 'outline'}
                    size="lg"
                    className={isProPlus ? 'shadow-lg hover:shadow-xl' : ''}
                  >
                    {isProPlus ? 'Choose Professional Plus' : `Choose ${plan.name}`}
                  </Button>
                  <div className="mt-5 text-center space-y-2">
                    {isProPlus && (
                      <p className="text-[10px] text-[#1877F2] font-black uppercase tracking-tight mb-2">
                        Most recommended for spouse visas and previous refusals.
                      </p>
                    )}
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                      SECURE STRIPE CHECKOUT
                    </p>
                    <div className="text-[9px] text-slate-400 font-medium leading-tight">
                      By proceeding, you agree to our{' '}
                      <button onClick={() => onNavigateLegal('terms')} className="underline hover:text-slate-600">Terms</button>,{' '}
                      <button onClick={() => onNavigateLegal('privacy')} className="underline hover:text-slate-600">Privacy</button>, and{' '}
                      <button onClick={() => onNavigateLegal('refunds')} className="underline hover:text-slate-600">Refund Policy</button>.
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;