import React from 'react';

interface RefundPolicyProps {
  onBack: () => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-off-white pt-8 md:pt-12 lg:pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-navy font-bold hover:text-accent transition-colors no-print"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none space-y-12 text-slate-600 text-left">
            
            {/* DOCUMENT 3: REFUND & CANCELLATION POLICY */}
            <section className="space-y-4">
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight">Refund & Cancellation Policy</h1>
              <p className="font-semibold text-navy">Last Updated: January 2026</p>
              
              <h3 className="text-xl font-bold text-navy">1. Digital Content Notice</h3>
              <p>All CLEARVISA UK reports are digital goods delivered instantly upon payment. By clicking "Pay" and generating your report, you expressly consent to the immediate performance of the contract and acknowledge that you lose your right to cancel or receive a refund for the digital content once it has been generated.</p>

              <h3 className="text-xl font-bold text-navy">2. Refund Eligibility</h3>
              <p>Refunds are generally not issued after a report has been successfully generated. However, we may issue refunds at our discretion in the following cases:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Duplicate Payment:</strong> If you are charged more than once for the same report level.</li>
                <li><strong>Technical Failure:</strong> If a system error prevents the delivery of your report after payment.</li>
                <li><strong>Unauthorised Transaction:</strong> Verified cases of fraudulent use of your payment method.</li>
              </ul>

              <h3 className="text-xl font-bold text-navy">3. Upgrades</h3>
              <p>When upgrading from a lower tier to a higher tier (e.g., £29 to £79), you will only be charged the difference. Upgrade payments are subject to the same non-refundability rules once the higher-tier content is accessed.</p>

              <h3 className="text-xl font-bold text-navy">4. Chargeback Policy</h3>
              <p>Initiating an unauthorised chargeback for a service that has been correctly delivered is a breach of our Terms. We monitor and contest all such chargebacks and reserve the right to suspend any accounts involved in chargeback disputes.</p>

              <h3 className="text-xl font-bold text-navy">5. Contact</h3>
              <p>For any billing or refund requests, please email <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold">clearvisauk@protonmail.com</a> with your transaction details.</p>
            </section>

            <p className="text-[10px] text-slate-400 pt-10 border-t border-slate-100 uppercase font-black tracking-[0.3em]">
              © 2026 CLEARVISA UK. GOVERNED BY THE LAWS OF ENGLAND & WALES.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;