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
    
    // Check for critical gaps
    if (!relEvidence.includes('joint_tenancy') && !relEvidence.includes('joint_bills')) {
      gaps.push('No joint tenancy or mortgage documentation detected. This is a primary cohabitation proof requirement.');
      improvements.push('Obtain a landlord letter explicitly naming both parties if tenancy is in one name only.');
    }
    
    if (!relEvidence.includes('joint_bank')) {
      gaps.push('No joint bank account indicated. UKVI expects evidence of financial interdependence.');
      improvements.push('Open a joint bank account immediately and use it for shared expenses (minimum 3 months before application).');
    }
    
    if (answers['living_arrangement'] === 'separate') {
      gaps.push('Living separately significantly raises genuineness scrutiny risk.');
      improvements.push('Prepare detailed explanation of why you live apart, including evidence of regular communication and visits.');
    }
    
    // Check relationship timeline
    if (answers['live_together'] === 'never') {
      gaps.push('Never having lived together may trigger additional genuineness questions.');
      improvements.push('Compile comprehensive evidence of in-person meetings: photos, tickets, accommodation bookings, witness statements.');
    }
  }
  
  // Financial Evidence Analysis
  if (answers['income_sources']?.includes('salary')) {
    if (answers['employment_length'] === 'less_6m') {
      gaps.push('Employment change within 6 months requires additional verification steps (Category B).');
      improvements.push('Obtain formal letter from current and previous employers to show 12 months of consistent earnings.');
    }
  }
  
  if (answers['income_sources']?.includes('self_employment')) {
    gaps.push('Self-employment income requires more complex documentation.');
    improvements.push('Ensure you have: full SA302s, Tax Year Overviews, business accounts, and accountant letter for last full financial year.');
  }
  
  if (answers['income_sources']?.includes('savings')) {
    if (answers['savings_amount'] === 'under_16k' && visaRoute === 'Spouse Visa') {
      gaps.push('Savings under £16,000 cannot be counted towards the financial requirement.');
      improvements.push('Focus on showing employment income or increase savings to above the £16k threshold.');
    }
  }
  
  // Skilled Worker Specific
  if (visaRoute === 'Skilled Worker Visa') {
    if (answers['income_band'] === 'under_29k') {
      gaps.push(`Income band appears to be below the general £38,700 threshold.`);
      improvements.push('Check if role qualifies for shortage occupation rate (lower threshold) or new entrant rate.');
    }
    
    if (answers['sponsor_license'] === 'unsure') {
      gaps.push('Sponsor license status is uncertain - this must be verified before applying.');
      improvements.push('Ask employer to confirm their sponsor license number and check UKVI register.');
    }
    
    if (answers['job_offer'] === false) {
      gaps.push('No formal job offer reported - application is premature.');
      improvements.push('Obtain formal written offer specifying: job title, salary, start date, and confirmation of sponsorship.');
    }
  }
  
  // Immigration History Gaps
  if (answers['previous_refusals']) {
    gaps.push('Previous refusal noted - high risk of suitability scrutiny.');
    improvements.push('Submit SAR to UKVI to retrieve copies of all previous refusal notices to address specific concerns.');
  }
  
  if (answers['overstays_detail']) {
    gaps.push('Overstay history requires comprehensive explanation and evidence it has been resolved.');
    improvements.push('Prepare detailed chronology of overstay period, reasons, and how/when legal status was restored.');
  }
  
  // Accommodation Gaps
  if (!answers['acc_evidence'] || answers['acc_evidence'].length === 0) {
    gaps.push('No accommodation evidence indicated.');
    improvements.push('Secure accommodation evidence: rental agreement, mortgage, or letter from homeowner offering accommodation.');
  }
  
  // Return results
  return { gaps, improvements };
};