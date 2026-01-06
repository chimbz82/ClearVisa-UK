import React from 'react';

interface RefundPolicyProps {
  onBack: () => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-off-white pt-8 md:pt-12 lg:pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-navy font-bold hover:text-[#1877F2] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-3xl font-bold text-navy mb-8">Refund & Payment Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <p className="text-lg font-medium text-slate-900 leading-relaxed">
              ClearVisa UK provides digital, instantly accessible eligibility reports. Due to the immediate delivery of digital content, our standard policy is as follows:
            </p>
            
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-navy">1. One-Time Payments</h3>
              <p>
                All fees are one-off and do not involve recurring subscriptions. Your payment unlocks a specific assessment for the target route selected.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-xl font-bold text-navy">2. Refunds</h3>
              <p>
                Refunds are generally not provided once the assessment result has been generated and displayed, as the service is considered fully performed at that point.
              </p>
              <p>
                If you encounter a technical error that prevents you from accessing your report, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <p>
                You can contact us at <a href="mailto:support@clearvisa.co.uk" className="text-[#1877F2] font-bold underline">support@clearvisa.co.uk</a> for any billing inquiries.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;