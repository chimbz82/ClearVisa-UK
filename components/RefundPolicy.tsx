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
          Back to previous screen
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 text-left">
            
            <header className="border-b border-slate-100 pb-8">
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight mb-2">Refund & Cancellation Policy</h1>
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">ClearVisa UK • Last Updated: January 2026</p>
            </header>

            <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-navy">1. Digital Content & Immediate Delivery</h2>
              <p className="text-sm leading-relaxed">
                ClearVisa UK provides automated, digital immigration pre-check reports. Our services are considered <strong>"Digital Content"</strong> under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
              </p>
              <p className="text-sm font-bold text-navy">
                By making a payment and proceeding to generate your report, you expressly consent to the immediate performance of the contract and acknowledge that your 14-day "cooling-off" right to cancel is waived once the digital content is delivered.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-navy">2. Refund Eligibility</h2>
              <p>Refunds are only issued under the following specific, verifiable conditions:</p>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                <li><strong>Duplicate Payment:</strong> If our system accidentally charges you twice for the same report tier.</li>
                <li><strong>Technical Failure:</strong> If a confirmed system error prevents the report from generating or being displayed after successful payment, and we cannot resolve the issue within 24 hours.</li>
                <li><strong>Card Fraud:</strong> In cases of verified unauthorized card use, provided a formal police report or letter from your bank confirming the fraud is supplied.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-navy">3. Non-Refundable Scenarios</h2>
              <p>We do not offer refunds for any of the following reasons:</p>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                <li><strong>Change of Mind:</strong> We cannot "take back" a report once it has been read or downloaded.</li>
                <li><strong>Disagreement with Result:</strong> The report is an automated assessment based on Home Office rules. A "Medium" or "High" risk verdict is a valid outcome of the service and is not grounds for a refund.</li>
                <li><strong>User Input Error:</strong> If you enter incorrect dates, income amounts, or history details that lead to an inaccurate report. You are responsible for the data you provide.</li>
                <li><strong>Misunderstanding:</strong> If you did not read the service description and expected a human solicitor review or a guaranteed visa outcome.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. How to Request a Refund</h2>
              <p>To request a refund under the eligible conditions, please email us at:</p>
              <p className="text-lg font-bold text-accent">clearvisauk@protonmail.com</p>
              <p className="text-sm">Please include your transaction ID (found on your email receipt) and a clear explanation of the issue. We aim to investigate and provide a final response within <strong>10 business days</strong>.</p>
            </section>

            <section className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-navy">5. Chargeback Abuse Policy</h2>
              <p className="text-sm italic">
                Initiating a chargeback through your bank for a digital product that has been correctly delivered is considered a breach of our Terms. We contest all such disputes and will provide evidence of delivery and these terms to the card issuer. Abusive chargeback behavior may result in the user being permanently barred from the platform.
              </p>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • LONDON • GOVERNED BY THE LAWS OF ENGLAND & WALES
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;