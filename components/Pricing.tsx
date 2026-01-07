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

  const comparison = [
    { feature: "Eligibility Verdict", cv: "✓ Instant", diy: "Guesswork", solicitor: "✓ Professional" },
    { feature: "Compliance Score", cv: "✓ Automated", diy: "✕ No", solicitor: "✓ Professional" },
    { feature: "Evidence Audit", cv: "✓ Detailed", diy: "✕ No", solicitor: "✓ Full" },
    { feature: "Time Cost", cv: "10 Minutes", diy: "Weeks", solicitor: "Days/Weeks" },
    { feature: "Financial Cost", cv: "£29 - £99", diy: "Free", solicitor: "£800 - £3000+" }
  ];

  return (
    <section id="pricing" className="py-12 lg:py-16 bg-white border-y border-slate-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Pricing</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4 tracking-tight">Simple, one-time pricing</h2>
          <p className="text-base text-slate-600 font-semibold leading-relaxed">No subscriptions. No hidden fees. Pay once per pre-check.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 items-stretch">
          {PLANS.map((plan) => {
            const isProPlus = plan.id === 'pro_plus';
            const isFull = plan.id === 'full';
            
            return (
              <div 
                key={plan.id} 
                className={`flex flex-col rounded-2xl bg-white border-2 relative overflow-hidden transition-all duration-300 h-full ${
                  isProPlus 
                  ? 'border-accent shadow-2xl z-10 lg:scale-[1.05]' 
                  : isFull 
                  ? 'border-success/30 shadow-md' 
                  : 'border-slate-100 shadow-sm'
                }`}
              >
                {/* Header Section */}
                <div className={`p-8 ${isProPlus ? 'bg-accent/5' : ''}`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 inline-block ${
                    isProPlus ? 'bg-accent text-white' : 
                    isFull ? 'bg-success text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {plan.id === 'basic' ? 'BUDGET' : isFull ? 'RECOMMENDED' : 'FULL CASE DEEP AUDIT'}
                  </span>
                  
                  <h3 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 my-5">
                    <span className={`text-4xl font-black text-navy ${isProPlus ? 'text-accent' : ''}`}>£{plan.priceGBP}</span>
                    <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">once</span>
                  </div>
                  <p className="text-[13px] text-slate-600 font-bold leading-relaxed min-h-[48px]">
                    {isProPlus ? "Ideal for previous refusals and borderline cases where evidence and wording really matter." : plan.description}
                  </p>
                </div>
                
                {/* Features Section */}
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

                {/* CTA Section */}
                <div className="mt-auto p-8 pt-0">
                  <Button 
                    onClick={() => onStartCheck(plan.id)}
                    fullWidth
                    variant={isProPlus ? 'secondary' : isFull ? 'primary' : 'outline'}
                    size="lg"
                    className="py-4 shadow-lg mb-6"
                  >
                    {isProPlus ? 'Choose Professional Plus' : `Choose ${plan.name}`}
                  </Button>
                  <div className="text-center space-y-3">
                    {isProPlus && (
                      <p className="text-[10px] text-accent font-black uppercase tracking-widest">
                        MOST RECOMMENDED FOR COMPLEX CASES
                      </p>
                    )}
                    
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">✓ Secure Stripe checkout</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">✓ One-time payment</span>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">✓ Instant access</span>
                    </div>

                    <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-bold leading-tight">
                      By proceeding, you agree to our{' '}
                      <button onClick={() => onNavigateLegal('terms')} className="underline">Terms</button>,{' '}
                      <button onClick={() => onNavigateLegal('privacy')} className="underline">Privacy</button>, and{' '}
                      <button onClick={() => onNavigateLegal('refunds')} className="underline">Refund Policy</button>.
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 lg:p-12 border border-slate-100 max-w-5xl mx-auto shadow-inner">
           <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold text-navy tracking-tight uppercase">Compare your options</h3>
              <p className="text-sm text-slate-500 font-semibold mt-1 leading-relaxed">How we compare to DIY and traditional legal services.</p>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b-2 border-slate-200">
                       <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Decision Factor</th>
                       <th className="py-4 text-[10px] font-black text-accent uppercase tracking-widest text-center px-4">ClearVisa Report</th>
                       <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">DIY Forums</th>
                       <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">Solicitor</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {comparison.map((row, i) => (
                      <tr key={i} className="hover:bg-white transition-colors">
                         <td className="py-4 text-xs font-black text-navy uppercase tracking-tight">{row.feature}</td>
                         <td className="py-4 text-xs font-black text-accent text-center px-4">{row.cv}</td>
                         <td className="py-4 text-xs font-bold text-slate-500 text-center px-4">{row.diy}</td>
                         <td className="py-4 text-xs font-bold text-slate-500 text-center px-4">{row.solicitor}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-[10px] text-slate-400 italic font-bold uppercase tracking-widest leading-relaxed">
                 Note: ClearVisa UK is an automated pre-check tool. It is not a law firm and cannot provide legal advice or represent you. Final decisions are made by the Home Office.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;