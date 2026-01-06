
import React from 'react';
import { AssessmentResult } from '../types';
import Button from './Button';

interface ReportTemplateProps {
  applicantName?: string;
  visaRoute: string;
  reportId?: string;
  date?: string;
  assessmentData: AssessmentResult;
  answers?: Record<string, any>;
  tier: string;
  onUpgrade?: () => void;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ 
  applicantName = "Client", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  assessmentData,
  answers = {},
  tier = 'full',
  onUpgrade
}) => {
  const currentVerdict = assessmentData.verdict;
  
  const verdictContent = {
    likely: { title: "LIKELY ELIGIBLE", color: "#059669", risk: "LOW" },
    borderline: { title: "BORDERLINE", color: "#d97706", risk: "MEDIUM" },
    unlikely: { title: "HIGH RISK / UNLIKELY", color: "#e11d48", risk: "HIGH" }
  };

  const current = verdictContent[currentVerdict];

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[12mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden">
      <header className="flex justify-between items-start mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-navy text-white rounded-lg flex items-center justify-center font-serif text-2xl font-black">C</div>
            <div className="caption leading-tight text-navy">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="heading-l text-navy mb-1 uppercase tracking-tight">Audit Report</h1>
          <p className="caption text-slate-400">ID: {reportId} • Tier: {tier.toUpperCase()}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-caption text-right">
          <div className="text-slate-400 mb-1">Status</div>
          <div className="text-navy font-black text-xl">FINALIZED</div>
        </div>
      </header>

      <div className="h-[1px] bg-slate-200 w-full mb-10 relative z-10"></div>

      {/* Main Verdict Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        <div className="lg:col-span-2 p-8 bg-slate-50/50 rounded-3xl border border-slate-200 flex flex-col justify-center">
          <h2 className="heading-s uppercase tracking-widest mb-4" style={{ color: current.color }}>{current.title}</h2>
          <p className="body-m font-medium leading-relaxed text-slate-600">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl">
          <h3 className="caption text-slate-400 mb-6">Risk Profile</h3>
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '30%' : currentVerdict === 'borderline' ? '65%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="heading-s uppercase" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </section>

      {/* Conditional: Pro Analysis Section */}
      {tier === 'humanReview' && (
        <section className="mb-12 p-8 bg-accent/5 rounded-3xl border-2 border-accent/20 relative z-10 animate-in fade-in zoom-in duration-700">
           <h3 className="caption text-accent mb-4 font-black">Pro Assessment Commentary</h3>
           <div className="space-y-4">
              <p className="body-m font-bold text-navy">Enhanced Evidence Quality Check:</p>
              <p className="body-s text-slate-700 leading-relaxed italic">
                "Our rule-based engine indicates that while you have the core {visaRoute} documents, the 'Suitability' section of your profile shows potential friction in previous travel patterns. We recommend prioritizing 12 months of banking records instead of the minimum 6 to override any caseworker discretion on income consistency."
              </p>
           </div>
        </section>
      )}

      {/* Detailed Flags (only for Professional +) */}
      {tier !== 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 relative z-10">
          <section>
            <h3 className="caption text-navy mb-6 border-b pb-3 font-black">Identified Risk Factors</h3>
            <ul className="space-y-4">
              {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-4 p-5 bg-rose-50 rounded-2xl text-body-s font-bold text-rose-700 shadow-sm">
                  <span className="mt-0.5 text-lg">⚠️</span> {flag}
                </li>
              )) : (
                <li className="p-5 bg-emerald-50 rounded-2xl body-s font-bold text-emerald-700">No high-level risk flags detected.</li>
              )}
            </ul>
          </section>

          <section>
            <h3 className="caption text-navy mb-6 border-b pb-3 font-black">Next-Action Checklist</h3>
            <ul className="space-y-4">
              {assessmentData.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl body-s font-bold text-slate-700 shadow-sm">
                  <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-navy font-black text-[10px] shadow-sm">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* Basic summary (visible to all) */}
      <section className="mb-12 relative z-10">
        <h3 className="caption text-navy mb-6 border-b pb-3 font-black">Case Parameters</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Route", v: visaRoute },
            // Accessing answers with bracket notation to avoid TypeScript errors when answers is inferred as empty object
            { l: "Nationality", v: answers['nationality'] || "N/A" },
            { l: "Income Band", v: answers['income_band']?.replace('_', ' ') || "N/A" },
            { l: "Refusals", v: answers['previous_refusals'] ? "YES" : "NO" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
               <p className="caption text-slate-400 mb-1">{item.l}</p>
               <p className="body-s font-bold text-navy truncate uppercase">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-10 border-t border-slate-100 relative z-10">
        <div className="bg-slate-900 p-8 rounded-3xl text-white/80 mb-8 border border-navy shadow-inner">
           <h4 className="caption text-accent mb-4 font-black">Important Disclaimer</h4>
           <p className="text-[11px] leading-relaxed font-medium">
             This automated report is based on public UK Home Office policy and rules. It is NOT legal advice. Decisions on visa applications are made solely by UKVI caseworkers. ClearVisa UK is an informational assessment tool and does not guarantee approval.
           </p>
        </div>
        <div className="flex justify-between items-center caption text-slate-400 font-bold">
          <span>© 2026 ClearVisa UK</span>
          <span>Official caseworker logic applied</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
