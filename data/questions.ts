import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- STAGE 1: FREE PRE-CHECK (1-12) ---
  { id: 'visa_route', section: 'Initial', label: 'Which UK visa route are you assessing?', type: 'singleSelect', options: [{ value: 'spouse', label: 'Spouse / Partner' }, { value: 'skilled', label: 'Skilled Worker' }], showIf: () => true },
  { id: 'nationality', section: 'Initial', label: 'What is your current nationality?', type: 'shortText', showIf: () => true },
  { id: 'marital_status', section: 'Initial', label: 'What is your legal marital status?', type: 'singleSelect', options: [{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married' }, { value: 'civil', label: 'Civil Partnership' }, { value: 'unmarried', label: 'Unmarried Partner (2+ yrs)' }], showIf: () => true },
  { id: 'inside_uk', section: 'Initial', label: 'Are you currently inside the UK?', type: 'boolean', showIf: () => true },
  { id: 'partner_uk_status', section: 'Initial', label: 'What is your partner’s UK status?', type: 'singleSelect', options: [{ value: 'british', label: 'British Citizen' }, { value: 'settled', label: 'Settled (ILR/EUSS)' }, { value: 'refugee', label: 'Refugee' }, { value: 'none', label: 'Not in UK' }], showIf: (ctx) => ctx.route === 'spouse' },
  { id: 'sponsor_income', section: 'Initial', label: 'Approximate gross annual income of sponsor?', type: 'currency', placeholder: 'e.g. 35000', showIf: (ctx) => ctx.route === 'spouse' },
  { id: 'sw_salary', section: 'Initial', label: 'What is the offered annual salary?', type: 'currency', placeholder: 'e.g. 40000', showIf: (ctx) => ctx.route === 'skilled' },
  { id: 'refusal_history', section: 'Initial', label: 'Have you ever been refused a visa for any country?', type: 'boolean', showIf: () => true },
  { id: 'criminal_offence', section: 'Initial', label: 'Do you have any criminal convictions or cautions?', type: 'boolean', showIf: () => true },
  { id: 'overstay_history', section: 'Initial', label: 'Have you ever overstayed a visa in the UK?', type: 'boolean', showIf: () => true },
  { id: 'english_test_passed', section: 'Initial', label: 'Have you passed an approved English test?', type: 'boolean', showIf: () => true },
  { id: 'passport_expiry', section: 'Initial', label: 'Does your passport have at least 6 months validity?', type: 'boolean', showIf: () => true },

  // --- STAGE 2: DEEP AUDIT (PAID ONLY - 13 TO 55+) ---
  
  // Background Details
  { id: 'dual_nationality', section: 'Background', label: 'Do you hold any other citizenships?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'dob', section: 'Background', label: 'What is your date of birth?', type: 'date', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'prev_uk_visa_titles', section: 'Background', label: 'List your previous UK visa types (if any)', type: 'shortText', placeholder: 'e.g. Student, Graduate, Visitor', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'current_visa_expiry', section: 'Background', label: 'When does your current leave expire?', type: 'date', showIf: (ctx) => ctx.answers.inside_uk === true && ctx.tier !== 'free' },
  { id: 'ni_number', section: 'Background', label: 'Do you have a UK National Insurance number?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'travel_history_10yr', section: 'Background', label: 'Can you list all travel in last 10 years?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },

  // Relationship (Spouse Route Only)
  { id: 'rel_meeting_date', section: 'Relationship', label: 'When did you first meet in person?', type: 'date', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'wedding_date', section: 'Relationship', label: 'What was the date of your legal marriage?', type: 'date', showIf: (ctx) => ctx.answers.marital_status === 'married' && ctx.tier !== 'free' },
  { id: 'cohab_start_date', section: 'Relationship', label: 'When did you start living together?', type: 'date', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'joint_accounts', section: 'Relationship', label: 'Do you have joint bank accounts?', type: 'boolean', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'joint_tenancy', section: 'Relationship', label: 'Are both names on a tenancy or mortgage?', type: 'boolean', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'subsistence_proof', section: 'Relationship', label: 'Do you have chat logs covering periods apart?', type: 'boolean', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'children_together', section: 'Relationship', label: 'Do you have biological children together?', type: 'boolean', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'partner_prev_marriage', section: 'Relationship', label: 'Has your partner been married before?', type: 'boolean', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'meeting_venue', section: 'Relationship', label: 'Where was your marriage ceremony held?', type: 'shortText', showIf: (ctx) => ctx.answers.marital_status === 'married' && ctx.tier !== 'free' },
  { id: 'rel_future_plans', section: 'Relationship', label: 'Briefly describe your future plans in the UK', type: 'longText', showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },

  // Finances (Deep Audit)
  { id: 'sponsor_emp_type', section: 'Finances', label: 'Sponsor employment type?', type: 'singleSelect', options: [{ value: 'paye', label: 'Salaried (PAYE)' }, { value: 'self', label: 'Self-Employed' }, { value: 'director', label: 'Director' }], showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'free' },
  { id: 'sponsor_emp_length', section: 'Finances', label: 'Has sponsor been in role for 6+ months?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'bank_stmt_6m', section: 'Finances', label: 'Do you have 6 full months of bank statements?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'payslips_6m', section: 'Finances', label: 'Do you have 6 matching payslips?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'employer_letter', section: 'Finances', label: 'Can you get a formal employer letter?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'cash_savings_amt', section: 'Finances', label: 'Total cash savings held?', type: 'currency', placeholder: 'e.g. 20000', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'savings_held_6m', section: 'Finances', label: 'Have savings been held for 6+ months?', type: 'boolean', showIf: (ctx) => ctx.answers.cash_savings_amt > 0 && ctx.tier !== 'free' },
  { id: 'p60_available', section: 'Finances', label: 'Is the most recent P60 available?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'secondary_income', section: 'Finances', label: 'Any secondary income sources?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'benefits_receipt', section: 'Finances', label: 'Is the sponsor on any UK benefits?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'unearned_income', section: 'Finances', label: 'Any dividends or rental income?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'financial_maintenance_cert', section: 'Finances', label: 'Will sponsor certify maintenance?', type: 'boolean', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },

  // Suitability & History (Deep Audit)
  { id: 'nhs_debt', section: 'Suitability', label: 'Do you owe £500+ to the NHS?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'litigation_history', section: 'Suitability', label: 'Are you involved in any court cases?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'pending_prosecution', section: 'Suitability', label: 'Any pending criminal charges?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'false_representation', section: 'Suitability', label: 'Ever used false docs with Home Office?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'terrorist_views', section: 'Suitability', label: 'Ever expressed extremist views?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'deportation_order', section: 'Suitability', label: 'Ever been deported from any country?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'public_good_assessment', section: 'Suitability', label: 'Presence ever considered not for public good?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },

  // Accommodation & English (Deep Audit)
  { id: 'acc_property_type', section: 'Accommodation', label: 'Property type (House/Flat)?', type: 'shortText', placeholder: 'e.g. 2 Bed House', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'acc_bedrooms', section: 'Accommodation', label: 'Number of bedrooms in property?', type: 'number', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'acc_other_occupants', section: 'Accommodation', label: 'Total people living in property?', type: 'number', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'acc_owner_permission', section: 'Accommodation', label: 'Do you have owner permission to stay?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'english_test_provider', section: 'English', label: 'English test provider (IELTS/PTE)?', type: 'shortText', showIf: (ctx) => ctx.answers.english_test_passed === true && ctx.tier !== 'free' },
  { id: 'degree_taught_english', section: 'English', label: 'Is your degree taught in English?', type: 'boolean', showIf: (ctx) => ctx.tier !== 'free' },
  { id: 'ecctis_verified', section: 'English', label: 'Has degree been Ecctis verified?', type: 'boolean', showIf: (ctx) => ctx.answers.degree_taught_english === true && ctx.tier !== 'free' },

  // --- SKILLED WORKER SPECIFIC ---
  { id: 'cos_job_title', section: 'Skilled Worker', label: 'Exact job title on your CoS?', type: 'shortText', placeholder: 'e.g. Software Engineer', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'cos_soc_code', section: 'Skilled Worker', label: 'SOC code for your role?', type: 'shortText', placeholder: 'e.g. 2136', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'cos_start_date', section: 'Skilled Worker', label: 'Employment start date?', type: 'date', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'sponsor_license_number', section: 'Skilled Worker', label: 'Sponsor license number?', type: 'shortText', placeholder: 'Optional', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'going_rate_met', section: 'Skilled Worker', label: 'Does salary meet going rate for SOC?', type: 'boolean', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'new_entrant_eligible', section: 'Skilled Worker', label: 'Eligible for new entrant rate?', type: 'boolean', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'immigration_skills_charge', section: 'Skilled Worker', label: 'Will employer pay Immigration Skills Charge?', type: 'boolean', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'atas_certificate_required', section: 'Skilled Worker', label: 'ATAS certificate required?', type: 'boolean', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'criminal_record_cert', section: 'Skilled Worker', label: 'Role requires criminal record certificate?', type: 'boolean', showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'previous_visa_type', section: 'Skilled Worker', label: 'Switching from another UK visa?', type: 'singleSelect', options: [{ value: 'no', label: 'No - from abroad' }, { value: 'student', label: 'Student' }, { value: 'graduate', label: 'Graduate' }, { value: 'other', label: 'Other' }], showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' },
  { id: 'sponsor_rating', section: 'Skilled Worker', label: 'Sponsor rating?', type: 'singleSelect', options: [{ value: 'a', label: 'A-rated' }, { value: 'b', label: 'B-rated' }, { value: 'unsure', label: 'Unsure' }], showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'free' }
];