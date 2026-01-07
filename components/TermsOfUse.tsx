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
              <h2 className="text