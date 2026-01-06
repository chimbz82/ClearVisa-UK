/**
 * Analyzes evidence gaps based on user's answers
 * Returns personalized gap analysis and improvement suggestions
 */
export const analyzeEvidenceGaps = (
  answers: Record<string, any>, 
  visaRoute: string
): { gaps: string[], improvements: string[] } => {
  const gaps: string[] = [];
  const improvements: string[] = [];
  
  // Relationship Evidence Analysis (Spouse Visa)
  if (visaRoute === 'Spouse Visa') {
    const relEvidence = answers['rel_evidence'] || [];
    
    // ✅ FIXED: Use correct property names from questions.ts
    if (!relEvidence.includes('tenancy')) {
      gaps.push('No joint tenancy or mortgage documentation detected. This is a primary cohabitation proof requirement.');
      improvements.push('Obtain a landlord letter explicitly naming both parties if tenancy is in one name only.');
    }
    
    if (!relEvidence.includes('bank')) {
      gaps.push('No joint bank account indicated. UKVI expects evidence of financial interdependence.');
      improvements.push('Open a joint bank account immediately and use it for shared expenses (minimum 3 months before application).');
    }
    
    if (answers['living_arrangement'] === 'separate') {
      gaps.push('Living separately significantly raises genuineness scrutiny risk.');
      improvements.push('Prepare detailed explanation of why you live apart, including evidence of regular communication and visits.');
    }
    
    // ✅ FIXED: Correct property name
    if (answers['live_together'] === 'never') {
      gaps.push('Never having lived together may trigger additional genuineness questions.');
      improvements.push('Compile comprehensive evidence of in-person meetings: photos, tickets, accommodation bookings, witness statements.');
    }
  }
  
  // Financial Evidence Analysis
  if (answers['fin_req_method'] === 'employment') {
    if (answers['sponsor_emp_status'] === 'changed_6m') {
      gaps.push('Employment change within 6 months requires additional verification steps (Category B).');
      improvements.push('Obtain formal letter from current and previous employers to show 12 months of consistent earnings.');
    }
  }
  
  if (answers['fin_req_method'] === 'self_employment') {
    gaps.push('Self-employment income requires more complex documentation (Appendix FM-SE).');
    improvements.push('Ensure you have: full SA302s, Tax Year Overviews, business accounts, and accountant letter for last full financial year.');
  }
  
  if (answers['fin_req_method'] === 'savings') {
    gaps.push('Cash savings must be held for 6 months minimum before application.');
    improvements.push('Ensure savings have been in accessible cash accounts for full 6 months with continuous balance above threshold.');
  }
  
  // Skilled Worker Specific
  if (visaRoute === 'Skilled Worker Visa') {
    const salary = parseFloat(answers['sw_salary_exact'] || '0');
    
    if (salary > 0 && salary < 38700) {
      gaps.push(`Salary of £${salary.toLocaleString()} is below the £38,700 general threshold.`);
      improvements.push('Check if role qualifies for Immigration Salary List rate (lower threshold) or new entrant rate.');
    }
    
    if (answers['sponsor_license'] === 'no' || answers['sponsor_license'] === 'unsure') {
      gaps.push('Sponsor license status uncertain - this must be verified before applying.');
      improvements.push('Ask employer to confirm their sponsor license number and check UKVI register of licensed sponsors.');
    }
    
    if (answers['job_offer_status'] === 'no') {
      gaps.push('No formal job offer reported - application is premature.');
      improvements.push('Obtain formal written offer specifying: job title, salary, start date, and confirmation of sponsorship.');
    }
  }
  
  // Immigration History Gaps
  if (answers['previous_refusals']) {
    gaps.push('Previous refusal noted - requires addressing in application.');
    // ✅ FIXED: Correct property name
    if (answers['refusal_letters'] && answers['refusal_letters'] !== 'all') {
      gaps.push('Missing refusal letters - obtain copies via UKVI Subject Access Request.');
      improvements.push('Submit SAR to UKVI to retrieve all previous refusal notices to address specific concerns properly.');
    }
  }
  
  if (answers['overstays']) {
    gaps.push('Overstay history requires comprehensive explanation and evidence it has been resolved.');
    improvements.push('Prepare detailed chronology of overstay period, reasons, and how/when legal status was restored.');
  }
  
  // Accommodation Gaps
  if (answers['uk_living_plan'] === 'none') {
    gaps.push('No accommodation arranged - this is required evidence for most visa types.');
    improvements.push('Secure accommodation evidence: rental agreement, mortgage, or letter from homeowner offering accommodation.');
  }

  if (answers['uk_living_plan'] === 'family') {
    const accEvidence = answers['acc_evidence'] || [];
    if (!accEvidence.includes('permission')) {
      gaps.push('Living with family requires letter of permission from the property owner.');
      improvements.push('Obtain formal letter from homeowner granting permission, plus proof they own/rent the property.');
    }
  }
  
  // Return results
  return { gaps, improvements };
};