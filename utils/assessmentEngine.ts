import { AssessmentResult } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  let score = 5; // Start with neutral-positive

  // --- Core Eligibility & Suitability ---
  if (answers.criminal_history === true) {
    flags.push("CRIMINAL HISTORY - Potential Suitability Grounds for Refusal.");
    score -= 10;
  }
  if (answers.overstays === true) {
    flags.push("PREVIOUS OVERSTAY - Major barrier for switching inside UK.");
    score -= 8;
  }
  if (answers.previous_refusals === true) {
    flags.push("PREVIOUS REFUSAL - Case requires extra scrutiny for suitability.");
    score -= 4;
  }
  if (answers.work_without_permission === true) {
    flags.push("UNAUTHORISED WORK - Breach of previous visa conditions identified.");
    score -= 8;
  }

  // --- Route Specifics ---
  if (route === 'Spouse Visa') {
    // Financial (Appendix FM)
    if (answers.income_band === 'under_29k') {
      flags.push("INCOME BELOW THRESHOLD - Current £29,000 baseline not met.");
      score -= 5;
    }
    
    // Relationship
    if (answers.rel_evidence && answers.rel_evidence.length < 3) {
      flags.push("WEAK RELATIONSHIP EVIDENCE - Insufficient joint documentation indicated.");
      score -= 2;
    }

    if (answers.living_arrangement === 'separate') {
      flags.push("LIVING APART - High risk of 'Genuineness' scrutiny by caseworkers.");
      score -= 3;
    }
  }

  if (route === 'Skilled Worker Visa') {
    const salary = parseFloat(answers.sw_salary_exact || "0");
    if (salary > 0 && salary < 38700) {
      flags.push("SALARY BELOW NEW THRESHOLD - £38,700 requirement not met.");
      score -= 5;
    }
    
    if (answers.sponsor_license === 'no') {
      flags.push("NO SPONSOR LICENCE - Employer unable to issue valid CoS.");
      score -= 10;
    }

    if (answers.job_offer_status === 'no') {
      flags.push("NO FORMAL JOB OFFER - Application is premature.");
      score -= 5;
    }
  }

  // --- Final Verdict Determination ---
  let verdict: 'likely' | 'borderline' | 'unlikely';
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  let summary = "";
  let nextSteps: string[] = [];

  if (score >= 4) {
    verdict = 'likely';
    riskLevel = 'LOW';
    summary = "Your profile appears strongly aligned with public rules. Your primary task is ensuring documentation quality matches Home Office standards.";
    nextSteps = [
      "Gather your original documents based on the provided checklist.",
      "Check the 'Going Rate' for your specific job code.",
      "Verify English Language test validity dates.",
      "Ensure all financial evidence covers the full 6-month period."
    ];
  } else if (score >= 0) {
    verdict = 'borderline';
    riskLevel = 'MEDIUM';
    summary = "You meet most core requirements, but several 'Medium Risk' flags suggest potential failure or heavy scrutiny on suitability grounds.";
    nextSteps = [
      "Address the specific risk flags identified in this report.",
      "Obtain formal Employer letters to clarify any income gaps.",
      "Double-check your immigration history dates precisely.",
      "Consult a solicitor for a second opinion on suitability risks."
    ];
  } else {
    verdict = 'unlikely';
    riskLevel = 'HIGH';
    summary = "Significant barriers have been identified. Submitting an application now carries a very high risk of refusal and loss of UKVI fees.";
    nextSteps = [
      "DO NOT apply yet. Address mandatory refusal grounds immediately.",
      "See if your sponsor can adjust salary or sponsorship terms.",
      "Obtain formal OISC or Solicitor advice before proceeding.",
      "Check if any exemptions or human rights grounds apply to your case."
    ];
  }

  return { verdict, riskLevel, riskFlags: flags, summary, nextSteps };
}