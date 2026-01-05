import React from 'react';

interface ReportTemplateProps {
  applicantName?: string;
  visaRoute: string;
  reportId?: string;
  date?: string;
  onDownload?: () => void;
}

type VerdictType = 'likely' | 'borderline' | 'unlikely';

const ReportTemplate: React.FC<ReportTemplateProps> = ({ 
  applicantName = "Valued Client", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  onDownload
}) => {
  const [verdict, setVerdict] = React.useState<VerdictType>('borderline');
  
  const verdictContent = {
    likely: { 
      title: "LIKELY ELIGIBLE", 
      text: "Based on your answers and current public guidance, you appear to meet the core requirements for this visa route. Your priority should be gathering high-quality evidence that strictly adheres to the Home Office caseworker rules.", 
      analysis: "You have indicated parameters that fall within current Appendix FM / Skilled Worker thresholds. Most refusals in this category are due to evidentiary errors rather than eligibility. Focus on the 'Evidence Checklist' below to minimize risk.",
      colorClass: "emerald",
      colorHex: "#059669" 
    },
    borderline: { 
      title: "BORDERLINE – RISK FACTORS PRESENT", 
      text: "Some of your answers suggest certain requirements may not be fully met. Review your report carefully and consider addressing highlighted areas before submitting an application.", 
      analysis: "One or more factors (income duration, document availability, or status history) do not perfectly align with 'standard' approval routes. You may need to provide additional 'exceptional circumstances' or adjust your situation (e.g., waiting for longer pay history) before applying.",
      colorClass: "amber",
      colorHex: "#d97706" 
    },
    unlikely: { 
      title: "UNLIKELY ELIGIBLE", 
      text: "Your answers indicate that one or more core requirements are not currently met. Check the risk sections in your report and consider seeking advice from a qualified immigration solicitor.", 
      analysis: "Based on the information provided, you currently do not meet the mandatory thresholds (likely financial or sponsorship). Submitting an application in your current state carries a high risk of refusal and loss of application fees. Correction of the underlying issue is required first.",
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

  const checklistItems = [
    { category: "Identity", item: "Valid Passport & BRP (if already in UK)" },
    { category: "Financial", item: "6-12 months of Bank Statements (stamped/original)" },
    { category: "Employment", item: "Letter from Employer confirming salary and duration" },
    { category: "English", item: "SELT Certificate or qualifying University Degree" },
    { category: "Accom.", item: "Tenancy Agreement or Landlord Letter of Consent" },
    { category: "Health", item: "TB Test Result (if from a listed country)" }
  ];

  const mistakes = [
    "Submitting bank statements that don't cover the full required 6-month period.",
    "Relying on salary income without a corresponding P60 or contract.",
    "Using English language tests that are not on the Home Office approved SELT list.",
    "Failing to declare previous visa refusals or overstays from any country.",
    "Submitting digital documents that are not 'originals' or properly certified."
  ];

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[12mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans relative overflow-hidden">
      <div className="watermark hidden print:block uppercase tracking-[1em]">CLEARVISA UK – CONFIDENTIAL</div>

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
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Simulation</span>
          {onDownload && (
            <button 
              onClick={onDownload}
              className="text-[10px] font-black text-navy uppercase tracking-widest border border-navy px-3 py-1 rounded-lg hover:bg-navy hover:text-white transition-all"
            >
              Test Print
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0B2545] text-white rounded-lg flex items-center justify-center font-serif text-2xl font-bold">C</div>
            <span className="text-[10px] font-black tracking-widest text-[#0B2545] uppercase leading-tight">ClearVisa UK – Immigration<br/>Eligibility Pre-Check Report</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B2545] mb-1 uppercase tracking-tight leading-none">Eligibility Pre-Check Report</h1>
          <p className="text-[9px] text-slate-500 max-w-md font-bold uppercase tracking-widest">Confidential Assessment • Generated {date}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-[10px] font-bold min-w-[240px] uppercase tracking-wider">
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1">
            <span className="text-slate-400">Applicant:</span> <span className="text-[#0B2545] font-black">{applicantName}</span>
            <span className="text-slate-400">Route:</span> <span className="text-[#0B2545] font-black">{visaRoute}</span>
            <span className="text-slate-400">ID:</span> <span className="text-[#0B2545] font-black">{reportId}</span>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-slate-100 w-full mb-8 relative z-10"></div>

      {/* Verdict Section */}
      <div className={`border-2 rounded-2xl p-8 text-center mb-8 relative z-10 border-${content.colorClass}-200 bg-${content.colorClass}-50`}>
        <h2 className={`text-xl font-black uppercase tracking-widest mb-4`} style={{ color: content.colorHex }}>{content.title}</h2>
        <p className={`text-sm font-bold italic leading-relaxed`} style={{ color: content.colorHex }}>{content.text}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* Analysis Section */}
        <div>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Analysis of results</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {content.analysis}
          </p>
        </div>

        {/* Suggested Next Steps */}
        <div>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Suggested Next Steps</h3>
          <ul className="space-y-3">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-700">
                <div className="w-2 h-2 rounded-full bg-[#2FBF71] flex-shrink-0"></div> {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Evidence Checklist */}
      <div className="mb-8 relative z-10">
        <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Evidence Checklist to Prepare</h3>
        <div className="grid grid-cols-2 gap-3">
          {checklistItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[9px] font-black text-slate-400 w-12 uppercase">{item.category}</span>
              <span className="text-[11px] font-bold text-slate-700">{item.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="mb-8 relative z-10">
        <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Common Application Risks to Avoid</h3>
        <ul className="space-y-2">
          {mistakes.map((mistake, i) => (
            <li key={i} className="flex items-start gap-3 text-[11px] font-bold text-slate-600 leading-relaxed">
              <span className="text-rose-500 mt-0.5">•</span> {mistake}
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Disclosure */}
      <div className="bg-slate-50 p-6 rounded-xl text-[9px] text-slate-500 border relative z-10 mt-auto font-bold uppercase tracking-wider leading-relaxed">
        <h4 className="font-black mb-2 text-navy">Legal Disclosure & Affiliation</h4>
        <p className="mb-2">ClearVisa UK – Immigration Eligibility Pre-Check Report is not a law firm and does not provide legal advice. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser. Your pre-check assessment is generated from the information you provide and publicly available UK Home Office guidance. Immigration rules can change without notice and no specific outcome is guaranteed.</p>
        <p className="font-black text-slate-400">Not affiliated with the UK Government or Home Office.</p>
      </div>

      <div className="mt-8 flex justify-between items-center text-[9px] text-slate-400 font-black tracking-[0.3em] uppercase pt-4 border-t relative z-10">
        <span>© 2024 ClearVisa UK</span>
        <span>Confidential Report</span>
        <span className="print:hidden">Report ID: {reportId}</span>
      </div>
    </div>
  );
};

export default ReportTemplate;