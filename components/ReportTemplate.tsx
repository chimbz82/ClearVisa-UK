
import React from 'react';
import { AssessmentResult, QuestionConfig } from '../types';
import { analyzeEvidenceGaps } from '../utils/gapAnalysis';
// Fix: Removed incorrect import of QUESTIONS from ../App as it is not exported there
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
  const currentVerdict = assessmentData.verdict;
  
  const verdictStyles = {
    likely: { title: "LIKELY ELIGIBLE", color: "#16A34A", risk: "LOW" },
    borderline: { title: "BORDERLINE", color: "#D97706", risk: "MEDIUM" },
    unlikely: { title: "HIGH RISK / UNLIKELY", color: "#DC2626", risk: "HIGH" }
  };

  const current = verdictStyles[currentVerdict];

  const getComplianceMatrix = () => {
    const rows = [
      { req: "Nationality & ID", status: answers['nationality'] ? "PASS" : "INFO", detail: "Valid identification and nationality disclosed." },
      { req: "Financial Threshold", status: (answers['income_band'] === 'under_29k' && visaRoute === 'Spouse Visa') ? "FAIL" : "PASS", detail: visaRoute === 'Spouse Visa' ? "£29,000 baseline." : "Skilled Worker baseline." },
      { req: "Relationship Genuineness", status: (answers['live_together'] === 'never' || answers['rel_evidence']?.length < 3) ? "WARN" : "PASS", detail: "Volume and nature of relationship proof." },
      { req: "Immigration History", status: (answers['criminal_records'] || answers['nhs_debt'] || answers['previous_refusals']) ? "WARN" : "PASS", detail: "Suitability and character review." },
      { req: "English Language", status: answers['english_route'] !== 'no' ? "PASS" : "WARN", detail: "Ability to communicate in English requirement." }
    ];
    return rows;
  };

  const getTierDisplay = () => {
    switch (tier) {
      case 'pro_plus': return 'Professional Plus';
      case 'full': return 'Professional Audit';
      case 'basic': return 'Basic Pre-Check';
      default: return 'Eligibility Audit';
    }
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
        <h3 className="text-xl font-bold text-navy mb-4 uppercase tracking-tight">Unlock Deeper Audit Detail</h3>
        <p className="text-sm text-slate-600 mb-6 font-medium">Your current tier includes a high-level verdict. Upgrade to see detailed document checklists and gap analysis.</p>
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
      <header className="flex justify-between items-start mb-8 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl text-navy font-bold tracking-tight mb-1 uppercase">ClearVisa UK Audit</h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">ID: {reportId} • Date: {date} • Tier: {getTierDisplay()}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl text-right border border-slate-200">
           <span className="text-[8px] text-slate-500 font-bold uppercase block">Verdict Status</span>
           <span className="text-lg font-black uppercase" style={{ color: current.color }}>{current.title}</span>
        </div>
      </header>

      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-slate-400">Executive Summary</h2>
        <p className="text-sm font-bold leading-relaxed text-slate-700">{assessmentData.summary}</p>
        
        {assessmentData.riskFlags.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-rose-500">Critical Risk Flags</h3>
            {assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-2 items-start p-3 bg-rose-50 border border-rose-100 rounded-xl">
                <span className="text-rose-500 font-bold text-sm">!</span>
                <p className="text-[10px] font-bold text-rose-700 uppercase tracking-tight">{flag}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="space-y-10 flex-grow">
        {/* ADVANCED CONTENT FOR PROFESSIONAL+ */}
        {(tier === 'full' || tier === 'pro_plus') && (
          <>
            <section>
              <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-2 mb-4">Compliance Matrix</h3>
              <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-left text-[10px] border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-4 py-2.5">Requirement</th>
                      <th className="px-4 py-2.5 text-center">Status</th>
                      <th className="px-4 py-2.5">Assessment Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {getComplianceMatrix().map((row, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2.5 text-navy font-bold">{row.req}</td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black inline-block min-w-[45px] ${
                            row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 
                            row.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-500 font-medium">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {tier === 'pro_plus' && (
              <section className="bg-navy rounded-2xl p-6 text-white">
                <h3 className="text-[9px] font-black text-accent uppercase tracking-[0.2em] mb-4">Solicitor-Style Action Plan</h3>
                <div className="space-y-3">
                  {assessmentData.nextSteps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start border-l border-white/10 pl-4">
                      <span className="text-accent font-black">{i + 1}</span>
                      <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* AUDIT HISTORY - MANDATORY FOR ALL TIERS */}
        <section className="pt-8 border-t border-slate-100">
          <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] mb-4">Full Audit History (Your Answers)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
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
                <div key={q.id} className="border-b border-slate-50 pb-2">
                  <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">{q.label}</p>
                  <p className="text-[10px] text-navy font-bold">{displayAnswer}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {renderUpgradeSection()}

      <footer className="mt-12 pt-6 border-t border-slate-100">
        <p className="text-[8px] text-slate-400 font-bold uppercase leading-relaxed text-center">
          CLEARVISA UK IS AN AUTOMATED INFORMATION TOOL. NOT A LAW FIRM. NO LEGAL ADVICE PROVIDED. NOT AFFILIATED WITH THE HOME OFFICE.
        </p>
      </footer>
    </div>
  );
};

export default ReportTemplate;
