
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
      title: "Likely Eligible",
      text: "Based on your answers, you appear to meet the key published requirements for this visa route. Review your full report and evidence carefully before applying.",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      textColor: "text-teal-800",
      subTextColor: "text-teal-700/80"
    },
    borderline: {
      title: "Borderline – Risk Factors Present",
      text: "Some of your answers suggest you may not clearly meet all requirements. Read your report carefully and consider addressing risk areas before submitting an application.",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700/80"
    },
    unlikely: {
      title: "Unlikely Eligible Based on Provided Answers",
      text: "Your answers suggest one or more core requirements are not currently met. Check the risk sections in your report and consider seeking advice from a qualified immigration solicitor.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      subTextColor: "text-red-700/80"
    }
  };

  const content = verdictContent[verdict];

  const riskFactors = [
    { category: "Relationship / sponsorship", status: "green", explanation: "Relationship status as declared meets standard eligibility criteria for the selected route." },
    { category: "Immigration status & history", status: "green", explanation: "Declared history shows compliance with previous visa conditions and no adverse records." },
    { category: "Financial requirement", status: "amber", explanation: "Income level is sufficient, but documentation must strictly follow Appendix FM-SE rules." },
    { category: "Employment & job code", status: "green", explanation: "Current job role corresponds to an eligible SOC code with meeting salary requirements." },
    { category: "English language", status: "green", explanation: "Meets requirement via declared academic qualification or approved test result." },
    { category: "Accommodation", status: "green", explanation: "Declared living arrangements appear to meet non-overcrowding standards." },
    { category: "Documents & evidence", status: "amber", explanation: "High volume of evidence required; specifically around financial proof and relationship cohabitation." }
  ];

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'green') return (
      <div className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
      </div>
    );
    if (status === 'amber') return (
      <div className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
      </div>
    );
    return (
      <div className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    );
  };

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans">
      {/* Dev Toggle (Hidden in Print) */}
      <div className="no-print mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
        <div className="flex gap-2">
          {(['likely', 'borderline', 'unlikely'] as VerdictType[]).map(v => (
            <button 
              key={v}
              onClick={() => setVerdict(v)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${verdict === v ? 'bg-navy text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
            >
              {v}
            </button>
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Template Controls</span>
      </div>

      {/* 1. Cover Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center font-serif text-2xl font-bold shadow-sm">C</div>
            <span className="text-2xl font-bold tracking-tight text-navy uppercase">ClearVisa UK</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy mb-2">UK Visa Eligibility Pre-Check Report</h1>
          <p className="text-sm text-slate-500 max-w-md">
            Personalised assessment based on your answers and current public Home Office rules.
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-xs min-w-[240px]">
          <div className="grid grid-cols-[auto,1fr] gap-x-6 gap-y-2">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">Applicant name:</span>
            <span className="font-bold text-navy truncate">{applicantName}</span>
            <span className="text-slate-400 font-semibold uppercase tracking-wider">Visa route:</span>
            <span className="font-bold text-navy">{visaRoute}</span>
            <span className="text-slate-400 font-semibold uppercase tracking-wider">Date generated:</span>
            <span className="font-bold text-navy">{date}</span>
            <span className="text-slate-400 font-semibold uppercase tracking-wider">Report ID:</span>
            <span className="font-bold text-navy">{reportId}</span>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-slate-100 w-full mb-12"></div>

      {/* 2. Eligibility Verdict Box */}
      <div className={`${content.bgColor} border-2 ${content.borderColor} rounded-2xl p-8 text-center mb-12`}>
        <h2 className={`text-2xl font-black ${content.textColor} uppercase tracking-wide mb-4`}>{content.title}</h2>
        <p className={`text-base ${content.subTextColor} leading-relaxed max-w-2xl mx-auto mb-6`}>
          {content.text}
        </p>
        <div className="inline-block px-4 py-2 bg-white/50 rounded-lg">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            This verdict is based only on your answers and publicly available Home Office guidance at the time of assessment. It is not a guarantee of visa approval.
          </p>
        </div>
      </div>

      {/* 3. Summary Explanation */}
      <div className="mb-12">
        <h3 className="text-sm font-bold text-navy uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">Summary of your result</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Based on the information you provided, your case appears to meet some or all of the key requirements for the selected visa route. The sections below break down the major eligibility areas and show which aspects appear strong and which may require attention. Specifically, your declarations regarding sponsorship and immigration history are robust, while financial documentation and evidentiary trails require careful preparation to avoid administrative refusal.
        </p>
      </div>

      {/* 4. Risk Factor Breakdown */}
      <div className="mb-12 flex-grow">
        <h3 className="text-sm font-bold text-navy uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">Risk factor breakdown</h3>
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold text-navy uppercase tracking-wider text-[11px]">Requirement Category</th>
                <th className="px-6 py-4 font-bold text-navy uppercase tracking-wider text-[11px] text-center">Status</th>
                <th className="px-6 py-4 font-bold text-navy uppercase tracking-wider text-[11px]">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {riskFactors.map((factor, idx) => (
                <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-800">{factor.category}</td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <StatusIcon status={factor.status} />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 text-[12px] leading-relaxed italic">{factor.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Recommended Next Steps */}
      <div className="mb-12 bg-slate-50 p-10 rounded-2xl border border-slate-100">
        <h3 className="text-sm font-bold text-navy uppercase tracking-[0.2em] mb-6">Suggested next steps</h3>
        <ul className="grid grid-cols-1 gap-4">
          {[
            "Gather and organise all relevant evidence before applying.",
            "If any risk factors were flagged, consider correcting them before submission.",
            "Review official Home Office guidance again before you apply.",
            "Consider speaking with a qualified immigration solicitor for complex cases."
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-4 text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-navy flex-shrink-0"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Important Disclaimer */}
      <div className="bg-slate-100/40 p-8 rounded-2xl text-[11px] text-slate-500 border border-slate-200 leading-relaxed">
        <h4 className="font-bold mb-3 text-navy uppercase tracking-widest">Important Information</h4>
        <div className="space-y-3">
          <p><span className="font-bold text-slate-700">ClearVisa UK is not a law firm and does not provide legal advice.</span> This report is a preliminary eligibility pre-check generated using your answers and publicly available immigration rules.</p>
          <p>Visa decisions are made only by the UK Home Office and depend on full evidence and circumstances not captured here. We cannot guarantee any visa outcome.</p>
          <p>For cases involving previous refusals, overstays, criminal history, or unusual circumstances, you should seek professional legal advice from a qualified solicitor or OISC-regulated adviser.</p>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase pt-6 border-t border-slate-100">
        <span>ClearVisa UK © 2024</span>
        <span>Confidential Eligibility Assessment</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
};

export default ReportTemplate;
