import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- SECTION: BACKGROUND ---
  {
    id: 'nationality',
    section: 'Personal Background',
    label: 'What is your current nationality?',
    type: 'shortText',
    placeholder: 'e.g. Indian, American, etc.',
    showIf: () => true
  },
  {
    id: 'applicant_age',
    section: 'Personal Background',
    label: 'What is your current age?',
    type: 'number',
    placeholder: 'Age in years',
    showIf: () => true
  },
  {
    id: 'current_location',
    section: 'Personal Background',
    label: 'Where are you currently located?',
    type: 'singleSelect',
    options: [
      { value: 'outside_uk', label: 'Outside the UK' },
      { value: 'in_uk_valid', label: 'In the UK (on a valid visa)' },
      { value: 'in_uk_overstay', label: 'In the UK (overstayed/no current leave)' }
    ],
    showIf: () => true
  },
  {
    id: 'visa_route',
    section: 'Personal Background',
    label: 'Which UK visa route are you assessing?',
    type: 'singleSelect',
    options: [
      { value: 'spouse', label: 'Spouse / Partner Visa (Family)' },
      { value: 'skilled', label: 'Skilled Worker Visa (Work)' }
    ],
    showIf: () => true
  },
  {
    id: 'previous_refusals',
    section: 'History',
    label: 'Have you ever been refused a visa for the UK or any other country?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'refusal_count',
    section: 'History',
    label: 'How many times have you been refused?',
    type: 'number',
    showIf: (ctx) => ctx.answers.previous_refusals === true
  },

  // --- SECTION: SUITABILITY & CHARACTER ---
  {
    id: 'criminal_records',
    section: 'Suitability',
    label: 'Do you have any criminal convictions or cautions (in the UK or abroad)?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'nhs_debt',
    section: 'Suitability',
    label: 'Do you have any outstanding debt of £500 or more to the NHS?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'litigation_concerns',
    section: 'Suitability',
    label: 'Have you ever been involved in any legal proceedings or litigations?',
    type: 'boolean',
    showIf: () => true
  },

  // --- SECTION: FINANCIAL REQUIREMENT (SPOUSE BRANCH) ---
  {
    id: 'fin_req_method',
    section: 'Financials',
    label: 'How do you intend to meet the financial requirement?',
    type: 'singleSelect',
    options: [
      { value: 'employment', label: 'Income from Salaried Employment' },
      { value: 'savings', label: 'Cash Savings only' },
      { value: 'self_employment', label: 'Self-Employment / Director' },
      { value: 'pension', label: 'Pension Income' },
      { value: 'exempt', label: 'Exempt (on PIP, DLA, or Carers Allowance)' }
    ],
    showIf: (ctx) => ctx.route === 'spouse'
  },
  {
    id: 'income_band',
    section: 'Financials',
    label: 'What is the gross annual income of the UK sponsor (or combined)?',
    type: 'singleSelect',
    options: [
      { value: 'under_29k', label: 'Under £29,000' },
      { value: '29k_35k', label: '£29,000 – £34,999' },
      { value: 'over_35k', label: 'Over £35,000' }
    ],
    showIf: (ctx) => ctx.route === 'spouse' && ctx.answers.fin_req_method === 'employment'
  },
  {
    id: 'sponsor_emp_status',
    section: 'Financials',
    label: 'How long has the sponsor been with their current employer?',
    type: 'singleSelect',
    options: [
      { value: 'under_6m', label: 'Less than 6 months (Category B)' },
      { value: 'over_6m', label: '6 months or more (Category A)' }
    ],
    showIf: (ctx) => ctx.route === 'spouse' && ctx.answers.fin_req_method === 'employment'
  },
  {
    id: 'savings_total',
    section: 'Financials',
    label: 'What is the total amount of cash savings held for at least 6 months?',
    type: 'number',
    placeholder: 'e.g. 88500',
    showIf: (ctx) => ctx.answers.fin_req_method === 'savings' || (ctx.tier !== 'basic' && ctx.route === 'spouse')
  },

  // --- SECTION: RELATIONSHIP EVIDENCE (SPOUSE BRANCH) ---
  {
    id: 'rel_status',
    section: 'Relationship',
    label: 'What is your current relationship status?',
    type: 'singleSelect',
    options: [
      { value: 'married', label: 'Married / Civil Partnership' },
      { value: 'unmarried', label: 'Unmarried Partners (living together)' },
      { value: 'fiance', label: 'Fiancé(e) / Proposed Civil Partner' }
    ],
    showIf: (ctx) => ctx.route === 'spouse'
  },
  {
    id: 'live_together',
    section: 'Relationship',
    label: 'Have you lived together in person?',
    type: 'singleSelect',
    options: [
      { value: 'yes_2years', label: 'Yes, for 2+ years continuously' },
      { value: 'yes_under2', label: 'Yes, for less than 2 years' },
      { value: 'never', label: 'No, we have never lived together' }
    ],
    showIf: (ctx) => ctx.route === 'spouse'
  },
  {
    id: 'rel_evidence',
    section: 'Relationship',
    label: 'Which evidence do you have for your relationship?',
    type: 'multiSelect',
    options: [
      { value: 'marriage_cert', label: 'Official Marriage Certificate' },
      { value: 'joint_tenancy', label: 'Joint Tenancy / Mortgage' },
      { value: 'joint_bills', label: 'Joint Council Tax / Utility Bills' },
      { value: 'photos', label: 'Photos across duration of relationship' },
      { value: 'comms', label: 'Regular chat/call logs' },
      { value: 'travel', label: 'Flight tickets/stamps for visits' }
    ],
    showIf: (ctx) => ctx.route === 'spouse' && ctx.tier !== 'basic'
  },

  // --- SECTION: EMPLOYMENT (SKILLED WORKER BRANCH) ---
  {
    id: 'job_offer_status',
    section: 'Employment',
    label: 'Do you have a formal job offer from a UK employer?',
    type: 'boolean',
    showIf: (ctx) => ctx.route === 'skilled'
  },
  {
    id: 'sponsor_license',
    section: 'Employment',
    label: 'Does the employer hold a valid UKVI Sponsor License?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes, I have verified this' },
      { value: 'no', label: 'No, they do not' },
      { value: 'unsure', label: 'I am not sure' }
    ],
    showIf: (ctx) => ctx.route === 'skilled' && ctx.answers.job_offer_status === true
  },
  {
    id: 'sw_salary_exact',
    section: 'Employment',
    label: 'What is the gross annual salary offered?',
    type: 'number',
    placeholder: 'e.g. 38700',
    showIf: (ctx) => ctx.route === 'skilled' && ctx.answers.job_offer_status === true
  },
  {
    id: 'soc_code_known',
    section: 'Employment',
    label: 'Do you know the 4-digit SOC Code for your role?',
    type: 'shortText',
    placeholder: 'e.g. 2135',
    showIf: (ctx) => ctx.route === 'skilled' && ctx.tier !== 'basic'
  },

  // --- SECTION: ACCOMMODATION ---
  {
    id: 'uk_living_plan',
    section: 'Accommodation',
    label: 'Where do you plan to live in the UK?',
    type: 'singleSelect',
    options: [
      { value: 'renting', label: 'Renting our own home' },
      { value: 'family', label: 'Living with family/friends' },
      { value: 'buying', label: 'Own/Buying a property' }
    ],
    showIf: () => true
  },
  {
    id: 'overcrowding_check',
    section: 'Accommodation',
    label: 'Will the property be shared with anyone other than your partner/dependants?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.uk_living_plan === 'family'
  },
  {
    id: 'exclusive_use',
    section: 'Accommodation',
    label: 'Will you have at least one room for your exclusive use?',
    type: 'boolean',
    showIf: (ctx) => ctx.tier !== 'basic'
  },

  // --- SECTION: ENGLISH LANGUAGE ---
  {
    id: 'english_route',
    section: 'Requirements',
    label: 'How will you meet the English Language requirement?',
    type: 'singleSelect',
    options: [
      { value: 'selt', label: 'SELT Test (e.g. IELTS/Pearson)' },
      { value: 'degree', label: 'Degree taught in English' },
      { value: 'nationality', label: 'Nationality of majority-English country' },
      { value: 'exempt', label: 'Exempt (Age 65+ / Disability)' },
      { value: 'no', label: 'I have not met it yet' }
    ],
    showIf: () => true
  },
  {
    id: 'selt_level',
    section: 'Requirements',
    label: 'What level of SELT have you achieved?',
    type: 'singleSelect',
    options: [
      { value: 'a1', label: 'A1 (Entry Level)' },
      { value: 'a2', label: 'A2 (Extension Level)' },
      { value: 'b1', label: 'B1 (ILR/Citizenship/Worker Level)' }
    ],
    showIf: (ctx) => ctx.answers.english_route === 'selt'
  },

  // --- SECTION: PROFESSIONAL PLUS EXTRAS ---
  {
    id: 'audit_priority',
    section: 'Risk Management',
    label: 'What is your biggest concern about this application?',
    type: 'longText',
    placeholder: 'Explain any specific worries about your evidence or history...',
    showIf: (ctx) => ctx.tier === 'pro_plus'
  }
];
