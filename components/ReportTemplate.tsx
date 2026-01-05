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

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[10mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden">
      <header className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center font-serif text-xl font-black">C</div>
            <div className="text-caption leading-tight text-navy">
              ClearVisa UK<br/>Eligibility Audit
            </div>
          </div>
          <h1 className="text-h1 text-navy mb-1 uppercase tracking-tight">Audit Report</h1>
          <p className="text-caption text-slate-400">ID: {reportId} • Generated: {date}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-caption text-right">
          <div className="text-slate-400 mb-1">Status</div>
          <div className="text-navy font-black text-lg">FINALIZED</div>
        </div>
      </header>

      <div className="h-[1px] bg-slate-200 w-full mb-8 relative z-10"></div>

      {/* Main Verdict */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 relative z-10">
        <div className="lg:col-span-2 app-card p-8 bg-slate-50/50 border border-slate-200 flex flex-col justify-center">
          <h2 className="text-h3 uppercase tracking-widest mb-3" style={{ color: currentContent.colorHex }}>{currentContent.title}</h2>
          <p className="text-body-sm font-semibold leading-relaxed text-slate-600">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl">
          <h3 className="text-caption text-slate-400 mb-4">Risk Level</h3>
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '30%' : currentVerdict === 'borderline' ? '65%' : '100%',
                backgroundColor: currentContent.riskColor
              }}
            ></div>
          </div>
          <span className="text-h3 uppercase" style={{ color: currentContent.riskColor }}>{currentContent.riskLabel}</span>
        </div>
      </section>

      {/* Risk Factors & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 relative z-10">
        <section>
          <h3 className="text-caption text-navy mb-4 border-b pb-2">Risk Factors</h3>
          <ul className="space-y-3">
            {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl text-body-sm font-bold text-rose-700">
                <span className="mt-0.5">⚠️</span>
                {flag}
              </li>
            )) : (
              <li className="p-4 bg-emerald-50 rounded-xl text-body-sm font-bold text-emerald-700">No critical barriers detected.</li>
            )}
          </ul>
        </section>

        <section>
          <h3 className="text-caption text-navy mb-4 border-b pb-2">Strategic Steps</h3>
          <ul className="space-y-3">
            {assessmentData.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl text-body-sm font-bold text-slate-700">
                <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-navy text-[10px]">{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Upsell */}
      {tier === 'full' && (
        <section className="no-print bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-grow">
              <h4 className="text-h3 text-amber-900 mb-1">Expert Case Verification</h4>
              <p className="text-body-sm font-bold text-amber-800">
                Need these risks verified by a pro? Get a manual audit and follow-up consultation.
              </p>
            </div>
            <Button onClick={onUpgrade} variant="primary" className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">
              Upgrade to Human Review
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t border-slate-100">
        <p className="text-caption text-slate-400 mb-4">
          This document is an informational tool based on publicly available guidance. It is NOT legal advice.
        </p>
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <span>© 2026 ClearVisa UK</span>
          <span>Officialcaseworker logic applied</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;