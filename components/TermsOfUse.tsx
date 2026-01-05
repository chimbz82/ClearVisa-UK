
import React from 'react';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-off-white py-20">
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
              ClearVisa UK provides an online eligibility pre-check tool for UK visa routes. By using this site, you agree to the following terms:
            </p>
            
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-teal-600 font-bold">•</span>
                <span>The service is for information purposes only and is <strong>not legal advice</strong>.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-teal-600 font-bold">•</span>
                <span>You are responsible for the accuracy of the information you submit.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-teal-600 font-bold">•</span>
                <span>We do not guarantee any visa outcome or application success.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-teal-600 font-bold">•</span>
                <span>We may update the service and these terms at any time.</span>
              </li>
            </ul>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
              <p className="text-sm italic">
                If you do not agree to these terms, please do not use the service.
              </p>
            </div>
            
            <p className="text-xs text-slate-400 pt-10 border-t border-slate-100">
              Last updated: October 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
