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
  tier?: string;
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
    likely: { 
      title: "LIKELY ELIGIBLE", 
      riskColor: "#2FBF71",
      riskLabel: "Low Risk",
      colorHex: "#059669" 
    },
    borderline: { 
      title: "BORDERLINE – ACTION REQUIRED", 
      riskColor: "#d97706",
      riskLabel: "Medium Risk",
      colorHex: "#d97706" 
    },
    unlikely: { 
      title: "HIGH RISK – UNLIKELY ELIGIBLE", 
      riskColor: "#e11d48",
      riskLabel: "High Risk",
      colorHex: "#e11d48" 
    }
  };

  const currentContent = verdictContent[currentVerdict];

  const summaryItems = [
    { label: "Visa Route", value: visaRoute },
    { label: "Location", value: answers['current_location']?.replace('_', ' ') || 'Not Provided' },
    { label: "Immigration History", value: answers['previous_refusals'] === 'no' ? 'No Refusals' : 'History Declared' },
    { label: "Assessment Tier", value: tier === 'full' ? 'Full Audit' : 'Human Expert Review' },
  ];

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[10mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col font-sans relative overflow-hidden">
      <div className="watermark hidden print:block uppercase tracking-[1.2em]">CLEARVISA UK – CONFIDENTIAL ASSESSMENT</div>

      <header className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center font-serif text-2xl font-black shadow-lg">C</div>
            <div className="text-[11px] font-black tracking-[0.2em] text-navy uppercase leading-tight">
              ClearVisa UK<br/>Eligibility Audit
            </div>
          </div>
          <h1 className="text-4xl font-black text-navy mb-2 uppercase tracking-tight leading-none">Immigration Assessment</h1>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">Report ID: {reportId} • Date: {date}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-[10px] font-black min-w-[200px] uppercase tracking-widest text-right">
          <div className="text-slate-400 mb-1">Status</div>
          <div className="text-navy text-lg leading-none">FINALIZED</div>
        </div>
      </header>

      <div className="h-[2px] bg-slate-100 w-full mb-8 relative z-10"></div>

      {/* Main Verdict */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 relative z-10">
        <div className="lg:col-span-2 border-4 rounded-[32px] p-8 border-slate-50 bg-white shadow-inner flex flex-col justify-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-4" style={{ color: currentContent.colorHex }}>{currentContent.title}</h2>
          <p className="text-sm font-bold leading-relaxed text-slate-600">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-[32px] p-8 flex flex-col items-center justify-center text-white shadow-xl">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 leading-none">Risk Score</h3>
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '30%' : currentVerdict === 'borderline' ? '65%' : '100%',
                backgroundColor: currentContent.riskColor
              }}
            ></div>
          </div>
          <span className="text-2xl font-black uppercase tracking-widest" style={{ color: currentContent.riskColor }}>{currentContent.riskLabel}</span>
        </div>
      </section>

      {/* Risk Factors & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 relative z-10">
        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-6 border-b-2 border-slate-50 pb-3">Identified Risk Factors</h3>
          <ul className="space-y-4">
            {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100 text-[12px] font-bold text-rose-700 leading-tight">
                <span className="text-lg leading-none">⚠️</span>
                {flag}
              </li>
            )) : (
              <li className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-[12px] font-bold text-emerald-700">No major risk flags detected based on provided answers.</li>
            )}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-6 border-b-2 border-slate-50 pb-3">Strategic Next Steps</h3>
          <ul className="space-y-4">
            {assessmentData.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[12px] font-bold text-slate-700 leading-tight">
                <span className="w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy font-black text-[10px]">{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Profile Summary */}
      <section className="mb-10 relative z-10">
        <h3 className="text-xs font-black text-navy uppercase tracking-[0.2em] mb-6 border-b-2 border-slate-50 pb-3">Audit Parameters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryItems.map((ans, i) => (
            <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">{ans.label}</p>
              <p className="text-[11px] font-black text-navy uppercase tracking-tight leading-none truncate">{ans.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upsell to Human Review */}
      {tier === 'full' && (
        <section className="no-print bg-amber-50 p-8 rounded-[32px] border-2 border-amber-200 mb-10 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-grow">
              <h4 className="text-xl font-black text-amber-900 uppercase tracking-tight mb-2 leading-none">Upgrade to Human Review</h4>
              <p className="text-sm font-bold text-amber-800 leading-relaxed max-w-md">
                Want an expert caseworker to verify these risk factors? Our Human Review Add-On includes a manual audit of your evidence and a follow-up Q&A.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Add-On Fee</p>
                <p className="text-3xl font-black text-amber-900 leading-none">£149</p>
              </div>
              <Button onClick={onUpgrade} variant="primary" size="md" className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">
                Upgrade Now
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto relative z-10">
        <div className="bg-slate-900 p-6 rounded-[24px] text-[10px] text-white/70 border border-navy shadow-inner leading-relaxed mb-6 font-medium">
          <h4 className="font-black mb-2 uppercase tracking-widest text-accent leading-none">Liability Disclaimer</h4>
          <p>
            This report is generated based on public UK Home Office guidance as of early 2024. It is not legal advice and does not substitute for a consultation with a qualified solicitor or OISC adviser. ClearVisa UK does not guarantee visa approval. Final decisions rest solely with UKVI caseworkers.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 text-[9px] text-slate-400 font-black tracking-[0.3em] uppercase pt-4 border-t border-slate-100">
          <span>© 2026 ClearVisa UK • {reportId}</span>
          <span>Not affiliated with the UK Government or Home Office.</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;