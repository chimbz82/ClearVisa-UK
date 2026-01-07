import React from 'react';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
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
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight mb-2">Terms of Use</h1>
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">Effective Date: October 2023</p>
            </header>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">1. Acceptance of Terms</h2>
              <p>By accessing or using ClearVisa UK (the "Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, you must not use the Service.</p>
            </section>

            <section className="space-y-4 bg-rose-50 p-6 rounded-2xl border border-rose-100">
              <h2 className="text-xl font-bold text-rose-900">2. Mandatory Legal Disclosure</h2>
              <div className="space-y-3 text-rose-800 text-sm font-medium">
                <p><strong>ClearVisa UK is NOT a law firm.</strong> We are an automated technology provider. We are NOT regulated by the Solicitors Regulation Authority (SRA) or the Office of the Immigration Services Commission (OISC).</p>
                <p>The Service provides automated eligibility assessments based on rules-based logic and publicly available Home Office guidance. <strong>This does not constitute legal advice.</strong></p>
                <p>No solicitor-client or professional-client relationship is created through your use of the Service. For complex cases, previous refusals, or specific legal questions, you should consult a qualified and regulated immigration solicitor.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">3. Service Description</h2>
              <p>ClearVisa UK provides an automated immigration eligibility pre-check tool. Our reports (Basic Pre-Check, Professional Audit, and Professional Plus) are generated using algorithms to map user-supplied data against general immigration criteria.</p>
              <p><strong>UKVI Decisions:</strong> You acknowledge that UK Visas and Immigration (UKVI) and the Home Office make the final decision on all visa applications. ClearVisa UK has no influence over these decisions and cannot guarantee any specific outcome for your visa application.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. Eligibility & Age Requirement</h2>
              <p>You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you are 18 or older and have the legal capacity to enter into these Terms.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">5. User Responsibilities & Data Accuracy</h2>
              <p>The accuracy of any report generated is strictly dependent on the information you provide. You are solely responsible for ensuring that all data supplied is truthful, complete, and accurate.</p>
              <p><strong>Misuse and Fraud:</strong> Providing false information, misleading details, or attempting to use the Service to circumvent immigration laws is strictly prohibited. We reserve the right to terminate access and block users suspected of fraudulent activity.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">6. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, ClearVisa UK shall not be liable for any direct, indirect, or consequential loss or damage arising from your use of the Service, including but not limited to visa refusals, loss of application fees, or travel expenses.</p>
              <p>Our liability for any single generation of a report is limited to the fee paid by you for that specific report.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">7. Payments, Chargebacks & Abuse</h2>
              <p>Payments are processed securely via Stripe. Initiating an unjustified chargeback for a completed report is considered a breach of these Terms. We reserve the right to take action to recover fees and may share information with payment processors regarding abusive chargeback behavior.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">8. Privacy & Data Handling</h2>
              <p>Your use of the Service is also governed by our <button onClick={() => {}} className="text-accent underline">Privacy Policy</button>, which describes how we collect, use, and protect your personal information.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">9. Governing Law</h2>
              <p>These Terms and any dispute or claim arising out of them shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>. You agree to submit to the exclusive jurisdiction of the courts of England and Wales.</p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <h2 className="text-xl font-bold text-navy mb-4">Contact Information</h2>
              <p>If you have any questions regarding these Terms, please contact us at:</p>
              <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold text-lg">clearvisauk@protonmail.com</a>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK. ALL RIGHTS RESERVED.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;