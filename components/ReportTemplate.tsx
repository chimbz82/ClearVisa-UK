import React from 'react';

interface ReportTemplateProps {
  applicantName?: string;
  visaRoute: string;
  reportId?: string;
  date?: string;
}

type VerdictType = 'likely' | 'borderline' | 'unlikely';

const ReportTemplate: React.FC<ReportTemplateProps> = ({ 
  applicantName = "Valued Client", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}) => {
  const [verdict, setVerdict] = React.useState<VerdictType>('borderline');
  
  const verdictContent = {
    likely: { 
      title: "LIKELY ELIGIBLE", 
      text: "Based on your answers and current public guidance, you appear to meet the core requirements for this visa route. Ensure your evidence strictly adheres to official caseworker rules.", 
      colorClass: "emerald",
      colorHex: "#059669" 
    },
    borderline: { 
      title: "BORDERLINE – RISK FACTORS PRESENT", 
      text: "Some of your answers suggest certain requirements may not be fully met. Review your report carefully and consider addressing highlighted areas before submitting an application.", 
      colorClass: "amber",
      colorHex: "#d97706" 
    },
    unlikely: { 
      title: "UNLIKELY ELIGIBLE", 
      text: "Your answers indicate that one or more core requirements are not currently met. Check the risk sections in your report and consider seeking advice from a qualified immigration solicitor.", 
      colorClass: "rose",
      colorHex: "#e11d48" 
    }
  };

  const content = verdictContent[verdict];

  const nextSteps = [
    "Gather and organise required documents as per current appendices.",
    "Correct any flagged evidence gaps identified in this pre-check.",
    "Recheck current Home Office guidance before finalizing application.",
    "Consider speaking with an OISC-regulated adviser for complex cases."
  ];

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans relative overflow-hidden">
      <div className="watermark print-only uppercase tracking-[1em]">CLEARVISA UK – CONFIDENTIAL</div>

      {/* Dev Toggle (Hidden in Print) */}
      <div className="no-print mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between relative z-10">
        <div className="flex gap-2">
          {(['likely', 'borderline', 'unlikely'] as VerdictType[]).map(v => (
            <button 
              key={v}
              onClick={() => setVerdict(v)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${verdict === v ? 'bg-[#0B2545] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
            >
              {v.split(' ')[0]}
            </button>
          ))}
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Simulation</span>
      </div>

      <div className="flex justify-between items-start mb-12 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#0B2545] text-white rounded-lg flex items-center justify-center font-serif text-2xl font-bold">C</div>
            <span className="text-[10px] font-black tracking-widest text-[#0B2545] uppercase leading-tight">ClearVisa UK – Immigration<br/>Eligibility Pre-Check Report</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B2545] mb-2 uppercase tracking-tight leading-none">ClearVisa UK – Immigration Eligibility Pre-Check Report</h1>
          <p className="text-[10px] text-slate-500 max-w-md font-bold uppercase tracking-widest mt-2">Confidential Eligibility Assessment</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-[10px] font-bold min-w-[240px] uppercase tracking-wider">
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
            <span className="text-slate-400">Applicant:</span> <span className="text-[#0B2545] font-black">{applicantName}</span>
            <span className="text-slate-400">Route:</span> <span className="text-[#0B2545] font-black">{visaRoute}</span>
            <span className="text-slate-400">Date:</span> <span className="text-[#0B2545] font-black">{date}</span>
            <span className="text-slate-400">ID:</span> <span className="text-[#0B2545] font-black">{reportId}</span>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-slate-100 w-full mb-12 relative z-10"></div>

      <div className={`border-2 rounded-2xl p-10 text-center mb-12 relative z-10 border-${content.colorClass}-200 bg-${content.colorClass}-50`}>
        <h2 className={`text-2xl font-black uppercase tracking-widest mb-6`} style={{ color: content.colorHex }}>{content.title}</h2>
        <p className={`text-sm font-bold italic leading-relaxed`} style={{ color: content.colorHex }}>{content.text}</p>
        <div className="mt-8 inline-block px-4 py-2 bg-white/50 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
          PRODUCED BY CLEARVISA UK ASSESSMENT ENGINE
        </div>
      </div>

      <div className="mb-12 relative z-10">
        <h3 className="text-sm font-black text-navy uppercase tracking-[0.2em] mb-6 border-b pb-2">Suggested Next Steps</h3>
        <ul className="space-y-4">
          {nextSteps.map((step, i) => (
            <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="w-3 h-3 rounded-full bg-[#2FBF71] flex-shrink-0"></div> {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 p-8 rounded-2xl text-[10px] text-slate-500 border relative z-10 mt-auto font-bold uppercase tracking-wider leading-relaxed">
        <h4 className="font-black mb-3 text-navy">Legal Disclosure</h4>
        <p>ClearVisa UK – Immigration Eligibility Pre-Check Report is not a law firm and does not provide legal advice. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser. Your pre-check assessment is generated from the information you provide and publicly available UK Home Office guidance. Immigration rules can change without notice and no specific outcome is guaranteed.</p>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase pt-6 border-t relative z-10">
        <span>© 2024 ClearVisa UK</span>
        <span>Not affiliated with the UK Government or Home Office.</span>
        <span>CLEARVISA UK – CONFIDENTIAL</span>
      </div>
    </div>
  );
};

export default ReportTemplate;