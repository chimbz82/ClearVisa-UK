
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
  // Fix: cast the default empty object to Record<string, any> to prevent narrowing to {}
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

  // Logic for personalised checklist (Professional/Pro only)
  const getPersonalisedChecklist = () => {
    const list: { category: string, items: string[] }[] = [];
    
    // Relationship
    // Fix: Access property via bracket notation for Record compatibility
    if (answers['visa_route'] === 'spouse') {
      list.push({
        category: 'Relationship Evidence',
        items: [
          'Marriage or Civil Partnership Certificate (original)',
          'Proof of meeting in person (photos, boarding passes)',
          // Fix: Access property via bracket notation for Record compatibility
          ...(answers['living_arrangement'] === 'joint' ? ['Joint Tenancy or Mortgage statement'] : []),
          // Fix: Access property via bracket notation for Record compatibility
          ...(answers['rel_evidence'] || [])
        ]
      });
    }

    // Financial
    list.push({
      category: 'Financial Documents',
      items: [
        '6 months of personal bank statements matching payslips',
        '6 months of original payslips',
        'Formal Employer Letter confirming salary, tenure, and contract type',
        // Fix: Access property via bracket notation for Record compatibility
        ...(answers['fin_req_method'] === 'savings' ? ['Bank statements showing savings held for 6+ months'] : [])
      ]
    });

    // Accommodation
    list.push({
      category: 'Accommodation Evidence',
      items: [
        // Fix: Access properties via bracket notation for Record compatibility
        ...(answers['uk_living_plan'] === 'rent' ? ['Current Tenancy Agreement'] : []),
        ...(answers['uk_living_plan'] === 'own' ? ['Land Registry Title or Mortgage statement'] : []),
        ...(answers['uk_living_plan'] === 'family' ? ['Letter of permission from home owner', 'Evidence of owner status (Title/Mortgage)'] : []),
        'Council Tax bill for the property'
      ]
    });

    return list;
  };

  return (
    <div className="a4-page bg-white shadow-2xl mx-auto p-[12mm] text-slate-800 max-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden font-sans">
      {/* Premium Header */}
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
          <h3 className="text-caption text-slate-400 mb-6 font-bold uppercase tracking-widest">Risk Level</h3>
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

      {/* Case Parameters (Always present) */}
      <section className="mb-12 relative z-10">
        <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Case Parameters</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Visa Route", v: visaRoute },
            // Fix: Access properties via bracket notation for Record compatibility
            { l: "Nationality", v: answers['nationality'] || "N/A" },
            { l: "Income Level", v: answers['income_band']?.replace('_', ' ') || "N/A" },
            { l: "Refusals", v: answers['previous_refusals'] ? "Yes" : "No" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
               <p className="text-caption text-slate-400 mb-1 font-bold">{item.l}</p>
               <p className="text-small font-black text-navy truncate uppercase tracking-tight">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Basic Tier Content */}
      {tier === 'basic' && (
        <section className="mb-12">
          <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">High Level Risk Profile</h3>
          <div className="space-y-4">
            {assessmentData.riskFlags.map((flag, i) => (
              <div key={i} className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex gap-4 items-center">
                <span className="text-2xl">⚠️</span>
                <p className="text-small font-bold text-rose-800 uppercase tracking-tight">{flag}</p>
              </div>
            ))}
            <div className="p-8 bg-slate-50 border border-slate-200 rounded-[32px] mt-8 text-center">
              <p className="text-small font-bold text-slate-500 mb-4 uppercase tracking-widest">Full Personalized Checklist & Step-by-Step Plan Locked</p>
              <Button onClick={onUpgrade} variant="navy" size="sm">Upgrade for Professional Audit</Button>
            </div>
          </div>
        </section>
      )}

      {/* Professional & Pro Tier Content */}
      {tier !== 'basic' && (
        <>
          <section className="mb-12">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Detailed Risk Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {assessmentData.riskFlags.map((flag, i) => (
                 <div key={i} className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3">
                   <span className="flex-shrink-0 text-lg">⚠️</span>
                   <p className="text-xs font-bold text-rose-800 leading-tight uppercase">{flag}</p>
                 </div>
               ))}
               {assessmentData.riskFlags.length === 0 && (
                 <div className="col-span-2 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <p className="text-small font-bold text-emerald-800 text-center uppercase tracking-widest">No critical compliance failures detected.</p>
                 </div>
               )}
            </div>
          </section>

          <section className="mb-12">
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

          <section className="mb-12">
            <h3 className="text-caption text-navy mb-6 font-black uppercase tracking-widest border-l-4 border-navy pl-4">Step-by-Step Next Actions</h3>
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

      {/* Pro Tier Extras */}
      {tier === 'humanReview' && (
        <section className="mb-12 bg-accent/5 p-8 rounded-[40px] border-2 border-accent/20">
          <h3 className="text-caption text-accent mb-6 font-black uppercase tracking-widest">Automated Evidence Gap Analysis</h3>
          <div className="space-y-4">
            {/* Fix: Access property via bracket notation for Record compatibility */}
            <p className="text-body font-bold text-navy italic">
              "Based on your inputs regarding {answers['living_arrangement'] === 'joint' ? 'joint tenancy' : 'separate living'}, the primary gap identified is the lack of overlapping utility evidence for the final 6-month period. We suggest obtaining a formal Landlord Letter explicitly naming both applicants to bridge this evidence gap."
            </p>
            <div className="pt-4 border-t border-accent/20">
               <h4 className="text-caption text-navy mb-2 font-black uppercase">Suggested Case Improvements</h4>
               <ul className="list-disc pl-5 text-small font-bold text-slate-700 space-y-1 uppercase tracking-tight">
                 <li>Ensure bank statements are original or stamped by the branch.</li>
                 <li>Verify salary deposits match payslip net totals exactly.</li>
                 <li>Prepare a timeline of relationship milestones for caseworker clarity.</li>
               </ul>
            </div>
          </div>
        </section>
      )}

      {/* Footer Disclaimer */}
      <footer className="mt-auto pt-10 border-t border-slate-100 relative z-10 no-print">
        <div className="bg-slate-900 p-8 rounded-[32px] text-white/80 mb-8 shadow-2xl">
           <h4 className="text-caption text-accent mb-4 font-black uppercase tracking-widest">Important Disclosure</h4>
           <p className="text-[11px] leading-relaxed font-medium">
             This audit is an automated pre-check based on public UK Home Office guidance. It is NOT legal advice. ClearVisa UK is not a law firm and does not represent you. Accuracy depends on your inputs. Decisions are made solely by UKVI caseworkers.
           </p>
        </div>
        <div className="flex justify-between items-center text-caption text-slate-400 font-black tracking-widest">
          <span>© 2026 ClearVisa UK</span>
          <span>Rule-based automated engine</span>
        </div>
      </footer>
    </div>
  );
};

export default ReportTemplate;
