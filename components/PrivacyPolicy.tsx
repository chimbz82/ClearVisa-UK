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
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">ClearVisa UK • UK GDPR Compliant • Last Updated: January 2026</p>
            </header>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">1. Introduction & Data Controller</h2>
              <p>ClearVisa UK ("we", "us", or "our") is committed to protecting your privacy. This policy explains how we handle your personal data in compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
              <p><strong>Data Controller:</strong> ClearVisa UK<br />
              <strong>Contact Email:</strong> <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold">clearvisauk@protonmail.com</a></p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">2. Lawful Basis for Processing</h2>
              <p>We process your data under the following lawful bases:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Performance of a Contract:</strong> To provide the automated eligibility assessment and report you have requested.</li>
                <li><strong>Legitimate Interests:</strong> To maintain the security of our platform, prevent fraud, and improve our assessment logic.</li>
                <li><strong>Consent:</strong> For non-essential cookies and marketing communications (where applicable).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">3. Information We Collect</h2>
              <p>To provide an accurate pre-check, we collect the following information provided by you in our questionnaire:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Identity Data:</strong> Nationality, date of birth, and marital status.</li>
                <li><strong>Financial Data:</strong> Income amounts, employment status, and savings figures.</li>
                <li><strong>Immigration History:</strong> Previous visas, travel history, refusals, overstays, or deportations.</li>
                <li><strong>Suitability Data:</strong> Information regarding criminal convictions or health-related debts.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns (via cookies).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. How We Use Your Data</h2>
              <p>Your data is used exclusively to:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Generate your automated eligibility verdict and risk report.</li>
                <li>Process your payment securely via our third-party provider (Stripe).</li>
                <li>Provide customer support when you contact us via email.</li>
                <li>Improve our rules-based logic to reflect changes in UK immigration guidance.</li>
              </ul>
              <p className="text-sm font-bold text-navy italic">Note: We do not sell your personal data to third parties or share it with the Home Office / UKVI.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">5. Data Retention</h2>
              <p>We keep your data only for as long as necessary:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Assessment Data:</strong> Your questionnaire answers and generated reports are stored for <strong>12 months</strong> to allow you to access and upgrade your report.</li>
                <li><strong>Payment Records:</strong> Transaction details are retained for <strong>7 years</strong> to comply with UK financial and tax reporting obligations.</li>
                <li><strong>Email Correspondence:</strong> Retained for 2 years after our last interaction.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">6. Third-Party Processors</h2>
              <p>We use trusted third-party services to operate:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Stripe:</strong> Payment processing. We do not store your full card details on our own servers.</li>
                <li><strong>ProtonMail:</strong> Secure, encrypted email communication.</li>
                <li><strong>Hosting:</strong> Encrypted servers located within the UK/EU.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">7. Your Rights</h2>
              <p>Under UK GDPR, you have the following rights:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Right of Access:</strong> Request a copy of the data we hold about you.</li>
                <li><strong>Right to Rectification:</strong> Ask us to correct inaccurate information.</li>
                <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request that we delete your personal data.</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data in specific circumstances.</li>
              </ul>
              <p className="text-sm">To exercise these rights, please contact us at <span className="font-bold">clearvisauk@protonmail.com</span>.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">8. Complaints</h2>
              <p>If you have concerns about our data handling, you have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong>, the UK's supervisory authority for data protection (www.ico.org.uk).</p>
            </section>

            <section className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-navy">9. Cookies Summary</h2>
              <p className="text-sm">We use essential cookies to manage your questionnaire session and secure your payment. We use limited analytics cookies to understand site traffic. You can manage your preferences through your browser settings.</p>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • DATA PRIVACY PROTECTED
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;