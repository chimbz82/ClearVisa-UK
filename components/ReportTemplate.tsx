import React from 'react';
import { AssessmentResult, QuestionConfig } from '../types';
import { analyzeEvidenceGaps } from '../utils/gapAnalysis';
import { PlanId, PLANS } from '../App';
import { triggerReportPdfDownload } from '../utils/downloadPdf';
import Button from './Button';
import { DocumentChecklist } from './DocumentChecklist';
import { ComplianceMatrix } from './ComplianceMatrix';

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
  reportId = `CV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  assessmentData,
  answers = {} as Record<string, any>,
  tier = 'basic',
  paidPlan,
  onUpgrade,
  onViewLegal,
  visibleQuestionsList
}) => {
  const isBasic = paidPlan === 'basic' || !paidPlan;
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
    <div className="bg-white mx-auto p-[15mm] md:p-[20mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative font-sans text-left shadow-2xl border border-slate-100 rounded-sm">
      
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

      {/* Question Limit Notice */}
      {paidPlan !== 'pro_plus' && (
        <div className="no-print mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h4 className="text-sm font-bold text-navy mb-2 uppercase">
                {paidPlan === 'basic' ? 'Basic Pre-Check (20 Questions)' : 'Professional Audit (40 Questions)'}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                You completed a {paidPlan === 'basic' ? 'Basic' : 'Professional'} assessment covering 
                {visibleQuestionsList.length} key compliance questions. 
                {paidPlan === 'basic' 
                  ? ' Upgrade to Professional Audit (40Q) or Professional Plus (full depth) for solicitor-style analysis.'
                  : ' Upgrade to Professional Plus for complete case deep-dive with all questions and evidence gap analysis.'}
              </p>
            </div>
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
      <section className="mb-12">
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
      <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 mb-8">
        <h3 className="text-lg font-bold text-navy mb-4 uppercase">
          Questions Answered Summary
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {visibleQuestionsList.map((q, idx) => (
            <div key={idx} className="text-xs font-medium text-slate-600 flex items-start gap-2">
              <span className="text-emerald-600">✓</span>
              <span>{q.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">
          Total data points collected: {visibleQuestionsList.length}
        </p>
      </div>

      {/* 5. DOCUMENT CHECKLIST - PROFESSIONAL & PRO PLUS */}
      {(paidPlan === 'full' || paidPlan === 'pro_plus') && (
        <DocumentChecklist 
          answers={answers}
          visaRoute={visaRoute}
          tier={paidPlan}
        />
      )}
      
      {/* 6. COMPLIANCE MATRIX - PROFESSIONAL & PRO PLUS */}
      {(paidPlan === 'full' || paidPlan === 'pro_plus') && (
        <ComplianceMatrix 
          answers={answers}
          visaRoute={visaRoute}
        />
      )}

      {/* 7. SECTION SCORES - PROFESSIONAL & PRO PLUS */}
      {(paidPlan === 'full' || paidPlan === 'pro_plus') && (
        <section className="mt-16 mb-16">
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

      {/* 8. GAPS & ACTIONS - PROFESSIONAL & PRO PLUS */}
      {(paidPlan === 'full' || paidPlan === 'pro_plus') && (
        <section className="mb-16">
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

      {/* 9. PRO PLUS EXCLUSIVE SECTION */}
      {paidPlan === 'pro_plus' && (
        <div className="mt-12 p-10 bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl border-2 border-accent/20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">⚡</span>
            <h3 className="text-2xl font-black text-navy uppercase tracking-tight">
              Professional Plus Insights
            </h3>
          </div>
          
          {/* Action Plan */}
          <div className="bg-white p-8 rounded-2xl mb-8 shadow-sm text-left">
            <h4 className="text-[12px] font-black text-navy mb-6 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
              Solicitor-Style Action Plan
            </h4>
            <ol className="space-y-6">
              <li className="flex gap-5">
                <span className="flex-shrink-0 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-black">1</span>
                <div>
                  <p className="text-[13px] font-black text-slate-700 mb-2 uppercase tracking-tight">Immediate Actions (Week 1)</p>
                  <ul className="text-xs text-slate-500 space-y-2 ml-4 font-bold">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Open joint bank account if missing</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Book SELT test if not passed</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Request employer letter on official letterhead</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="flex-shrink-0 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-black">2</span>
                <div>
                  <p className="text-[13px] font-black text-slate-700 mb-2 uppercase tracking-tight">Evidence Collection (Weeks 2-4)</p>
                  <ul className="text-xs text-slate-500 space-y-2 ml-4 font-bold">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Gather 6 months original payslips and bank statements</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Obtain utility bills in both names for same address</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Compile detailed relationship timeline with dated photos</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="flex-shrink-0 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-black">3</span>
                <div>
                  <p className="text-[13px] font-black text-slate-700 mb-2 uppercase tracking-tight">Final Review (Week 5)</p>
                  <ul className="text-xs text-slate-500 space-y-2 ml-4 font-bold">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Cross-check all documents against Appendix FM-SE</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Review covering letter for consistency</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 bg-slate-300 rounded-full"></span>Finalize and book visa appointment</li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>
          
          {/* Evidence Strengthening */}
          <div className="bg-white p-8 rounded-2xl mb-8 shadow-sm text-left">
            <h4 className="text-[12px] font-black text-navy mb-6 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
              Evidence Strengthening
            </h4>
            
            {assessmentData.verdict !== 'likely' ? (
              <div className="space-y-5">
                <div className="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
                  <p className="text-[11px] font-black text-amber-900 mb-2 uppercase tracking-widest">⚠️ Priority Compliance Issues:</p>
                  <p className="text-xs text-amber-800 font-bold leading-relaxed">
                    Based on your audit, we recommend focusing on these specific remediation steps to lower your risk profile.
                  </p>
                </div>
                
                {assessmentData.riskFlags.map((flag, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[12px] font-black text-slate-700 mb-3 uppercase tracking-tight">{flag}</p>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                      <span className="text-navy uppercase tracking-widest text-[9px] block mb-1">Strategically Remediate:</span>
                      {flag.includes('INCOME') && 'Review Category B or D routes. Combine secondary income sources or document 6 months of cash savings exceeding £16,000 threshold to supplement salary.'}
                      {flag.includes('HISTORY') || flag.includes('REFUSAL') && 'Submit a formal Subject Access Request (SAR) to UKVI. Address caseworker notes from previous refusals line-by-line in a dedicated covering letter.'}
                      {flag.includes('EVIDENCE') || flag.includes('RELATIONSHIP') && 'Strengthen cohabitation evidence by sourcing joint council tax bills, insurance policies, or formal witness statements from professional third parties.'}
                      {!flag.includes('INCOME') && !flag.includes('REFUSAL') && !flag.includes('RELATIONSHIP') && 'Consult with a qualified solicitor to prepare a robust legal representation letter addressing this specific concern.'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs text-emerald-800 font-bold leading-relaxed">
                  Your profile is strong. To maintain this status, ensure all photocopies are high-resolution and all bank statements are either original or stamped by the issuing branch as per Appendix FM-SE requirements.
                </p>
              </div>
            )}
          </div>
          
          {/* Templates */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
            <h4 className="text-[12px] font-black text-navy mb-6 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
              Critical Document Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-black text-slate-700 mb-3 uppercase tracking-widest">Employer Letter Guide</p>
                <div className="space-y-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Employee name and role</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Gross annual salary</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Length of employment</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Date salary last changed</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Official company signature</p>
                </div>
              </div>
              
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-black text-slate-700 mb-3 uppercase tracking-widest">Relationship Timeline</p>
                <div className="space-y-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>First meeting details</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Dates of in-person visits</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Engagement/Wedding dates</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Cohabitation milestones</p>
                  <p className="flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full"></span>Current living arrangements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. FULL AUDIT LOG (ALL TIERS) */}
      <section className="pt-24 border-t-4 border-slate-100 page-break-before">
        <h3 className="text-[12px] font-black text-navy uppercase tracking-[0.5em] mb-16 text-center">Full Audit Submission Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 px-10">
          {visibleQuestionsList.map((q) => {
            const answer = answers[q.id];
            if (answer === undefined) return null;
            return (
              <div key={q.id} className="border-b border-slate-50 pb-6 flex flex-col group text-left">
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