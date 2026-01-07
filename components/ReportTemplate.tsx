import React from 'react';
import { AssessmentResult, QuestionConfig } from '../types';
import { analyzeEvidenceGaps } from '../utils/gapAnalysis';
import { PlanId, PLANS } from '../App';
import { triggerReportPdfDownload } from '../utils/downloadPdf';
import Button from './Button';

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
  tier = 'basic',
  paidPlan,
  onUpgrade,
  onViewLegal,
  visibleQuestionsList
}) => {
  const isBasic = paidPlan === 'basic';
  const isFull = paidPlan === 'full';
  const isProPlus = paidPlan === 'pro_plus';

  const verdictStyles = {
    likely: { title: "LOW RISK / LIKELY ELIGIBLE", color: "#16A34A", risk: "LOW", bg: "bg-emerald-50", border: "border-emerald-200" },
    borderline: { title: "MEDIUM RISK / BORDERLINE", color: "#D97706", risk: "MEDIUM", bg: "bg-amber-50", border: "border-amber-200" },
    unlikely: { title: "HIGH RISK / UNLIKELY", color: "#DC2626", risk: "HIGH", bg: "bg-rose-50", border: "border-rose-200" }
  };
  
  const current = verdictStyles[assessmentData.verdict] || verdictStyles.borderline;
  const gapAnalysis = analyzeEvidenceGaps(answers, visaRoute);

  return (
    <div className="bg-white mx-auto p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative font-sans text-left shadow-2xl border-4 border-slate-100 rounded-sm">
      
      {/* 1. UPGRADE STRIP (NO-PRINT) */}
      {!isProPlus && (
        <div className="no-print mb-8 p-6 bg-navy text-white rounded-xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <h4 className="text-sm font-black uppercase tracking-widest mb-1">Audit Upgrade Available</h4>
            <p className="text-[11px] font-medium text-slate-300">Unlock {isBasic ? 'Professional or Pro Plus' : 'Professional Plus'} depth and remediation steps.</p>
          </div>
          <div className="flex gap-3">
             {isBasic && (
               <button onClick={() => onUpgrade?.('full')} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all">
                 Full Audit (+£50)
               </button>
             )}
             <button onClick={() => onUpgrade?.('pro_plus')} className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg transition-all">
               Pro Plus (+£{isBasic ? '70' : '20'})
             </button>
          </div>
        </div>
      )}

      {/* 2. AVIATION GRADE HEADER */}
      <header className="flex justify-between items-start mb-12 border-b-4 border-navy pb-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-navy text-white rounded flex items-center justify-center font-black text-lg">C</div>
            <div className="flex flex-col">
               <h1 className="text-2xl font-black text-navy uppercase tracking-[0.2em] leading-none">AUDIT REPORT</h1>
               <span className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">Official Compliance Clearance Check</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-1">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">REPORT REFERENCE</p>
              <p className="text-xs font-black text-navy">{reportId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">AUDIT TIER</p>
              <p className="text-xs font-black text-accent">{tier.toUpperCase().replace('_', ' ')}</p>
            </div>
          </div>
        </div>
        
        <div className={`p-8 rounded-lg border-2 text-center min-w-[240px] shadow-sm ${current.bg} ${current.border}`}>
           <span className="text-[10px] text-slate-500 font-black uppercase block mb-2 tracking-widest">Compliance Profile</span>
           <span className="text-3xl font-black uppercase tracking-tighter block mb-1" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </header>

      {/* 3. EXECUTIVE SUMMARY */}
      <section className="mb-14">
        <div className="bg-slate-50 p-10 rounded-lg border border-slate-200">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] mb-8 text-slate-400">Executive Compliance Verdict</h2>
          <div className="space-y-6">
             <p className="text-2xl font-black text-navy uppercase tracking-tight">{current.title}</p>
             <p className="text-base font-bold leading-relaxed text-slate-700 italic border-l-4 border-accent pl-8">{assessmentData.summary}</p>
          </div>
        </div>
      </section>

      {/* 4. SECTION SCORES (PROFESSIONAL+) */}
      {(isFull || isProPlus) && (
        <section className="mb-14">
          <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.4em] mb-8">Section-by-Section Risk Profile</h3>
          <div className="overflow-hidden border border-slate-100 rounded-lg shadow-sm">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">CRITERIA CATEGORY</th>
                  <th className="px-8 py-5 text-center">RISK LEVEL</th>
                  <th className="px-8 py-5">AUDIT OBSERVATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assessmentData.sectionScores.map((section, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 text-navy font-black uppercase tracking-tight">{section.name}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1 rounded-sm text-[10px] font-black inline-block min-w-[70px] ${
                        section.risk === 'LOW' ? 'bg-emerald-100 text-emerald-700' : 
                        section.risk === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {section.risk}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold leading-relaxed">{section.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 5. GAPS & ACTIONS (PROFESSIONAL+) */}
      {(isFull || isProPlus) && (
        <section className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 border-t-4 border-rose-500 rounded-lg bg-slate-50 shadow-md">
              <h4 className="text-[10px] font-black text-navy uppercase tracking-widest mb-8 border-b border-slate-200 pb-4">Evidence Gaps Identified</h4>
              <ul className="space-y-5">
                {gapAnalysis.gaps.map((gap, i) => (
                  <li key={i} className="text-[11px] font-bold text-slate-600 flex gap-4 items-start">
                    <span className="text-rose-500 font-black text-lg leading-none">!</span> 
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 border-t-4 border-emerald-500 rounded-lg bg-slate-50 shadow-md">
              <h4 className="text-[10px] font-black text-navy uppercase tracking-widest mb-8 border-b border-slate-200 pb-4">Recommended Action Plan</h4>
              <ul className="space-y-5">
                {assessmentData.nextSteps.map((step, i) => (
                  <li key={i} className="text-[11px] font-bold text-slate-600 flex gap-4 items-start">
                    <span className="text-emerald-600 font-black text-lg leading-none">✓</span> 
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 6. STRATEGIC REMEDIATION (PRO PLUS ONLY) */}
      {isProPlus && (
        <section className="mb-16 bg-navy rounded-lg p-12 text-white shadow-2xl">
          <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-12">Strategic Case Remediation</h3>
          <div className="grid grid-cols-1 gap-10">
            {assessmentData.remediationSteps?.map((step, i) => (
              <div key={i} className="flex gap-8 border-b border-white/5 pb-8 last:border-0">
                 <span className="text-4xl font-black text-accent/20">{i+1}</span>
                 <div className="space-y-3">
                    <p className="text-xs font-black text-white uppercase tracking-[0.2em]">{step.issue}</p>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed italic">"{step.resolution}"</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. AUDIT LOG (ALL TIERS) */}
      <section className="pt-20 border-t-4 border-slate-100 page-break-before">
        <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.4em] mb-12 text-center">Audit Submission Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 px-8">
          {visibleQuestionsList.map((q) => {
            const answer = answers[q.id];
            if (answer === undefined) return null;
            return (
              <div key={q.id} className="border-b border-slate-50 pb-5">
                <p className="text-[9px] text-slate-400 font-black uppercase mb-2 leading-tight tracking-tight">{q.label}</p>
                <p className="text-[13px] text-navy font-black tracking-tight uppercase">
                  {answer === true ? 'AFFIRMATIVE (YES)' : answer === false ? 'NEGATIVE (NO)' : String(answer)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="mt-auto pt-24 text-center">
        <div className="max-w-xl mx-auto space-y-4">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
             ClearVisa UK is not a law firm. This report is for preliminary guidance only.
           </p>
           <p className="text-[9px] text-rose-400 font-black uppercase tracking-widest">
             NOT A GUARANTEE OF VISA APPROVAL. FINAL VERDICT BY UK HOME OFFICE ONLY.
           </p>
        </div>
        <div className="mt-12 text-[8px] text-slate-300 font-black uppercase tracking-[0.4em]">
           CLEARVISA UK • LONDON • 2026
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;