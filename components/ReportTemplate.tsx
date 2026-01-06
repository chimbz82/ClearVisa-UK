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
      { req: "Nationality & ID", status: answers['nationality'] ? "PASS" : "INFO", detail: "Valid identification and nationality disclosed." },
      { req: "Financial Threshold", status: (answers['income_band'] === 'under_29k' && visaRoute === 'Spouse Visa') ? "FAIL" : "PASS", detail: visaRoute === 'Spouse Visa' ? "£29,000 threshold requirement." : "Skilled Worker salary threshold." },
      { req: "Relationship Status", status: visaRoute === 'Spouse Visa' ? (answers['rel_evidence']?.length > 0 ? "PASS" : "FAIL") : "N/A", detail: "Requirement for genuine and subsisting relationship." },
      { req: "Immigration History", status: (answers['overstays'] || answers['criminal_history'] || answers['previous_refusals']) ? "FAIL" : "PASS", detail: "Suitability grounds and previous compliance." },
      { req: "Accommodation", status: answers['acc_evidence']?.length > 0 ? "PASS" : "INFO", detail: "Requirement for adequate housing without public funds." }
    ];
    return rows;
  };

  const getCommonRefusalRisks = () => {
    const risks = [];
    if (answers['income_band'] === 'under_29k' && visaRoute === 'Spouse Visa') {
      risks.push("Failure to meet the specific Appendix FM financial requirement.");
    }
    if (answers['overstays'] || answers['previous_refusals']) {
      risks.push("Refusal based on suitability grounds due to previous immigration history.");
    }
    if (answers['rel_evidence']?.length < 3 && visaRoute === 'Spouse Visa') {
      risks.push("Inability to prove a 'genuine and subsisting' relationship through objective documentation.");
    }
    if (risks.length === 0) {
      risks.push("Errors in form completion or incorrect document formatting (e.g. bank statements missing stamps).");
      risks.push("Failure to provide original employer letters meeting specific UKVI criteria.");
    }
    return risks;
  };

  const getPersonalisedChecklist = () => {
    const list: { category: string, items: string[] }[] = [];
    
    if (answers['visa_route'] === 'spouse') {
      list.push({
        category: 'Relationship Evidence',
        items: [
          'Marriage or Civil Partnership Certificate (official original)',
          'Proof of meeting in person (stamped passport pages, photos)',
          'Evidence of living together (joint tenancy, joint bills)',
          ...(answers['rel_evidence'] || [])
        ]
      });
    }

    list.push({
      category: 'Financial Documents',
      items: [
        '6 months of personal bank statements matching payslips exactly',
        '6 months of original payslips with employer verification',
        'Signed Employer Letter confirming salary, tenure, and contract type',
        ...(answers['income_sources']?.includes('self_employment') ? ['Accountant certificates', 'SA302 forms', 'Tax returns'] : [])
      ]
    });

    list.push({
      category: 'Accommodation',
      items: [
        ...(answers['acc_evidence'] || ['Tenancy Agreement', 'Council Tax bill']),
        'Landlord Letter confirming no overcrowding and permission for partner'
      ]
    });

    return list;
  };

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[12mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans">
      <header className="flex justify-between items-start mb-10 relative z-10 border-b pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center font-serif text-2xl font-black shadow-lg">C</div>
            <div className="text-caption leading-tight text-navy font-black">ClearVisa UK<br/>Eligibility Audit</div>
          </div>
          <h1 className="text-h1 text-navy mb-1 uppercase tracking-tight">Audit Report</h1>
          <p className="text-caption text-slate-400 font-bold">ID: {reportId} • Tier: {tier.toUpperCase()}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-right shadow-sm">
          <div className="text-slate-400 text-caption mb-1 font-bold">Status</div>
          <div className="text-navy font-black text-2xl tracking-tighter">FINALIZED</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{date}</div>
        </div>
      </header>

      {/* Main Verdict Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        <div className="lg:col-span-2 p-8 bg-slate-50/50 rounded-[32px] border border-slate-200 flex flex-col justify-center shadow-inner">
          <h2 className="text-h3 uppercase tracking-widest mb-4 font-black" style={{ color: current.color }}>{current.title}</h2>
          <p className="text-body font-medium leading-relaxed text-slate-600">{assessmentData.summary}</p>
        </div>
        <div className="bg-navy rounded-[32px] p-8 flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white">
          <h3 className="text-caption text-slate-400 mb-6 font-bold uppercase tracking-widest">Risk Profile</h3>
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
        <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Case Parameters</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Visa Route", v: visaRoute },
            { l: "Nationality", v: answers['nationality'] || "N/A" },
            { l: "Income Level", v: answers['income_band']?.replace('_', ' ') || "N/A" },
            { l: "Refusals", v: answers['previous_refusals'] ? "Yes" : "No" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
               <p className="text-caption text-slate-400 mb-1 font-bold">{item.l}</p>
               <p className="text-small font-black text-navy truncate uppercase tracking-tight">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Table (Full/Pro) */}
      {tier !== 'basic' && (
        <section className="mb-12 relative z-10">
          <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Requirement Compliance Matrix</h3>
          <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr className="text-caption font-bold text-slate-400 border-b">
                  <th className="px-6 py-4">Requirement</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4">Detailed Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getComplianceTable().map((row, i) => (
                  <tr key={i} className="text-small">
                    <td className="px-6 py-4 text-navy font-bold uppercase tracking-tight">{row.req}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${row.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' : (row.status === 'FAIL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700')}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Refusal Risks & Next Steps (Basic Summary) */}
      {tier === 'basic' && (
        <section className="mb-12 relative z-10">
          <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Summary of Pointers</h3>
          <div className="space-y-4">
            {assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-800 uppercase leading-tight">
                ⚠️ {flag}
              </div>
            ))}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-caption text-slate-400 mb-4">Detailed Audit & Checklist Locked</p>
              <Button onClick={onUpgrade} variant="navy" size="sm">Upgrade to Professional Audit</Button>
            </div>
          </div>
        </section>
      )}

      {/* Professional & Pro Details */}
      {tier !== 'basic' && (
        <>
          <section className="mb-12 relative z-10">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Common Refusal Risks for your Profile</h3>
            <ul className="space-y-3">
              {getCommonRefusalRisks().map((risk, i) => (
                <li key={i} className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex gap-3 items-start">
                  <span className="text-rose-500 font-bold">×</span>
                  <p className="text-small font-bold text-rose-900 leading-tight">{risk}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 relative z-10">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Personalised Document Checklist</h3>
            <div className="space-y-6">
              {getPersonalisedChecklist().map((cat, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-[24px] border border-slate-200">
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

      {/* Pro Analysis Extras */}
      {tier === 'humanReview' && (
        <section className="mb-12 relative z-10 bg-accent/5 p-8 rounded-[40px] border-2 border-accent/20">
          <h3 className="text-caption text-accent mb-6 font-black uppercase tracking-widest">Advanced Evidence Analysis (Automated)</h3>
          <div className="space-y-4">
             <div className="p-4 bg-white rounded-2xl border border-accent/10">
               <h4 className="text-[10px] font-black text-navy uppercase mb-2">Evidence Gap Warning</h4>
               <p className="text-small font-bold text-navy italic">"Your income source involves {answers['income_sources']?.join(' & ')}. This typically requires 12 months of evidence if self-employment is included, even if current earnings are high."</p>
             </div>
             <div className="p-4 bg-white rounded-2xl border border-accent/10">
               <h4 className="text-[10px] font-black text-navy uppercase mb-2">Compliance Tip</h4>
               <p className="text-small font-bold text-navy italic">"UKVI often rejects marriage certificates that are not certified translations. Ensure yours is verified by an OISC-approved agency."</p>
             </div>
          </div>
        </section>
      )}

      {/* Standard Legal Footer */}
      <footer className="mt-auto pt-10 border-t border-slate-100 relative z-10 no-print">
        <div className="bg-slate-900 p-8 rounded-[32px] text-white/80 mb-8 shadow-2xl">
           <h4 className="text-caption text-accent mb-4 font-black uppercase tracking-widest leading-none">Important Legal Disclosure</h4>
           <p className="text-[11px] leading-relaxed font-medium">
             This audit is generated using an automated rule-based engine and is not a law firm. It does not constitute legal advice. Accuracy depends entirely on user inputs. Only the Home Office can approve or refuse a visa. We recommend consulting a qualified solicitor before submitting your application.
           </p>
        </div>
        <div className="flex justify-between items-center text-caption text-slate-400 font-black tracking-widest">
          <span>© 2026 ClearVisa UK</span>
          <span>Official rule-based automated engine</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
