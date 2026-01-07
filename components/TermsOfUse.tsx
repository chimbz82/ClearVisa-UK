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
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">Effective Date: January 2026</p>
            </header>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">1. Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed">
                These Terms of Use (“Terms”) govern your access to and use of the ClearVisa UK website,
                tools, and services (collectively, the “Service”). By using the Service, you agree to be
                bound by these Terms. If you do not agree, you must not use the Service.
              </p>
            </section>

            <section className="space-y-4 bg-rose-50 p-6 rounded-2xl border border-rose-100">
              <h2 className="text-xl font-bold text-rose-900">2. Regulatory Status & Professional Identity</h2>
              <div className="space-y-3 text-rose-800 text-sm font-medium">
                <p>
                  <strong>ClearVisa UK is NOT a law firm, immigration practice, or regulated adviser.</strong> 
                  We do not provide legal representation or reserved immigration activities as defined by UK law.
                </p>
                <p>
                  We are <strong>not regulated</strong> by the Solicitors Regulation Authority (SRA) or the
                  Office of the Immigration Services Commissioner (OISC). Our Service provides automated,
                  logic-driven eligibility assessments and practical guidance based on publicly available
                  information and your answers.
                </p>
                <p>
                  Nothing in our reports, website, or communications should be taken as specific legal advice
                  about your case. For tailored legal advice, you should consult a qualified and regulated
                  immigration adviser or solicitor.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">3. Service Description</h2>
              <p className="text-sm leading-relaxed">
                The Service provides automated UK immigration eligibility pre-checks and related
                documentation. Depending on the audit tier you purchase (Basic, Professional, or
                Professional Plus), you may receive:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>A logic-driven eligibility verdict and risk profile;</li>
                <li>A traffic-light risk matrix and narrative explanation;</li>
                <li>Personalised document checklists and gap analysis; and</li>
                <li>Suggested wording and evidence-strengthening steps (for higher tiers).</li>
              </ul>
              <p className="text-sm italic">
                The UK Home Office and UK Visas and Immigration (UKVI) are the final decision-makers for
                all immigration applications. ClearVisa UK cannot guarantee any particular outcome, timescale,
                or decision on your application.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. Eligibility & Age Requirement</h2>
              <p className="text-sm">
                You must be at least 18 years old and have legal capacity to enter into these Terms in
                order to use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">5. User Responsibilities & Data Accuracy</h2>
              <p className="text-sm">
                The accuracy of any report we generate depends entirely on the information you provide.
                You agree that all information you supply will be truthful, complete, and up to date.
              </p>
              <p className="text-sm font-black text-navy uppercase tracking-tight">You are solely responsible for:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Checking that your answers in the assessment are accurate before generating a report;</li>
                <li>Reviewing the report and documents before relying on them; and</li>
                <li>Deciding whether to seek independent legal advice.</li>
              </ul>
              <p className="text-sm">
                ClearVisa UK is not responsible for any loss or negative outcome caused by inaccurate,
                incomplete, or misleading information you provide.
              </p>
            </section>

            <section className="space-y-4 border-l-4 border-amber-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-navy">6. No Guarantee of Outcome</h2>
              <p className="text-sm leading-relaxed">
                Any eligibility verdict (“Likely Eligible”, “Borderline”, “High Risk”, or similar) is an
                indicative pre-check only. It is <strong>not</strong> a guarantee that your application
                will be granted or refused. Your ultimate outcome depends on your full circumstances,
                evidence quality, and the Home Office decision-maker.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">7. Payments, Tiers & Upgrades</h2>
              <p className="text-sm leading-relaxed">
                Prices for each audit tier are displayed on the Pricing page and may be updated from time
                to time. Payment is taken securely through our payment processor at the point you confirm
                your purchase.
              </p>
              <p className="text-sm leading-relaxed">
                Where we offer upgrade options (for example, from Basic to Professional or Professional
                Plus), the upgrade fee will reflect the difference between what you have already paid and
                the total price of the higher tier, as clearly shown at checkout.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">8. Intellectual Property</h2>
              <p className="text-sm leading-relaxed">
                All content, branding, assessment logic, and reports produced by the Service are owned by
                or licensed to ClearVisa UK and are protected by intellectual property laws. You may use
                your report for your personal immigration planning only and may not copy, resell, or
                redistribute the assessment logic or report templates.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">9. Limitation of Liability</h2>
              <p className="text-sm leading-relaxed">
                To the maximum extent permitted by law, ClearVisa UK and its officers, employees, and
                contractors will not be liable for:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Any loss of profits, income, or opportunity;</li>
                <li>Any indirect, incidental, or consequential loss; or</li>
                <li>Any loss arising from your decision to rely solely on our reports without seeking
                    independent advice.</li>
              </ul>
              <p className="text-sm font-bold">
                Our total aggregate liability for any claim related to the Service will not exceed the
                amount you paid for the relevant assessment.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">10. Prohibited Use & Abuse</h2>
              <p className="text-sm">You must not misuse the Service, including by:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Attempting to reverse-engineer or circumvent the assessment logic;</li>
                <li>Providing deliberately false or fraudulent information;</li>
                <li>Attempting unauthorised access to our systems; or</li>
                <li>Using our content or branding in a misleading way.</li>
              </ul>
              <p className="text-sm">
                We reserve the right to suspend or terminate your access where we reasonably suspect
                abuse, fraud, or breach of these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">11. Governing Law & Jurisdiction</h2>
              <p className="text-sm leading-relaxed">
                These Terms and any dispute or claim arising out of or in connection with them shall be
                governed by the laws of England and Wales. You agree that the courts of England and Wales
                will have exclusive jurisdiction, except where consumer law requires otherwise.
              </p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <h2 className="text-xl font-bold text-navy mb-4">Contact</h2>
              <p className="text-sm">If you have questions about these Terms, you can contact us at:</p>
              <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold text-lg">clearvisauk@protonmail.com</a>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • LONDON • UK COMPLIANCE AUDIT
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;