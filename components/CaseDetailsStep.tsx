import React, { useState } from 'react';

interface CaseDetailsStepProps {
  onComplete: (details: string) => void;
  onBack: () => void;
}

const CaseDetailsStep: React.FC<CaseDetailsStepProps> = ({ onComplete, onBack }) => {
  const [details, setDetails] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-navy uppercase tracking-tight mb-4">Case Details for Expert Review</h2>
        <p className="text-slate-600 font-bold leading-relaxed">
          Provide additional context about your situation for our human reviewer to examine.
        </p>
      </div>

      <div className="space-y-8 mb-10">
        <div className="space-y-3">
          <label className="text-[11px] font-black text-navy uppercase tracking-widest">Complex parts of your case / Previous refusals</label>
          <textarea 
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Please explain any previous visa refusals, overstays, or specific concerns you have..."
            className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-100 rounded-[32px] focus:border-navy outline-none font-bold text-base leading-relaxed transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <button onClick={onBack} className="px-6 py-3 text-slate-400 font-black hover:text-navy uppercase tracking-widest text-xs focus:outline-none">Back</button>
        <button 
          onClick={() => onComplete(details)}
          disabled={!details.trim()}
          className="bg-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Submit to Reviewer
        </button>
      </div>
    </div>
  );
};

export default CaseDetailsStep;