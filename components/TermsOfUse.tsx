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
          <div className="prose prose-slate max-w-none space-y-12 text-slate-600 text-left">
            
            {/* DOCUMENT 1: TERMS OF USE */}
            <section className="space-y-4">
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight">Terms of Use</h1>
              <p className="font-semibold text-navy">Effective Date: January 2026</p>
              <p>These Terms of Use ("Terms") govern your access to and use of the services provided by CLEARVISA UK ("we", "us", or "our"), including our web application and the automated immigration eligibility pre-check and audit reports (the "Service").</p>
              
              <h3 className="text-xl font-bold text-navy">1. Acceptance of Terms</h3>
              <p>By using the Service, you agree to be bound by these Terms. If you do not agree, you must not use the Service. You must be at least 18 years old to use this Service.</p>

              <h3 className="text-xl font-bold text-navy">2. Nature of Service (Mandatory Disclosure)</h3>
              <div className="bg-rose-50 p-6 border-l-4 border-rose-500 rounded-r-xl space-y-3">
                <p className="text-rose-900 font-bold uppercase text-xs tracking-widest">Crucial Legal Information:</p>
                <ul className="list-disc pl-5 text-sm text-rose-800 space-y-2 font-semibold">
                  <li>CLEARVISA UK is NOT a law firm and is NOT regulated by the Solicitors Regulation Authority (SRA) or the Office of the Immigration Services Commission (OISC).</li>
                  <li>We do NOT provide legal advice. Our reports are automated assessments based strictly on the data you provide.</li>
                  <li>No solicitor–client relationship is created through your use of the Service.</li>
                  <li>We do NOT submit visa applications to the Home Office or UK Visas and Immigration (UKVI) on your behalf.</li>
                  <li>UKVI/Home Office makes the final decision on all visa applications. Our results are guidance only and NOT a guarantee of success.</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-navy">3. User Responsibilities</h3>
              <p>You are responsible for ensuring all data provided to us is truthful, accurate, and complete. The accuracy of our automated reports depends entirely on your inputs. Any false declarations or fraud may result in termination of your access and potentially adverse consequences for your immigration status with the Home Office.</p>

              <h3 className="text-xl font-bold text-navy">4. Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, CLEARVISA UK shall not be liable for any immigration refusal, loss of fees paid to UKVI, or any indirect or consequential losses. Our total liability for any claim arising out of the Service is limited to the amount paid by you for that specific Service.</p>

              <h3 className="text-xl font-bold text-navy">5. Governing Law</h3>
              <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </section>

            {/* DOCUMENT 5: LEGAL DISCLAIMER & RISK NOTICE */}
            <section className="space-y-4 pt-12 border-t border-slate-100">
              <h2 className="text-2xl font-extrabold text-navy uppercase tracking-tight">Legal Disclaimer & Risk Notice</h2>
              <p>The CLEARVISA UK Service is an automated logic-based information tool. It is designed to assist users in identifying potential eligibility based on public criteria but is not a substitute for professional legal advice.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Risk of Refusal:</strong> Immigration rules change frequently. While we strive for accuracy, we cannot guarantee that the criteria used in our software match the specific caseworker guidance used at the moment of your application.</li>
                <li><strong>Data Integrity:</strong> If you omit information (e.g., a minor criminal conviction or a previous refusal), the report will be invalid and potentially dangerously misleading.</li>
                <li><strong>As-Is Service:</strong> The Service is provided "as-is" without any warranties of any kind, express or implied.</li>
              </ul>
            </section>

            {/* DOCUMENT 6: ACCEPTABLE USE POLICY */}
            <section className="space-y-4 pt-12 border-t border-slate-100">
              <h2 className="text-2xl font-extrabold text-navy uppercase tracking-tight">Acceptable Use Policy</h2>
              <p>You agree NOT to use CLEARVISA UK to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Submit fraudulent or misleading information.</li>
                <li>Attempt to reverse-engineer the underlying logic or database of the software.</li>
                <li>Use the Service for commercial resale without our express written consent.</li>
                <li>Use automated scripts to scrap data or overload our systems.</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity.</li>
              </ul>
              <p>Violation of this policy may result in immediate termination of service without refund.</p>
            </section>

            {/* DOCUMENT 7: COMPLAINTS POLICY */}
            <section className="space-y-4 pt-12 border-t border-slate-100">
              <h2 className="text-2xl font-extrabold text-navy uppercase tracking-tight">Complaints Policy</h2>
              <p>We value your feedback and aim to resolve any issues quickly. If you have a complaint about our Service, please follow this process:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Contact Support:</strong> Email us at <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold">clearvisauk@protonmail.com</a> with the subject line "Formal Complaint".</li>
                <li><strong>Investigation:</strong> We will acknowledge your complaint within 2 business days and provide a full response within 10 business days.</li>
                <li><strong>Resolution:</strong> If the complaint relates to a technical error, we will aim to rectify the report or offer a refund if applicable under our Refund Policy.</li>
              </ol>
            </section>
            
            <p className="text-[10px] text-slate-400 pt-10 border-t border-slate-100 uppercase font-black tracking-[0.3em]">
              © 2026 CLEARVISA UK. ALL RIGHTS RESERVED. REGISTERED ADDRESS: [INSERT ADDRESS]. COMPANY NO: [INSERT NUMBER].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;