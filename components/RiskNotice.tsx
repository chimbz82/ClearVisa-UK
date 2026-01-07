
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
              <p className="font-semibold text-slate-400 text-sm uppercase tracking-widest">ClearVisa UK • January 2026</p>
            </header>

            <section className="space-y-4 bg-rose-50 p-8 rounded-2xl border border-rose-100">
              <h2 className="text-xl font-bold text-rose-900">1. Regulatory Status & Professional Identity</h2>
              <div className="space-y-3 text-rose-800 text-sm font-medium">
                <p><strong>ClearVisa UK is NOT a law firm.</strong> We do not provide regulated immigration advice as defined by the Immigration and Asylum Act 1999.</p>
                <p>We are NOT regulated by the <strong>Solicitors Regulation Authority (SRA)</strong> or the <strong>Office of the Immigration Services Commission (OISC)</strong>. Our team does not act as your legal representative before the Home Office or any tribunal.</p>
                <p>The Service is an automated technology tool provided for information and preliminary guidance purposes only. It is not a substitute for the professional judgment of a qualified immigration solicitor.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">2. Automated Assessment Nature</h2>
              <p className="text-sm">
                Our eligibility reports are generated using rules-based logic derived from publicly available UK Government immigration rules, policy guidance, and caseworker instructions. 
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Immigration rules are subject to frequent and sudden changes by the UK Government.</li>
                <li>While we strive to keep our logic current, we cannot guarantee that the Service reflects every nuance of the latest legislative update.</li>
                <li>Caseworker discretion plays a significant role in actual visa outcomes; automated logic cannot predict the subjective interpretation of a Home Office official.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">3. The "No Guarantee" Policy</h2>
              <p className="text-sm">
                <strong>UK Visas and Immigration (UKVI)</strong> and the Home Office maintain sole authority over the approval or refusal of visa applications. 
              </p>
              <div className="p-4 border-l-4 border-accent bg-slate-50 text-slate-700 text-sm font-bold italic">
                A "Likely Eligible" or "Low Risk" result from ClearVisa UK does NOT guarantee a successful visa application. Conversely, a "High Risk" result does not necessarily mean your application is impossible, but rather that it carries significant complexity.
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold text-navy">4. Critical Risk Factors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-navy uppercase tracking-widest">User Data Accuracy</h4>
                  <p className="text-xs leading-relaxed">
                    The validity of your report is strictly tied to the accuracy of your answers. Entering incorrect dates, income amounts, or withholding history details (like previous refusals) will result in an inaccurate and potentially misleading compliance verdict.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-navy uppercase tracking-widest">Complex Histories</h4>
                  <p className="text-xs leading-relaxed">
                    If your case involves <strong>criminal records, previous visa overstays, illegal working, or multiple previous refusals</strong>, our automated pre-check should only be used as a starting point. We strongly advise you seek regulated legal advice before submitting an application.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-navy">5. Limitation of Liability</h2>
              <p className="text-sm">
                ClearVisa UK, its directors, and employees shall not be held liable for any financial loss, emotional distress, or legal consequences resulting from a visa refusal, application delay, or travel cancellation.
              </p>
              <p className="text-sm">
                Our total liability to you for any single report generation is strictly limited to the fee paid by you for that specific service. By using this tool, you accept full personal responsibility for your immigration strategy and any subsequent applications to the Home Office.
              </p>
            </section>

            <footer className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] pt-12">
              © 2026 CLEARVISA UK • NOT AFFILIATED WITH THE HOME OFFICE • LONDON
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskNotice;
