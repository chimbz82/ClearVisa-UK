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
    
    if (!relEvidence.includes('joint_tenancy') && !relEvidence.includes('joint_bills')) {
      gaps.push('No joint tenancy or mortgage documentation detected. This is a primary cohabitation proof requirement for Appendix FM.');
      improvements.push('Obtain a landlord letter explicitly naming both parties if tenancy is currently in one name only.');
    }
    
    if (!relEvidence.includes('joint_bank')) {
      gaps.push('No joint bank account indicated. UKVI expects evidence of financial interdependence and shared responsibility.');
      improvements.push('Open a joint bank account immediately and use it for shared expenses to show a 3-6 month history.');
    }
    
    if (answers['living_arrangement'] === 'separate') {
      gaps.push('Living separately significantly raises "genuineness" scrutiny risk by caseworker standards.');
      improvements.push('Prepare a detailed narrative explanation of why you live apart, supported by evidence of regular visits.');
    }
    
    if (answers['live_together_history'] === 'never') {
      gaps.push('Never having lived together in person requires much stronger secondary evidence of subsisting relationship.');
      improvements.push('Compile comprehensive evidence of in-person meetings: travel tickets, photos with family, and call logs.');
    }
  }
  
  // Financial Evidence Analysis
  const incomeSources = answers['income_sources'] || [];
  if (incomeSources.includes('salary')) {
    if (answers['employment_length'] === 'less_6m') {
      gaps.push('Employment for less than 6 months requires "Category B" evidence (showing consistency over 12 months).');
      improvements.push('Obtain formal letters from current and previous employers to show 12 months of consistent earnings above threshold.');
    }
    
    if (answers['bank_statements_format'] === 'pdf') {
      gaps.push('Digital PDF bank statements may not be accepted without official bank stamps or a verifying branch letter.');
      improvements.push('Request stamped/sealed paper statements from your bank branch, or a formal letter verifying the PDF prints.');
    }
  }
  
  if (incomeSources.includes('self_employment')) {
    gaps.push('Self-employment income requires complex documentation (SA302s, Tax Year Overviews, and Accountant certificates).');
    improvements.push('Ensure you have a full year of tax returns and a letter from an OISC-regulated accountant for the last financial year.');
  }

  // Skilled Worker Specific
  if (visaRoute === 'Skilled Worker Visa') {
    const salary = parseFloat(answers['sw_salary_exact'] || '0');
    
    if (salary > 0 && salary < 38700 && !answers['shortage_occupation']) {
      gaps.push(`The reported salary (£${salary.toLocaleString()}) is below the general £38,700 threshold.`);
      improvements.push('Verify if your role qualifies for the "Immigration Salary List" (ISL) lower rate or "New Entrant" rate.');
    }
    
    if (answers['sponsor_license'] === 'unsure' || answers['sponsor_license'] === 'no') {
      gaps.push('Sponsor license status is unconfirmed - no application can be made without a valid Certificate of Sponsorship (CoS).');
      improvements.push('Ask your employer to confirm their sponsor license number and check the official UK Register of Licensed Sponsors.');
    }
  }
  
  // Immigration History
  if (answers['previous_refusals'] === true) {
    gaps.push('Previous visa refusal(s) noted - case will trigger high scrutiny on suitability grounds.');
    if (answers['refusal_letters_status'] !== 'all') {
      gaps.push('Missing refusal letters - you must address previous UKVI concerns directly in your new application.');
      improvements.push('Submit a Subject Access Request (SAR) to UKVI to retrieve copies of all previous refusal notices.');
    }
  }
  
  if (answers['overstays_detail'] === true) {
    gaps.push('History of overstaying is a significant suitability risk for all UK visa routes.');
    improvements.push('Prepare a detailed timeline of the overstay period and provide evidence of any mitigating circumstances.');
  }

  // Accommodation
  if (answers['uk_living_plan'] === 'none') {
    gaps.push('No accommodation arranged - "adequate maintenance and accommodation" is a mandatory requirement.');
    improvements.push('Identify a property and obtain a draft tenancy agreement or a letter from the homeowner/family.');
  }
  
  return { gaps, improvements };
};
