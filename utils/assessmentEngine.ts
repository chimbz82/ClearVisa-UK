import { AssessmentResult, SectionScore } from '../types';

export function runAssessment(route: string, answers: Record<string, any>, tier: string): AssessmentResult {
  const flags: string[] = [];
  const sectionScores: SectionScore[] = [];
  const remediationSteps: { issue: string; resolution: string }[] = [];
  
  // History Check
  let historyFlag = answers['overstay_history'] === true || answers['refusal_history'] === true;
  if (historyFlag) {
    flags.push("ADVERSE HISTORY: Previous refusal or overstay detected.");
    remediationSteps.push({ 
      issue: "Previous refusal history detected", 
      resolution: "Submit a Subject Access Request (SAR) to UKVI to review previous caseworker notes and address them specifically in your new cover letter." 
    });
  }

  // Suitability Check
  let suitFlag = answers['criminal_offence'] === true || answers['nhs_debt'] === true;
  if (suitFlag) {
    flags.push("SUITABILITY RISK: Adverse criminal or debt markers found.");
    remediationSteps.push({ 
      issue: "Potential character grounds for refusal", 
      resolution: "Obtain a formal police certificate and provide a detailed mitigating statement explaining the circumstances of any cautions or convictions." 
    });
  }

  // Financial Threshold Check
  const income = Number(answers['sponsor_income'] || answers['sw_salary'] || 0);
  let finPass = true;
  if (route === 'spouse' && income < 29000) {
    finPass = false;
    flags.push("FINANCIAL: Annual income is below the £29,000 threshold.");
    remediationSteps.push({ 
      issue: "Financial requirement not met", 
      resolution: "Consider utilizing the 'Cash Savings' route (Category D) to supplement income, or wait until the sponsor has completed 6 months in a higher-paying role." 
    });
  }

  // Relationship Check (Spouse Only)
  let relRisk = 'LOW';
  if (route === 'spouse') {
    if (!answers.joint_accounts || !answers.joint_tenancy) {
      relRisk = 'MEDIUM';
      remediationSteps.push({ 
        issue: "Weak evidence of cohabitation", 
        resolution: "Collect secondary evidence such as utility bills, medical records, and official correspondence addressed individually to both parties at the same address." 
      });
    }
  }

  // Verdict logic
  let verdict: 'likely' | 'borderline' | 'unlikely' = 'likely';
  if (flags.length > 2) verdict = 'unlikely';
  else if (flags.length > 0) verdict = 'borderline';

  // Section Scores
  sectionScores.push({ 
    name: 'History', 
    score: historyFlag ? 30 : 100, 
    status: historyFlag ? 'FAIL' : 'PASS', 
    risk: historyFlag ? 'HIGH' : 'LOW', 
    detail: historyFlag ? 'Adverse records found.' : 'No previous refusals or overstays detected.' 
  });
  
  sectionScores.push({ 
    name: 'Finances', 
    score: finPass ? 100 : 40, 
    status: finPass ? 'PASS' : 'WARN', 
    risk: finPass ? 'LOW' : 'MEDIUM', 
    detail: finPass ? 'Income meets standard threshold.' : 'Current income is below the Appendix FM requirement.' 
  });

  sectionScores.push({ 
    name: 'Relationship', 
    score: relRisk === 'LOW' ? 100 : 65, 
    status: relRisk === 'LOW' ? 'PASS' : 'WARN', 
    risk: relRisk as 'LOW' | 'MEDIUM', 
    detail: route === 'spouse' ? (relRisk === 'LOW' ? 'Strong evidence of subsistence.' : 'Evidence of living together is limited.') : 'N/A' 
  });

  return {
    verdict,
    riskLevel: verdict === 'likely' ? 'LOW' : verdict === 'borderline' ? 'MEDIUM' : 'HIGH',
    riskFlags: flags,
    summary: `Your profile indicates a ${verdict} result. ${flags.length > 0 ? `We have identified ${flags.length} high-sensitivity markers that require immediate attention.` : 'No major compliance issues were identified in the initial screening.'}`,
    nextSteps: [
      "Confirm full document checklist against Appendix FM-SE",
      "Verify 6 full months of original bank statements",
      "Check English test provider against the approved SELT list",
      "Ensure passport has at least 6 months validity from intended travel date"
    ],
    sectionScores,
    remediationSteps: tier === 'pro_plus' ? remediationSteps : undefined
  };
}