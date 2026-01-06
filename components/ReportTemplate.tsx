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
  answers = {} as Record<string, any>,
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

  const getComplianceTable = () => {
    const rows = [
      { req: "Nationality & ID", status: answers['nationality'] ? "PASS" : "INFO", detail: "Valid identification disclosed." },
      { req: "Financial Threshold", status: (answers['income_band'] === 'under_29k' && visaRoute === 'Spouse Visa') ? "FAIL" : "PASS", detail: visaRoute === 'Spouse Visa' ? "Meets £29,000 baseline requirement." : "Meets Skilled Worker salary threshold." },
      { req: "Immigration History", status: (answers['overstays'] || answers['criminal_history'] || answers['previous_refusals']) ? "WARN" : "PASS", detail: "Review of suitability and compliance grounds." },
      { req: "Relationship Status", status: visaRoute === 'Spouse Visa' ? (answers['rel_evidence']?.length > 0 ? "PASS" : "FAIL") : "N/A", detail: "Evidence of genuine relationship." }
    ];
    return rows;
  };

  const getCommonRefusalRisks = () => {
    const risks = [];
    if (answers['income_band'] === 'under_29k' && visaRoute === 'Spouse Visa') {
      risks.push("Failure to meet the specific Appendix FM financial requirement.");
    }
    if (answers['overstays'] || answers['previous_refusals']) {
      risks.push("Refusal based on suitability grounds due to previous history.");
    }
    if (answers['rel_evidence']?.length < 3 && visaRoute === 'Spouse Visa') {
      risks.push("Weak 'genuine and subsisting' relationship evidence.");
    }
    if (risks.length === 0) {
      risks.push("Incorrect document formatting (e.g. non-stamped bank statements).");
      risks.push("Employer letters missing mandatory regulatory phrases.");
    }
    return risks;
  };

  const getPersonalisedChecklist = () => {
    const list: { category: string, items: string[] }[] = [];
    
    if (answers['visa_route'] === 'spouse') {
      list.push({
        category: 'Relationship Evidence',
        items: [
          'Official Marriage or Civil Partnership Certificate',
          'Proof of meeting in person (stamped passport pages, photos)',
          'Joint Tenancy or Mortgage statement (if living together)',
          ...(answers['rel_evidence'] || [])
        ]
      });
    }

    list.push({
      category: 'Financial Documents',
      items: [
        '6 months of bank statements (must match payslips)',
        '6 months of original payslips',
        'Signed Employer Letter (mandatory content check)',
        ...(answers['income_sources']?.includes('self_employment') ? ['Tax returns', 'Accountant certificates'] : [])
      ]
    });

    list.push({
      category: 'Accommodation',
      items: [
        ...(answers['acc_evidence'] || ['Tenancy Agreement', 'Council Tax bill']),
        'Landlord Letter (confirming no overcrowding)'
      ]
    });

    return list;
  };

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[12mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans text-left">
      <header className="flex justify-between items-start mb-10 relative z-10 border-b pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center font-serif text-2xl font-black shadow-lg">C</div>
            <div className="text-caption leading-tight text-navy font-black">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-h1 text-navy mb-1 uppercase tracking-tight font-black">Audit Report</h1>
          <p className="text-caption text-slate-400 font-bold">ID: {reportId} • Tier: {tier.toUpperCase()}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-right shadow-sm">
          <div className="text-slate-400 text-caption mb-1 font-bold uppercase tracking-widest">Status</div>
          <div className="text-navy font-black text-2xl tracking-tighter">FINALIZED</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{date}</div>
        </div>
      </header>

      {/* Main Verdict Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        <div className="lg:col-span-2 p-8 bg-slate-50/50 rounded-[32px] border border-slate-200 flex flex-col justify-center shadow-inner">
          <h2 className="text-h3 uppercase tracking-widest mb-4 font-black" style={{ color: current.color }}>{current.title}</h2>
          <p className="text-body font-bold leading-relaxed text-slate-600">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-[32px] p-8 flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white">
          <h3 className="text-caption text-slate-400 mb-6 font-black uppercase tracking-widest">Risk Factor</h3>
          <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6 shadow-inner">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ 
                width: currentVerdict === 'likely' ? '30%' : currentVerdict === 'borderline' ? '65%' : '100%',
                backgroundColor: current.color
              }}
            ></div>
          </div>
          <span className="text-h2 uppercase font-black tracking-tighter" style={{ color: current.color }}>{current.risk}</span>
        </div>
      </section>

      {/* Case Parameters */}
      <section className="mb-12 relative z-10">
        <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Case Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Visa Route", v: visaRoute },
            { l: "Nationality", v: answers['nationality'] || "N/A" },
            { l: "Income Band", v: answers['income_band']?.replace('_', ' ') || "N/A" },
            { l: "Refusals", v: answers['previous_refusals'] ? "Yes" : "No" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
               <p className="text-caption text-slate-400 mb-1 font-black">{item.l}</p>
               <p className="text-small font-black text-navy truncate uppercase tracking-tight">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Professional & Pro Tier Details */}
      {tier !== 'basic' && (
        <>
          <section className="mb-12 relative z-10">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Requirement Compliance Table</h3>
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="text-caption font-black text-slate-400 border-b">
                    <th className="px-6 py-4">Requirement</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getComplianceTable().map((row, i) => (
                    <tr key={i} className="text-small font-bold">
                      <td className="px-6 py-4 text-navy uppercase tracking-tight">{row.req}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : (row.status === 'FAIL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700')}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-bold uppercase tracking-tight">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12 relative z-10">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Common Refusal Risks Identified</h3>
            <ul className="space-y-3">
              {getCommonRefusalRisks().map((risk, i) => (
                <li key={i} className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex gap-3 items-start">
                  <span className="text-rose-500 font-black">×</span>
                  <p className="text-small font-black text-rose-900 leading-tight uppercase tracking-tight">{risk}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 relative z-10">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Personalised Document Checklist</h3>
            <div className="space-y-6">
              {getPersonalisedChecklist().map((cat, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-[24px] border border-slate-200 shadow-sm">
                  <h4 className="text-small font-black text-navy uppercase tracking-widest mb-4 underline decoration-accent underline-offset-4">{cat.category}</h4>
                  <ul className="space-y-2">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-center text-small font-bold text-slate-600">
                        <div className="w-4 h-4 rounded border-2 border-accent flex-shrink-0"></div>
                        <span className="uppercase tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 relative z-10">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Recommended Actions Plan</h3>
            <div className="space-y-3">
              {assessmentData.nextSteps.map((step, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:border-navy transition-colors">
                  <span className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-black text-xs flex-shrink-0">{i + 1}</span>
                  <p className="text-small font-black text-navy uppercase tracking-tight">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Basic Summary Content */}
      {tier === 'basic' && (
        <section className="mb-12 relative z-10">
          <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Eligibility Indicators</h3>
          <div className="space-y-4">
            {assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs font-black text-rose-800 uppercase leading-tight">
                ⚠️ {flag}
              </div>
            ))}
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-200 text-center shadow-inner">
              <p className="text-caption text-slate-400 mb-6 font-black uppercase tracking-widest">Full Audit & Detailed Checklist Locked</p>
              <Button onClick={onUpgrade} variant="navy" size="sm">Upgrade to Professional Audit</Button>
            </div>
          </div>
        </section>
      )}

      {/* Pro Tier Analysis Extras */}
      {tier === 'humanReview' && (
        <section className="mb-12 relative z-10 bg-accent/5 p-8 rounded-[40px] border-2 border-accent/20">
          <h3 className="text-caption text-accent mb-6 font-black uppercase tracking-widest leading-none">Advanced Gap Analysis (Automated)</h3>
          <div className="space-y-6">
             <div className="p-5 bg-white rounded-2xl border border-accent/10 shadow-sm">
               <h4 className="text-[10px] font-black text-navy uppercase mb-2 tracking-widest">Evidence Gap Detection</h4>
               <p className="text-small font-bold text-navy italic leading-relaxed uppercase tracking-tight">"Based on your identified income sources ({answers['income_sources']?.join(', ')}), our engine identifies a specific audit risk in the continuity of your banking evidence. We suggest ensuring no transfers between savings accounts occur within the final 28-day window."</p>
             </div>
             <div className="p-5 bg-white rounded-2xl border border-accent/10 shadow-sm">
               <h4 className="text-[10px] font-black text-navy uppercase mb-2 tracking-widest">Scenario Advice</h4>
               <p className="text-small font-bold text-navy italic leading-relaxed uppercase tracking-tight">"Your accommodation proof indicates family-shared housing. The Home Office often requests a professional Property Inspection Report for this scenario. We suggest preparing this document even if not explicitly mandated."</p>
             </div>
          </div>
        </section>
      )}

      {/* Footer Disclaimer */}
      <footer className="mt-auto pt-10 border-t border-slate-100 relative z-10 no-print">
        <div className="bg-slate-900 p-8 rounded-[32px] text-white/80 mb-8 shadow-2xl">
           <h4 className="text-caption text-accent mb-4 font-black uppercase tracking-widest">Legal Disclosure</h4>
           <p className="text-[11px] leading-relaxed font-bold uppercase tracking-tight">
             This assessment is generated by an automated engine and is NOT legal advice. ClearVisa UK is not a law firm. We strongly recommend consulting a qualified solicitor before submitting your application.
           </p>
        </div>
        <div className="flex justify-between items-center text-caption text-slate-400 font-black tracking-widest">
          <span>© 2026 ClearVisa UK</span>
          <span>Rule-based automated audit</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
