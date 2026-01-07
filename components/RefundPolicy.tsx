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
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">Last updated: January 2026</p>
            </header>

            <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-navy">1. Digital Content & Immediate Delivery</h2>
              <p className="text-sm leading-relaxed">
                ClearVisa UK provides automated digital immigration pre-check reports. All audit tiers are
                classed as <strong>digital content</strong> delivered immediately once you confirm your
                answers and generate a report.
              </p>
              <p className="text-sm font-bold text-navy italic">
                By proceeding to payment and generating your report, you expressly consent to immediate
                performance of the Service and acknowledge that you lose any statutory “cooling-off”
                right to cancel after the report has been delivered.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">2. When Refunds May Be Considered</h2>
              <p className="text-sm">We may offer a refund or re-run of your assessment in the following limited situations:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Duplicate payment:</strong> You were accidentally charged more than once for the same audit tier.</li>
                <li><strong>Technical failure:</strong> A confirmed system error meant your report could not be generated or downloaded.</li>
                <li><strong>Fraudulent payment:</strong> Where we are notified that a payment was made using stolen or unauthorised card details.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">3. Non-Refundable Scenarios</h2>
              <p className="text-sm">We do not provide refunds for:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Change of mind after the report has been generated and delivered;</li>
                <li>Disagreement with the eligibility verdict or risk profile;</li>
                <li>Negative or unexpected decisions from the Home Office or UKVI;</li>
                <li>Outcomes based on incomplete, inaccurate, or misleading information you supplied.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. How to Request a Refund Review</h2>
              <p className="text-sm leading-relaxed">
                If you believe you are entitled to a refund, please email:
                <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold ml-1">clearvisauk@protonmail.com</a>
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Your full name and email used for purchase;</li>
                <li>Your transaction reference / payment receipt;</li>
                <li>A short explanation of the issue.</li>
              </ul>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                We aim to review refund requests within 10 business days.
              </p>
            </section>

            <section className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-navy">5. Chargebacks & Abuse</h2>
              <p className="text-sm italic leading-relaxed">
                We take payment fraud and chargeback abuse seriously. Where a chargeback is raised for a
                report that has already been properly delivered, we will provide evidence of delivery and usage to our payment processor.
              </p>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • LONDON • REFUND POLICY
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;