import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- SECTION 1: PERSONAL & IDENTITY ---
  {
    id: 'nationality',
    section: 'Personal & Identity',
    label: 'What is your current primary nationality?',
    type: 'shortText',
    placeholder: 'e.g. Indian, Nigerian, American',
    showIf: () => true
  },
  {
    id: 'dual_nationality',
    section: 'Personal & Identity',
    label: 'Do you hold any other nationalities?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'applicant_age',
    section: 'Personal & Identity',
    label: 'What is your current age?',
    type: 'number',
    placeholder: 'Age in years',
    showIf: () => true
  },
  {
    id: 'marital_status',
    section: 'Personal & Identity',
    label: 'What is your current legal marital status?',
    type: 'singleSelect',
    options: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'civil_partnership', label: 'Civil Partnership' },
      { value: 'divorced', label: 'Divorced / Dissolved' },
      { value: 'widowed', label: 'Widowed' }
    ],
    showIf: () => true
  },
  {
    id: 'dependants',
    section: 'Personal & Identity',
    label: 'Do you have any children or other dependants who will apply with you?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'dependant_count',
    section: 'Personal & Identity',
    label: 'How many dependants are applying with you?',
    type: 'number',
    showIf: (ctx) => ctx.answers.dependants === true
  },
  {
    id: 'current_residence',
    section: 'Personal & Identity',
    label: 'In which country are you currently living?',
    type: 'shortText',
    showIf: () => true
  },
  {
    id: 'uk_visit_history',
    section: 'Personal & Identity',
    label: 'Have you ever visited the UK before?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'immigration_breaches',
    section: 'Personal & Identity',
    label: 'Have you ever breached UK immigration laws (e.g. overstaying or illegal working)?',
    type: 'singleSelect',
    options: [
      { value: 'none', label: 'No breaches' },
      { value: 'overstay', label: 'Yes, I have overstayed' },
      { value: 'illegal_work', label: 'Yes, I have worked illegally' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say' }
    ],
    showIf: () => true
  },
  {
    id: 'previous_refusals',
    section: 'Personal & Identity',
    label: 'Have you ever been refused a visa or entry to any country (including the UK)?',
    type: 'boolean',
    showIf: () => true
  },

  // --- SECTION 2: CURRENT UK IMMIGRATION STATUS ---
  {
    id: 'location_context',
    section: 'Current Status',
    label: 'Are you applying from inside or outside the UK?',
    type: 'singleSelect',
    options: [
      { value: 'inside', label: 'Inside the UK' },
      { value: 'outside', label: 'Outside the UK' }
    ],
    showIf: () => true
  },
  {
    id: 'current_visa_type',
    section: 'Current Status',
    label: 'What is your current UK visa/leave type?',
    type: 'shortText',
    placeholder: 'e.g. Graduate, Student, Visitor',
    showIf: (ctx) => ctx.answers.location_context === 'inside'
  },
  {
    id: 'visa_expiry',
    section: 'Current Status',
    label: 'When does your current leave expire?',
    type: 'date',
    showIf: (ctx) => ctx.answers.location_context === 'inside'
  },
  {
    id: 'visa_route',
    section: 'Application Target',
    label: 'Which route are you assessing today?',
    type: 'singleSelect',
    options: [
      { value: 'spouse', label: 'Spouse / Partner (Family Route)' },
      { value: 'skilled', label: 'Skilled Worker (Work Route)' }
    ],
    showIf: () => true
  },

  // --- SECTION 3: RELATIONSHIP ROUTE (SPOUSE BRANCH) ---
  {
    id: 'rel_start_date',
    section: 'Relationship',
    label: 'When did your relationship begin?',
    type: 'date',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'cohabitation_status',
    section: 'Relationship',
    label: 'Do you currently live together?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'cohabitation_duration',
    section: 'Relationship',
    label: 'How long have you lived together continuously?',
    type: 'singleSelect',
    options: [
      { value: 'never', label: 'Never lived together' },
      { value: 'under_2', label: 'Less than 2 years' },
      { value: 'over_2', label: '2 years or more' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse' && ctx.answers.cohabitation_status === true
  },
  {
    id: 'wedding_evidence',
    section: 'Relationship',
    label: 'Do you have an official marriage or civil partnership certificate?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'shared_finance',
    section: 'Relationship',
    label: 'Do you have shared financial commitments (e.g. joint bank account, joint bills)?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'shared_housing_doc',
    section: 'Relationship',
    label: 'Do you have a joint tenancy agreement or mortgage in both names?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'comm_evidence',
    section: 'Relationship',
    label: 'Do you have evidence of regular communication (chat logs, calls) for periods spent apart?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'in_person_meetings',
    section: 'Relationship',
    label: 'How much time have you spent together in person in the last 2 years?',
    type: 'singleSelect',
    options: [
      { value: 'significant', label: 'Significant time (lived together or frequent visits)' },
      { value: 'occasional', label: 'Occasional meetings only' },
      { value: 'none', label: 'None' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },

  // --- SECTION 4: FINANCIAL REQUIREMENT ---
  {
    id: 'fin_req_method',
    section: 'Financials',
    label: 'How do you intend to meet the financial requirement?',
    type: 'singleSelect',
    options: [
      { value: 'employment', label: 'Sponsor Salaried Employment' },
      { value: 'self_employment', label: 'Sponsor Self-Employment / Director' },
      { value: 'savings', label: 'Cash Savings only' },
      { value: 'pension', label: 'Pension Income' },
      { value: 'exempt', label: 'Exempt (PIP, DLA, or Carers Allowance)' }
    ],
    showIf: (ctx) => ctx.answers.visa_route === 'spouse'
  },
  {
    id: 'sponsor_income',
    section: 'Financials',
    label: 'What is the sponsors gross annual income from employment?',
    type: 'currency',
    showIf: (ctx) => ctx.answers.fin_req_method === 'employment'
  },
  {
    id: 'employment_duration',
    section: 'Financials',
    label: 'How long has the sponsor been in their current job?',
    type: 'singleSelect',
    options: [
      { value: 'under_6m', label: 'Less than 6 months (Category B)' },
      { value: 'over_6m', label: '6 months or more (Category A)' }
    ],
    showIf: (ctx) => ctx.answers.fin_req_method === 'employment'
  },
  {
    id: 'savings_amount',
    section: 'Financials',
    label: 'What is the total amount of cash savings held?',
    type: 'currency',
    showIf: (ctx) => ctx.answers.fin_req_method === 'savings' || ctx.tier !== 'basic'
  },
  {
    id: 'savings_duration',
    section: 'Financials',
    label: 'Have these savings been held for at least 6 months?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.fin_req_method === 'savings' || (ctx.answers.savings_amount && Number(ctx.answers.savings_amount) > 0)
  },
  {
    id: 'payslips_available',
    section: 'Financials',
    label: 'Do you have the last 6-12 months of payslips and matching bank statements ready?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.fin_req_method === 'employment'
  },

  // --- SECTION 5: ACCOMMODATION ---
  {
    id: 'accommodation_arranged',
    section: 'Accommodation',
    label: 'Do you have accommodation arranged in the UK?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'accommodation_type',
    section: 'Accommodation',
    label: 'Will the property be owned or rented?',
    type: 'singleSelect',
    options: [
      { value: 'owned', label: 'Owned (Sponsor or Joint)' },
      { value: 'rented', label: 'Rented / Tenancy' },
      { value: 'family', label: 'Living with Family' }
    ],
    showIf: (ctx) => ctx.answers.accommodation_arranged === true
  },
  {
    id: 'exclusive_rooms',
    section: 'Accommodation',
    label: 'Will you have at least one bedroom for your exclusive use?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.accommodation_arranged === true
  },
  {
    id: 'overcrowding_risk',
    section: 'Accommodation',
    label: 'Including you, how many people will live in the property?',
    type: 'number',
    showIf: (ctx) => ctx.answers.accommodation_arranged === true
  },
  {
    id: 'housing_permission',
    section: 'Accommodation',
    label: 'If sharing/renting, do you have written permission from the owner/landlord?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.accommodation_type === 'rented' || ctx.answers.accommodation_type === 'family'
  },

  // --- SECTION 6: SUITABILITY & CHARACTER ---
  {
    id: 'criminal_convictions',
    section: 'Suitability',
    label: 'Do you have any criminal convictions or cautions (in any country)?',
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
    id: 'deception_allegation',
    section: 'Suitability',
    label: 'Have you ever been accused of using deception in a UK visa application?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'illegal_working_history',
    section: 'Suitability',
    label: 'Have you ever worked in the UK without a valid visa to do so?',
    type: 'boolean',
    showIf: () => true
  },

  // --- SECTION 7: ENGLISH LANGUAGE ---
  {
    id: 'english_requirement_met',
    section: 'English Language',
    label: 'Have you already met the English language requirement?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'english_route',
    section: 'English Language',
    label: 'How did you meet (or plan to meet) the requirement?',
    type: 'singleSelect',
    options: [
      { value: 'test', label: 'Approved SELT Test' },
      { value: 'degree', label: 'Degree taught in English' },
      { value: 'nationality', label: 'Nationality of majority-English country' },
      { value: 'exempt', label: 'Exemption (Age 65+ / Disability)' }
    ],
    showIf: (ctx) => ctx.answers.english_requirement_met === true
  },
  {
    id: 'cefr_level',
    section: 'English Language',
    label: 'What CEFR level was achieved?',
    type: 'singleSelect',
    options: [
      { value: 'a1', label: 'A1' },
      { value: 'a2', label: 'A2' },
      { value: 'b1', label: 'B1' },
      { value: 'b2', label: 'B2 or higher' }
    ],
    showIf: (ctx) => ctx.answers.english_route === 'test'
  },

  // --- SECTION 8: SKILLED WORKER ROUTE ---
  {
    id: 'sponsorship_obtained',
    section: 'Skilled Worker',
    label: 'Have you obtained a formal job offer with sponsorship?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled'
  },
  {
    id: 'job_title',
    section: 'Skilled Worker',
    label: 'What is your job role title?',
    type: 'shortText',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled' && ctx.answers.sponsorship_obtained === true
  },
  {
    id: 'sw_salary',
    section: 'Skilled Worker',
    label: 'What is the gross annual salary offered?',
    type: 'currency',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled' && ctx.answers.sponsorship_obtained === true
  },
  {
    id: 'shortage_occupation',
    section: 'Skilled Worker',
    label: 'Is the role on the Immigration Salary List (formerly Shortage Occupation)?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled' && ctx.answers.sponsorship_obtained === true
  },
  {
    id: 'cos_assigned',
    section: 'Skilled Worker',
    label: 'Has a Certificate of Sponsorship (CoS) been assigned to you?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled' && ctx.answers.sponsorship_obtained === true
  },
  {
    id: 'sponsor_license_confirmed',
    section: 'Skilled Worker',
    label: 'Have you confirmed that the employer holds a valid UKVI Sponsor License?',
    type: 'boolean',
    showIf: (ctx) => ctx.answers.visa_route === 'skilled' && ctx.answers.sponsorship_obtained === true
  }
];
