import React from 'react';

interface ComplianceMatrixProps {
  answers: Record<string, any>;
  visaRoute: string;
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({ answers, visaRoute }) => {
  const getFinancialVerdict = () => {
    const income = parseFloat(answers.sponsor_income || answers.sw_salary || '0');
    const threshold = visaRoute === 'Spouse Visa' ? 29000 : 38700;
    const passed = income >= threshold;
    return {
      status: passed ? 'PASS' : 'FAIL',
      score: passed ? '10/10' : '0/10',
      color: passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
    };
  };

  const financial = getFinancialVerdict();

  return (
    <div className="bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-sm mt-10">
      <h3 className="text-[12px] font-black text-navy mb-8 uppercase tracking-[0.4em] border-b border-slate-200 pb-4">
        Compliance Scoring Matrix
      </h3>
      
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Requirement</th>
            <th className="py-4 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
            <th className="py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Financial Requirement</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${financial.color}`}>
                {financial.status}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">{financial.score}</td>
          </tr>
          
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">English Language</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${
                answers.english_test_passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
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
                !answers.refusal_history && !answers.overstay_history ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {!answers.refusal_history && !answers.overstay_history ? 'CLEAN' : 'FLAGS'}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">
              {!answers.refusal_history && !answers.overstay_history ? '10/10' : '3/10'}
            </td>
          </tr>
          
          <tr>
            <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Suitability</td>
            <td className="py-5 text-center">
              <span className={`px-4 py-1 rounded text-[9px] font-black ${
                !answers.criminal_offence ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {!answers.criminal_offence ? 'PASS' : 'CONCERN'}
              </span>
            </td>
            <td className="py-5 text-right text-sm font-black text-navy">
              {!answers.criminal_offence ? '10/10' : '0/10'}
            </td>
          </tr>
          
          {visaRoute === 'Spouse Visa' && (
            <tr>
              <td className="py-5 text-[11px] font-bold text-navy uppercase tracking-tight">Relationship Evidence</td>
              <td className="py-5 text-center">
                <span className={`px-4 py-1 rounded text-[9px] font-black ${
                  answers.joint_accounts && answers.joint_tenancy ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {answers.joint_accounts && answers.joint_tenancy ? 'STRONG' : 'WEAK'}
                </span>
              </td>
              <td className="py-5 text-right text-sm font-black text-navy">
                {answers.joint_accounts && answers.joint_tenancy ? '10/10' : '6/10'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};