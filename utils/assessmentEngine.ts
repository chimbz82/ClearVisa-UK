import { AssessmentResult, SectionScore } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  const sectionScores: SectionScore[] = [];
  
  // --- Category: Personal & Identity ---
  let personalScore = 100;
  let personalStatus: SectionScore['status'] = 'PASS';
  if (answers['previous_refusals'] === true) {
    flags.push("PREVIOUS REFUSAL - Requires disclosure in all future applications.");
    personalScore = 70;
    personalStatus = 'WARN';
  }
  sectionScores.push({
    name: 'Identity & History',
    score: personalScore,
    status: personalStatus,
    risk: personalScore < 80 ? 'MEDIUM' : 'LOW',
    detail: personalScore === 100 ? 'No adverse immigration history detected.' : 'History of refusals requires careful wording.'
  });

  // --- Category: Financial Requirement ---
  let financialScore = 100;
  let financialStatus: SectionScore['status'] = 'PASS';
  const method = answers['fin_req_method'];
  const income = Number(answers['sponsor_income'] || 0);
  const savings = Number(answers['savings_amount'] || 0);

  if (route === 'Spouse Visa') {
    if (method === 'employment' && income < 29000) {
      financialScore = 20;
      financialStatus = 'FAIL';
      flags.push("INCOME BELOW THRESHOLD - Baseline of £29,000 not met.");
    } else if (method === 'savings' && savings < 88500) {
      financialScore = 40;
      financialStatus = 'FAIL';
      flags.push("INSUFFICIENT SAVINGS - £88,500 threshold not met.");
    }
  } else {
    const salary = Number(answers['sw_salary'] || 0);
    if (salary > 0 && salary < 38700 && answers['shortage_occupation'] !== true) {
      financialScore = 60;
      financialStatus = 'WARN';
      flags.push("SALARY RISK - Below standard Skilled Worker threshold.");
    }
  }
  sectionScores.push({
    name: 'Financial Compliance',
    score: financialScore,
    status: financialStatus,
    risk: financialScore < 50 ? 'HIGH' : financialScore < 90 ? 'MEDIUM' : 'LOW',
    detail: financialStatus === 'PASS' ? 'Income levels align with current rules.' : 'Financial shortfall detected against relevant thresholds.'
  });

  // --- Category: Relationship (Spouse only) ---
  if (route === 'Spouse Visa') {
    let relScore = 100;
    let relStatus: SectionScore['status'] = 'PASS';
    if (answers['cohabitation_duration'] === 'never') {
      relScore = 60;
      relStatus = 'WARN';
      flags.push("GENUINENESS RISK - Lack of cohabitation history increases scrutiny.");
    }
    sectionScores.push({
      name: 'Relationship Genuineness',
      score: relScore,
      status: relStatus,
      risk: relScore < 70 ? 'MEDIUM' : 'LOW',
      detail: relStatus === 'PASS' ? 'Standard relationship evidence profile.' : 'Requires stronger proof of subsistence.'
    });
  }

  // --- Category: Suitability ---
  let suitScore = 100;
  let suitStatus: SectionScore['status'] = 'PASS';
  if (answers['criminal_convictions'] === true || answers['nhs_debt'] === true || answers['deception_allegation'] === true) {
    suitScore = 0;
    suitStatus = 'FAIL';
    flags.push("CRITICAL SUITABILITY ISSUE - High risk of mandatory refusal.");
  }
  sectionScores.push({
    name: 'Suitability & Character',
    score: suitScore,
    status: suitStatus,
    risk: suitScore < 50 ? 'HIGH' : 'LOW',
    detail: suitStatus === 'PASS' ? 'No character/conduct issues found.' : 'Mandatory/Discretionary refusal grounds identified.'
  });

  // --- Category: Accommodation ---
  let accScore = 100;
  let accStatus: SectionScore['status'] = 'PASS';
  if (answers['accommodation_arranged'] === false || answers['exclusive_rooms'] === false) {
    accScore = 40;
    accStatus = 'WARN';
    flags.push("ACCOMMODATION RISK - Evidence of overcrowding or lack of exclusive use.");
  }
  sectionScores.push({
    name: 'Accommodation',
    score: accScore,
    status: accStatus,
    risk: accScore < 60 ? 'MEDIUM' : 'LOW',
    detail: accStatus === 'PASS' ? 'Arrangements meet minimum standards.' : 'Possible overcrowding risk.'
  });

  // --- Overall Calculations ---
  const avgScore = sectionScores.reduce((acc, s) => acc + s.score, 0) / sectionScores.length;
  let verdict: AssessmentResult['verdict'] = 'likely';
  let riskLevel: AssessmentResult['riskLevel'] = 'LOW';
  
  if (avgScore < 50) {
    verdict = 'unlikely';
    riskLevel = 'HIGH';
  } else if (avgScore < 85) {
    verdict = 'borderline';
    riskLevel = 'MEDIUM';
  }

  const result: AssessmentResult = {
    verdict,
    riskLevel,
    riskFlags: flags,
    summary: verdict === 'likely' ? 'Your profile appears to align with core public criteria.' : 
             verdict === 'borderline' ? 'You meet core criteria, but identified risk flags suggest significant scrutiny.' : 
             'Critical barriers found. Applying now carries a very high risk of refusal.',
    nextSteps: [
      "Gather 6 months of original bank statements.",
      "Obtain an official employer letter.",
      "Check TB test requirements.",
      "Confirm accommodation permission."
    ],
    sectionScores,
    remediationSteps: [
      { issue: 'Insufficient Income', resolution: 'Consider using Category D (Cash Savings) to supplement income if held for 6+ months.' },
      { issue: 'Relationship Proof', resolution: 'Collect flight tickets, hotel bookings, and timestamped photos for all periods spent together.' },
      { issue: 'Previous Refusal', resolution: 'Draft a witness statement explaining the refusal and how circumstances have changed.' }
    ],
    sampleWording: [
      { section: 'Relationship', text: '“We have maintained a genuine and subsisting relationship through daily communication and regular visits, evidenced by our call logs and travel history attached as Annex A...”' },
      { section: 'Financial', text: '“My sponsor meets the financial requirement through salaried employment under Category A, having earned above the threshold for more than 6 months with the same employer...”' }
    ]
  };

  return result;
}