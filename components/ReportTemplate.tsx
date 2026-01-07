import React from 'react';
import { AssessmentResult, QuestionConfig } from '../types';
import { analyzeEvidenceGaps } from '../utils/gapAnalysis';
import { PlanId } from '../App';
import { triggerReportPdfDownload } from '../utils/downloadPdf';

interface ReportTemplateProps {
  applicantName?: string;
  visaRoute: string;
  reportId?: string;
  date?: string;
  assessmentData: AssessmentResult;
  answers?: Record<string, any>;
  tier: string;
  paidPlan: PlanId | null;
  onUpgrade?: (targetTier: PlanId) => void;
  onViewLegal?: (type: 'privacy' | 'terms' | 'refunds') => void;
  visibleQuestionsList: QuestionConfig[];
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ 
  applicantName = "Applicant", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  assessmentData,
  answers = {} as Record<string, any>,
  tier = 'full',
  paidPlan,
  onUpgrade,
  onViewLegal,
  visibleQuestionsList
}) => {
  const isBasic = tier === 'basic';
  const isAudit = tier === 'full' || tier === 'pro_plus';
  const isPlus = tier === 'pro_plus';

  const currentVerdict = assessmentData.verdict;
  const verdictStyles = {
    likely: { title: "LIKELY ELIGIBLE", color: "#16A34A", risk: "LOW", bg: "bg-emerald-50" },
    borderline: { title: "BORDERLINE", color: "#D97706", risk: "MEDIUM", bg: "bg-amber-50" },
    unlikely: { title: "HIGH RISK / UNLIKELY", color: "#DC2626", risk: "HIGH", bg: "bg-rose-50" }
  };
  const current = verdictStyles[currentVerdict];

  const gapAnalysis = analyzeEvidenceGaps(answers, visaRoute);

  const renderUpgradeSection = () => {
    if (paidPlan === 'pro_plus') return null;

    let options: { tier: PlanId; label: string; priceExtra: number }[] = [];
    if (paidPlan === 'basic') {
      options = [
        { tier: 'full', label: 'Professional Audit', priceExtra: 50 },
        { tier: 'pro_plus', label: 'Professional Plus', priceExtra: 70 }
      ];
    } else if (paidPlan === 'full') {
      options = [
        { tier: 'pro_plus', label: 'Professional Plus', priceExtra: 20 }
      ];
    }

    return (
      <section className="mt-12 bg-accent/5 p-8 rounded-[2rem] border-2 border-accent/20 no-print">
        <h3 className="text-xl font-bold text-navy mb-4 uppercase tracking-tight">Expand Audit Depth</h3>
        <p className="text-sm text-slate-600 mb-6 font-medium">This report is at the {tier.toUpperCase()} level. Upgrading unlocks deeper analysis, custom remediation steps, and solicitor-style wording.</p>
        <div className="flex flex-wrap gap-4">
          {options.map((opt) => (
            <button 
              key={opt.tier}
              onClick={() => onUpgrade?.(opt.tier)}
              className="bg-accent text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-accent/90 transition-all shadow-md"
            >
              Upgrade to {opt.label} – pay £{opt.priceExtra} extra
            </button>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-white mx-auto p-[10mm] md:p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative font-sans text-left shadow-lg border border-slate-200 rounded-lg">
      
      {/* HEADER */}
      <header className="flex justify-between items-start mb-10 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl text-navy font-extrabold tracking-tight mb-1 uppercase">UK Immigration Audit Report</h1>
          <div className="flex flex-wrap gap-4 mt-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">REPORT ID: {reportId}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DATE: {date}</p>
            <p className="text-[10px] text-accent font-black uppercase tracking-widest">AUDIT LEVEL: {tier.toUpperCase()}</p>
          </div>
        </div>
        <div className={`p-4 rounded-2xl text-right border ${current.bg}`}>
           <span className="text-[9px] text-slate-500 font-bold uppercase block mb-1">Eligibility Verdict</span>
           <span className="text-xl font-black uppercase tracking-tight" style={{ color: current.color }}>{current.title}</span>
        </div>
      </header>

      {/* EXECUTIVE SUMMARY */}
      <section className={`${current.bg} p-6 rounded-2xl border border-slate-200 mb-10`}>
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-slate-400">Executive Assessment</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm font-bold leading-relaxed text-slate-700">{assessmentData.summary}</p>
        </div>
        
        {assessmentData.riskFlags.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-500">Critical Risk Indicators</h3>
            {assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-white/60 border border-rose-100 rounded-xl">
                <span className="text-rose-600 font-black text-sm">!</span>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight leading-tight">{flag}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* COMPLIANCE MATRIX */}
      <section className="mb-12">
        <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-accent pl-3 mb-5">Section-by-Section Risk Profile</h3>
        <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3">Legal Category</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Risk Factor</th>
                <th className="px-5 py-3">Audit Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessmentData.sectionScores.map((section, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 text-navy font-bold">{section.name}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black inline-block min-w-[55px] ${
                      section.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 
                      section.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {section.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className={`font-black uppercase text-[9px] ${
                      section.risk === 'LOW' ? 'text-emerald-500' : 
                      section.risk === 'MEDIUM' ? 'text-amber-500' : 'text-rose-500'
                    }`}>{section.risk}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-500 font-medium leading-tight">{section.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MISSING EVIDENCE & GAP ANALYSIS */}
      <section className="mb-12 page-break-before">
        <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-accent pl-3 mb-5">Missing Evidence & Personalised Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <h4 className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-4">Evidence Gaps Identified</h4>
            <ul className="space-y-3">
              {gapAnalysis.gaps.map((gap, i) => (
                <li key={i} className="text-[11px] font-bold text-slate-700 flex gap-3">
                  <span className="text-rose-400 font-black">•</span> {gap}
                </li>
              ))}
              {gapAnalysis.gaps.length === 0 && (
                <li className="text-[11px] font-bold text-slate-400 italic">No critical evidence gaps identified based on your responses.</li>
              )}
            </ul>
          </div>
          <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-4">Strengthening Recommendations</h4>
            <ul className="space-y-3">
              {gapAnalysis.improvements.map((imp, i) => (
                <li key={i} className="text-[11px] font-bold text-slate-700 flex gap-3">
                  <span className="text-emerald-500 font-black">✓</span> {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEXT RECOMMENDED STEPS */}
      <section className="mb-12">
        <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-accent pl-3 mb-5">Next Recommended Steps</h3>
        <div className="space-y-3">
          {assessmentData.nextSteps.map((step, i) => (
            <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-4 shadow-sm">
              <div className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center font-black text-xs">
                {i + 1}
              </div>
              <p className="text-xs font-bold text-navy uppercase tracking-tight">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROFESSIONAL PLUS: STRATEGIC ACTION PLAN */}
      {isPlus && (
        <section className="mb-12 bg-navy rounded-[2rem] p-8 text-white overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.25em] mb-6">Strategic Case Remediation (Professional Plus Only)</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-white/20"></span> Priority Issues & Resolutions
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {assessmentData.remediationSteps?.map((step, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-4">
                    <span className="text-accent font-black text-base">{i + 1}</span>
                    <div>
                      <p className="text-[10px] font-black text-accent uppercase tracking-tight mb-1">{step.issue}</p>
                      <p className="text-xs font-semibold text-white/90 leading-relaxed">{step.resolution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-white/20"></span> Recommended cover letter Phrasing
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {assessmentData.sampleWording?.map((word, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[9px] text-accent font-black uppercase tracking-tight block mb-2">{word.section}</span>
                    <p className="text-[11px] font-medium text-white/70 italic leading-relaxed">"{word.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AUDIT LOG: COMPLETE SUBMISSION HISTORY */}
      <section className="pt-10 border-t border-slate-100 page-break-before">
        <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] mb-6">Complete Audit Submission History</h3>
        <p className="text-[10px] text-slate-400 mb-6 font-bold uppercase tracking-tight">The following data was provided by the user and is the complete record used for this assessment. Answers are shown exactly as provided:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {visibleQuestionsList.map((q) => {
            const answer = answers[q.id];
            if (answer === undefined) return null;
            
            let displayAnswer = "";
            if (Array.isArray(answer)) {
              displayAnswer = answer.map(v => q.options?.find(o => o.value === v)?.label || v).join(', ');
            } else if (typeof answer === 'boolean') {
              displayAnswer = answer ? 'Yes' : 'No';
            } else {
              displayAnswer = q.options?.find(o => o.value === answer)?.label || answer.toString();
            }

            return (
              <div key={q.id} className="border-b border-slate-100 pb-4 flex flex-col min-h-[50px]">
                <p className="text-[9px] text-slate-400 font-bold uppercase mb-1 leading-tight">{q.label}</p>
                <p className="text-[12px] text-navy font-extrabold tracking-tight whitespace-pre-wrap">{displayAnswer}</p>
              </div>
            );
          })}
        </div>
      </section>

      {renderUpgradeSection()}

      <footer className="mt-auto pt-8 border-t border-slate-100 text-center">
        <p className="text-[9px] text-slate-400 font-bold uppercase leading-relaxed max-w-xl mx-auto">
          ClearVisa UK Official Audit Report. This document is generated for informational purposes only and does not constitute legal advice.
          Assessment results are strictly dependent on user-supplied information. Not affiliated with UKVI or the Home Office.
        </p>
        
        <div className="flex justify-center gap-4 mt-6 no-print">
          <button onClick={() => onViewLegal?.('terms')} className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-accent transition-colors">Terms of Use</button>
          <span className="text-slate-200">|</span>
          <button onClick={() => onViewLegal?.('privacy')} className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-accent transition-colors">Privacy Policy</button>
          <span className="text-slate-200">|</span>
          <button onClick={() => onViewLegal?.('refunds')} className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-accent transition-colors">Refund Policy</button>
        </div>

        <div className="flex justify-center gap-8 mt-6 opacity-30 grayscale">
          <span className="text-[8px] font-black uppercase tracking-widest">Logic Engine: v2.5.0-PRO</span>
          <span className="text-[8px] font-black uppercase tracking-widest">Audit Engine: Verified Compliance</span>
          <span className="text-[8px] font-black uppercase tracking-widest">Timestamp: {new Date().getTime()}</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
