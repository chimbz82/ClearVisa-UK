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
    likely: { title: "LIKELY ELIGIBLE", color: "#10B981", risk: "LOW" },
    borderline: { title: "BORDERLINE", color: "#F59E0B", risk: "MEDIUM" },
    unlikely: { title: "HIGH RISK / UNLIKELY", color: "#EF4444", risk: "HIGH" }
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
    <div className="bg-white mx-auto p-[12mm] md:p-[20mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans text-left shadow-2xl border border-slate-200">
      {/* Design accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#0B1F3B]/5 rounded-bl-full"></div>
      
      <header className="flex justify-between items-start mb-12 relative z-10 border-b-2 border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#0B1F3B] text-white rounded-xl flex items-center justify-center font-black text-2xl">C</div>
            <div className="text-[12px] leading-tight text-navy font-black uppercase tracking-widest">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-4xl text-navy font-black uppercase tracking-tight mb-1">Audit Report</h1>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.25em]">ID: {reportId} • Date: {date}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-right shadow-inner">
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</div>
          <div className="text-navy font-black text-2xl tracking-tighter uppercase">Finalized</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase mt-1 px-3 py-1 bg-white border border-slate-200 rounded-full inline-block">Tier: {getTierDisplay()}</div>
        </div>
      </header>

      {/* Primary Verdict Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        <div className="md:col-span-2 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 flex flex-col justify-center shadow-sm">
          <h2 className="text-[12px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: current.color }}>Verdict: {current.title}</h2>
          <p className="text-lg font-bold leading-relaxed text-slate-700">{assessmentData.summary}</p>
        </div>
        <div className="bg-[#0B1F3B] rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
          <h3 className="text-[10px] text-slate-400 mb-4 font-black uppercase tracking-[0.2em] relative z-10">Risk Factor</h3>
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4 shadow-inner">
            <div 
              className="h-full transition-all duration-1000 ease-out shadow-md"
              style={{ 
                width: currentVerdict === 'likely' ? '25%' : currentVerdict === 'borderline' ? '60%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter relative z-10" style={{ color: current.color }}>{current.risk} RISK</span>
        </div>
      </section>

      {/* Detailed Content */}
      <div className="space-y-12 mb-12 flex-grow">
        
        {/* Pro Tier Extras - Automated Evidence Gap Analysis */}
        {tier === 'humanReview' && (() => {
          const analysis = analyzeEvidenceGaps(answers, visaRoute);
          
          return (
            <section className="bg-emerald-50/50 p-10 rounded-[3rem] border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-lg shadow-md">📊</div>
                <h3 className="text-[13px] text-navy font-black uppercase tracking-widest">
                  Personalised Evidence Gap Analysis
                </h3>
              </div>
              
              {/* Identified Gaps */}
              {analysis.gaps.length > 0 ? (
                <div className="mb-10">
                  <h4 className="text-[11px] text-slate-400 mb-4 font-black uppercase tracking-[0.15em]">
                    Identified Evidence Gaps:
                  </h4>
                  <div className="space-y-3">
                    {analysis.gaps.map((gap, idx) => (
                      <div key={idx} className="p-5 bg-white border border-rose-100 rounded-2xl flex gap-4 items-start shadow-sm border-l-4 border-l-rose-500">
                        <span className="text-rose-500 text-xl flex-shrink-0 mt-0.5">⚠️</span>
                        <p className="text-[13px] font-bold text-slate-700 leading-relaxed">{gap}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-emerald-500 text-white rounded-2xl mb-10 shadow-lg text-center">
                  <p className="text-[13px] font-black uppercase tracking-[0.2em]">
                    No critical evidence gaps detected based on inputs
                  </p>
                </div>
              )}
              
              {/* Suggested Improvements */}
              <div className="pt-8 border-t border-emerald-100">
                <h4 className="text-[11px] text-slate-400 mb-4 font-black uppercase tracking-[0.15em]">
                  Recommended Improvements:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {analysis.improvements.map((improvement, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-500 transition-colors">
                      <span className="text-emerald-500 font-black text-xl flex-shrink-0 mt-0.5">→</span>
                      <p className="text-[13px] font-bold text-slate-700 leading-relaxed">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Compliance Matrix - Only for Full tier or higher */}
        {(tier === 'full' || tier === 'humanReview') && (
          <section>
            <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-4 mb-6">Compliance Assessment Matrix</h3>
            <div className="overflow-hidden border-2 border-slate-100 rounded-[2rem] shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b-2 border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-5">Requirement</th>
                    <th className="px-8 py-5 text-center">Status</th>
                    <th className="px-8 py-5">Assessment Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getComplianceMatrix().map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-5 text-navy font-black text-[13px] uppercase tracking-tight">{row.req}</td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm ${
                          row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                          row.status === 'WARN' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                          row.status === 'FAIL' ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-500 font-bold text-[12px] uppercase tracking-tight leading-relaxed">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Profile Indicators */}
        <section>
          <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-4 mb-6">Profile Flag Analysis</h3>
          <div className="space-y-4">
            {assessmentData.riskFlags.length > 0 ? assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-4 p-6 bg-rose-50 border border-rose-100 rounded-[1.5rem] items-center shadow-inner border-l-4 border-l-rose-500">
                <div className="w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-md">!</div>
                <p className="text-[12px] font-black text-rose-900 uppercase tracking-tight leading-relaxed">{flag}</p>
              </div>
            )) : (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[1.5rem] flex gap-4 items-center shadow-inner border-l-4 border-l-emerald-500">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-md">✓</div>
                <p className="text-[12px] font-black text-emerald-900 uppercase tracking-tight">Profile core areas compliant with current public rules.</p>
              </div>
            )}
          </div>
        </section>

        {/* Document Checklist - Only for Full tier or higher */}
        {(tier === 'full' || tier === 'humanReview') && (
          <section>
            <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-4 mb-6">Personalized Evidence Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getDocumentChecklist().map((cat, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                  <h4 className="text-[10px] font-black text-navy uppercase tracking-[0.2em] mb-6 border-b-2 border-white pb-3">{cat.category}</h4>
                  <ul className="space-y-3">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-[11px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed">
                        <div className="w-4 h-4 rounded border-2 border-emerald-500 mt-0.5 flex-shrink-0 bg-white"></div>
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
          <h3 className="text-[11px] font-black text-navy uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-4 mb-6">Recommended Action Plan</h3>
          <div className="grid grid-cols-1 gap-4">
            {assessmentData.nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-5 p-6 bg-white border-2 border-slate-100 rounded-[1.75rem] shadow-sm hover:border-navy transition-all group hover:translate-x-1">
                <div className="w-10 h-10 bg-slate-100 text-navy group-hover:bg-navy group-hover:text-white rounded-[1rem] flex items-center justify-center font-black text-sm transition-all shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[13px] font-black text-navy uppercase tracking-tight leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-auto pt-12 border-t-2 border-slate-100 no-print">
        <div className="bg-[#0B1F3B] p-10 rounded-[2.5rem] text-white/80 mb-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
           <h4 className="text-[11px] text-emerald-400 mb-5 font-black uppercase tracking-[0.2em]">Mandatory Disclosure</h4>
           <p className="text-[11px] leading-relaxed font-bold uppercase tracking-widest text-white/60">
             This audit is generated by an automated assessment engine based on public immigration rules. It is NOT legal advice and does not replace the counsel of an OISC-regulated solicitor. Accuracy depends entirely on user inputs. ClearVisa UK is not affiliated with the UK Home Office.
           </p>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
          <span>© 2026 ClearVisa UK</span>
          <span>Security Level: SSL-Verified Automated Assessment</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
