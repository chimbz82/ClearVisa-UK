import React from 'react';

interface RiskNoticeProps {
  onBack: () => void;
}

const RiskNotice: React.FC<RiskNoticeProps> = ({ onBack }) => {
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
              <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tight mb-2">Legal Disclaimer & Risk Notice</h1>
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">Last updated: January 2026</p>
            </header>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">1. Regulatory Status & Professional Identity</h2>
              <p className="text-sm leading-relaxed">
                ClearVisa UK is an independent technology provider. We are <strong>not</strong> the Home
                Office, UKVI, or any government department and we are not authorised by the SRA or OISC
                to conduct reserved legal activities.
              </p>
              <p className="text-sm leading-relaxed">
                Our reports are intended to provide structured information and planning support. They are
                not a substitute for the professional judgement of a qualified and regulated immigration
                adviser.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">2. Automated Assessment Nature</h2>
              <p className="text-sm leading-relaxed">
                The Service uses rules-based logic built on publicly available UK immigration guidance
                and policy. While we take care to keep our logic up to date, immigration rules can change
                quickly and sometimes without much notice.
              </p>
              <p className="text-sm leading-relaxed">
                Your report is generated automatically based on your answers. It may not capture every
                nuance of your case, especially where discretionary or complex factors are involved.
              </p>
            </section>

            <section className="space-y-4 border-l-4 border-accent bg-slate-50 p-6 rounded-r-2xl">
              <h2 className="text-xl font-bold text-navy">3. “No Guarantee” Policy</h2>
              <p className="text-sm leading-relaxed">
                Any eligibility outcome or risk label (“Likely Eligible”, “Borderline”, “High Risk”, or
                similar) from ClearVisa UK offers <strong>no guarantee</strong> of a successful
                application. Equally, a “High Risk” finding does not mean your application will definitely
                be refused.
              </p>
              <p className="text-sm font-bold text-navy mt-2">
                The final decision on any visa application rests solely with the UK Home Office / UKVI.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">4. Critical Risk Factors</h2>
              <p className="text-sm leading-relaxed">
                Cases involving previous refusals, overstays, criminal offences, complex relationship
                histories, or significant financial / employment gaps often require bespoke legal advice.
                For such cases, we strongly recommend that you speak to a qualified immigration solicitor
                or regulated adviser before relying on our reports.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">5. Limitation of Liability</h2>
              <p className="text-sm">ClearVisa UK accepts no liability for:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Decisions made by the Home Office or UKVI;</li>
                <li>Delays in processing caused by external authorities;</li>
                <li>Losses arising from your failure to provide accurate and complete information; or</li>
                <li>Any consequential, indirect, or special loss arising from use of our Service.</li>
              </ul>
              <p className="text-sm font-bold italic">
                Your use of the Service confirms that you understand and accept these limitations.
              </p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <h2 className="text-xl font-bold text-navy mb-4">6. Contact</h2>
              <p className="text-sm">If you have questions about this Disclaimer, contact us at:</p>
              <a href="mailto:clearvisauk@protonmail.com" className="text-accent font-bold text-lg">clearvisauk@protonmail.com</a>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • LONDON • LEGAL COMPLIANCE
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskNotice;