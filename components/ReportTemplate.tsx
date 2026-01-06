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
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ 
  applicantName = "Applicant", 
  visaRoute, 
  reportId = `CV-${Math.floor(100000 + Math.random() * 900000)}`,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  assessmentData,
  answers = {} as Record<string, any>,
  tier = 'full'
}) => {
  const currentVerdict = assessmentData.verdict;
  
  const verdictStyles = {
    likely: { title: "LIKELY ELIGIBLE", color: "#2FBF71", risk: "LOW" },
    borderline: { title: "BORDERLINE", color: "#D97706", risk: "MEDIUM" },
    unlikely: { title: "HIGH RISK / UNLIKELY", color: "#E11D48", risk: "HIGH" }
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

  const getDocumentChecklist = () => {
    const list: { category: string, items: string[] }[] = [];
    
    if (answers['visa_route'] === 'spouse') {
      list.push({
        category: 'Relationship Evidence',
        items: [
          'Official Marriage or Civil Partnership Certificate',
          'Evidence of living together (e.g. Joint Tenancy, Council Tax)',
          'Proof of meeting in person (stamped passport pages, photos)',
          ...(answers['rel_evidence'] || [])
        ]
      });
    }

    list.push({
      category: 'Financial Documents',
      items: [
        '6 months of personal bank statements matching payslips',
        '6 months of original payslips',
        'Signed Employer Letter confirming salary and tenure',
        ...(answers['income_sources']?.includes('savings') ? ['Cash savings statements (held for 6 months)'] : []),
        ...(answers['income_sources']?.includes('self_employment') ? ['Tax returns', 'Accountant certificates'] : [])
      ]
    });

    list.push({
      category: 'Accommodation & Identity',
      items: [
        'Valid Passport (current and previous)',
        'Housing Evidence (Tenancy agreement or Land Registry)',
        'Landlord Letter confirming permission and no overcrowding'
      ]
    });

    return list;
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
    <div className="bg-white mx-auto p-[15mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans text-left shadow-2xl">
      {/* Design accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B1F3B]/5 rounded-bl-full"></div>
      
      <header className="flex justify-between items-start mb-12 relative z-10 border-b pb-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#0B1F3B] text-white rounded-lg flex items-center justify-center font-serif text-xl font-black">C</div>
            <div className="text-[10px] leading-tight text-navy font-black uppercase tracking-widest">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-3xl text-navy font-black uppercase tracking-tight mb-1">Audit Report</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">ID: {reportId} • Date: {date}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-right">
          <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</div>
          <div className="text-navy font-black text-xl tracking-tighter uppercase">Finalized</div>
          <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Tier: {getTierDisplay()}</div>
        </div>
      </header>

      {/* Primary Verdict Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative z-10">
        <div className="md:col-span-2 p-8 bg-slate-50 rounded-[32px] border border-slate-200 flex flex-col justify-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4" style={{ color: current.color }}>Verdict: {current.title}</h2>
          <p className="text-base font-bold leading-relaxed text-slate-700">{assessmentData.summary}</p>
        </div>
        <div className="bg-[#0B1F3B] rounded-[32px] p-8 flex flex-col items-center justify-center text-white shadow-xl">
          <h3 className="text-[10px] text-slate-400 mb-4 font-black uppercase tracking-widest">Risk Factor</h3>
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '30%' : currentVerdict === 'borderline' ? '65%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </section>

      {/* Detailed Content */}
      <div className="space-y-12 mb-12 flex-grow">
        
        {/* Pro Tier Extras - Automated Evidence Gap Analysis */}
        {tier === 'humanReview' && (() => {
          const analysis = analyzeEvidenceGaps(answers, visaRoute);
          
          return (
            <section className="mb-12 bg-accent/5 p-8 rounded-[40px] border-2 border-accent/20">
              <h3 className="text-caption text-accent mb-6 font-black uppercase tracking-widest">
                Automated Evidence Gap Analysis
              </h3>
              
              {/* Identified Gaps */}
              {analysis.gaps.length > 0 ? (
                <div className="mb-8">
                  <h4 className="text-small text-navy mb-4 font-black uppercase tracking-tight">
                    Critical Evidence Gaps Identified:
                  </h4>
                  <div className="space-y-3">
                    {analysis.gaps.map((gap, idx) => (
                      <div key={idx} className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex gap-3 items-start">
                        <span className="text-rose-600 text-xl flex-shrink-0 mt-0.5">⚠️</span>
                        <p className="text-small font-bold text-rose-800 leading-tight">{gap}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl mb-8">
                  <p className="text-small font-bold text-emerald-800 text-center uppercase tracking-widest">
                    No critical evidence gaps detected based on your inputs.
                  </p>
                </div>
              )}
              
              {/* Suggested Improvements */}
              <div className="pt-6 border-t border-accent/20">
                <h4 className="text-small text-navy mb-4 font-black uppercase tracking-tight">
                  Personalized Case Improvement Recommendations:
                </h4>
                <ul className="space-y-3">
                  {analysis.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex gap-3 items-start p-4 bg-white rounded-xl border border-slate-200">
                      <span className="text-accent font-bold text-lg flex-shrink-0 mt-0.5">→</span>
                      <p className="text-small font-bold text-slate-700 leading-tight">{improvement}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pro Disclaimer */}
              <div className="mt-8 p-6 bg-navy/5 rounded-2xl border border-navy/10">
                <p className="text-caption text-navy font-bold italic leading-relaxed">
                  This automated analysis is based on public immigration rules and your responses. 
                  Complex cases may have nuances not captured here. Consider professional legal advice 
                  for cases with significant compliance concerns.
                </p>
              </div>
            </section>
          );
        })()}

        {/* Compliance Matrix - Only for Full tier or higher */}
        {(tier === 'full' || tier === 'humanReview') && (
          <section>
            <h3 className="text-xs font-black text-navy uppercase tracking-widest border-l-4 border-accent pl-4 mb-6">Requirement Compliance Matrix</h3>
            <div className="overflow-hidden border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Requirement</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Assessment Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getComplianceMatrix().map((row, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 text-navy font-bold uppercase tracking-tight">{row.req}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black ${
                          row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : 
                          row.status === 'WARN' ? 'bg-amber-100 text-amber-700' : 
                          row.status === 'FAIL' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-bold text-xs uppercase tracking-tight">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Risk Flags & Analysis */}
        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-widest border-l-4 border-accent pl-4 mb-6">Profile Sensitivity Indicators</h3>
          <div className="space-y-4">
            {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-4 p-5 bg-rose-50 border border-rose-100 rounded-2xl items-start">
                <div className="w-6 h-6 bg-rose-200 rounded-lg flex items-center justify-center text-rose-700 text-sm flex-shrink-0">!</div>
                <p className="text-xs font-black text-rose-900 uppercase tracking-tight leading-relaxed">{flag}</p>
              </div>
            )) : (
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-4 items-center">
                <div className="w-6 h-6 bg-emerald-200 rounded-lg flex items-center justify-center text-emerald-700 text-sm">✓</div>
                <p className="text-xs font-black text-emerald-900 uppercase tracking-tight">No critical compliance flags identified in core areas.</p>
              </div>
            )}
          </div>
        </section>

        {/* Document Checklist - Only for Full tier or higher */}
        {(tier === 'full' || tier === 'humanReview') && (
          <section>
            <h3 className="text-xs font-black text-navy uppercase tracking-widest border-l-4 border-accent pl-4 mb-6">Personalised Document Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getDocumentChecklist().map((cat, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-[24px] border border-slate-100">
                  <h4 className="text-[10px] font-black text-navy uppercase tracking-widest mb-4 border-b pb-2">{cat.category}</h4>
                  <ul className="space-y-2">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-[10px] font-bold text-slate-600 uppercase tracking-tight">
                        <div className="w-3 h-3 rounded border border-accent mt-0.5 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Steps */}
        <section>
          <h3 className="text-xs font-black text-navy uppercase tracking-widest border-l-4 border-accent pl-4 mb-6">Recommended Actions Plan</h3>
          <div className="grid grid-cols-1 gap-4">
            {assessmentData.nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-navy transition-colors group">
                <div className="w-8 h-8 bg-slate-100 text-navy group-hover:bg-navy group-hover:text-white rounded-xl flex items-center justify-center font-black text-xs transition-colors">
                  {i + 1}
                </div>
                <p className="text-xs font-black text-navy uppercase tracking-tight">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-auto pt-10 border-t border-slate-100 no-print">
        <div className="bg-[#0B1F3B] p-8 rounded-[32px] text-white/80 mb-8">
           <h4 className="text-[10px] text-accent mb-4 font-black uppercase tracking-widest">Important Disclosure</h4>
           <p className="text-[10px] leading-relaxed font-bold uppercase tracking-tight">
             This audit is generated by an automated rule-based engine and is not a replacement for qualified legal advice. ClearVisa UK is not a law firm. Accuracy depends entirely on user-submitted information. Only the Home Office can approve or refuse a visa.
           </p>
        </div>
        <div className="flex justify-between items-center text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
          <span>© 2026 ClearVisa UK</span>
          <span>Rule-based automated assessment</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;