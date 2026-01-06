import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- CORE QUESTIONS (STAGE 1) ---
  {
    id: 'nationality',
    section: 'Background',
    label: 'What is your nationality?',
    type: 'shortText',
    placeholder: 'e.g. Indian',
    showIf: () => true
  },
  {
    id: 'current_location',
    section: 'Background',
    label: 'Where are you currently located?',
    type: 'singleSelect',
    options: [
      { value: 'outside_uk', label: 'Outside the UK' },
      { value: 'in_uk_valid', label: 'In the UK (valid visa)' },
      { value: 'in_uk_overstay', label: 'In the UK (overstayed/no visa)' }
    ],
    showIf: () => true
  },
  {
    id: 'immigration_status',
    section: 'Background',
    label: 'What is your current immigration status?',
    type: 'singleSelect',
    options: [
      { value: 'none', label: 'No UK history' },
      { value: 'visitor', label: 'Visitor' },
      { value: 'student', label: 'Student' },
      { value: 'work', label: 'Work Visa' },
      { value: 'graduate', label: 'Graduate' },
      { value: 'other', label: 'Other' }
    ],
    showIf: () => true
  },
  {
    id: 'visa_route',
    section: 'Background',
    label: 'Which UK visa route are you planning to apply for?',
    type: 'singleSelect',
    options: [
      { value: 'spouse', label: 'Spouse / Partner Visa' },
      { value: 'skilled', label: 'Skilled Worker Visa' }
    ],
    showIf: () => true
  },
  {
    id: 'income_band',
    section: 'Financials',
    label: 'What is your gross annual household income?',
    type: 'singleSelect',
    options: [
      { value: 'under_29k', label: 'Under £29,000' },
      { value: '29k_38k', label: '£29,000 – £38,700' },
      { value: 'over_38k', label: 'Over £38,700' }
    ],
    showIf: () => true
  },
  {
    id: 'previous_refusals',
    section: 'History',
    label: 'Have you ever had a visa refusal (any country)?',
    type: 'boolean',
    showIf: () => true
  },

  // --- PROFESSIONAL AUDIT QUESTIONS (STAGE 2) ---
  {
    id: 'income_sources',
    section: 'Financials',
    label: 'Which income sources will you rely on?',
    helpText: 'You can combine multiple sources under Appendix FM.',
    type: 'multiSelect',
    options: [
      { value: 'salary', label: 'Salaried Employment' },
      { value: 'self_employment', label: 'Self-employment / Director' },
      { value: 'savings', label: 'Cash Savings' },
      { value: 'pension', label: 'Pension Income' },
      { value: 'property', label: 'Property Rental Income' },
      { value: 'exempt', label: 'Exempt Benefits (PIP, etc.)' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'employment_length',
    section: 'Financials',
    label: 'How long have you/your sponsor been in your current job?',
    type: 'singleSelect',
    options: [
      { value: 'less_6m', label: 'Less than 6 months' },
      { value: 'over_6m', label: 'More than 6 months' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && (ctx.answers.income_sources?.includes('salary') || ctx.route === 'skilled')
  },
  {
    id: 'savings_amount',
    section: 'Financials',
    label: 'What is the total of your accessible cash savings?',
    type: 'singleSelect',
    options: [
      { value: 'under_16k', label: 'Under £16,000' },
      { value: '16k_65k', label: '£16,000 – £65,000' },
      { value: 'over_65k', label: 'Over £65,000' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.answers.income_sources?.includes('savings')
  },
  {
    id: 'english_test',
    section: 'Requirements',
    label: 'Do you have a valid English Language test result?',
    type: 'singleSelect',
    options: [
      { value: 'yes_selt', label: 'Yes, SELT level A1 or higher' },
      { value: 'degree', label: 'Yes, UK-equivalent degree' },
      { value: 'exempt', label: 'Exempt (Age / Nationality)' },
      { value: 'no', label: 'No, need to take test' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'rel_evidence',
    section: 'Relationship',
    label: 'Which relationship evidence do you have?',
    type: 'multiSelect',
    options: [
      { value: 'marriage_cert', label: 'Official Marriage Certificate' },
      { value: 'joint_tenancy', label: 'Joint Tenancy / Mortgage' },
      { value: 'joint_bills', label: 'Joint Council Tax / Utility Bills' },
      { value: 'photos', label: 'Photos & Travel Evidence' },
      { value: 'children', label: 'Shared children' },
      { value: 'joint_bank', label: 'Joint Bank Account' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'living_together',
    section: 'Relationship',
    label: 'Have you lived together for at least 2 years?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'acc_evidence',
    section: 'Accommodation',
    label: 'What accommodation evidence do you have?',
    type: 'multiSelect',
    options: [
      { value: 'tenancy', label: 'Tenancy Agreement' },
      { value: 'title', label: 'Land Registry / Deeds' },
      { value: 'landlord_letter', label: 'Landlord Permission Letter' },
      { value: 'council_tax', label: 'Council Tax Bill' },
      { value: 'permission', label: 'Homeowner Permission Letter' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'overstays_detail',
    section: 'History',
    label: 'Have you ever stayed in the UK beyond your visa expiry?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'criminal_records',
    section: 'History',
    label: 'Do you have any criminal convictions (any country)?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'tb_test',
    section: 'Requirements',
    label: 'Are you applying from a country requiring a TB test?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.answers.current_location === 'outside_uk'
  },
  {
    id: 'job_code',
    section: 'Employment',
    label: 'Do you know your Occupation Code (SOC Code)?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },
  {
    id: 'job_offer',
    section: 'Employment',
    label: 'Do you have a formal job offer from a UK licensed sponsor?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },
  {
    id: 'sponsor_license',
    section: 'Employment',
    label: 'Does the employer have a valid Sponsor License?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes, fully licensed' },
      { value: 'no', label: 'No' },
      { value: 'unsure', label: 'Unsure' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },

  // --- PROFESSIONAL PLUS (HUMAN REVIEW) EXTRAS ---
  {
    id: 'living_arrangement',
    section: 'Relationship',
    label: 'What is your current living arrangement?',
    type: 'singleSelect',
    options: [
      { value: 'together', label: 'Living together permanently' },
      { value: 'separate', label: 'Living separately' }
    ],
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'spouse'
  },
  {
    id: 'live_together_history',
    section: 'Relationship',
    label: 'Have you ever lived together in person?',
    type: 'singleSelect',
    options: [
      { value: 'always', label: 'Yes, we live together now' },
      { value: 'past', label: 'Yes, we have in the past' },
      { value: 'never', label: 'No, never' }
    ],
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'spouse'
  },
  {
    id: 'bank_statements_format',
    section: 'Financials',
    label: 'In what format are your bank statements?',
    type: 'singleSelect',
    options: [
      { value: 'original', label: 'Original paper statements' },
      { value: 'pdf', label: 'Downloaded PDFs' },
      { value: 'pdf_stamped', label: 'PDFs stamped by the bank' }
    ],
    showIf: (ctx) => ctx.tier === 'human' && (ctx.answers.income_sources?.includes('salary') || ctx.answers.income_sources?.includes('savings'))
  },
  {
    id: 'sw_salary_exact',
    section: 'Employment',
    label: 'What is the exact gross annual salary on your job offer?',
    type: 'number',
    placeholder: '38700',
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'skilled'
  },
  {
    id: 'shortage_occupation',
    section: 'Employment',
    label: 'Is your job on the UK Immigration Salary List (formerly Shortage Occupation)?',
    type: 'boolean',
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'skilled'
  },
  {
    id: 'refusal_letters_status',
    section: 'History',
    label: 'Do you have copies of all previous refusal letters?',
    type: 'singleSelect',
    options: [
      { value: 'all', label: 'Yes, I have all of them' },
      { value: 'some', label: 'I have some but not all' },
      { value: 'none', label: 'I have none of them' }
    ],
    showIf: (ctx) => ctx.tier === 'human' && ctx.answers.previous_refusals === true
  },
  {
    id: 'uk_living_plan',
    section: 'Accommodation',
    label: 'What is your planned living arrangement in the UK?',
    type: 'singleSelect',
    options: [
      { value: 'renting', label: 'Renting our own home' },
      { value: 'family', label: 'Living with family/friends' },
      { value: 'buying', label: 'Buying a property' },
      { value: 'none', label: 'No firm plans yet' }
    ],
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'main_worry',
    section: 'Concerns',
    label: 'What is your primary concern regarding the application?',
    type: 'longText',
    placeholder: 'Describe any specific issues you are worried about...',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  }
];