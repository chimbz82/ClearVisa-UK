
import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
          <h1 className="text-3xl font-bold text-navy mb-8">Privacy</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <p className="text-lg font-medium text-slate-900 leading-relaxed">
              We collect the information you provide during your pre-check in order to generate your result and report. We do not sell your data to third parties.
            </p>
            
            <section className="space-y-4">
              <p>
                Data may be stored securely with reputable third-party providers (for example, hosting, email, analytics, or payment processors).
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <p>
                You can contact us at <a href="mailto:support@clearvisa.co.uk" className="text-teal-600 font-bold underline">support@clearvisa.co.uk</a> if you wish to request access to or deletion of your data, subject to any legal obligations we have to retain certain records.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
