import { AssessmentResult, SectionScore } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  const sectionScores: SectionScore[] = [];
  
  // --- Section 1: History & Suitability ---
  let historyScore = 100;
  let historyStatus: SectionScore['status'] = 'PASS';
  if (answers['overstay_history'] === true || answers['deportation_history'] === true) {
    historyScore = 20;
    historyStatus = 'FAIL';
    flags.push("ADVERSE IMMIGRATION HISTORY: Previous overstaying or deportation represents high mandatory refusal risk.");
  } else if (answers['refusal_history'] === true) {
    historyScore = 70;
    historyStatus = 'WARN';
    flags.push("PRIOR REFUSAL DETECTED: Disclosing this is mandatory. UKVI will cross-reference your record.");
  }
  sectionScores.push({
    name: 'History & Background',
    score: historyScore,
    status: historyStatus,
    risk: historyScore < 50 ? 'HIGH' : historyScore < 90 ? 'MEDIUM' : 'LOW',
    detail: historyStatus === 'PASS' ? 'Immigration history appears clear of major red flags.' : 'Significant adverse events detected in immigration record.'
  });

  // --- Section 2: Financial Requirement ---
  let finScore = 100;
  let finStatus: SectionScore['status'] = 'PASS';
  const visaType = answers['visa_route'];
  const income = Number(answers['sponsor_annual_income'] || 0);
  const swSalary = Number(answers['sw_salary_offered'] || 0);

  if (visaType === 'spouse') {
    if (answers['uk_benefits_receipt'] === true) {
      finScore = 100;
      finStatus = 'INFO';
      flags.push("BENEFIT EXEMPTION: 'Adequate Maintenance' rules may apply instead of standard £29k threshold.");
    } else if (income < 29000 && (Number(answers['cash_savings_total']) < 88500)) {
      finScore = 30;
      finStatus = 'FAIL';
      flags.push("FINANCIAL SHORTFALL: Current income/savings do not meet the £29,000 threshold requirement.");
    }
  } else if (visaType === 'skilled') {
    if (swSalary < 38700 && answers['sw_isl_role'] === false) {
      finScore = 60;
      finStatus = 'WARN';
      flags.push("SALARY THRESHOLD: Salary below the standard £38,700 benchmark requires specific ISL or new entrant credits.");
    }
  }
  sectionScores.push({
    name: 'Financial Requirement',
    score: finScore,
    status: finStatus,
    risk: finScore < 50 ? 'HIGH' : finScore < 90 ? 'MEDIUM' : 'LOW',
    detail: finStatus === 'PASS' ? 'Financial declarations align with standard thresholds.' : 'Evidence of financial shortfall against mandatory rules.'
  });

  // --- Section 3: Suitability & Character ---
  let suitScore = 100;
  let suitStatus: SectionScore['status'] = 'PASS';
  if (answers['criminal_offence'] === true || answers['pending_prosecution'] === true) {
    suitScore = 10;
    suitStatus = 'FAIL';
    flags.push("SUITABILITY BARRIER: Criminal history may trigger mandatory refusal under Part 9 of the rules.");
  }
  if (answers['nhs_debt'] === true) {
    suitScore = Math.min(suitScore, 40);
    suitStatus = 'WARN';
    flags.push("NHS DEBT: Unpaid healthcare debt over £500 is standard grounds for visa refusal.");
  }
  sectionScores.push({
    name: 'Character & Suitability',
    score: suitScore,
    status: suitStatus,
    risk: suitScore < 50 ? 'HIGH' : 'LOW',
    detail: suitStatus === 'PASS' ? 'No adverse suitability markers identified.' : 'Serious suitability or criminality barriers found.'
  });

  // --- Section 4: English Language ---
  let engScore = 100;
  let engStatus: SectionScore['status'] = 'PASS';
  if (answers['english_test_passed'] === false && answers['english_degree_exemption'] === false && answers['english_nationality_exemption'] === false && answers['english_age_exemption'] === false) {
    engScore = 0;
    engStatus = 'FAIL';
    flags.push("ENGLISH PROFICIENCY: No valid evidence of meeting the language requirement was provided.");
  }
  sectionScores.push({
    name: 'English Language',
    score: engScore,
    status: engStatus,
    risk: engScore < 50 ? 'HIGH' : 'LOW',
    detail: engStatus === 'PASS' ? 'Requirement appears satisfied via test or exemption.' : 'Mandatory language proficiency evidence is missing.'
  });

  // --- Overall Calculation ---
  const avgScore = sectionScores.reduce((acc, s) => acc + s.score, 0) / sectionScores.length;
  let verdict: AssessmentResult['verdict'] = 'likely';
  if (avgScore < 55) verdict = 'unlikely';
  else if (avgScore < 88) verdict = 'borderline';

  return {
    verdict,
    riskLevel: avgScore < 55 ? 'HIGH' : avgScore < 88 ? 'MEDIUM' : 'LOW',
    riskFlags: flags,
    summary: verdict === 'likely' ? 
      'Your profile indicates a strong alignment with the core eligibility criteria for your chosen route.' : 
      verdict === 'borderline' ? 
      'You meet several core requirements, however, the identified risk flags suggest your case will undergo significant caseworker scrutiny.' : 
      'Significant eligibility barriers have been detected. An application submitted in your current state carries a very high probability of refusal.',
    nextSteps: [
      "Gather 6 months of original bank statements matching your payslips exactly.",
      "Ensure the sponsor's employer provides a letter on official headed paper.",
      "Check tuberculosis (TB) test requirements for your country of residence.",
      "Compile a chronological timeline of your relationship with physical proof of meetings."
    ],
    sectionScores,
    remediationSteps: [
      { issue: 'Immigration History', resolution: 'Submit a Subject Access Request (SAR) to the Home Office to get your full file before applying.' },
      { issue: 'Financial Shortfall', resolution: 'Investigate combining employment income with non-employment sources or specified cash savings.' },
      { issue: 'NHS Debt', resolution: 'Pay the debt in full and obtain a clearance letter from the NHS trust before submitting the visa application.' }
    ],
    sampleWording: [
      { section: 'Cover Letter (Relationship)', text: '“We have maintained a genuine and subsisting relationship through regular communication via [Platform] and visits on [Dates], as evidenced by Annex 4.”' },
      { section: 'Financial (Explanation)', text: '“My sponsor meets the financial requirement through Category A employment, earning a gross annual salary of £[Amount] as confirmed by the enclosed payslips.”' }
    ]
  };
}
