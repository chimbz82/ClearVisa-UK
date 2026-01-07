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
  if (answers['visa_route'] === 'spouse') {
    if (answers['joint_accounts'] === false) {
      gaps.push('No joint bank account indicated. UKVI expects evidence of financial interdependence.');
      improvements.push('Open a joint bank account and use it for shared expenses.');
    }
    
    if (answers['shared_tenancy'] === false) {
      gaps.push('No joint tenancy or mortgage documentation detected.');
      improvements.push('Obtain a letter from the landlord if you are living together informally.');
    }
    
    if (answers['is_married'] === false && answers['cohabitation_length'] !== 'over_2') {
      gaps.push('Unmarried partners typically need 2 years of cohabitation proof.');
      improvements.push('Gather secondary evidence of cohabitation like individual bank statements to the same address.');
    }
  }
  
  // Financial Evidence Analysis
  if (answers['sponsor_emp_type'] === 'paye') {
    if (answers['sponsor_emp_length'] === 'under_6m') {
      gaps.push('Employment under 6 months requires 12 months of historical earnings proof.');
      improvements.push('Obtain previous P60s or employer letters from the last 12 months.');
    }
  }
  
  if (answers['cash_savings_16k'] === true && answers['savings_6m'] === false) {
    gaps.push('Savings must be held for 6 months minimum before application.');
    improvements.push('Ensure savings remain in your account until the 6-month milestone is reached.');
  }
  
  // Skilled Worker Specific
  if (answers['visa_route'] === 'skilled') {
    const salary = parseFloat(answers['sw_salary_exact'] || '0');
    
    if (salary > 0 && salary < 38700) {
      gaps.push(`Salary of £${salary.toLocaleString()} is below the standard £38,700 threshold.`);
      improvements.push('Verify if the role is eligible for a lower threshold due to the Immigration Salary List.');
    }
    
    if (answers['sw_cos_assigned'] === false) {
      gaps.push('Certificate of Sponsorship (CoS) not yet assigned.');
      improvements.push('Liaise with your employer to ensure your CoS is assigned before submission.');
    }
  }
  
  // Immigration History Gaps
  if (answers['refused_visa'] === true) {
    gaps.push('Previous refusal noted - requires addressing specifically in the cover letter.');
    improvements.push('Submit a SAR to UKVI to retrieve all previous refusal notices.');
  }
  
  if (answers['nhs_debt_500'] === true) {
    gaps.push('NHS debt over £500 is a standard ground for refusal.');
    improvements.push('Clear the debt and get a confirmation letter before applying.');
  }

  // English Language
  if (answers['english_test_taken'] === false && !answers['degree_english'] && !answers['english_exempt']) {
    gaps.push('No English language evidence provided.');
    improvements.push('Book a SELT test (IELTS/PTE) at the required CEFR level.');
  }
  
  return { gaps, improvements };
};
