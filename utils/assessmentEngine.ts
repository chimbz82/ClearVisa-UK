import { AssessmentResult } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  let score = 5; // Start with neutral-positive baseline

  // ✅ NEW: Validate required answers exist
  if (!answers['visa_route'] || !answers['nationality']) {
    return {
      verdict: 'unlikely',
      riskLevel: 'HIGH',
      riskFlags: ['INCOMPLETE DATA - Critical information missing'],
      summary: 'Unable to complete assessment due to missing core information.',
      nextSteps: ['Return to questionnaire and complete all required fields.']
    };
  }

  // --- Core Eligibility & Suitability ---
  if (answers['criminal_records'] === true) {
    flags.push("CRIMINAL HISTORY - Potential Suitability Grounds for Refusal.");
    score -= 10;
  }
  if (answers['overstays_detail'] === true) {
    flags.push("PREVIOUS OVERSTAY - Significant barrier for switching or re-entry.");
    score -= 8;
  }
  if (answers['previous_refusals'] === true) {
    flags.push("PREVIOUS REFUSAL - Case will trigger extra scrutiny for suitability.");
    score -= 4;
  }

  // --- Route Specifics ---
  if (route === 'Spouse Visa') {
    // Financial (Appendix FM)
    if (answers['income_band'] === 'under_29k') {
      flags.push("INCOME BELOW THRESHOLD - Current £29,000 baseline not met.");
      score -= 5;
    }
    
    // Relationship
    const relEvidence = answers['rel_evidence'] || [];
    if (relEvidence.length > 0 && relEvidence.length < 3) {
      flags.push("WEAK RELATIONSHIP EVIDENCE - Low volume of cohabitation proof selected.");
      score -= 2;
    }

    if (answers['living_arrangement'] === 'separate') {
      flags.push("LIVING APART - High risk of 'Genuineness' scrutiny by UKVI.");
      score -= 3;
    }
    
    if (answers['english_test'] === 'no') {
      flags.push("ENGLISH LANGUAGE - No valid SELT certificate indicated.");
      score -= 3;
    }
  }

  if (route === 'Skilled Worker Visa') {
    const salary = parseFloat(answers['sw_salary_exact'] || "0");
    if (salary > 0 && salary < 38700 && !answers['shortage_occupation']) {
      flags.push("SALARY BELOW NEW THRESHOLD - General £38,700 requirement not met.");
      score -= 5;
    }
    
    if (answers['sponsor_license'] === 'no') {
      flags.push("NO SPONSOR LICENCE - Employer unable to issue valid Certificate of Sponsorship.");
      score -= 10;
    }

    if (answers['job_offer'] === false) {
      flags.push("NO FORMAL JOB OFFER - Application is considered premature.");
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
    summary = "Your profile appears strongly aligned with current public rules. Your primary task is ensuring that documentation quality matches high Home Office standards.";
    nextSteps = [
      "Gather your original documents based on the provided checklist.",
      "Check the 'Going Rate' for your specific SOC occupation code.",
      "Verify English Language test validity and provider certification.",
      "Ensure all financial evidence covers the full mandatory 6-month period."
    ];
  } else if (score >= 0) {
    verdict = 'borderline';
    riskLevel = 'MEDIUM';
    summary = "You meet most core requirements, but several 'Medium Risk' flags suggest potential for refusal or heavy scrutiny on suitability or financial grounds.";
    nextSteps = [
      "Address the specific risk flags identified in this report immediately.",
      "Obtain formal Employer letters to clarify any income or tenure gaps.",
      "Double-check your immigration history dates precisely against travel records.",
      "Consult a qualified solicitor for a professional opinion on suitability risks."
    ];
  } else {
    verdict = 'unlikely';
    riskLevel = 'HIGH';
    summary = "Significant barriers have been identified based on your answers. Submitting an application now carries a very high risk of refusal and loss of UKVI fees.";
    nextSteps = [
      "DO NOT apply yet. Address mandatory refusal grounds immediately.",
      "Inquire if your sponsor can adjust salary or sponsorship terms.",
      "Obtain formal OISC-regulated or Solicitor advice before proceeding.",
      "Check if any specific exemptions or human rights grounds apply to your situation."
    ];
  }

  return { verdict, riskLevel, riskFlags: flags, summary, nextSteps };
}