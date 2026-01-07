import React from 'react';
import { AssessmentResult } from '../types';
import Button from './Button';
import { PlanId } from '../App';

interface UpgradePricingScreenProps {
  assessmentResult: AssessmentResult;
  onSelectPlan: (planId: PlanId) => void;
  onViewFree: () => void;
  onNavigateLegal: (view: 'privacy' | 'terms' | 'refunds') => void;
}

const UpgradePricingScreen: React.FC<UpgradePricingScreenProps> = ({ 
  assessmentResult, 
  onSelectPlan, 
  onViewFree,
  onNavigateLegal
}) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-12">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full">
           <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
           <span className="text-[11px] font-black text-accent uppercase tracking-[0.2em]">Compliance Assessment Ready</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy uppercase tracking-tight mb-4">Get a deeper audit of your case</h2>
        <p className="text-base text-slate-500 font-bold uppercase tracking-widest max-w-2xl mx-auto">
          Our systems have processed your compliance profile. Choose the depth of analysis required for your application planning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
        {/* Professional Audit */}
        <div className="app-card border-2 border-slate-200 p-8 flex flex-col hover:border-accent transition-all bg-white shadow-xl">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Standard Audit</span>
           <h3 className="text-xl font-black text-navy uppercase tracking-tight mb-4">Professional Audit</h3>
           <div className="flex items-baseline gap-2 mb-8">
             <span className="text-4xl font-black text-navy">£79</span>
             <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Single Payment</span>
           </div>
           <ul className="space-y-4 mb-10 flex-grow text-left">
              {[
                "Deeper evidence gap analysis",
                "Full route-specific compliance matrix",
                "Personalized documentation checklist",
                "Traffic-light risk profiling",
                "Professional PDF output"
              ].map((f, i) => (
                <li key={i} className="flex gap-3 text-xs font-bold text-slate-700 uppercase tracking-tight">
                   <span className="text-accent">✓</span> {f}
                </li>
              ))}
           </ul>
           <Button onClick={() => onSelectPlan('full')} fullWidth variant="secondary" size="lg" className="py-5 font-black uppercase tracking-widest shadow-lg">Professional Audit – Pay £79</Button>
        </div>

        {/* Professional Plus */}
        <div className="app-card border-2 border-accent p-8 flex flex-col bg-navy text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-bl-lg">Recommended</div>
           <span className="text-[10px] font-black text-accent uppercase tracking-widest mb-6">Expert Remediation</span>
           <h3 className="text-xl font-black uppercase tracking-tight mb-4">Professional Plus</h3>
           <div className="flex items-baseline gap-2 mb-8">
             <span className="text-4xl font-black text-accent">£99</span>
             <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Single Payment</span>
           </div>
           <ul className="space-y-4 mb-10 flex-grow text-left">
              {[
                "Everything in Professional Audit",
                "Solicitor-ready case summary",
                "Strategic action plan for weak areas",
                "Sample wording for cover letters",
                "Priority remediation guidance"
              ].map((f, i) => (
                <li key={i} className="flex gap-3 text-xs font-bold text-slate-200 uppercase tracking-tight">
                   <span className="text-accent">✓</span> {f}
                </li>
              ))}
           </ul>
           <Button onClick={() => onSelectPlan('pro_plus')} fullWidth variant="primary" size="lg" className="py-5 font-black uppercase tracking-widest shadow-xl">Professional Plus – Pay £99</Button>
        </div>
      </div>

      <div className="text-center max-w-xl">
         <button onClick={onViewFree} className="text-[11px] font-black text-slate-400 hover:text-navy uppercase tracking-widest mb-8 transition-colors">Or continue with Basic Preview (£29)</button>
         <div className="pt-8 border-t border-slate-200 text-[10px] text-slate-400 font-bold leading-tight">
            By proceeding, you agree to our{' '}
            <button onClick={() => onNavigateLegal('terms')} className="underline">Terms</button>,{' '}
            <button onClick={() => onNavigateLegal('privacy')} className="underline">Privacy</button>, and{' '}
            <button onClick={() => onNavigateLegal('refunds')} className="underline">Refund Policy</button>.
         </div>
      </div>
    </div>
  );
};

export default UpgradePricingScreen;