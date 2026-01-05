import React from 'react';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-off-white pt-8 md:pt-12 lg:pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-navy font-bold hover:text-teal-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-3xl font-bold text-navy mb-8">Terms of Use</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <p className="text-lg font-medium text-slate-900">
              ClearVisa UK – Immigration Eligibility Pre-Check Report provides an online eligibility pre-check tool for UK visa routes. By using this site, you agree that:
            </p>
            
            <ul className="space-y-6 list-none pl-0">
              {[
                "The service is for information purposes only and is not legal advice.",
                "You are responsible for the accuracy of the information you submit.",
                "We do not guarantee any visa outcome or application success.",
                "We may update the service and these terms at any time."
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-teal-600 font-bold text-xl leading-none mt-1">•</span>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-10">
              <p className="text-sm font-bold text-navy italic">
                If you do not agree to these terms, please do not use the service.
              </p>
            </div>
            
            <p className="text-xs text-slate-400 pt-10 border-t border-slate-100 uppercase font-bold tracking-widest">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;