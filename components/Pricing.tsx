import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PLANS } from '../App';

interface PricingProps {
  onStartCheck: (planId: any) => void;
  onNavigateLegal: (view: 'privacy' | 'terms' | 'refunds') => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck, onNavigateLegal }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-12 lg:py-16 bg-white border-y border-slate-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Pricing</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4 tracking-tight uppercase">Straightforward Pricing</h2>
          <p className="text-base text-slate-600 font-semibold leading-relaxed">
            All plans begin with a short pre-check assessment before your full audit is generated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 items-stretch">
          {PLANS.map((plan) => {
            const isProPlus = plan.id === 'pro_plus';
            const isFull = plan.id === 'full';
            
            return (
              <div 
                key={plan.id} 
                className={`flex flex-col rounded-[2rem] bg-white border-2 relative overflow-hidden transition-all duration-300 h-full ${
                  isProPlus 
                  ? 'border-accent shadow-2xl z-10 lg:scale-[1.05]' 
                  : isFull 
                  ? 'border-success/30 shadow-md' 
                  : 'border-slate-100 shadow-sm'
                }`}
              >
                <div className={`p-8 ${isProPlus ? 'bg-accent/5' : ''}`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 inline-block ${
                    isProPlus ? 'bg-accent text-white' : 
                    isFull ? 'bg-success text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {plan.id === 'basic' ? 'BUDGET' : isFull ? 'RECOMMENDED' : 'DEEP AUDIT'}
                  </span>
                  
                  <h3 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 my-5">
                    <span className={`text-4xl font-black text-navy ${isProPlus ? 'text-accent' : ''}`}>£{plan.priceGBP}</span>
                    <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">once</span>
                  </div>
                  <p className="text-[13px] text-slate-600 font-bold leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>
                </div>
                
                <div className="flex-grow p-8 pt-4 border-t border-slate-50">
                  <ul className="space-y-4 mb-4">
                    {plan.includedFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3.5 text-[13px] text-slate-700 font-bold leading-tight tracking-tight">
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isProPlus ? 'text-accent' : 'text-success'}`} fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-8 pt-0">
                  <button 
                    onClick={() => onStartCheck(plan.id)}
                    className="w-full py-4 bg-navy text-white rounded-xl font-bold uppercase tracking-wide hover:bg-navy/90 transition-colors"
                  >
                    Choose {plan.name}
                  </button>
                  <div className="text-center space-y-3 mt-6">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">✓ Secure Stripe checkout</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">✓ No hidden fees</span>
                    </div>

                    <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold leading-tight uppercase tracking-tight">
                      By proceeding, you agree to our{' '}
                      <button onClick={() => onNavigateLegal('terms')} className="underline hover:text-navy">Terms</button> and{' '}
                      <button onClick={() => onNavigateLegal('refunds')} className="underline hover:text-navy">Refund Policy</button>.
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