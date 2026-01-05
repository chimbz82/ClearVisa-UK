import React, { useState } from 'react';

interface DocumentChecklistStepProps {
  onComplete: (selected: string[]) => void;
  onBack: () => void;
  route: string;
}

const DocumentChecklistStep: React.FC<DocumentChecklistStepProps> = ({ onComplete, onBack, route }) => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const checklistItems = [
    { id: 'id', category: 'Identity', label: 'Valid Passport / Travel Document', desc: 'Must have at least 6 months validity.' },
    { id: 'rel', category: 'Relationship', label: 'Marriage / Civil Partnership Certificate', desc: 'Official original document (translated if not in English).' },
    { id: 'living', category: 'Relationship', label: 'Proof of Living Together', desc: 'Joint bills, bank statements, or tenancy agreements covering 2 years.' },
    { id: 'fin', category: 'Financial', label: '6 Months of Bank Statements', desc: 'Must show salary payments matching payslips.' },
    { id: 'pay', category: 'Financial', label: '6 Months of Payslips', desc: 'Verified by an employer letter.' },
    { id: 'house', category: 'Accommodation', label: 'Housing Evidence', desc: 'Tenancy agreement or Land Registry documents.' }
  ];

  const toggleDoc = (id: string) => {
    setSelectedDocs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-navy uppercase tracking-tight mb-4">Personalised Document Checklist</h2>
        <p className="text-slate-600 font-bold leading-relaxed">
          The Full Pre-Check includes a structured audit of your evidence. Please indicate which documents you already have prepared.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {checklistItems.map(item => (
          <button 
            key={item.id}
            onClick={() => toggleDoc(item.id)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-6 group ${selectedDocs.includes(item.id) ? 'border-accent bg-accent/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors flex-shrink-0 ${selectedDocs.includes(item.id) ? 'border-accent bg-accent text-white' : 'border-slate-200 bg-white'}`}>
              {selectedDocs.includes(item.id) && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <div className="flex-grow">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{item.category}</span>
              <span className="text-base font-black text-navy block leading-none">{item.label}</span>
              <p className="text-[11px] text-slate-500 font-bold mt-1 uppercase tracking-tight">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <button onClick={onBack} className="px-6 py-3 text-slate-400 font-black hover:text-navy uppercase tracking-widest text-xs focus:outline-none">Back</button>
        <button 
          onClick={() => onComplete(selectedDocs)}
          className="bg-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-xl active:scale-95"
        >
          Confirm Checklist
        </button>
      </div>
    </div>
  );
};

export default DocumentChecklistStep;