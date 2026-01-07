import { AssessmentResult, SectionScore } from '../types';

export function runAssessment(route: string, answers: Record<string, any>, tier: string): AssessmentResult {
  const flags: string[] = [];
  const sectionScores: SectionScore[] = [];
  
  // Scoring Logic (simplified for brevity but scaled for 50+ inputs)
  let score = 0;
  let historyFlag = answers['overstay_history'] === true || answers['refusal_history'] === true;
  let suitFlag = answers['criminal_offence'] === true || answers['nhs_debt'] === true;
  
  if (historyFlag) flags.push("ADVERSE HISTORY: Previous refusal or overstay detected.");
  if (suitFlag) flags.push("SUITABILITY RISK: Adverse criminal or debt markers found.");

  // Finances
  const income = Number(answers['sponsor_income'] || answers['sw_salary'] || 0);
  if (route === 'spouse' && income < 29000) {
    flags.push("FINANCIAL: Annual income is below the £29,000 threshold.");
  }

  // Verdict logic
  let verdict: 'likely' | 'borderline' | 'unlikely' = 'likely';
  if (flags.length > 2) verdict = 'unlikely';
  else if (flags.length > 0) verdict = 'borderline';

  // Section placeholder scores
  sectionScores.push({ name: 'History', score: historyFlag ? 30 : 100, status: historyFlag ? 'FAIL' : 'PASS', risk: historyFlag ? 'HIGH' : 'LOW', detail: 'Immigration history audit.' });
  sectionScores.push({ name: 'Suitability', score: suitFlag ? 20 : 100, status: suitFlag ? 'FAIL' : 'PASS', risk: suitFlag ? 'HIGH' : 'LOW', detail: 'Character requirements.' });

  return {
    verdict,
    riskLevel: verdict === 'likely' ? 'LOW' : verdict === 'borderline' ? 'MEDIUM' : 'HIGH',
    riskFlags: flags,
    summary: `Your profile indicates a ${verdict} result based on the preliminary answers provided.`,
    nextSteps: ["Confirm full document checklist", "Audit 6 months of bank statements", "Verify English test validity"],
    sectionScores
  };
}