import React from 'react';
import { PlanId } from '../App';

interface DocumentChecklistProps {
  answers: Record<string, any>;
  visaRoute: string;
  tier: PlanId;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  answers,
  visaRoute,
  tier
}) => {
  const generateChecklist = () => {
    const docs: string[] = [];
    
    // Core Identity (All Tiers)
    docs.push('Valid current passport (at least 6 months validity)');
    docs.push('Completed online visa application form copy');
    docs.push('Two identical passport-sized photographs (45mm x 35mm)');
    
    if (tier === 'basic') {
      docs.push('... Upgrade to Full Audit for personalised documents ...');
      return docs;
    }
    
    // Route Specific Logic
    if (visaRoute === 'Spouse Visa') {
      docs.push('Original marriage certificate or civil partnership certificate');
      
      if (answers.joint_tenancy) {
        docs.push('✓ Signed joint tenancy agreement or mortgage deed');
      } else {
        docs.push('⚠️ Evidence of accommodation (Land Registry or Landlord Letter) - RECOMMENDED');
      }
      
      if (answers.joint_accounts) {
        docs.push('✓ Last 6 months of joint bank account statements');
      } else {
        docs.push('⚠️ Alternative evidence of financial interdependence (utility bills) - REQUIRED');
      }
      
      if (answers.sponsor_emp_type === 'paye') {
        docs.push('Sponsor: 6 months of original, consecutive payslips');
        docs.push('Sponsor: 6 months of matching bank statements showing salary entry');
        docs.push('Sponsor: Formal Employer Letter on company letterhead');
        docs.push('Sponsor: Most recent P60 document');
      } else if (answers.sponsor_emp_type === 'self') {
        docs.push('Sponsor: Full Unaudited Accounts for recent financial year');
        docs.push('Sponsor: SA302 from HMRC or tax calculation');
        docs.push('Sponsor: Business bank statements (12 months)');
      }
      
      if (answers.english_test_passed) {
        docs.push('✓ SELT certificate at CEFR A1 (or higher) from approved provider');
      } else {
        docs.push('⚠️ SELT certificate - URGENTLY REQUIRED');
      }
      
      docs.push('Accommodation inspection report (for properties with multiple occupants)');
    }
    
    if (visaRoute === 'Skilled Worker') {
      docs.push('Valid Certificate of Sponsorship (CoS) reference number');
      docs.push('Formal Job Offer Letter on employer letterhead');
      
      if (answers.criminal_record_cert) {
        docs.push('⚠️ Criminal record certificate(s) for relevant countries');
      }
      
      if (answers.atas_certificate_required) {
        docs.push('⚠️ Valid ATAS certificate from Foreign & Commonwealth Office');
      }
      
      docs.push('Proof of English language proficiency (Degree or SELT)');
      docs.push('Personal bank statements showing maintenance funds (90 consecutive days)');
    }
    
    return docs;
  };
  
  const docs = generateChecklist();
  
  return (
    <div className="bg-slate-50 p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm mt-10">
      <h3 className="text-[12px] font-black text-navy mb-8 uppercase tracking-[0.4em] border-b border-slate-200 pb-4">
        Personalised Evidence Checklist
      </h3>
      <ul className="space-y-4">
        {docs.map((doc, idx) => (
          <li key={idx} className="text-[12px] font-bold text-slate-700 flex items-start gap-4 leading-relaxed">
            <span className={`text-lg leading-none ${
              doc.startsWith('✓') ? 'text-emerald-600' : 
              doc.startsWith('⚠️') ? 'text-amber-600' : 
              'text-slate-300'
            }`}>
              {doc.startsWith('✓') || doc.startsWith('⚠️') ? '' : '•'}
            </span>
            <span className="tracking-tight">{doc}</span>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
        Reference: Home Office Appendix FM-SE / Skilled Worker Guidance v.2026
      </p>
    </div>
  );
};