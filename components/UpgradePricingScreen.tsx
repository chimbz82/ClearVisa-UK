import React from 'react';
import { AssessmentResult } from '../types';
import Button from './Button';
import { PLANS_ARRAY, PlanId } from '../config/pricingConfig';

interface UpgradePricingScreenProps {
  assessmentResult: AssessmentResult;
  onSelectPlan: (planId: PlanId) => void;
  onNavigateLegal: (view: any) => void;
  onGoBack: () => void;
}

const UpgradePricingScreen: React.FC<UpgradePricingScreenProps> = ({ 
  assessmentResult, 
  onSelectPlan, 
  onNavigateLegal,
  onGoBack
}) => {
  const verdictStyles = {
    likely: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    borderline: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    unlikely: { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' }
  };

  const current = verdictStyles[assessmentResult.verdict] || verdictStyles.borderline;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        {/* PRE-CHECK VERDICT */}
        <div className={`mb-12 p-10 rounded-3xl border-2 text-center ${current.bg} ${current.border} animate-in zoom-in duration-500 shadow-sm`}>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 block underline underline-offset-8 decoration-2 decoration-slate-200">Headline Pre-Check Verdict</span>
           <h2 className={`text-5xl font-black uppercase tracking-tight mb-4 ${current.color}`}>
             {assessmentResult.verdict.toUpperCase()} ELIGIBLE
           </h2>
           <p className="text-base font-bold text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
             Initial screening identified <strong>{assessmentResult.riskFlags.length} markers</strong>. Pay to unlock your detailed PDF audit, checklists, and solicitor-style action plan.
           </p>
           <div className="flex flex-wrap justify-center gap-3">
             {assessmentResult.riskFlags.map((f, i) => (
               <span key={i} className="px-4 py-2 bg-white/70 rounded-full text-[10px] font-black uppercase text-slate-500 border border-slate-200 shadow-sm">{f}</span>
             ))}
           </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-black text-navy uppercase tracking-tight mb-3">Compare Report Tiers</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Unlock your full results instantly after checkout.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
          {PLANS_ARRAY.map((plan) => {
            const isProPlus = plan.id === 'pro_plus';
            const isFull = plan.id === 'full';
            return (
              <div key={plan.id} className={`bg-white rounded-[2rem] p-8 border-2 flex flex-col hover:border-accent transition-all duration-300 shadow-sm ${isProPlus ? 'border-accent ring-4 ring-accent/5 scale-105 z-10' : 'border-slate-100'}`}>
                <div className="mb-8 text-left">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                    {plan.name}
                  </span>
                  <p className="text-xs text-slate-500 mb-4 font-bold uppercase tracking-tight">{plan.questionCountLabel}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-navy">£{plan.priceGBP}</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-1">once</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-10 flex-grow text-left">
                    {plan.features.map((f, i) => (
                        <li key={i} className="text-[11px] font-bold text-slate-600 uppercase tracking-tight flex gap-3 leading-tight">
                            <span className={isProPlus ? 'text-accent font-black' : 'text-success font-black'}>✓</span>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => onSelectPlan(plan.id)} fullWidth variant={isProPlus ? 'secondary' : isFull ? 'primary' : 'navy'} size="lg" className="py-5 font-black uppercase tracking-widest">
                    Unlock {plan.shortName} Report
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8 border-t border-slate-200">
           <button onClick={onGoBack} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-navy transition-colors mb-8">← Refine pre-check answers</button>
           <div className="flex justify-center gap-8 opacity-40 grayscale">
              <span className="text-[9px] font-black uppercase tracking-widest">Secure Stripe Checkout</span>
              <span className="text-[9px] font-black uppercase tracking-widest">One-time payment</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePricingScreen;