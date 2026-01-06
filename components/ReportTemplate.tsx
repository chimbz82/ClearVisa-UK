import React from 'react';
import { AssessmentResult } from '../types';
import { analyzeEvidenceGaps } from '../utils/gapAnalysis';

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
  applicantName = "Applicant", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  assessmentData,
  answers = {} as Record<string, any>,
  tier = 'full',
  onUpgrade
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
      case 'humanReview': return 'Professional Plus';
      case 'full': return 'Professional Audit';
      case 'basic': return 'Basic Pre-Check';
      default: return 'Eligibility Audit';
    }
  };

  return (
    <div className="bg-white mx-auto p-[10mm] md:p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans text-left shadow-lg border border-slate-200 rounded-lg">
      {/* Floating Badge for Enhanced Analysis */}
      {tier === 'humanReview' && (
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-50 shadow-md">
          ⚡ Enhanced Analysis
        </div>
      )}

      {/* Design accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-bl-full"></div>
      
      <header className="flex justify-between items-start mb-10 relative z-10 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-navy text-white rounded flex items-center justify-center font-black text-xl">C</div>
            <div className="text-[11px] leading-tight text-navy font-black uppercase tracking-widest">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-3xl text-navy font-bold tracking-tight mb-1 uppercase">Audit Report</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">ID: {reportId} • Date: {date}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-right">
          <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</div>
          <div className="text-navy font-black text-xl tracking-tight uppercase">Finalized</div>
          <div className="text-[9px] text-slate-500 font-bold uppercase mt-1 px-2 py-0.5 bg-white border border-slate-200 rounded-full inline-block">Tier: {getTierDisplay()}</div>
        </div>
      </header>

      {/* Primary Verdict Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 relative z-10">
        <div className="md:col-span-2 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-center">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: current.color }}>Verdict: {current.title}</h2>
          <p className="text-base font-bold leading-relaxed text-slate-700">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-2xl p-6 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full"></div>
          <h3 className="text-[9px] text-slate-400 mb-3 font-black uppercase tracking-[0.2em] relative z-10">Risk Factor</h3>
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3 shadow-inner">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '25%' : currentVerdict === 'borderline' ? '60%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="text-xl font-black uppercase tracking-tight relative z-10" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </section>

      {/* Detailed Content */}
      <div className="space-y-10 mb-10 flex-grow">
        
        {/* Professional Plus Evidence Gap Analysis */}
        {tier === 'humanReview' && (() => {
          const analysis = analyzeEvidenceGaps(answers, visaRoute);
          return (
            <section className="bg-accent/5 p-6 rounded-2xl border border-accent/20 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-accent text-white rounded flex items-center justify-center text-sm shadow-sm">📊</div>
                <h3 className="text-[12px] text-navy font-bold uppercase tracking-widest">
                  Evidence Gap Analysis
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3">
                  <h4 className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] px-1">Identified Issues</h4>
                  {analysis.gaps.map((gap, idx) => (
                    <div key={idx} className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex gap-3 items-start border-l-4 border-l-rose-500">
                      <span className="text-rose-500 text-base flex-shrink-0 mt-0.5">⚠️</span>
                      <p className="text-[12px] font-bold text-slate-700 leading-relaxed">{gap}</p>
                    </div>
                  ))}
                  {analysis.gaps.length === 0 && <p className="text-[11px] text-slate-400 italic px-1">No critical gaps detected.</p>}
                </div>
                
                <div className="space-y-3 pt-4 border-t border-accent/10">
                  <h4 className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] px-1">Recommended Improvements</h4>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex gap-3 items-start p-4 bg-emerald-50 rounded-xl border border-emerald-100 border-l-4 border-l-emerald-500">
                        <span className="text-emerald-500 font-black text-base flex-shrink-0 mt-0.5">→</span>
                        <p className="text-[12px] font-bold text-slate-700 leading-relaxed">{improvement}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Compliance Matrix */}
        {(tier === 'full' || tier === 'humanReview') && (
          <section>
            <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3 mb-5">Compliance Assessment Matrix</h3>
            <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Requirement</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Assessment Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getComplianceMatrix().map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-navy font-bold tracking-tight">{row.req}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black inline-block min-w-[50px] ${
                          row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 
                          row.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 
                          row.status === 'FAIL' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium leading-relaxed">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Risk Flags */}
        <section>
          <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3 mb-5">Profile Flag Analysis</h3>
          <div className="space-y-3">
            {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl items-center border-l-4 border-l-rose-500">
                <div className="w-6 h-6 bg-rose-500 text-white rounded flex items-center justify-center text-[10px] font-black flex-shrink-0 shadow-sm">!</div>
                <p className="text-[11px] font-bold text-rose-900 leading-relaxed uppercase tracking-tight">{flag}</p>
              </div>
            )) : (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3 items-center border-l-4 border-l-emerald-500">
                <div className="w-6 h-6 bg-emerald-500 text-white rounded flex items-center justify-center text-[10px] font-black flex-shrink-0 shadow-sm">✓</div>
                <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-tight">Core areas compliant with current public rules.</p>
              </div>
            )}
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h3 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3 mb-5">Recommended Action Plan</h3>
          <div className="grid grid-cols-1 gap-3">
            {assessmentData.nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm group hover:border-navy transition-all">
                <div className="w-8 h-8 bg-slate-100 text-navy group-hover:bg-navy group-hover:text-white rounded flex items-center justify-center font-black text-[11px] transition-all shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[12px] font-bold text-navy uppercase tracking-tight leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Professional Plus Upgrade Section */}
      {tier === 'full' && onUpgrade && (
        <section className="mt-12 bg-gradient-to-br from-accent/5 to-accent/10 p-10 rounded-[40px] border-2 border-accent/30 relative overflow-hidden no-print">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                ⚡
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-caption text-accent font-black uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
                  UPGRADE AVAILABLE
                </span>
              </div>
              <h3 className="text-h3 text-navy mb-4 uppercase tracking-tight leading-tight">
                Unlock Evidence Gap Analysis
              </h3>
              <p className="text-body text-slate-700 mb-6 font-medium leading-relaxed">
                Add automated gap detection, personalized improvement suggestions, and extended narrative questions to strengthen your application. One-time upgrade of £99.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-small text-slate-700 font-bold uppercase tracking-tight">
                    Evidence Gap Analysis
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-small text-slate-700 font-bold uppercase tracking-tight">
                    Extended Narrative Questions
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-small text-slate-700 font-bold uppercase tracking-tight">
                    Deeper Case Review
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-small text-slate-700 font-bold uppercase tracking-tight">
                    Personalized Improvements
                  </span>
                </div>
              </div>
              
              <button 
                onClick={onUpgrade}
                className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-accent/90 transition-colors shadow-lg"
              >
                Upgrade to Professional Plus - £99
              </button>
            </div>
          </div>
        </section>
      )}

      <footer className="mt-auto pt-8 border-t border-slate-100 no-print">
        <div className="bg-navy p-6 rounded-2xl text-white/80 mb-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
           <h4 className="text-[10px] text-emerald-400 mb-3 font-black uppercase tracking-[0.2em]">Mandatory Disclosure</h4>
           <p className="text-[10px] leading-relaxed font-bold uppercase tracking-widest text-white/60">
             Not legal advice. Accuracy depends on user inputs. ClearVisa UK is not affiliated with the UK Home Office. Final decisions made by UKVI.
           </p>
        </div>
        <div className="flex justify-between items-center text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
          <span>© 2026 ClearVisa UK</span>
          <span>Security Level: SSL-Verified Automated Audit</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
