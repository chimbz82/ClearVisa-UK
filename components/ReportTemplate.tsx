import React from 'react';
import { AssessmentResult, QuestionConfig } from '../types';
import { analyzeEvidenceGaps } from '../utils/gapAnalysis';
import { PlanId, PLANS } from '../App';
import { triggerReportPdfDownload } from '../utils/downloadPdf';
import Button from './Button';
import { ComplianceMatrix } from './ComplianceMatrix';
import { DocumentChecklist } from './DocumentChecklist';

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
    <div className="bg-white mx-auto p-[20mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative font-sans text-left shadow-2xl border border-slate-100 rounded-sm">
      
      {/* 1. UPGRADE STRIP (NO-PRINT) */}
      {!isProPlus && (
        <div className="no-print mb-10 p-8 bg-navy text-white rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h4 className="text-base font-black uppercase tracking-widest mb-2">Upgrade your Audit depth</h4>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Unlock personalized document checklists and solicitor remediation steps.</p>
          </div>
          <div className="flex gap-4">
             {isBasic && (
               <button onClick={() => onUpgrade?.('full')} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[11px] font-black uppercase tracking-widest border border-white/20 transition-all">
                 Full Audit (+£50)
               </button>
             )}
             <button onClick={() => onUpgrade?.('pro_plus')} className="px-6 py-3 bg-accent hover:bg-accent/90 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg transition-all">
               Pro Plus (+£{isBasic ? '70' : '20'})
             </button>
          </div>
        </div>
      )}

      {/* 2. AVIATION GRADE HEADER */}
      <header className="flex justify-between items-start mb-16 border-b-4 border-navy pb-12">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center font-black text-2xl shadow-lg">C</div>
            <div className="flex flex-col">
               <h1 className="text-3xl font-black text-navy uppercase tracking-[0.25em] leading-none">AUDIT RECORD</h1>
               <span className="text-[11px] font-black text-accent uppercase tracking-[0.3em] mt-2 italic">ClearVisa UK Compliance Assessment</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">FILE REFERENCE</p>
              <p className="text-sm font-black text-navy">{reportId}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">AUDIT LEVEL</p>
              <p className="text-sm font-black text-accent uppercase tracking-widest">{tier.replace('_', ' ')}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">VISA ROUTE</p>
              <p className="text-sm font-black text-navy uppercase tracking-tight">{visaRoute}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DATE ISSUED</p>
              <p className="text-sm font-black text-navy">{date}</p>
            </div>
          </div>
        </div>
        
        <div className={`p-10 rounded-2xl border-4 text-center min-w-[280px] shadow-sm ${current.bg} ${current.border}`}>
           <span className="text-[11px] text-slate-500 font-black uppercase block mb-3 tracking-[0.3em]">Risk Profile</span>
           <span className="text-4xl font-black uppercase tracking-tighter block mb-2" style={{ color: current.color }}>{current.risk}</span>
           <div className={`h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden mt-4`}>
              <div className="h-full transition-all duration-1000" style={{ backgroundColor: current.color, width: current.risk === 'LOW' ? '90%' : current.risk === 'MEDIUM' ? '50%' : '15%' }}></div>
           </div>
        </div>
      </header>

      {/* 3. EXECUTIVE SUMMARY */}
      <section className="mb-16">
        <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200/50 shadow-inner">
          <h2 className="text-[12px] font-black uppercase tracking-[0.5em] mb-10 text-slate-400 text-center">Executive Compliance Verdict</h2>
          <div className="space-y-8">
             <p className="text-3xl font-black text-navy uppercase tracking-tight text-center">{current.title}</p>
             <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
                <p className="text-lg font-bold leading-relaxed text-slate-700 italic border-l-8 border-accent pl-10">"{assessmentData.summary}"</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. QUESTIONS ANSWERED SUMMARY - ALL TIERS */}
      <div className="bg-slate-50 p-10 rounded-[2rem] border-2 border-slate-100 mb-16 shadow-sm">
        <h3 className="text-[12px] font-black text-navy mb-8 uppercase tracking-[0.4em] border-b border-slate-200 pb-4">
          Audit Submission Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleQuestionsList.map((q, idx) => (
            <div key={idx} className="text-[10px] font-bold text-slate-600 flex items-center gap-3">
              <span className="text-emerald-600 text-lg">✓</span>
              <span className="uppercase tracking-tight leading-tight">{q.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] font-black text-slate-400 mt-10 pt-6 border-t border-slate-200 uppercase tracking-widest">
          Total compliance data points audited: {visibleQuestionsList.length}
        </p>
      </div>

      {/* 5. COMPLIANCE MATRIX (PROFESSIONAL+) */}
      {(isFull || isProPlus) && (
        <ComplianceMatrix answers={answers} visaRoute={visaRoute} />
      )}

      {/* 6. SECTION SCORES (PROFESSIONAL+) */}
      {(isFull || isProPlus) && (
        <section className="mb-16 mt-16">
          <h3 className="text-[12px] font-black text-navy uppercase tracking-[0.5em] mb-10 border-b border-slate-100 pb-4">Detailed Criteria breakdown</h3>
          <div className="overflow-hidden border border-slate-200 rounded-3xl shadow-sm">
            <table className="w-full text-left text-[12px] border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-10 py-6">CATEGORY</th>
                  <th className="px-10 py-6 text-center">RISK LEVEL</th>
                  <th className="px-10 py-6">AUDIT FINDING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assessmentData.sectionScores.map((section, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6 text-navy font-black uppercase tracking-tight">{section.name}</td>
                    <td className="px-10 py-6 text-center">
                      <span className={`px-5 py-2 rounded-lg text-[10px] font-black inline-block min-w-[90px] ${
                        section.risk === 'LOW' ? 'bg-emerald-100 text-emerald-700' : 
                        section.risk === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {section.risk}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-slate-500 font-bold leading-relaxed">{section.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 7. DOCUMENT CHECKLIST (PROFESSIONAL+) */}
      {(isFull || isProPlus) && (
        <DocumentChecklist answers={answers} visaRoute={visaRoute} tier={paidPlan || 'basic'} />
      )}

      {/* 8. GAPS & ACTIONS (PROFESSIONAL+) */}
      {(isFull || isProPlus) && (
        <section className="mb-16 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-12 border-t-8 border-rose-500 rounded-3xl bg-slate-50 shadow-sm">
              <h4 className="text-[11px] font-black text-navy uppercase tracking-widest mb-10 border-b border-slate-200 pb-5">Evidence Gaps Identified</h4>
              <ul className="space-y-6">
                {gapAnalysis.gaps.map((gap, i) => (
                  <li key={i} className="text-[12px] font-bold text-slate-600 flex gap-5 items-start">
                    <span className="text-rose-500 font-black text-2xl leading-none">!</span> 
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-12 border-t-8 border-emerald-500 rounded-3xl bg-slate-50 shadow-sm">
              <h4 className="text-[11px] font-black text-navy uppercase tracking-widest mb-10 border-b border-slate-200 pb-5">Compliance action plan</h4>
              <ul className="space-y-6">
                {assessmentData.nextSteps.map((step, i) => (
                  <li key={i} className="text-[12px] font-bold text-slate-600 flex gap-5 items-start">
                    <span className="text-emerald-600 font-black text-2xl leading-none">✓</span> 
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 9. STRATEGIC REMEDIATION (PRO PLUS ONLY) */}
      {isProPlus && (
        <section className="mb-20 bg-navy rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden mt-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-[12px] font-black text-accent uppercase tracking-[0.6em] mb-14 text-center">Strategic remediation guidance</h3>
          <div className="space-y-12">
            {assessmentData.remediationSteps?.map((step, i) => (
              <div key={i} className="flex gap-10 border-b border-white/5 pb-10 last:border-0">
                 <span className="text-5xl font-black text-accent/20 select-none">0{i+1}</span>
                 <div className="space-y-4">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.25em]">{step.issue}</p>
                    <p className="text-base font-medium text-slate-300 leading-relaxed italic border-l-4 border-accent/40 pl-8">"{step.resolution}"</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. FULL AUDIT LOG (ALL TIERS) */}
      <section className="pt-24 border-t-4 border-slate-100 page-break-before">
        <h3 className="text-[12px] font-black text-navy uppercase tracking-[0.5em] mb-16 text-center">Full Audit Submission Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 px-10">
          {visibleQuestionsList.map((q) => {
            const answer = answers[q.id];
            if (answer === undefined) return null;
            return (
              <div key={q.id} className="border-b border-slate-50 pb-6 flex flex-col group">
                <p className="text-[9px] text-slate-400 font-black uppercase mb-3 leading-tight tracking-[0.1em] group-hover:text-navy transition-colors">{q.label}</p>
                <p className="text-[14px] text-navy font-black tracking-tight uppercase">
                  {answer === true ? 'AFFIRMATIVE' : answer === false ? 'NEGATIVE' : String(answer).toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="mt-auto pt-32 text-center">
        <div className="max-w-xl mx-auto space-y-5">
           <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] leading-relaxed">
             ClearVisa UK is an automated information system and not a law firm.
           </p>
           <p className="text-[10px] text-rose-400 font-black uppercase tracking-[0.4em] px-8 py-3 border-2 border-rose-50 rounded-full inline-block">
             PRELIMINARY ASSESSMENT ONLY • NO VISA GUARANTEED
           </p>
        </div>
        <div className="mt-16 text-[9px] text-slate-300 font-black uppercase tracking-[0.6em]">
           LONDON • UK COMPLIANCE AUDIT • 2026
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;