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

  const getCategoryChecklist = () => {
    const analysis = analyzeEvidenceGaps(answers, visaRoute);
    return analysis;
  };

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
        <h3 className="text-xl font-bold text-navy mb-4 uppercase tracking-tight">Unlock More Depth</h3>
        <p className="text-sm text-slate-600 mb-6 font-medium">Your current report is at the {tier.toUpperCase()} level. Upgrade to unlock {tier === 'basic' ? 'the Compliance Matrix and Document Checklist' : 'the Strategic Action Plan and Case Remediation guide'}.</p>
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
    <div className="bg-white mx-auto p-[10mm] md:p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans text-left shadow-lg border border-slate-200 rounded-lg">
      
      {/* HEADER */}
      <header className="flex justify-between items-start mb-8 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl text-navy font-bold tracking-tight mb-1 uppercase">UK Visa Eligibility Audit</h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">ID: {reportId} • Date: {date} • Level: {tier.toUpperCase()}</p>
        </div>
        <div className={`p-3 rounded-xl text-right border ${current.bg}`}>
           <span className="text-[8px] text-slate-500 font-bold uppercase block">Verdict</span>
           <span className="text-lg font-black uppercase" style={{ color: current.color }}>{current.title}</span>
        </div>
      </header>

      {/* BASIC: SUMMARY & FLAGS */}
      <section className={`${current.bg} p-6 rounded-2xl border border-slate-200 mb-8`}>
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-slate-400">Assessment Summary</h2>
        <p className="text-sm font-bold leading-relaxed text-slate-700 mb-4">{assessmentData.summary}</p>
        
        {assessmentData.riskFlags.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-rose-500">Identified Risk Flags</h3>
            {assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-2 items-start p-3 bg-white/50 border border-slate-200 rounded-xl">
                <span className="text-rose-500 font-bold text-sm">!</span>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{flag}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PROFESSIONAL AUDIT: COMPLIANCE MATRIX */}
      {isAudit && (
        <section className="mb-10">
          <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-accent pl-2 mb-4">Compliance Matrix</h3>
          <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
            <table className="w-full text-left text-[10px] border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                  <th className="px-4 py-2.5">Risk Level</th>
                  <th className="px-4 py-2.5">Detailed Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assessmentData.sectionScores.map((section, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 text-navy font-bold">{section.name}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black inline-block min-w-[50px] ${
                        section.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 
                        section.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {section.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`font-black uppercase text-[8px] ${
                        section.risk === 'LOW' ? 'text-emerald-500' : 
                        section.risk === 'MEDIUM' ? 'text-amber-500' : 'text-rose-500'
                      }`}>{section.risk}</span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 font-medium">{section.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PROFESSIONAL AUDIT: GAP ANALYSIS CHECKLIST */}
      {isAudit && (
        <section className="mb-10">
          <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-accent pl-2 mb-4">Personalised Document Audit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl">
              <h4 className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-3">Identified Missing Evidence (Gaps)</h4>
              <ul className="space-y-2">
                {getCategoryChecklist().gaps.map((gap, i) => (
                  <li key={i} className="text-[10px] font-bold text-slate-700 flex gap-2">
                    <span className="text-rose-400">•</span> {gap}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <h4 className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-3">Tailored Recommendations</h4>
              <ul className="space-y-2">
                {getCategoryChecklist().improvements.map((imp, i) => (
                  <li key={i} className="text-[10px] font-bold text-slate-700 flex gap-2">
                    <span className="text-emerald-400">✓</span> {imp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* PROFESSIONAL PLUS: STRATEGIC ACTION PLAN */}
      {isPlus && (
        <section className="mb-10 bg-navy rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-[9px] font-black text-accent uppercase tracking-[0.2em] mb-4">Strategic Case Remediation Guide</h3>
          <div className="space-y-5">
            <div>
              <h4 className="text-[8px] text-white/50 font-black uppercase tracking-widest mb-2">Priority Remediation Steps</h4>
              <div className="space-y-2">
                {assessmentData.remediationSteps?.map((step, i) => (
                  <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[9px] font-black text-accent uppercase tracking-tight mb-1">{step.issue}</p>
                    <p className="text-[11px] font-medium text-white/80 leading-relaxed">{step.resolution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[8px] text-white/50 font-black uppercase tracking-widest mb-2">Sample Cover Letter Wording</h4>
              <div className="space-y-2">
                {assessmentData.sampleWording?.map((word, i) => (
                  <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl italic">
                    <span className="text-[8px] not-italic text-accent font-black block mb-1 uppercase">{word.section}</span>
                    <p className="text-[10px] font-medium text-white/70">"{word.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AUDIT HISTORY - ALWAYS INCLUDED */}
      <section className="pt-8 border-t border-slate-100">
        <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] mb-4">Full Response Log</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {visibleQuestionsList.map((q) => {
            const answer = answers[q.id];
            if (answer === undefined) return null;
            let displayAnswer = Array.isArray(answer) 
              ? answer.join(', ') 
              : answer === true ? 'Yes' : answer === false ? 'No' : String(answer);

            return (
              <div key={q.id} className="border-b border-slate-50 pb-2">
                <p className="text-[7px] text-slate-400 font-bold uppercase mb-0.5">{q.label}</p>
                <p className="text-[9px] text-navy font-bold">{displayAnswer}</p>
              </div>
            );
          })}
        </div>
      </section>

      {renderUpgradeSection()}

      <footer className="mt-12 pt-6 border-t border-slate-100 text-center">
        <p className="text-[8px] text-slate-400 font-bold uppercase leading-relaxed max-w-lg mx-auto">
          ClearVisa UK Audit Report. Not legal advice. Industry-standard pre-check logic based on public UKVI rules. Accuracy limited by user input.
        </p>
      </footer>
    </div>
  );
};

export default ReportTemplate;