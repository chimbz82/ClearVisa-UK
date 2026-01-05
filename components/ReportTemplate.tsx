
import React from 'react';

interface ReportTemplateProps {
  visaRoute: string;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ visaRoute }) => {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const uniqueId = `CV-${Math.floor(100000 + Math.random() * 900000)}`;

  const riskFactors = [
    { category: "Relationship / sponsorship status", status: "green", explanation: "Relationship declared meets the requirement for long-term partnership." },
    { category: "Immigration status & history", status: "green", explanation: "No adverse immigration history or criminal record declared." },
    { category: "Financial requirement / income level", status: "amber", explanation: "Declared income is close to threshold; require specific payslip sequence." },
    { category: "Employment / job code", status: "green", explanation: "Declared occupation falls within acceptable Home Office SOC codes." },
    { category: "English language requirement", status: "green", explanation: "Degree-level qualification meets the exemption criteria." },
    { category: "Accommodation / living situation", status: "green", explanation: "Private residence declared as suitable for non-overcrowded living." },
    { category: "Documents and evidence", status: "amber", explanation: "Evidence list is complex; bank statements must precisely match payslips." }
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
    <div className="a4-page bg-white shadow-2xl mx-auto p-12 text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-navy text-white rounded flex items-center justify-center font-serif text-lg font-bold">C</div>
            <span className="text-xl font-bold tracking-tight text-navy uppercase">ClearVisa UK</span>
          </div>
          <h1 className="text-2xl font-bold text-navy">UK Visa Eligibility Pre-Check Report</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Personalised assessment based on your answers and current public Home Office rules.
          </p>
        </div>
        <div className="text-right grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <span className="text-slate-400 font-medium">Applicant name:</span>
          <span className="font-bold">Valued Client</span>
          <span className="text-slate-400 font-medium">Visa route:</span>
          <span className="font-bold">{visaRoute}</span>
          <span className="text-slate-400 font-medium">Date generated:</span>
          <span className="font-bold">{date}</span>
          <span className="text-slate-400 font-medium">Report ID:</span>
          <span className="font-bold">{uniqueId}</span>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full mb-10"></div>

      {/* Verdict Box */}
      <div className="bg-teal-50 border-2 border-teal-100 rounded-2xl p-8 text-center mb-10">
        <h2 className="text-3xl font-black text-teal-700 uppercase tracking-wide mb-3">Borderline – Risk Factors Present</h2>
        <p className="text-sm text-teal-600/80 leading-relaxed max-w-lg mx-auto italic">
          This verdict is based only on your answers and publicly available Home Office guidance at the time of assessment. It is not a guarantee of visa approval.
        </p>
      </div>

      {/* Summary Explanation */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Summary of your result</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Based on the information you provided, your case appears to meet some or all of the key requirements for the selected visa route. The sections below break down the major eligibility areas and show which aspects appear strong and which may require attention. Specifically, your financial declarations require precision in the documentation phase.
        </p>
      </div>

      {/* Risk Factor Breakdown */}
      <div className="mb-10 flex-grow">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Risk factor breakdown</h3>
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700">Requirement Category</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-center">Status</th>
                <th className="px-6 py-4 font-bold text-slate-700">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {riskFactors.map((factor, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 font-medium text-slate-800">{factor.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StatusIcon status={factor.status} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs leading-relaxed">{factor.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div className="mb-10 bg-slate-50 p-8 rounded-2xl border border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Suggested next steps</h3>
        <ul className="space-y-3">
          {[
            "Gather and organise all relevant evidence before applying.",
            "If any risk factors were flagged, consider correcting them before submission.",
            "Review official Home Office guidance again before you apply.",
            "Consider speaking with a qualified immigration solicitor for complex cases."
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="text-navy font-bold">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-100/50 p-6 rounded-xl text-[10px] text-slate-400 border border-slate-100">
        <h4 className="font-bold mb-2 text-slate-500 uppercase">Important Disclaimer</h4>
        <div className="space-y-1.5">
          <p>ClearVisa UK is not a law firm and does not provide legal advice.</p>
          <p>This report is a preliminary eligibility pre-check generated using your answers and publicly available immigration rules.</p>
          <p>Visa decisions are made only by the UK Home Office and depend on full evidence and circumstances not captured here.</p>
          <p>For cases involving previous refusals, overstays, criminal history, or unusual circumstances, you should seek professional legal advice.</p>
        </div>
      </div>

      <div className="mt-8 text-center text-[9px] text-slate-300 font-medium tracking-widest uppercase">
        ClearVisa UK | Confidential Eligibility Assessment
      </div>
    </div>
  );
};

export default ReportTemplate;
