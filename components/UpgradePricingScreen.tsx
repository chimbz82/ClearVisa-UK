import React from 'react';
import { AssessmentResult } from '../types';
import Button from './Button';
import { PlanId, PLANS } from '../App';

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

  const current = verdictStyles[assessmentResult.verdict];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* FREE VERDICT SECTION */}
        <div className={`mb-12 p-8 rounded-3xl border-2 text-center ${current.bg} ${current.border} animate-in zoom-in duration-500`}>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 block">Free Pre-Check Verdict</span>
           <h2 className={`text-4xl font-black uppercase tracking-tight mb-4 ${current.color}`}>
             {assessmentResult.verdict} Eligible
           </h2>
           <p className="text-sm font-bold text-slate-600 mb-6 max-w-xl mx-auto">
             Based on your initial 12 answers, we have identified <strong>{assessmentResult.riskFlags.length} risk flags</strong> that require professional auditing.
           </p>
           <div className="flex flex-wrap justify-center gap-2">
             {assessmentResult.riskFlags.map((f, i) => (
               <span key={i} className="px-3 py-1 bg-white/50 rounded-full text-[9px] font-black uppercase text-slate-500 border border-slate-200">{f}</span>
             ))}
           </div>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-navy uppercase tracking-tight mb-2">Unlock Your Full Audit & Action Plan</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Complete the remaining 40 questions to finalize your report.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.filter(p => p.id !== 'free').map((plan) => (
            <div key={plan.id} className={`bg-white rounded-2xl p-6 border-2 flex flex-col hover:border-accent transition-all shadow-sm ${plan.id === 'pro_plus' ? 'border-accent shadow-xl' : 'border-slate-100'}`}>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">{plan.name}</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-navy">£{plan.priceGBP}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.includedFeatures.slice(0, 4).map((f, i) => (
                  <li key={i} className="text-[10px] font-bold text-slate-600 uppercase tracking-tight flex gap-2">
                    <span className="text-success">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={() => onSelectPlan(plan.id)} fullWidth variant={plan.id === 'pro_plus' ? 'secondary' : 'navy'} size="sm">Choose {plan.id.replace('_', ' ')}</Button>
            </div>
          ))}
        </div>

        <div className="text-center">
           <button onClick={onGoBack} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-navy transition-colors">← Refine Free Pre-Check Answers</button>
           <div className="mt-8 pt-8 border-t border-slate-200 text-[9px] text-slate-400 font-bold leading-tight">
              One-time payment. Secure Stripe checkout. PDF delivered instantly after audit completion.
           </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePricingScreen;