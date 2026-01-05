
import { AssessmentResult } from '../types';

export function runAssessment(route: string, answers: Record<string, any>): AssessmentResult {
  const flags: string[] = [];
  let score = 0; // Higher is better

  // --- Generic Logic (Shared) ---
  if (answers.criminal_history === 'yes_serious') {
    flags.push("Serious criminal history is a mandatory ground for refusal.");
    score -= 10;
  }
  if (answers.previous_refusals === 'yes_multiple') {
    flags.push("Multiple previous refusals indicate a high risk of 'suitability' issues.");
    score -= 5;
  }
  if (answers.security_ban === true) {
    flags.push("An existing security or immigration ban is a critical barrier.");
    score -= 10;
  }
  if (answers.current_location === 'in_uk_no_visa') {
    flags.push("Current status in the UK without a valid visa makes in-country switching impossible.");
    score -= 8;
  }

  // --- Route Specific Logic ---
  if (route === 'Spouse Visa') {
    const income = parseFloat(answers.annual_income || "0");
    const savings = parseFloat(answers.savings_amount || "0");
    
    // As of 2024, the threshold is £29,000 for standard spouse visas
    if (income < 29000 && savings < 16000) {
      flags.push("Current combined income/savings appear to be below the £29,000 threshold.");
      score -= 5;
    } else if (income < 32000) {
      flags.push("Income is close to the mandatory threshold; verification of 6 months' payslips is critical.");
      score += 1;
    } else {
      score += 5;
    }

    if (answers.relationship_type === 'other') {
      flags.push("The selected relationship type may not fit standard eligibility categories without extra proof.");
      score -= 2;
    }
  }

  if (route === 'Skilled Worker Visa') {
    const salary = parseFloat(answers.sw_annual_salary || "0");
    if (salary < 38700) {
      flags.push("Salary is below the general £38,700 threshold (subject to tradeable points).");
      score -= 4;
    } else {
      score += 5;
    }

    if (answers.approved_sponsor === 'no') {
      flags.push("Employer must be an approved sponsor to issue a Certificate of Sponsorship (CoS).");
      score -= 8;
    }
    if (answers.job_offer === 'no') {
      flags.push("A confirmed job offer is mandatory for a Skilled Worker application.");
      score -= 5;
    }
  }

  // --- Final Verdict Determination ---
  let verdict: 'likely' | 'borderline' | 'unlikely';
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  let summary = "";
  let nextSteps: string[] = [];

  if (score >= 5) {
    verdict = 'likely';
    riskLevel = 'LOW';
    summary = "Based on your inputs, you meet the primary published requirements for this route. Your focus should be on perfect documentation.";
    nextSteps = [
      "Gather your original documents (Passport, English test, etc.)",
      "Check the 'going rate' for your specific SOC code (if Skilled Worker)",
      "Book a legal document review to ensure compliance."
    ];
  } else if (score >= 0) {
    verdict = 'borderline';
    riskLevel = 'MEDIUM';
    summary = "You meet some requirements, but key risks or 'Suitability' issues have been identified. You are in a sensitive category.";
    nextSteps = [
      "Review the specific 'Flags' identified in this report.",
      "Check if you qualify for any 'Tradeable Points' or exemptions.",
      "Consider a consultation with an OISC-regulated adviser."
    ];
  } else {
    verdict = 'unlikely';
    riskLevel = 'HIGH';
    summary = "Significant barriers have been identified. Submitting an application now carries a high risk of refusal and loss of Home Office fees.";
    nextSteps = [
      "DO NOT apply yet. Address the mandatory refusal grounds first.",
      "Check if your sponsor can increase salary or provide different evidence.",
      "Seek formal legal advice before taking further steps."
    ];
  }

  return { verdict, riskLevel, riskFlags: flags, summary, nextSteps };
}
