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
    
    // Check for critical gaps in cohabitation evidence
    if (!relEvidence.includes('joint_tenancy') && !relEvidence.includes('joint_bills') && !relEvidence.includes('joint_bank')) {
      gaps.push('Significant lack of joint financial or residential evidence (e.g., joint tenancy, bills, or bank accounts).');
      improvements.push('Consider consolidating utilities or tenancy into joint names at least 3-6 months before applying.');
    }
    
    if (answers['living_arrangement'] === 'separate') {
      gaps.push('Current separate living arrangement may trigger "genuineness" scrutiny under Appendix FM.');
      improvements.push('Prepare a detailed witness statement explaining why you live apart and evidence of regular visits/communication.');
    }
    
    // Check relationship timeline
    if (answers['live_together_history'] === 'never') {
      gaps.push('No history of living together noted. UKVI requires proof of a subsisting relationship.');
      improvements.push('Gather secondary evidence of the relationship: detailed call logs, flight tickets for visits, and photos with third parties.');
    }
  }
  
  // Financial Evidence Analysis
  const incomeSources = answers['income_sources'] || [];
  if (incomeSources.includes('salary')) {
    if (answers['employment_length'] === 'less_6m') {
      gaps.push('Current employment is less than 6 months. This usually requires "Category B" evidence (showing 12 months of history).');
      improvements.push('Request payslips and a formal letter from your previous employer to cover the full 12-month period.');
    }
    
    if (answers['bank_statements_format'] === 'pdf') {
      gaps.push('PDF bank statements are used. These often require official bank stamps or a verifying letter from the bank branch.');
      improvements.push('Contact your bank to request officially stamped statements or a letter confirming the authenticity of electronic records.');
    }
  }
  
  if (incomeSources.includes('savings')) {
    if (answers['savings_amount'] === 'under_16k' && visaRoute === 'Spouse Visa') {
      gaps.push('Savings under £16,000 cannot be used to offset income shortfalls for Spouse Visas.');
      improvements.push('Unless you have other income, focus on reaching the £16,000 threshold plus the required offset amount.');
    }
  }
  
  // Skilled Worker Specific
  if (visaRoute === 'Skilled Worker Visa') {
    const salary = parseFloat(answers['sw_salary_exact'] || '0');
    
    if (salary > 0 && salary < 38700 && !answers['shortage_occupation']) {
      gaps.push(`The reported salary (£${salary.toLocaleString()}) is below the general threshold of £38,700.`);
      improvements.push('Check if your role qualifies as a "New Entrant" or if the occupation code has a lower "Going Rate".');
    }
    
    if (answers['sponsor_license'] === 'unsure' || answers['sponsor_license'] === 'no') {
      gaps.push('Sponsor license status is unconfirmed. A valid Certificate of Sponsorship (CoS) cannot be issued without one.');
      improvements.push('Verify the employer\'s license status on the official UK Register of Licensed Sponsors.');
    }
  }
  
  // Immigration History Analysis
  if (answers['previous_refusals'] === true) {
    gaps.push('Previous visa refusal(s) noted. This triggers "Suitability" checks and high scrutiny.');
    if (answers['refusal_letters_status'] !== 'all') {
      gaps.push('Missing copies of past refusal letters. This makes it difficult to address previous UKVI concerns.');
      improvements.push('Submit a Subject Access Request (SAR) to the Home Office to retrieve your full immigration file and refusal notices.');
    }
  }
  
  if (answers['overstays_detail'] === true) {
    gaps.push('History of overstaying in the UK. This is a significant suitability risk.');
    improvements.push('Gather evidence of any mitigating circumstances for the overstay period to prevent a mandatory refusal.');
  }

  // Accommodation
  if (answers['uk_living_plan'] === 'none') {
    gaps.push('No firm accommodation plan in the UK. Evidence of suitable housing is a mandatory requirement.');
    improvements.push('Identify a potential property and obtain a landlord letter or tenancy agreement draft.');
  }
  
  return { gaps, improvements };
};
