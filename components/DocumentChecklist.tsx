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
    docs.push('Valid passport (6+ months validity)');
    docs.push('Completed visa application form');
    docs.push('Passport-sized photographs (45mm x 35mm)');
    
    if (tier === 'basic') {
      docs.push('... Upgrade to Professional Audit for route-specific checklist ...');
      return docs;
    }
    
    if (visaRoute === 'Spouse Visa') {
      docs.push('Marriage certificate or civil partnership certificate');
      
      if (answers.joint_tenancy) {
        docs.push('✓ Joint tenancy agreement or mortgage');
      } else {
        docs.push('⚠️ Joint tenancy agreement (RECOMMENDED)');
      }
      
      if (answers.joint_accounts) {
        docs.push('✓ Joint bank account statements (6 months)');
      } else {
        docs.push('⚠️ Joint bank statements - MISSING');
      }
      
      if (answers.sponsor_emp_type === 'paye') {
        docs.push('Sponsor: 6 months payslips');
        docs.push('Sponsor: 6 months bank statements');
        docs.push('Sponsor: Employer letter on letterhead');
        docs.push('Sponsor: P60 for recent tax year');
      }
      
      if (answers.english_test_passed) {
        docs.push('✓ SELT certificate (IELTS/PTE)');
      } else {
        docs.push('⚠️ SELT certificate - REQUIRED');
      }
      
      docs.push('Accommodation evidence (inspection report)');
    }
    
    if (visaRoute === 'Skilled Worker') {
      docs.push('Certificate of Sponsorship reference');
      docs.push('Job offer letter on letterhead');
      
      if (answers.criminal_record_cert) {
        docs.push('⚠️ Criminal record certificate (required)');
      }
      
      if (answers.atas_certificate_required) {
        docs.push('⚠️ ATAS certificate (required)');
      }
      
      docs.push('Proof of English language');
      docs.push('Maintenance funds proof (90 days)');
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