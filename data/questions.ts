import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- SECTION 1: BACKGROUND (1-10) ---
  { id: 'nationality', section: 'Background', label: 'What is your current nationality?', type: 'shortText', showIf: () => true },
  { id: 'dual_nationality', section: 'Background', label: 'Do you hold any other citizenships or dual nationalities?', type: 'boolean', showIf: () => true },
  { id: 'dob', section: 'Background', label: 'What is your full date of birth?', type: 'date', showIf: () => true },
  { id: 'marital_status', section: 'Background', label: 'What is your current legal marital status?', type: 'singleSelect', options: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'civil_partnership', label: 'Civil Partnership' },
      { value: 'unmarried_partner', label: 'Unmarried Partner (2+ years cohabitation)' },
      { value: 'divorced', label: 'Divorced / Dissolved' }
    ], showIf: () => true },
  { id: 'dependants_count', section: 'Background', label: 'How many dependent children do you have?', type: 'number', showIf: () => true },
  { id: 'current_residence', section: 'Background', label: 'In which country do you currently reside?', type: 'shortText', showIf: () => true },
  { id: 'prev_uk_residence', section: 'Background', label: 'Have you ever lived in the United Kingdom previously?', type: 'boolean', showIf: () => true },
  { id: 'overstay_history', section: 'Background', label: 'Have you ever overstayed a visa in the UK or any other country?', type: 'boolean', showIf: () => true },
  { id: 'refusal_history', section: 'Background', label: 'Have you ever been refused a visa or entry to any country?', type: 'boolean', showIf: () => true },
  { id: 'deportation_history', section: 'Background', label: 'Have you ever been deported, removed, or required to leave a country?', type: 'boolean', showIf: () => true },

  // --- SECTION 2: CURRENT STATUS (11-15 + Route) ---
  { id: 'inside_uk', section: 'Status', label: 'Are you currently physically present inside the UK?', type: 'boolean', showIf: () => true },
  { id: 'current_visa_title', section: 'Status', label: 'What is the specific title of your current UK visa?', type: 'shortText', showIf: (ctx) => ctx.answers.inside_uk === true },
  { id: 'visa_expiry_date', section: 'Status', label: 'When does your current leave to remain expire?', type: 'date', showIf: (ctx) => ctx.answers.inside_uk === true },
  { id: 'breach_history', section: 'Status', label: 'Have you ever breached the conditions of a UK visa (e.g. working too many hours)?', type: 'boolean', showIf: () => true },
  { id: 'illegal_work_history', section: 'Status', label: 'Have you ever worked without valid permission in the UK?', type: 'boolean', showIf: () => true },
  { id: 'visa_route', section: 'Status', label: 'Which UK visa route are you assessing today?', type: 'singleSelect', options: [
      { value: 'spouse', label: 'Spouse / Partner Route' },
      { value: 'skilled', label: 'Skilled Worker Route' }
    ], showIf: () => true },

  // --- SECTION 3: RELATIONSHIP / EMPLOYMENT (16-25) ---
  // Spouse Branch
  { id: 'partner_nationality', section: 'Relationship', label: 'What is your partner’s nationality?', type: 'shortText', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'partner_uk_status', section: 'Relationship', label: 'What is your partner’s UK immigration status?', type: 'singleSelect', options: [
      { value: 'british', label: 'British Citizen' },
      { value: 'settled', label: 'Settled Status (ILR / EUSS)' },
      { value: 'refugee', label: 'Refugee Status' },
      { value: 'other', label: 'Other' }
    ], showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'rel_duration', section: 'Relationship', label: 'How long have you been in a subsisting relationship?', type: 'shortText', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'is_legally_joined', section: 'Relationship', label: 'Are you legally married or in a registered civil partnership?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'cohabitation_proof', section: 'Relationship', label: 'Do you have official evidence of living together (e.g. utility bills)?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'children_together', section: 'Relationship', label: 'Do you have any biological or legally adopted children together?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'meeting_frequency', section: 'Relationship', label: 'How often have you physically met in the last 2 years?', type: 'shortText', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'joint_finances', section: 'Relationship', label: 'Do you share any joint bank accounts or financial commitments?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'prev_marriage_history', section: 'Relationship', label: 'Have either of you been previously married or in a civil partnership?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'subsistence_evidence', section: 'Relationship', label: 'Do you have records of communication (chat logs, call history) for the periods spent apart?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },

  // Skilled Worker Branch
  { id: 'sw_job_offer', section: 'Relationship', label: 'Do you have a formal job offer from a UK-based employer?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },
  { id: 'sw_sponsor_license', section: 'Relationship', label: 'Does the employer hold a valid A-rated Sponsor License?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },
  { id: 'sw_cos_assigned', section: 'Relationship', label: 'Has a Certificate of Sponsorship (CoS) already been assigned?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },
  { id: 'sw_job_soc_code', section: 'Relationship', label: 'Do you know the 4-digit SOC occupation code for the role?', type: 'shortText', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },
  { id: 'sw_isl_role', section: 'Relationship', label: 'Is the role on the Immigration Salary List (formerly Shortage Occupation)?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },

  // --- SECTION 4: FINANCES (26-35) ---
  // Spouse Branch
  { id: 'sponsor_income_source', section: 'Finances', label: 'What is the primary source of the sponsor’s income?', type: 'singleSelect', options: [
      { value: 'employment', label: 'Employment (PAYE)' },
      { value: 'self_employed', label: 'Self-Employment / Director' },
      { value: 'savings', label: 'Cash Savings' },
      { value: 'pension', label: 'Pension Income' },
      { value: 'other', label: 'Other' }
    ], showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'sponsor_annual_income', section: 'Finances', label: 'What is the sponsor’s total gross annual income?', type: 'currency', showIf: (ctx) => ctx.answers.visa_route === 'spouse' && ctx.answers.sponsor_income_source !== 'savings' },
  { id: 'employment_length', section: 'Finances', label: 'Has the sponsor been with their current employer for 6 months or more?', type: 'boolean', showIf: (ctx) => ctx.answers.sponsor_income_source === 'employment' },
  { id: 'multiple_employers', section: 'Finances', label: 'Does the sponsor rely on income from multiple employers?', type: 'boolean', showIf: (ctx) => ctx.answers.sponsor_income_source === 'employment' },
  { id: 'cash_savings_total', section: 'Finances', label: 'What is the total amount of cash savings held?', type: 'currency', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'savings_held_period', section: 'Finances', label: 'Have these savings been held in an accessible account for at least 6 months?', type: 'boolean', showIf: (ctx) => ctx.answers.cash_savings_total > 0 },
  { id: 'savings_source', section: 'Finances', label: 'Can you provide evidence of the source of these savings?', type: 'boolean', showIf: (ctx) => ctx.answers.cash_savings_total > 0 },
  { id: 'uk_benefits_receipt', section: 'Finances', label: 'Does the sponsor receive any UK public funds (e.g. PIP, Carer’s Allowance)?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'third_party_support', section: 'Finances', label: 'Do you receive regular financial support from a third party?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },
  { id: 'income_stability', section: 'Finances', label: 'Is the sponsor’s income expected to continue for the duration of the visa?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'spouse' },

  // Skilled Worker Branch
  { id: 'sw_salary_offered', section: 'Finances', label: 'What is the gross annual salary specified on the CoS?', type: 'currency', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },
  { id: 'sw_maintenance_cert', section: 'Finances', label: 'Will the sponsor certify maintenance on the CoS?', type: 'boolean', showIf: (ctx) => ctx.answers.visa_route === 'skilled' },

  // --- SECTION 5: ACCOMMODATION (36-40) ---
  { id: 'acc_arranged', section: 'Accommodation', label: 'Do you have specific accommodation arranged in the UK?', type: 'boolean', showIf: () => true },
  { id: 'acc_type', section: 'Accommodation', label: 'What type of accommodation will you be residing in?', type: 'singleSelect', options: [
      { value: 'owned', label: 'Owned' },
      { value: 'rented', label: 'Private Rented' },
      { value: 'family', label: 'Living with Family/Friends' }
    ], showIf: (ctx) => ctx.answers.acc_arranged === true },
  { id: 'acc_exclusive_use', section: 'Accommodation', label: 'Will you and your family have exclusive use of at least one bedroom?', type: 'boolean', showIf: (ctx) => ctx.answers.acc_arranged === true },
  { id: 'acc_overcrowding', section: 'Accommodation', label: 'To your knowledge, will the property be overcrowded under UK housing rules?', type: 'boolean', showIf: (ctx) => ctx.answers.acc_arranged === true },
  { id: 'acc_landlord_permission', section: 'Accommodation', label: 'Do you have written permission from the owner/landlord for you to reside there?', type: 'boolean', showIf: (ctx) => ctx.answers.acc_type === 'rented' || ctx.answers.acc_type === 'family' },

  // --- SECTION 6: SUITABILITY (41-45) ---
  { id: 'criminal_offence', section: 'Suitability', label: 'Have you ever been convicted of a criminal offence in any country?', type: 'boolean', showIf: () => true },
  { id: 'pending_prosecution', section: 'Suitability', label: 'Do you have any pending criminal prosecutions against you?', type: 'boolean', showIf: () => true },
  { id: 'false_docs_history', section: 'Suitability', label: 'Have you ever used false documents or made false representations to the Home Office?', type: 'boolean', showIf: () => true },
  { id: 'nhs_debt', section: 'Suitability', label: 'Do you owe any outstanding debt of £500 or more to the NHS?', type: 'boolean', showIf: () => true },
  { id: 'public_good_ban', section: 'Suitability', label: 'Have you ever been told your presence in the UK is not conducive to the public good?', type: 'boolean', showIf: () => true },

  // --- SECTION 7: ENGLISH LANGUAGE (46-50) ---
  { id: 'english_test_passed', section: 'English Language', label: 'Have you passed a Secure English Language Test (SELT) at the required level?', type: 'boolean', showIf: () => true },
  { id: 'english_test_provider', section: 'English Language', label: 'Which provider conducted your English test?', type: 'shortText', showIf: (ctx) => ctx.answers.english_test_passed === true },
  { id: 'english_degree_exemption', section: 'English Language', label: 'Do you hold a degree taught in English that is recognized by Ecctis (UK NARIC)?', type: 'boolean', showIf: (ctx) => ctx.answers.english_test_passed === false },
  { id: 'english_nationality_exemption', section: 'English Language', label: 'Are you a national of a majority English-speaking country?', type: 'boolean', showIf: (ctx) => ctx.answers.english_test_passed === false },
  { id: 'english_age_exemption', section: 'English Language', label: 'Are you aged 65 or over, or do you have a physical/mental condition exempting you?', type: 'boolean', showIf: () => true }
];
