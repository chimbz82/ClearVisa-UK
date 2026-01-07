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
          Back to Home
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none space-y-12 text-slate-600 text-left">
            
            {/* DOCUMENT 2: PRIVACY POLICY */}
            <section className="space-y-4">
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight">Privacy Policy</h1>
              <p className="font-semibold text-navy">UK GDPR & Data Protection Act 2018 Compliant</p>
              
              <h3 className="text-xl font-bold text-navy">1. Data Controller</h3>
              <p>CLEARVISA UK is the Data Controller. For all data-related inquiries, contact us at <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold">clearvisauk@protonmail.com</a>.</p>

              <h3 className="text-xl font-bold text-navy">2. Lawful Basis for Processing</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Performance of Contract:</strong> To provide the eligibility reports and audits you purchase.</li>
                <li><strong>Legitimate Interests:</strong> To improve our automated systems and maintain security.</li>
              </ul>

              <h3 className="text-xl font-bold text-navy">3. Third-Party Processors</h3>
              <p>We use the following secure third-party processors:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Stripe:</strong> Payment processing. We are PCI-DSS compliant and do not store full credit card numbers.</li>
                <li><strong>Hosting Providers:</strong> SSL/TLS encrypted UK/EU-based servers.</li>
                <li><strong>Analytics Tools:</strong> To monitor and improve site performance.</li>
              </ul>

              <h3 className="text-xl font-bold text-navy">4. Your Rights</h3>
              <p>Under UK GDPR, you have the right to access, correct, delete, restrict, or object to the processing of your personal data. You also have the right to data portability and the right to lodge a complaint with the Information Commissioner’s Office (ICO).</p>
            </section>

            {/* DOCUMENT 4: COOKIES POLICY */}
            <section className="space-y-4 pt-12 border-t border-slate-100">
              <h2 className="text-2xl font-extrabold text-navy uppercase tracking-tight">Cookies Policy</h2>
              <p>We use cookies to ensure our site works correctly and to understand how you use it.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the questionnaire flow and payment security.</li>
                <li><strong>Analytics Cookies:</strong> Help us measure site performance anonymously.</li>
                <li><strong>Marketing Cookies:</strong> Used for promotional purposes with your consent.</li>
              </ul>
              <p>You can withdraw your consent for non-essential cookies at any time through our consent banner or browser settings.</p>
            </section>

            {/* DOCUMENT 8: DATA RETENTION & DELETION POLICY */}
            <section className="space-y-4 pt-12 border-t border-slate-100">
              <h2 className="text-2xl font-extrabold text-navy uppercase tracking-tight">Data Retention & Deletion Policy</h2>
              <p>We adhere to strict data retention schedules:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account & Questionnaire Data:</strong> Retained for 12 months following your last interaction to support report access and upgrades, unless you request deletion earlier.</li>
                <li><strong>Payment Records:</strong> Retained for 7 years to comply with UK financial and tax regulations.</li>
                <li><strong>Deletion Procedure:</strong> Upon a valid deletion request, we will permanently scrub your immigration-related answers and contact details from our active databases within 30 days.</li>
              </ul>
            </section>

            <p className="text-[10px] text-slate-400 pt-10 border-t border-slate-100 uppercase font-black tracking-[0.3em]">
              © 2026 CLEARVISA UK. CONTACT: CLEARVISAUK@PROTONMAIL.COM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;