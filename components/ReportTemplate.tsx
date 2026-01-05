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
  applicantName = "Alex Thompson", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  onDownload
}) => {
  const [verdict, setVerdict] = React.useState<VerdictType>('borderline');
  
  const verdictContent = {
    likely: { 
      title: "LIKELY ELIGIBLE", 
      risk: "LOW",
      riskColor: "#2FBF71",
      riskLabel: "Low Risk",
      text: "Based on your answers and current public guidance, you appear to meet the core requirements for this visa route. Your priority should be gathering high-quality evidence that strictly adheres to the Home Office caseworker rules.", 
      reasons: [
        "Financial parameters exceed the current mandatory thresholds.",
        "Immigration history shows no mandatory grounds for refusal.",
        "English language capability evidence is verified as compliant."
      ],
      colorClass: "emerald",
      colorHex: "#059669" 
    },
    borderline: { 
      title: "BORDERLINE – RISK FLAGS", 
      risk: "MEDIUM",
      riskColor: "#d97706",
      riskLabel: "Medium Risk",
      text: "Some of your answers suggest certain requirements may not be fully met or require significant evidence. Review your report carefully and consider addressing highlighted areas before submitting an application.", 
      reasons: [
        "Income is close to the threshold and requires careful calculation of the 6-month average.",
        "Recent gaps in travel history or status require detailed explanation.",
        "Document availability for relationship evidence appears inconsistent."
      ],
      colorClass: "amber",
      colorHex: "#d97706" 
    },
    unlikely: { 
      title: "UNLIKELY ELIGIBLE", 
      risk: "HIGH",
      riskColor: "#e11d48",
      riskLabel: "High Risk",
      text: "Your answers indicate that one or more core requirements are not currently met. Submitting an application in your current situation carries a high probability of refusal and fee loss.", 
      reasons: [
        "Mandatory financial thresholds are not met based on current salary.",
        "Existing immigration status in the UK restricts an in-country switch to this route.",
        "Inadequate proof of the English language requirement identified."
      ],
      colorClass: "rose",
      colorHex: "#e11d48" 
    }
  };

  const currentContent = verdictContent[verdict];

  const answers = [
    { label: "Visa Route", value: visaRoute },
    { label: "Current UK Status", value: "Standard Visitor" },
    { label: "Annual Salary", value: "£29,000" },
    { label: "Employment Length", value: "14 Months" },
    { label: "English Level", value: "B1 Intermediate" },
    { label: "Previous Refusals", value: "None Declared" }
  ];

  const checklist = [
    { category: "Required", items: ["Valid Passport", "Proof of English (SELT)", "6 Months Bank Statements", "Letter from Employer"] },
    { category: "Recommended", items: ["P60 for current tax year", "Original Contract of Employment", "Utility Bills (Proof of Address)"] },
    { category: "Optional", items: ["Covering Letter", "Professional Qualifications", "Evidence of Savings"] }
  ];

  const references = [
    "Appendix FM: Family Members",
    "Appendix Skilled Worker: Salary Thresholds",
    "Immigration Rules part 9: Grounds for Refusal",
    "Home Office Financial Requirement Guidance (v28.0)"
  ];

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[10mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans relative overflow-hidden">
      <div className="watermark hidden print:block uppercase tracking-[1.2em]">CLEARVISA UK – CONFIDENTIAL</div>

      {/* Dev Toggle (Hidden in Print) */}
      <div className="no-print mb-6 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between relative z-10">
        <div className="flex gap-2">
          {(['likely', 'borderline', 'unlikely'] as VerdictType[]).map(v => (
            <button 
              key={v}
              onClick={() => setVerdict(v)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${verdict === v ? 'bg-[#0B2545] text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Formal Report Preview</span>
          {onDownload && (
            <button 
              type="button"
              onClick={onDownload}
              className="bg-navy text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-slate-800 transition-all shadow-md"
            >
              Save as PDF
            </button>
          )}
        </div>
      </div>

      <header className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0B2545] text-white rounded-lg flex items-center justify-center font-serif text-2xl font-bold">C</div>
            <div className="text-[10px] font-black tracking-widest text-[#0B2545] uppercase leading-tight">
              ClearVisa UK – Immigration<br/>Eligibility Pre-Check Report
            </div>
          </div>
          <h1 className="text-3xl font-black text-[#0B2545] mb-1 uppercase tracking-tight leading-none">Immigration Assessment</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Generated exclusively for {applicantName} • {date}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[9px] font-bold min-w-[240px] uppercase tracking-wider">
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1">
            <span className="text-slate-400">Report ID:</span> <span className="text-[#0B2545] font-black">{reportId}</span>
            <span className="text-slate-400">Route:</span> <span className="text-[#0B2545] font-black">{visaRoute}</span>
            <span className="text-slate-400">Status:</span> <span className="text-[#0B2545] font-black">Finalized</span>
          </div>
        </div>
      </header>

      <div className="h-[2px] bg-slate-100 w-full mb-6 relative z-10"></div>

      {/* Main Verdict & Risk Meter */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        <div className={`lg:col-span-2 border-2 rounded-2xl p-6 border-${currentContent.colorClass}-200 bg-${currentContent.colorClass}-50 flex flex-col justify-center`}>
          <h2 className={`text-xl font-black uppercase tracking-widest mb-3`} style={{ color: currentContent.colorHex }}>{currentContent.title}</h2>
          <p className="text-xs font-semibold leading-relaxed text-slate-700">{currentContent.text}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Risk Assessment</h3>
          <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: verdict === 'likely' ? '33%' : verdict === 'borderline' ? '66%' : '100%',
                backgroundColor: currentContent.riskColor
              }}
            ></div>
          </div>
          <span className="text-lg font-black uppercase tracking-tighter" style={{ color: currentContent.riskColor }}>{currentContent.riskLabel}</span>
        </div>
      </section>

      {/* Why you received this result */}
      <section className="mb-8 relative z-10">
        <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Why you received this result</h3>
        <ul className="grid grid-cols-1 gap-3">
          {currentContent.reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-600">
              <div className="w-5 h-5 bg-white rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy font-black text-[9px]">{i + 1}</div>
              {reason}
            </li>
          ))}
        </ul>
      </section>

      {/* Answers Summary & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Your Answers Summary</h3>
          <div className="overflow-hidden border border-slate-100 rounded-xl">
            <table className="w-full text-left text-[10px] font-bold">
              <tbody className="divide-y divide-slate-100">
                {answers.map((ans, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-2.5 text-slate-400 uppercase tracking-tight">{ans.label}</td>
                    <td className="p-2.5 text-navy font-black">{ans.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Document Checklist</h3>
          <div className="space-y-4">
            {checklist.map((group, i) => (
              <div key={i}>
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{group.category}</h4>
                <ul className="space-y-1">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-navy' : i === 1 ? 'bg-accent' : 'bg-slate-300'}`}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Guidance References */}
      <section className="mb-8 relative z-10">
        <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Home Office Guidance References</h3>
        <div className="grid grid-cols-2 gap-2">
          {references.map((ref, i) => (
            <div key={i} className="text-[9px] font-bold text-slate-400 italic flex items-center gap-2">
              <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /></svg>
              {ref}
            </div>
          ))}
        </div>
      </section>

      {/* Legal Disclosure */}
      <footer className="mt-auto relative z-10">
        <div className="bg-[#0B2545] p-5 rounded-2xl text-[9px] text-white border border-navy shadow-inner leading-relaxed mb-6">
          <h4 className="font-black mb-2 uppercase tracking-widest text-accent">Legal Disclosure & Liability Waiver</h4>
          <p className="opacity-80 font-medium">
            ClearVisa UK – Immigration Eligibility Pre-Check Report is a self-serve preliminary assessment tool. This document does not constitute legal advice and is not a substitute for a professional consultation with an OISC-regulated adviser or qualified solicitor. Immigration rules, including salary thresholds and evidential requirements, are subject to change by the UK Home Office without prior notice. ClearVisa UK does not guarantee any visa outcome. Final decisions are made solely by UK Visas and Immigration (UKVI) caseworkers.
          </p>
        </div>

        <div className="print-footer-info">
          <span>© 2026 ClearVisa UK – Immigration Eligibility Pre-Check Report. All rights reserved.</span>
          <span className="font-black">ID: {reportId}</span>
          <span>Not affiliated with the UK Government or Home Office.</span>
        </div>

        <div className="flex flex-col items-center gap-2 text-[9px] text-slate-400 font-black tracking-[0.3em] uppercase pt-4 border-t no-print">
          <span>© 2026 ClearVisa UK – Immigration Eligibility Pre-Check Report. All rights reserved.</span>
          <span className="tracking-widest">Not affiliated with the UK Government or Home Office. • {reportId}</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;