import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- SECTION A: IDENTITY & BACKGROUND ---
  {
    id: 'nationality',
    section: 'Identity & Background',
    label: '1. What is your nationality?',
    type: 'shortText',
    placeholder: 'e.g. Indian, American, Nigerian',
    showIf: () => true
  },
  {
    id: 'dual_nationality',
    section: 'Identity & Background',
    label: '2. Do you hold dual nationality?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'dob',
    section: 'Identity & Background',
    label: '3. What is your date of birth?',
    type: 'date',
    showIf: () => true
  },
  {
    id: 'marital_status',
    section: 'Identity & Background',
    label: '4. What is your marital status?',
    type: 'singleSelect',
    options: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'civil_partnership', label: 'Civil Partnership' },
      { value: 'unmarried_partner', label: 'Unmarried Partner (Living together 2+ years)' },
      { value: 'divorced', label: 'Divorced / Dissolved' }
    ],
    showIf: () => true
  },
  {
    id: 'dependant_children',
    section: 'Identity & Background',
    label: '5. Do you have any dependent children?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'current_country',
    section: 'Identity & Background',
    label: '6. What country do you currently live in?',
    type: 'shortText',
    showIf: () => true
  },
  {
    id: 'lived_uk_before',
    section: 'Identity & Background',
    label: '7. Have you ever lived in the UK before?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'overstayed_visa',
    section: 'Identity & Background',
    label: '8. Have you ever overstayed a visa?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'refused_visa',
    section: 'Identity & Background',
    label: '9. Have you ever been refused a visa to any country?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'deported_removed',
    section: 'Identity & Background',
    label: '10. Have you ever been deported or removed from a country?',
    type: 'boolean',
    showIf: () => true
  },

  // --- SECTION B: CURRENT UK STATUS ---
  {
    id: 'inside_uk',
    section: 'Current UK Status',
    label: '11. Are you currently inside the UK?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'current_visa_type',
    section: 'Current UK Status',
    label: '12. If inside the UK, what visa are you currently on?',
    type: 'shortText',
    placeholder: 'e.g. Graduate, Student, Visitor',
    showIf: (ctx) => ctx.answers.inside_uk === true
  },
  {
    id: 'visa_expiry',
    section: 'Current UK Status',
    label: '13. What is your visa expiry date?',
    type: 'date',
    showIf: (ctx) => ctx.answers.inside_uk === true
  },
  {
    id: 'breached_conditions',
    section: 'Current UK Status',
    label: '14. Have you ever breached conditions of a UK visa?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'worked_without_permission',
    section: 'Current UK Status',
    label: '15. Have you ever worked without permission in the UK?',
    type: 'boolean',
    showIf: () => true
  },

  // --- ROUTE SELECTOR (For internal branching) ---
  {
    id: 'visa_route',
    section: 'Application Target',
    label: 'Which visa route are you assessing?',
    type: 'singleSelect',
    options: [
      { value: 'spouse', label: 'Spouse / Partner Route' },
      { value: 'skilled', label: 'Skilled Worker Route' }
    ],
    showIf: () => true
  },

  // --- SECTION C: RELATIONSHIP ROUTE (SPOUSE/PARTNER) ---
  {
    id: 'partner_nationality',
    section: 'Relationship Route',
    label: '16. What is your partner’s nationality?',
    type: 'shortText',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'partner_status',
    section: 'Relationship Route',
    label: '17. What is your partner’s UK immigration status?',
    type: 'singleSelect',
    options: [
      { value: 'british', label: 'British Citizen' },
      { value: 'settled', label: 'Settled (ILR / EUSS)' },
      { value: 'refugee', label: 'Refugee / Humanitarian Protection' },
      { value: 'other', label: 'Other' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'rel_start_date',
    section: 'Relationship Route',
    label: '18. When did your relationship begin?',
    type: 'date',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'is_married',
    section: 'Relationship Route',
    label: '19. Are you legally married or in a civil partnership?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'cohabitation_length',
    section: 'Relationship Route',
    label: '20. If unmarried, how long have you lived together?',
    type: 'singleSelect',
    options: [
      { value: 'none', label: 'Not living together' },
      { value: 'under_2', label: 'Less than 2 years' },
      { value: 'over_2', label: '2 years or more' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse' && ctx.answers.is_married === false
  },
  {
    id: 'shared_tenancy',
    section: 'Relationship Route',
    label: '21. Do you have shared tenancy or mortgage documents?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'joint_accounts',
    section: 'Relationship Route',
    label: '22. Do you have joint bank accounts or bills?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'children_together',
    section: 'Relationship Route',
    label: '23. Do you have children together?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'prev_couple_apps',
    section: 'Relationship Route',
    label: '24. Have you previously applied as a couple before?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'person_meetings',
    section: 'Relationship Route',
    label: '25. How often have you physically met in person?',
    type: 'singleSelect',
    options: [
      { value: 'daily', label: 'Lived together / Daily' },
      { value: 'frequent', label: 'Frequent visits' },
      { value: 'rare', label: 'Rarely / Long distance' },
      { value: 'never', label: 'Never met in person' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },

  // --- SECTION C: SKILLED WORKER BRANCH (Parallel 16-25 for SW) ---
  {
    id: 'sw_job_offer',
    section: 'Employment',
    label: '16. Have you received a formal UK job offer?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },
  {
    id: 'sw_sponsor_license',
    section: 'Employment',
    label: '17. Does the employer hold a valid Sponsor License?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },
  {
    id: 'sw_cos_assigned',
    section: 'Employment',
    label: '18. Has a Certificate of Sponsorship (CoS) been assigned?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },
  {
    id: 'sw_job_code',
    section: 'Employment',
    label: '19. Do you know your 4-digit SOC occupation code?',
    type: 'shortText',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },
  {
    id: 'sw_shortage',
    section: 'Employment',
    label: '20. Is the role on the Immigration Salary List (Shortage)?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },

  // --- SECTION D: FINANCIAL REQUIREMENT (SPOUSE) ---
  {
    id: 'sponsor_emp_type',
    section: 'Financial Requirement',
    label: '26. What is your sponsor’s employment type?',
    type: 'singleSelect',
    options: [
      { value: 'paye', label: 'Salaried (PAYE)' },
      { value: 'self_employed', label: 'Self-Employed' },
      { value: 'director', label: 'Director of Ltd Company' },
      { value: 'unemployed', label: 'Unemployed' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'sponsor_emp_length',
    section: 'Financial Requirement',
    label: '27. How long has the sponsor been employed?',
    type: 'singleSelect',
    options: [
      { value: 'under_6m', label: 'Less than 6 months' },
      { value: 'over_6m', label: '6 months or more' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'sponsor_annual_income',
    section: 'Financial Requirement',
    label: '28. What is the sponsor’s annual income?',
    type: 'currency',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'sponsor_multiple_jobs',
    section: 'Financial Requirement',
    label: '29. Does the sponsor have multiple jobs?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'sponsor_benefits',
    section: 'Financial Requirement',
    label: '30. Does the sponsor receive any UK benefits?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'cash_savings_16k',
    section: 'Financial Requirement',
    label: '31. Do you hold cash savings of £16,000 or more?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'savings_6m',
    section: 'Financial Requirement',
    label: '32. Have those savings been held for at least 6 months?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.cash_savings_16k === true
  },
  {
    id: 'combine_income_savings',
    section: 'Financial Requirement',
    label: '33. Do you combine income and savings?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'third_party_help',
    section: 'Financial Requirement',
    label: '34. Do you receive third-party financial help?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'income_source_location',
    section: 'Financial Requirement',
    label: '35. Is your income earned inside or outside the UK?',
    type: 'singleSelect',
    options: [
      { value: 'inside', label: 'Inside the UK' },
      { value: 'outside', label: 'Outside the UK' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },

  // --- SECTION D: FINANCIAL BRANCH (SKILLED WORKER) ---
  {
    id: 'sw_salary_exact',
    section: 'Financial Requirement',
    label: '26. What is the gross annual salary offered?',
    type: 'currency',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },
  {
    id: 'sw_maintenance_cert',
    section: 'Financial Requirement',
    label: '27. Will your sponsor certify your maintenance?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },

  // --- SECTION E: ACCOMMODATION ---
  {
    id: 'accommodation_arranged',
    section: 'Accommodation',
    label: '36. Do you have accommodation arranged in the UK?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'accommodation_tenure',
    section: 'Accommodation',
    label: '37. Will you live in owned or rented property?',
    type: 'singleSelect',
    options: [
      { value: 'owned', label: 'Owned' },
      { value: 'rented', label: 'Rented' },
      { value: 'family', label: 'Living with Family' }
    ],
    showIf: (ctx) => ctx.answers.accommodation_arranged === true
  },
  {
    id: 'overcrowding_check',
    section: 'Accommodation',
    label: '38. Will there be overcrowding under UK rules?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.accommodation_arranged === true
  },
  {
    id: 'exclusive_bedroom',
    section: 'Accommodation',
    label: '39. Will you have exclusive use of a bedroom?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.accommodation_arranged === true
  },
  {
    id: 'permission_letters',
    section: 'Accommodation',
    label: '40. Do you have permission letters from owners if required?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.accommodation_tenure === 'rented' || ctx.answers.accommodation_tenure === 'family'
  },

  // --- SECTION F: SUITABILITY & CHARACTER ---
  {
    id: 'criminal_convictions',
    section: 'Suitability & Character',
    label: '41. Have you ever been convicted of a criminal offence?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'pending_charges',
    section: 'Suitability & Character',
    label: '42. Do you have any pending criminal charges?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'false_documents',
    section: 'Suitability & Character',
    label: '43. Have you ever used false documents?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'nhs_debt_500',
    section: 'Suitability & Character',
    label: '44. Do you owe debts to the NHS?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'entry_ban',
    section: 'Suitability & Character',
    label: '45. Have you ever been banned from entering the UK?',
    type: 'boolean',
    showIf: () => true
  },

  // --- SECTION G: ENGLISH LANGUAGE ---
  {
    id: 'english_test_taken',
    section: 'English Language',
    label: '46. Have you taken an English language test?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'test_provider',
    section: 'English Language',
    label: '47. Which test provider did you use?',
    type: 'shortText',
    showIf: (ctx) => ctx.answers.english_test_taken === true
  },
  {
    id: 'cefr_level_achieved',
    section: 'English Language',
    label: '48. What CEFR level did you achieve?',
    type: 'singleSelect',
    options: [
      { value: 'a1', label: 'A1' },
      { value: 'a2', label: 'A2' },
      { value: 'b1', label: 'B1' },
      { value: 'b2', label: 'B2' },
      { value: 'c1', label: 'C1 or higher' }
    ],
    showIf: (ctx) => ctx.answers.english_test_taken === true
  },
  {
    id: 'english_exempt',
    section: 'English Language',
    label: '49. Are you exempt due to nationality or disability?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.english_test_taken === false
  },
  {
    id: 'degree_english',
    section: 'English Language',
    label: '50. Do you hold a degree taught in English?',
    type: 'boolean',
    showIf: () => true
  }
];
