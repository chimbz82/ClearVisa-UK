import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PLANS_ARRAY, PlanId } from '../config/pricingConfig';

interface PricingProps {
  onStartCheck: (planId: PlanId) => void;
  onNavigateLegal: (view: 'privacy' | 'terms' | 'refunds' | 'risk-notice') => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck, onNavigateLegal }) => {
  const { t } = useLanguage();
  const [showComparison, setShowComparison] = useState(false);

  const comparisonFeatures = [
    { name: 'Eligibility Verdict', basic: true, professional: true, proPlus: true },
    { name: 'Risk Factor Flags', basic: true, professional: true, proPlus: true },
    { name: 'Detailed Explanation', basic: true, professional: true, proPlus: true },
    { name: 'Downloadable PDF', basic: 'Short', professional: 'Full', proPlus: 'Comprehensive' },
    { name: 'Question Depth', basic: '20', professional: '40', proPlus: '40+' },
    { name: 'Personalised Checklist', basic: false, professional: true, proPlus: true },
    { name: 'Compliance Matrix', basic: false, professional: true, proPlus: true },
    { name: 'Evidence Gap Analysis', basic: false, professional: false, proPlus: true },
    { name: 'Action Plan', basic: false, professional: false, proPlus: true },
    { name: 'Wording Templates', basic: false, professional: false, proPlus: true },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-24 bg-white border-y border-slate-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 block">Transparent Pricing</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-6 tracking-tight uppercase">Choose your level of depth</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            From a quick pre-check to a solicitor-grade deep audit. Select the tier that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {PLANS_ARRAY.map((plan) => {
            const isProPlus = plan.id === 'pro_plus';
            const isFull = plan.id === 'full';
            
            return (
              <div 
                key={plan.id} 
                className={`flex flex-col rounded-[2.5rem] bg-white border-2 relative overflow-hidden transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-1 ${
                  isProPlus 
                  ? 'border-accent shadow-xl z-10 lg:scale-[1.05]' 
                  : isFull 
                  ? 'border-success/30 shadow-md' 
                  : 'border-slate-100 shadow-sm'
                }`}
              >
                {isProPlus && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                
                <div className={`p-10 ${isProPlus ? 'bg-accent/5' : ''}`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block ${
                    isProPlus ? 'bg-accent text-white' : 
                    isFull ? 'bg-success text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {plan.id === 'basic' ? 'BASIC' : isFull ? 'RECOMMENDED' : 'PREMIUM'}
                  </span>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-black text-navy uppercase tracking-tight mb-2">
                      {plan.name}
                    </h3>
                    <span className="text-xs text-slate-500 block mb-6 font-bold uppercase tracking-widest">
                      {plan.questionCountLabel}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-navy">£{plan.priceGBP}</span>
                      <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest ml-1">one-time</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 font-bold leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>
                </div>
                
                <div className="flex-grow p-10 pt-4 border-t border-slate-50 bg-slate-50/30">
                  <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">Key Deliverables</p>
                  <ul className="space-y-4 mb-4">
                    {plan.features.slice(0, 6).map((feat, i) => (
                      <li key={i} className="flex items-start gap-4 text-[13px] text-slate-700 font-bold leading-tight tracking-tight">
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isProPlus ? 'text-accent' : 'text-success'}`} fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-10 pt-0">
                  <button 
                    onClick={() => onStartCheck(plan.id)}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${
                      isProPlus ? 'bg-accent text-white hover:bg-accent/90' : 
                      isFull ? 'bg-navy text-white hover:bg-navy/90' : 'bg-white text-navy border-2 border-slate-100 hover:border-navy'
                    }`}
                  >
                    Select {plan.shortName}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON TABLE TOGGLE */}
        <div className="text-center">
          <button 
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-navy transition-colors mb-12"
          >
            {showComparison ? 'Hide' : 'View'} Full Feature Comparison
            <svg className={`w-4 h-4 transition-transform duration-300 ${showComparison ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {showComparison && (
          <div className="overflow-x-auto rounded-[2rem] border-2 border-slate-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Features</th>
                  <th className="px-8 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Basic</th>
                  <th className="px-8 py-6 text-center text-[10px] font-black text-navy uppercase tracking-widest">Professional</th>
                  <th className="px-8 py-6 text-center text-[10px] font-black text-accent uppercase tracking-widest">Pro Plus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {comparisonFeatures.map((feat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 text-[13px] font-black text-navy uppercase tracking-tight">{feat.name}</td>
                    <td className="px-8 py-5 text-center">
                      {typeof feat.basic === 'boolean' ? (
                        feat.basic ? <CheckIcon className="text-success mx-auto" /> : <DashIcon className="mx-auto" />
                      ) : <span className="text-[11px] font-black text-slate-500">{feat.basic}</span>}
                    </td>
                    <td className="px-8 py-5 text-center bg-slate-50/30">
                      {typeof feat.professional === 'boolean' ? (
                        feat.professional ? <CheckIcon className="text-navy mx-auto" /> : <DashIcon className="mx-auto" />
                      ) : <span className="text-[11px] font-black text-navy">{feat.professional}</span>}
                    </td>
                    <td className="px-8 py-5 text-center bg-accent/5">
                      {typeof feat.proPlus === 'boolean' ? (
                        feat.proPlus ? <CheckIcon className="text-accent mx-auto" /> : <DashIcon className="mx-auto" />
                      ) : <span className="text-[11px] font-black text-accent">{feat.proPlus}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-20 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stripe Secure</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SSL Encrypted</span>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-50 max-w-2xl mx-auto">
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tight">
              One-off fee. No subscription. You will receive your full report immediately after checkout. 
              By proceeding, you agree to our{' '}
              <button onClick={() => onNavigateLegal('terms')} className="underline hover:text-navy transition-colors">Terms of Use</button> and{' '}
              <button onClick={() => onNavigateLegal('refunds')} className="underline hover:text-navy transition-colors">Refund Policy</button>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

const DashIcon = ({ className = "" }) => (
  <div className={`w-3 h-0.5 bg-slate-200 rounded-full ${className}`} />
);

export default Pricing;