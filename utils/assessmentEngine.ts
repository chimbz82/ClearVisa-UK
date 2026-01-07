import { AssessmentResult, SectionScore } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  const sectionScores: SectionScore[] = [];
  
  // --- Category: Personal & Identity ---
  let personalScore = 100;
  let personalStatus: SectionScore['status'] = 'PASS';
  if (answers['previous_refusals'] === true) {
    flags.push("PREVIOUS REFUSAL - Non-disclosure or poor explanation can lead to a 10-year ban under Paragraph 320(7b).");
    personalScore = 70;
    personalStatus = 'WARN';
  }
  if (answers['immigration_breaches'] && answers['immigration_breaches'] !== 'none') {
    flags.push(`IMMIGRATION BREACH: ${answers['immigration_breaches'].toUpperCase()} - Highly sensitive; caseworker discretion applies.`);
    personalScore = Math.min(personalScore, 40);
    personalStatus = 'FAIL';
  }
  sectionScores.push({
    name: 'Identity & History',
    score: personalScore,
    status: personalStatus,
    risk: personalScore < 50 ? 'HIGH' : personalScore < 85 ? 'MEDIUM' : 'LOW',
    detail: personalScore === 100 ? 'Clean immigration history verified.' : 'Historical adverse factors detected.'
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
      flags.push("FINANCIAL THRESHOLD - Current £29,000 gross annual requirement not met.");
    } else if (method === 'savings' && savings < 88500) {
      financialScore = 40;
      financialStatus = 'FAIL';
      flags.push("SAVINGS SHORTFALL - £88,500 required for cash-only savings route.");
    }
    if (answers['payslips_available'] === false) {
      flags.push("DOCUMENTATION GAP - Specified evidence (Appendix FM-SE) is strictly mandatory.");
      financialScore = Math.min(financialScore, 60);
      financialStatus = 'WARN';
    }
  } else {
    const salary = Number(answers['sw_salary'] || 0);
    if (salary > 0 && salary < 38700 && answers['shortage_occupation'] !== true) {
      financialScore = 60;
      financialStatus = 'WARN';
      flags.push("SALARY RISK - Below £38,700 standard threshold for Skilled Worker route.");
    }
    if (answers['sponsorship_obtained'] === false) {
      financialScore = 0;
      financialStatus = 'FAIL';
      flags.push("MISSING SPONSORSHIP - Valid CoS from licensed sponsor is mandatory.");
    }
  }
  sectionScores.push({
    name: 'Financial Compliance',
    score: financialScore,
    status: financialStatus,
    risk: financialScore < 50 ? 'HIGH' : financialScore < 90 ? 'MEDIUM' : 'LOW',
    detail: financialStatus === 'PASS' ? 'Aligns with current financial thresholds.' : 'Critical shortfall against specified income/savings rules.'
  });

  // --- Category: Relationship (Spouse only) ---
  if (route === 'Spouse Visa') {
    let relScore = 100;
    let relStatus: SectionScore['status'] = 'PASS';
    if (answers['cohabitation_duration'] === 'never') {
      relScore = 60;
      relStatus = 'WARN';
      flags.push("GENUINENESS RISK - 'Never lived together' triggers higher caseworker scrutiny.");
    }
    if (answers['wedding_evidence'] === false && answers['marital_status'] === 'married') {
      relScore = 20;
      relStatus = 'FAIL';
      flags.push("LEGAL REQUIREMENT - Missing marriage certificate for a spouse application.");
    }
    sectionScores.push({
      name: 'Relationship Genuineness',
      score: relScore,
      status: relStatus,
      risk: relScore < 70 ? 'MEDIUM' : 'LOW',
      detail: relStatus === 'PASS' ? 'Relationship markers meet standard requirements.' : 'Evidence of subsistence and genuineness is currently weak.'
    });
  }

  // --- Category: Suitability ---
  let suitScore = 100;
  let suitStatus: SectionScore['status'] = 'PASS';
  if (answers['criminal_convictions'] === true) {
    suitScore = 20;
    suitStatus = 'FAIL';
    flags.push("SUITABILITY - Criminal history triggers mandatory or discretionary refusal.");
  }
  if (answers['nhs_debt'] === true) {
    suitScore = Math.min(suitScore, 40);
    suitStatus = 'WARN';
    flags.push("NHS DEBT - Debts over £500 are standard grounds for refusal.");
  }
  sectionScores.push({
    name: 'Suitability & Character',
    score: suitScore,
    status: suitStatus,
    risk: suitScore < 50 ? 'HIGH' : 'LOW',
    detail: suitStatus === 'PASS' ? 'No character/conduct issues identified.' : 'Serious suitability barriers found.'
  });

  // --- Category: Accommodation ---
  let accScore = 100;
  let accStatus: SectionScore['status'] = 'PASS';
  if (answers['exclusive_rooms'] === false) {
    accScore = 40;
    accStatus = 'WARN';
    flags.push("ACCOMMODATION RISK - Lack of exclusive room fails the 'overcrowding' test.");
  }
  sectionScores.push({
    name: 'Accommodation',
    score: accScore,
    status: accStatus,
    risk: accScore < 60 ? 'MEDIUM' : 'LOW',
    detail: accStatus === 'PASS' ? 'Accommodation plans appear sufficient.' : 'Potential overcrowding or permission issues.'
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
    summary: verdict === 'likely' ? 'Based on your audit, your profile aligns with core public eligibility criteria.' : 
             verdict === 'borderline' ? 'You meet several core criteria, but identified risk flags suggest significant caseworker scrutiny.' : 
             'Significant eligibility barriers were found. Submitting an application now carries a high risk of refusal.',
    nextSteps: [
      "Gather 6 months of original bank statements showing salary credit.",
      "Obtain a formal letter from the sponsor's employer on headed paper.",
      "Book a TB test if applying from a required territory.",
      "Prepare a minimum of 10-15 high-quality photos across the relationship duration."
    ],
    sectionScores,
    remediationSteps: [
      { issue: 'Refusal History', resolution: 'Submit a Subject Access Request (SAR) to UKVI to get your previous file before drafting your new cover letter.' },
      { issue: 'Income Shortfall', resolution: 'Investigate combining salary with non-employment income (pensions, dividends) or specific cash savings.' },
      { issue: 'Cohabitation Evidence', resolution: 'If living separately, ensure you provide evidence of financial support (e.g., bank transfers) and frequent travel to see each other.' },
      { issue: 'NHS Debt', resolution: 'Pay the debt in full and obtain a clearance letter before submitting the visa application.' }
    ],
    sampleWording: [
      { section: 'Cover Letter Opening', text: '“I am writing to support the application of [Applicant Name] for a Spouse Visa. I confirm that I am a British Citizen/Settled person and meet the financial requirements via...”' },
      { section: 'Relationship Wording', text: '“Despite living in different countries for [Period], we have maintained a subsisting relationship through [Methods], spending over [Number] hours on video calls as evidenced by Annex 3...”' },
      { section: 'Addressing History', text: '“Regarding the previous refusal in [Year], I wish to clarify that [Reason]. Since then, my circumstances have changed significantly, specifically [Details]...”' }
    ]
  };

  return result;
}
