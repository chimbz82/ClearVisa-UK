import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight mb-2">Privacy Policy</h1>
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">Last updated: January 2026</p>
            </header>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">1. Introduction & Data Controller</h2>
              <p className="text-sm leading-relaxed">
                ClearVisa UK (“we”, “us”, “our”) is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, and protect your personal data when you use our
                Service.
              </p>
              <p className="text-sm">
                <strong>Data Controller:</strong> ClearVisa UK<br />
                <strong>Contact:</strong> <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold">clearvisauk@protonmail.com</a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">2. Lawful Basis for Processing</h2>
              <p className="text-sm leading-relaxed">We process your personal data on the following lawful bases:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Contract:</strong> To provide the eligibility assessment and report you request.</li>
                <li><strong>Legitimate Interests:</strong> To operate, secure, and improve our Service and understand usage patterns.</li>
                <li><strong>Consent:</strong> Where required, for optional communications you choose to receive.</li>
                <li><strong>Legal Obligation:</strong> To comply with tax, accounting, and anti-fraud requirements.</li>
              </ul>
              <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="text-[10px] font-black text-navy uppercase tracking-widest mb-2">Special category & sensitive data</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Your answers may include information relating to criminal history, immigration history,
                  family life, and financial position. You choose whether to provide this data. We only use
                  it to generate your eligibility assessment and associated report.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">3. Information We Collect</h2>
              <p className="text-sm">We may collect the following categories of data:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Identity data:</strong> Name, nationality, date of birth, marital status.</li>
                <li><strong>Contact data:</strong> Email address and limited contact details.</li>
                <li><strong>Case data:</strong> Your answers to the eligibility questions, including immigration, employment, financial, accommodation, and relationship information.</li>
                <li><strong>Technical data:</strong> IP address, browser type, device identifiers, and basic usage analytics.</li>
                <li><strong>Payment data:</strong> Limited transaction details processed via our payment provider (we do not store full card numbers).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. How We Use Your Data</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>To generate your automated eligibility verdict and risk profile;</li>
                <li>To produce and deliver your audit report and checklists;</li>
                <li>To provide customer support when you contact us;</li>
                <li>To maintain and improve the performance and security of our Service; and</li>
                <li>To comply with our legal and regulatory obligations.</li>
              </ul>
              <p className="text-sm italic font-bold text-navy">
                We do NOT sell your personal data and we do not share it with the UK Home Office or UKVI unless required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">5. Data Retention</h2>
              <p className="text-sm">We retain your data only for as long as necessary for the purposes described above:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Assessment data and generated reports:</strong> Typically retained for up to 12 months.</li>
                <li><strong>Payment records and invoices:</strong> Retained for up to 7 years.</li>
                <li><strong>Support communications:</strong> Retained for up to 2 years.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">6. Third-Party Processors</h2>
              <p className="text-sm">We use trusted third-party providers to help deliver the Service, such as:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Payment processors (Stripe) for secure card payments;</li>
                <li>Hosting and infrastructure providers (AWS/Vercel) for secure data storage;</li>
                <li>Basic analytics tools to understand how the Service is used.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">7. Your Rights</h2>
              <p className="text-sm">Under UK data protection law, you have rights including:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>The right to access your personal data;</li>
                <li>The right to request correction of inaccurate data;</li>
                <li>The right to request deletion of data;</li>
                <li>The right to restrict or object to certain types of processing.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">8. Security</h2>
              <p className="text-sm leading-relaxed">
                We take reasonable technical and organisational measures to protect your data, including
                encrypted connections, restricted access, and secure hosting.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">9. Complaints</h2>
              <p className="text-sm leading-relaxed">
                If you have concerns about how we handle your data, please contact us first. You also have
                the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).
              </p>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • LONDON • PRIVACY PROTECTED
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;