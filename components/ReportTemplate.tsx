import React from 'react';
import { AssessmentResult } from '../types';
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
  onViewLegal
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
      { req: "Financial Threshold", status: (answers['income_band'] === 'under_29k' && visaRoute === 'Spouse Visa') ? "FAIL" : "PASS", detail: visaRoute === 'Spouse Visa' ? "£29,000 threshold check." : "Skilled Worker salary baseline check." },
      { req: "Relationship Proof", status: visaRoute === 'Spouse Visa' ? (answers['rel_evidence']?.length > 0 ? "PASS" : "FAIL") : "N/A", detail: "Proof of genuine and subsisting relationship." },
      { req: "Immigration History", status: (answers['overstays_detail'] || answers['criminal_records'] || answers['previous_refusals']) ? "WARN" : "PASS", detail: "History and suitability compliance review." },
      { req: "English Language", status: answers['english_test'] && answers['english_test'] !== 'no' ? "PASS" : "WARN", detail: "Ability to communicate in English requirement." }
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

    let heading = "Get a deeper audit of your case";
    let subheading = "Upgrade for a fuller risk analysis and detailed document checklist.";
    let options: { tier: PlanId; label: string; priceExtra: number }[] = [];

    if (paidPlan === 'basic') {
      options = [
        { tier: 'full', label: 'Professional Audit', priceExtra: 50 },
        { tier: 'pro_plus', label: 'Professional Plus', priceExtra: 70 }
      ];
    } else if (paidPlan === 'full') {
      heading = "Upgrade to Professional Plus";
      subheading = "Unlock deeper evidence gap analysis and solicitor-ready summary.";
      options = [
        { tier: 'pro_plus', label: 'Professional Plus', priceExtra: 20 }
      ];
    }

    return (
      <section className="mt-12 bg-gradient-to-br from-accent/5 to-accent/10 p-8 md:p-10 rounded-[2.5rem] border-2 border-accent/30 relative overflow-hidden no-print">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              ⚡
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] text-accent font-black uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
                {paidPlan === 'basic' ? 'Expand Analysis' : 'Recommended for complex cases'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3 uppercase tracking-tight">
              {heading}
            </h3>
            <p className="text-sm text-slate-700 mb-6 font-medium leading-relaxed max-w-xl">
              {subheading}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8">
              {[
                "Deeper Evidence Gap Analysis",
                "Extra Narrative Questions",
                "Practical Document Upgrade Suggestions",
                "Solicitor-Ready Summary"
              ].map(feat => (
                <div key={feat} className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-[10px] text-slate-700 font-bold uppercase tracking-tight">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {options.map((opt) => (
                <button 
                  key={opt.tier}
                  onClick={() => onUpgrade?.(opt.tier)}
                  className="bg-accent text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-accent/90 transition-all shadow-lg active:scale-[0.98]"
                >
                  {opt.label} – pay £{opt.priceExtra} extra
                </button>
              ))}
            </div>
            <div className="text-[9px] text-slate-400 font-medium leading-tight px-1 mt-4">
              By proceeding, you agree to our{' '}
              <button onClick={() => onViewLegal?.('terms')} className="underline hover:text-slate-600">Terms</button>,{' '}
              <button onClick={() => onViewLegal?.('privacy')} className="underline hover:text-slate-600">Privacy</button>, and{' '}
              <button onClick={() => onViewLegal?.('refunds')} className="underline hover:text-slate-600">Refund Policy</button>.
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-white mx-auto p-[10mm] md:p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans text-left shadow-lg border border-slate-200 rounded-lg">
      {tier === 'pro_plus' && (
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-50 shadow-md">
          ⚡ Enhanced Analysis
        </div>
      )}

      <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-bl-full"></div>
      
      <header className="flex justify-between items-start mb-8 relative z-10 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-navy text-white rounded flex items-center justify-center font-black text-lg">C</div>
            <div className="text-[10px] leading-tight text-navy font-black uppercase tracking-widest">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-2xl text-navy font-bold tracking-tight mb-1 uppercase">Audit Report</h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">ID: {reportId} • Date: {date}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
          <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</div>
          <div className="text-navy font-black text-lg tracking-tight uppercase">Finalized</div>
          <div className="text-[8px] text-slate-500 font-bold uppercase mt-1 px-2 py-0.5 bg-white border border-slate-200 rounded-full inline-block">Tier: {getTierDisplay()}</div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 relative z-10">
        <div className="md:col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: current.color }}>Verdict: {current.title}</h2>
          <p className="text-sm font-bold leading-relaxed text-slate-700">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-2xl p-5 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-full"></div>
          <h3 className="text-[8px] text-slate-400 mb-2 font-black uppercase tracking-[0.2em] relative z-10">Risk Factor</h3>
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2 shadow-inner">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '25%' : currentVerdict === 'borderline' ? '60%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="text-lg font-black uppercase tracking-tight relative z-10" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </section>

      <div className="space-y-8 mb-8 flex-grow">
        {tier === 'pro_plus' && (() => {
          const analysis = analyzeEvidenceGaps(answers, visaRoute);
          return (
            <section className="bg-accent/5 p-5 rounded-2xl border border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-accent text-white rounded flex items-center justify-center text-xs shadow-sm">📊</div>
                <h3 className="text-[11px] text-navy font-bold uppercase tracking-widest">
                  Evidence Gap Analysis
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <h4 className="text-[8px] text-slate-400 font-black uppercase tracking-[0.15em] px-1">Identified Issues</h4>
                  {analysis.gaps.map((gap, idx) => (
                    <div key={idx} className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex gap-3 items-start border-l-4 border-l-rose-500">
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed">{gap}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-3 border-t border-accent/10">
                  <h4 className="text-[8px] text-slate-400 font-black uppercase tracking-[0.15em] px-1">Recommended Improvements</h4>
                  <ul className="space-y-1.5">
                    {analysis.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex gap-2 items-start p-3 bg-emerald-50 rounded-xl border border-emerald-100 border-l-4 border-l-emerald-500">
                        <p className="text-[11px] font-bold text-slate-700 leading-relaxed">{improvement}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })()}

        {(tier === 'full' || tier === 'pro_plus') && (
          <section>
            <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-2 mb-4">Compliance Assessment Matrix</h3>
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
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 text-navy font-bold">{row.req}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black inline-block min-w-[45px] ${
                          row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 
                          row.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 
                          row.status === 'FAIL' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400'
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
        )}

        <section>
          <h3 className="text-[9px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-2 mb-4">Recommended Action Plan</h3>
          <div className="grid grid-cols-1 gap-2">
            {assessmentData.nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm group hover:border-navy transition-all">
                <div className="w-6 h-6 bg-slate-100 text-navy group-hover:bg-navy group-hover:text-white rounded flex items-center justify-center font-black text-[10px] transition-all">
                  {i + 1}
                </div>
                <p className="text-[11px] font-bold text-navy uppercase tracking-tight">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {renderUpgradeSection()}

      <footer className="mt-auto pt-6 border-t border-slate-100 no-print">
        <div 
          onClick={triggerReportPdfDownload}
          className="bg-navy p-4 rounded-xl text-white/80 mb-4 relative overflow-hidden cursor-pointer hover:bg-navy/90 transition-colors"
        >
           <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full"></div>
           <h4 className="text-[9px] text-emerald-400 mb-1.5 font-black uppercase tracking-[0.2em]">Download PDF Summary</h4>
           <p className="text-[8px] leading-relaxed font-bold uppercase tracking-widest text-white/50">
             Not legal advice. ClearVisa UK is not a law firm. Accuracy depends on user inputs. Final decisions made exclusively by UKVI.
           </p>
        </div>
        <div className="flex justify-between items-center text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] pb-2">
          <span>© 2026 ClearVisa UK</span>
          <span>Security Level: SSL-Verified Automated Audit</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;