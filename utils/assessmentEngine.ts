import { AssessmentResult, SectionScore } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  const sectionScores: SectionScore[] = [];
  
  // --- Category: Personal & Identity (Section A) ---
  let personalScore = 100;
  let personalStatus: SectionScore['status'] = 'PASS';
  if (answers['refused_visa'] === true) {
    flags.push("PREVIOUS REFUSAL - Non-disclosure or poor explanation can lead to a 10-year ban under Paragraph 320(7b).");
    personalScore = 70;
    personalStatus = 'WARN';
  }
  if (answers['overstayed_visa'] === true || answers['deported_removed'] === true) {
    flags.push("ADVERSE HISTORY - Previous overstaying or deportation is a high-risk factor for refusal.");
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

  // --- Category: Financial Requirement (Section D) ---
  let financialScore = 100;
  let financialStatus: SectionScore['status'] = 'PASS';
  const method = answers['visa_route'];
  const income = Number(answers['sponsor_annual_income'] || 0);
  const swSalary = Number(answers['sw_salary_exact'] || 0);

  if (method === 'spouse') {
    if (income < 29000 && answers['sponsor_benefits'] !== true) {
      financialScore = 20;
      financialStatus = 'FAIL';
      flags.push("FINANCIAL THRESHOLD - Current £29,000 gross annual requirement not met for Spouse route.");
    }
    if (answers['sponsor_emp_length'] === 'under_6m') {
      flags.push("EMPLOYMENT DURATION - Employment under 6 months requires Category B evidence (12 months history).");
      financialScore = Math.min(financialScore, 60);
      financialStatus = 'WARN';
    }
  } else if (method === 'skilled') {
    if (swSalary > 0 && swSalary < 38700 && answers['sw_shortage'] !== true) {
      financialScore = 60;
      financialStatus = 'WARN';
      flags.push("SALARY RISK - Below £38,700 standard threshold for Skilled Worker route.");
    }
    if (answers['sw_cos_assigned'] === false) {
      financialScore = 0;
      financialStatus = 'FAIL';
      flags.push("MISSING SPONSORSHIP - A Certificate of Sponsorship is mandatory.");
    }
  }
  sectionScores.push({
    name: 'Financial Compliance',
    score: financialScore,
    status: financialStatus,
    risk: financialScore < 50 ? 'HIGH' : financialScore < 90 ? 'MEDIUM' : 'LOW',
    detail: financialStatus === 'PASS' ? 'Aligns with current financial thresholds.' : 'Critical shortfall against specified income rules.'
  });

  // --- Category: Relationship (Section C - Spouse only) ---
  if (method === 'spouse') {
    let relScore = 100;
    let relStatus: SectionScore['status'] = 'PASS';
    if (answers['person_meetings'] === 'never' || answers['person_meetings'] === 'rare') {
      relScore = 40;
      relStatus = 'WARN';
      flags.push("GENUINENESS RISK - Lack of in-person meetings triggers high caseworker scrutiny.");
    }
    if (answers['is_married'] === false && answers['cohabitation_length'] !== 'over_2') {
      relScore = 20;
      relStatus = 'FAIL';
      flags.push("UNMARRIED PARTNER RULES - 2 years continuous cohabitation is usually required.");
    }
    sectionScores.push({
      name: 'Relationship Genuineness',
      score: relScore,
      status: relStatus,
      risk: relScore < 70 ? 'MEDIUM' : 'LOW',
      detail: relStatus === 'PASS' ? 'Relationship markers meet standard requirements.' : 'Evidence of subsistence is currently weak.'
    });
  }

  // --- Category: Suitability (Section F) ---
  let suitScore = 100;
  let suitStatus: SectionScore['status'] = 'PASS';
  if (answers['criminal_convictions'] === true || answers['pending_charges'] === true) {
    suitScore = 20;
    suitStatus = 'FAIL';
    flags.push("SUITABILITY - Criminal history triggers mandatory or discretionary refusal.");
  }
  if (answers['nhs_debt_500'] === true) {
    suitScore = Math.min(suitScore, 40);
    suitStatus = 'WARN';
    flags.push("NHS DEBT - Debts over £500 are standard grounds for refusal.");
  }
  sectionScores.push({
    name: 'Suitability & Character',
    score: suitScore,
    status: suitStatus,
    risk: suitScore < 50 ? 'HIGH' : 'LOW',
    detail: suitStatus === 'PASS' ? 'No character issues identified.' : 'Serious suitability barriers found.'
  });

  // --- Category: English Language (Section G) ---
  let engScore = 100;
  let engStatus: SectionScore['status'] = 'PASS';
  if (answers['english_test_taken'] === false && answers['english_exempt'] === false && answers['degree_english'] === false) {
    engScore = 0;
    engStatus = 'FAIL';
    flags.push("ENGLISH LANGUAGE - Requirement not yet met through test, degree, or exemption.");
  }
  sectionScores.push({
    name: 'English Language',
    score: engScore,
    status: engStatus,
    risk: engScore < 50 ? 'HIGH' : 'LOW',
    detail: engStatus === 'PASS' ? 'Language requirement met.' : 'English proficiency evidence missing.'
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
      "Check TB test requirements.",
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
