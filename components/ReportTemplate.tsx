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
            <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center font-serif text-xl font-black">C</div>
            <div className="text-caption leading-tight text-navy">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-h1 text-navy mb-1 uppercase tracking-tight">Audit Report</h1>
          <p className="text-caption text-slate-400">ID: {reportId} • Tier: {tier.toUpperCase()}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-caption text-right">
          <div className="text-slate-400 mb-1 font-bold">Status</div>
          <div className="text-navy font-black text-xl">FINALIZED</div>
        </div>
      </header>

      <div className="h-[1px] bg-slate-200 w-full mb-10 relative z-10"></div>

      {/* Main Verdict Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        <div className="lg:col-span-2 p-8 bg-slate-50/50 rounded-2xl border border-slate-200 flex flex-col justify-center">
          <h2 className="text-h3 uppercase tracking-widest mb-4" style={{ color: current.color }}>{current.title}</h2>
          <p className="text-small font-medium leading-relaxed text-slate-600">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-2xl p-8 flex flex-col items-center justify-center text-white shadow-lg">
          <h3 className="text-caption text-slate-400 mb-6 font-bold">Risk Profile</h3>
          <div className="relative w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '30%' : currentVerdict === 'borderline' ? '65%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="text-h3 uppercase" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </section>

      {/* Detailed Flags (only for Full/Pro tiers) */}
      {tier !== 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 relative z-10">
          <section>
            <h3 className="text-caption text-navy mb-6 border-b pb-3 font-bold uppercase tracking-widest">Identified Risk Factors</h3>
            <ul className="space-y-4">
              {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl text-small font-bold text-rose-700 leading-tight">
                  <span className="mt-0.5">⚠️</span> {flag}
                </li>
              )) : (
                <li className="p-4 bg-emerald-50 rounded-xl text-small font-bold text-emerald-700">No critical risk flags detected.</li>
              )}
            </ul>
          </section>

          <section>
            <h3 className="text-caption text-navy mb-6 border-b pb-3 font-bold uppercase tracking-widest">Next-Action Steps</h3>
            <ul className="space-y-4">
              {assessmentData.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl text-small font-bold text-slate-700 leading-tight">
                  <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-navy text-[10px] font-black">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* Case Summary (Visible to all) */}
      <section className="mb-12 relative z-10">
        <h3 className="text-caption text-navy mb-6 border-b pb-3 font-bold uppercase tracking-widest">Case Parameters</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Visa Route", v: visaRoute },
            { l: "Nationality", v: answers['nationality'] || "N/A" },
            { l: "Income Level", v: answers['income_band']?.replace('_', ' ') || "N/A" },
            { l: "Refusal History", v: answers['previous_refusals'] ? "Yes" : "No" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
               <p className="text-caption text-slate-400 mb-1 font-bold">{item.l}</p>
               <p className="text-small font-bold text-navy truncate">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="mt-auto pt-10 border-t border-slate-100 relative z-10">
        <div className="bg-slate-900 p-8 rounded-2xl text-white/80 mb-8 shadow-inner">
           <h4 className="text-caption text-accent mb-4 font-bold uppercase tracking-widest">Important Disclaimer</h4>
           <p className="text-[11px] leading-relaxed font-medium">
             This report is an automated assessment tool based on publicly available UK Home Office guidance. It is NOT legal advice. Decisions on visa applications are made solely by UKVI caseworkers. ClearVisa UK does not guarantee approval or any specific outcome.
           </p>
        </div>
        <div className="flex justify-between items-center text-caption text-slate-400 font-bold tracking-widest">
          <span>© 2026 ClearVisa UK</span>
          <span>Official rule-based engine audit</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;