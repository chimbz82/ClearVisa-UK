
import React from 'react';
import { AssessmentResult } from '../types';

interface ReportTemplateProps {
  applicantName?: string;
  visaRoute: string;
  reportId?: string;
  date?: string;
  onDownload?: () => void;
  assessmentData?: AssessmentResult;
  answers?: Record<string, any>;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ 
  applicantName = "Alex Thompson", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  onDownload,
  assessmentData,
  answers = {}
}) => {
  // Use provided assessment data or fall back to default borderline (for dev preview)
  const currentVerdict = assessmentData?.verdict || 'borderline';
  
  const verdictContent = {
    likely: { 
      title: "LIKELY ELIGIBLE", 
      riskColor: "#2FBF71",
      riskLabel: "Low Risk",
      text: assessmentData?.summary || "Based on your answers and current public guidance, you appear to meet the core requirements for this visa route. Your priority should be gathering high-quality evidence that strictly adheres to the Home Office caseworker rules.", 
      colorClass: "emerald",
      colorHex: "#059669" 
    },
    borderline: { 
      title: "BORDERLINE – RISK FLAGS", 
      riskColor: "#d97706",
      riskLabel: "Medium Risk",
      text: assessmentData?.summary || "Some of your answers suggest certain requirements may not be fully met or require significant evidence. Review your report carefully and consider addressing highlighted areas before submitting an application.", 
      colorClass: "amber",
      colorHex: "#d97706" 
    },
    unlikely: { 
      title: "UNLIKELY ELIGIBLE", 
      riskColor: "#e11d48",
      riskLabel: "High Risk",
      text: assessmentData?.summary || "Your answers indicate that one or more core requirements are not currently met. Submitting an application in your current situation carries a high probability of refusal and fee loss.", 
      colorClass: "rose",
      colorHex: "#e11d48" 
    }
  };

  const currentContent = verdictContent[currentVerdict];

  // Fix: Use bracket notation for property access on Record type answers to avoid TS error with inferred empty object
  const summaryItems = [
    { label: "Visa Route", value: visaRoute },
    { label: "Location", value: answers['current_location']?.replace('_', ' ') || 'Not Provided' },
    { label: "Criminal History", value: answers['criminal_history'] === 'no' ? 'None' : 'Declared' },
    { label: "Previous Refusals", value: answers['previous_refusals'] === 'no' ? 'None' : 'Declared' },
  ];

  const references = [
    "Appendix FM: Family Members",
    "Appendix Skilled Worker: Salary Thresholds",
    "Immigration Rules part 9: Grounds for Refusal",
    "Home Office Financial Requirement Guidance"
  ];

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[10mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans relative overflow-hidden">
      <div className="watermark hidden print:block uppercase tracking-[1.2em]">CLEARVISA UK – CONFIDENTIAL</div>

      {/* Report Header */}
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
          <h2 className="text-xl font-black uppercase tracking-widest mb-3" style={{ color: currentContent.colorHex }}>{currentContent.title}</h2>
          <p className="text-xs font-semibold leading-relaxed text-slate-700">{currentContent.text}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Risk Assessment</h3>
          <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '33%' : currentVerdict === 'borderline' ? '66%' : '100%',
                backgroundColor: currentContent.riskColor
              }}
            ></div>
          </div>
          <span className="text-lg font-black uppercase tracking-tighter" style={{ color: currentContent.riskColor }}>{currentContent.riskLabel}</span>
        </div>
      </section>

      {/* Risk Flags */}
      {assessmentData?.riskFlags && assessmentData.riskFlags.length > 0 && (
        <section className="mb-8 relative z-10">
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Identified Risk Factors</h3>
          <ul className="grid grid-cols-1 gap-3">
            {assessmentData.riskFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100 text-[11px] font-bold text-rose-700">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                {flag}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recommended Next Steps */}
      <section className="mb-8 relative z-10">
        <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Suggested Next Steps</h3>
        <ul className="grid grid-cols-1 gap-3">
          {(assessmentData?.nextSteps || []).map((step, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-600">
              <div className="w-5 h-5 bg-white rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy font-black text-[9px]">{i + 1}</div>
              {step}
            </li>
          ))}
        </ul>
      </section>

      {/* Answers Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Profile Overview</h3>
          <div className="overflow-hidden border border-slate-100 rounded-xl">
            <table className="w-full text-left text-[10px] font-bold">
              <tbody className="divide-y divide-slate-100">
                {summaryItems.map((ans, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-2.5 text-slate-400 uppercase tracking-tight">{ans.label}</td>
                    <td className="p-2.5 text-navy font-black uppercase">{ans.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-4 border-b pb-2">Assessment Context</h3>
          <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">
            This pre-check uses your provided answers to map eligibility against latest Home Office appendices. "Likely Eligible" results indicate high alignment with standard guidance but do not account for hidden evidential weaknesses.
          </p>
          <div className="mt-4 space-y-2">
            {references.map((ref, i) => (
              <div key={i} className="text-[9px] font-bold text-slate-400 flex items-center gap-2">
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                {ref}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Legal Disclosure */}
      <footer className="mt-auto relative z-10">
        <div className="bg-[#0B2545] p-5 rounded-2xl text-[9px] text-white border border-navy shadow-inner leading-relaxed mb-6">
          <h4 className="font-black mb-2 uppercase tracking-widest text-accent">Legal Disclosure & Liability Waiver</h4>
          <p className="opacity-80 font-medium">
            ClearVisa UK – Immigration Eligibility Pre-Check Report is a self-serve preliminary assessment tool. This document does not constitute legal advice and is not a substitute for a professional consultation with an OISC-regulated adviser or qualified solicitor. Immigration rules, including salary thresholds and evidential requirements, are subject to change by the UK Home Office without prior notice. ClearVisa UK does not guarantee any visa outcome. Final decisions are made solely by UK Visas and Immigration (UKVI) caseworkers.
          </p>
        </div>

        <div className="print-footer-info">
          <span>© 2026 ClearVisa UK. All rights reserved.</span>
          <span className="font-black">ID: {reportId}</span>
          <span>Not affiliated with the UK Government or Home Office.</span>
        </div>

        <div className="flex flex-col items-center gap-2 text-[9px] text-slate-400 font-black tracking-[0.3em] uppercase pt-4 border-t no-print">
          <span>© 2026 ClearVisa UK. All rights reserved.</span>
          <span className="tracking-widest text-center">Not affiliated with the UK Government or Home Office. • {reportId}</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
