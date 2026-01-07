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
    <section id="pricing" className="section-py bg-[#F5F7FB] scroll-mt-20">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#041229] mb-4">Simple, one-time pricing</h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">No subscriptions. No hidden fees. Pay once per pre-check.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-20">
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
                    {isProPlus ? "Ideal for previous refusals and borderline cases where evidence and wording really matter." : plan.description}
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
                    {isProPlus && (
                      <li className="flex items-start gap-3 text-[13px] text-slate-700 font-semibold leading-tight tracking-tight">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#1877F2]" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Summary written specifically for solicitor/advisor discussion
                      </li>
                    )}
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
                  <div className="mt-5 text-center space-y-3">
                    {isProPlus && (
                      <p className="text-[10px] text-[#1877F2] font-black uppercase tracking-tight">
                        MOST RECOMMENDED FOR SPOUSE VISAS AND PREVIOUS REFUSALS
                      </p>
                    )}
                    
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                       <span className="text-[8px] font-bold text-slate-400 uppercase">✓ Secure Stripe checkout</span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase">✓ One-time payment</span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase">✓ Instant access</span>
                    </div>

                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                      SECURE STRIPE CHECKOUT
                    </p>
                    <div className="text-[9px] text-slate-400 font-medium leading-tight">
                      By proceeding, you agree to our{' '}
                      <button onClick={() => onNavigateLegal('terms')} className="underline hover:text-slate-600 transition-colors">Terms</button>,{' '}
                      <button onClick={() => onNavigateLegal('privacy')} className="underline hover:text-slate-600 transition-colors">Privacy</button>, and{' '}
                      <button onClick={() => onNavigateLegal('refunds')} className="underline hover:text-slate-600 transition-colors">Refund Policy</button>.
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 max-w-4xl mx-auto">
           <div className="text-center mb-10">
              <h3 className="text-xl font-bold text-navy">Compare your options</h3>
              <p className="text-sm text-slate-500 font-medium">How we compare to DIY and traditional legal services.</p>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-100">
                       <th className="py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Decision Factor</th>
                       <th className="py-4 text-[11px] font-black text-[#1877F2] uppercase tracking-widest text-center">ClearVisa Report</th>
                       <th className="py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">DIY Forums</th>
                       <th className="py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Solicitor</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {comparison.map((row, i) => (
                      <tr key={i}>
                         <td className="py-5 text-xs font-bold text-navy">{row.feature}</td>
                         <td className="py-5 text-xs font-bold text-[#1877F2] text-center">{row.cv}</td>
                         <td className="py-5 text-xs font-medium text-slate-500 text-center">{row.diy}</td>
                         <td className="py-5 text-xs font-medium text-slate-500 text-center">{row.solicitor}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 italic font-medium">
                 Note: ClearVisa UK is an automated pre-check tool. It is not a law firm and cannot provide legal advice or represent you. Final decisions are made by the Home Office.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;