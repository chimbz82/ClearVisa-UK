import React, { useState, useEffect } from 'react';

const AnalysisLoader: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Auditing identity and history...",
    "Cross-referencing Appendix FM rules...",
    "Validating financial thresholds...",
    "Checking accommodation compliance...",
    "Assessing suitability & character...",
    "Finalizing eligibility verdict..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="relative mb-12">
        <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-accent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-xs mx-auto">
        <h2 className="text-xl font-black text-navy uppercase tracking-tight mb-3">Analyzing compliance profile</h2>
        <div className="h-1 w-full bg-slate-100 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-300" 
            style={{ width: `${((step + 1) / messages.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest h-4">
          {messages[step]}
        </p>
      </div>
    </div>
  );
};

export default AnalysisLoader;
