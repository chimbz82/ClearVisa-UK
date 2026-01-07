import { AssessmentResult } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  let score = 10; // High score baseline

  // 1. Suitability & Character (Heavy weights)
  if (answers['criminal_records'] === true) {
    flags.push("CRIMINAL HISTORY - Triggers mandatory/discretionary refusal under Part 9 of Immigration Rules.");
    score -= 15;
  }
  if (answers['nhs_debt'] === true) {
    flags.push("NHS DEBT - Unpaid NHS debt over £500 is a standard ground for refusal.");
    score -= 10;
  }
  if (answers['previous_refusals'] === true) {
    flags.push("REFUSAL HISTORY - Previous refusals require careful disclosure and explanation.");
    score -= 3;
  }

  // 2. Financial Requirement
  if (route === 'Spouse Visa') {
    if (answers['income_band'] === 'under_29k' && answers['fin_req_method'] === 'employment') {
      flags.push("INCOME BELOW THRESHOLD - Current £29,000 baseline not met.");
      score -= 8;
    }
    if (answers['fin_req_method'] === 'savings') {
      const savings = parseFloat(answers['savings_total'] || "0");
      if (savings < 88500) {
        flags.push("INSUFFICIENT SAVINGS - £88,500 is the required amount if relying on savings alone.");
        score -= 5;
      }
    }
  } else if (route === 'Skilled Worker Visa') {
    const salary = parseFloat(answers['sw_salary_exact'] || "0");
    if (salary < 38700) {
      flags.push("SALARY BELOW BASELINE - General £38,700 threshold not met for standard roles.");
      score -= 6;
    }
    if (answers['sponsor_license'] === 'no' || answers['sponsor_license'] === 'unsure') {
      flags.push("SPONSORSHIP RISK - Application impossible without a licensed UK sponsor.");
      score -= 12;
    }
  }

  // 3. Relationship Genuineness (Spouse)
  if (route === 'Spouse Visa') {
    if (answers['live_together'] === 'never') {
      flags.push("GENUINENESS RISK - Never having lived together is a high-scrutiny factor for UKVI.");
      score -= 5;
    }
    const relEvidence = answers['rel_evidence'] || [];
    if (relEvidence.length < 3) {
      flags.push("EVIDENCE VOLUME - Low variety of documentation for relationship duration.");
      score -= 2;
    }
  }

  // 4. Requirements (English/Accommodation)
  if (answers['english_route'] === 'no') {
    flags.push("ENGLISH LANGUAGE - Mandatory requirement not yet evidenced.");
    score -= 5;
  }
  if (answers['overcrowding_check'] === true) {
    flags.push("ACCOMMODATION RISK - Proposed property may be considered overcrowded.");
    score -= 4;
  }

  // --- Determination ---
  let verdict: 'likely' | 'borderline' | 'unlikely';
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  let summary = "";
  let nextSteps: string[] = [];

  if (score >= 6) {
    verdict = 'likely';
    riskLevel = 'LOW';
    summary = "Your profile aligns with most public criteria. Success depends on the quality and authenticity of your supporting documents.";
    nextSteps = [
      "Gather 6 months of original bank statements and payslips.",
      "Book your TB test if applying from a high-risk country.",
      "Draft a detailed timeline of your relationship history.",
      "Check that your sponsor's employment contract matches the application details."
    ];
  } else if (score >= -5) {
    verdict = 'borderline';
    riskLevel = 'MEDIUM';
    summary = "You meet core criteria, but identified risk flags suggest your application will undergo significant scrutiny by caseworkers.";
    nextSteps = [
      "Address identified risk flags with legal cover letters.",
      "Obtain professional legal review of your financial evidence.",
      "Ensure all previous refusals are fully disclosed and explained.",
      "Consider delaying your application until you meet the higher thresholds."
    ];
  } else {
    verdict = 'unlikely';
    riskLevel = 'HIGH';
    summary = "Critical barriers found. Applying now carries a very high risk of refusal and loss of UKVI fees.";
    nextSteps = [
      "Consult an OISC-regulated solicitor immediately.",
      "Do not submit your application until the identified barriers are resolved.",
      "Check if your employer can increase salary to meet the SWV baseline.",
      "Look for alternative routes or exemptions (e.g. Health & Care Visa lower thresholds)."
    ];
  }

  return { verdict, riskLevel, riskFlags: flags, summary, nextSteps };
}
