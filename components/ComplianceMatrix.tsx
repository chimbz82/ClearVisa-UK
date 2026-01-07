import React from 'react';

interface ComplianceMatrixProps {
  answers: Record<string, any>;
  visaRoute: string;
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({ answers, visaRoute }) => {
  // Simple calculation for UI feedback
  const getFinancialStatus = () => {
    const income = parseFloat(answers.sponsor_income || answers.sw_salary || '0');
    if (visaRoute === 'Spouse Visa' && income >= 29000) return { status: 'PASS', score: '10/10', color: 'bg-emerald-100 text-emerald-700' };
    if (visaRoute === 'Skilled Worker' && income >= 38700) return { status: 'PASS', score: '10/10', color: 'bg-emerald-100 text-emerald-700' };
    return { status: 'FAIL', score: '0/10', color: 'bg-rose-100 text-rose-700' };
  };

  const financial = getFinancialStatus();

  return (
    <div className="bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm mt-10">
      <h3 className="text-[12px] font-black text-navy mb-8 uppercase tracking-[0.4em] border-b border-slate-200 pb-4">
        Compliance Scoring Matrix
      </h3>
      
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Requirement Criteria</th>
            <th className="py-4 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest">Verdict</th>
            <th className="py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Weight</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Financial Threshold</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${financial.color}`}>
                {financial.status}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">
              {financial.score}
            </td>
          </tr>
          
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">English Proficiency</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${
                answers.english_test_passed
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {answers.english_test_passed ? 'PASS' : 'PENDING'}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">
              {answers.english_test_passed ? '10/10' : '5/10'}
            </td>
          </tr>
          
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Immigration History</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${
                !answers.refusal_history && !answers.overstay_history
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {!answers.refusal_history && !answers.overstay_history ? 'CLEAN' : 'ADVERSE'}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">
              {!answers.refusal_history && !answers.overstay_history ? '10/10' : '3/10'}
            </td>
          </tr>
          
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Character Suitability</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${
                !answers.criminal_offence
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {!answers.criminal_offence ? 'CLEAR' : 'CONCERN'}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">
              {!answers.criminal_offence ? '10/10' : '0/10'}
            </td>
          </tr>
          
          {visaRoute === 'Spouse Visa' && (
            <tr>
              <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Relationship Credibility</td>
              <td className="py-5 text-center">
                <span className={`px-4 py-1 rounded text-[9px] font-black ${
                  answers.joint_accounts && (answers.joint_tenancy || answers.marital_status === 'married')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {answers.joint_accounts && (answers.joint_tenancy || answers.marital_status === 'married') ? 'STRONG' : 'WEAK'}
                </span>
              </td>
              <td className="py-5 text-right text-sm font-black text-navy">
                {answers.joint_accounts && (answers.joint_tenancy || answers.marital_status === 'married') ? '10/10' : '4/10'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};