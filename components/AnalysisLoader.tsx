import React, { useState, useEffect } from 'react';

const AnalysisLoader: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Verifying Identity & Nationality...",
    "Auditing Immigration History Record...",
    "Mapping against Appendix FM Compliance...",
    "Validating Financial Threshold Requirements...",
    "Cross-referencing Suitability Criteria...",
    "Generating Eligibility Audit verdict..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="relative mb-16">
        <div className="w-32 h-32 rounded-3xl border-4 border-slate-100 border-t-accent animate-spin-slow rotate-45 shadow-2xl shadow-accent/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12 text-accent animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="absolute -inset-4 border-2 border-accent/10 rounded-[2.5rem] animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-black text-navy uppercase tracking-[0.1em] mb-4">UK Compliance Analysis</h2>
        <div className="h-2 w-full bg-slate-100 rounded-full mb-8 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out" 
            style={{ width: `${((step + 1) / messages.length) * 100}%` }}
          ></div>
        </div>
        <div className="min-h-[24px]">
          <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.25em] animate-in slide-in-from-bottom-2">
            {messages[step]}
          </p>
        </div>
      </div>
      
      <div className="mt-20 flex gap-4 opacity-40">
        <div className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Rule engine active</div>
        <div className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Logic: v2026.04</div>
      </div>
    </div>
  );
};

export default AnalysisLoader;