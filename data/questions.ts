
import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- CORE QUESTIONS (ALL TIERS) ---
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
      { value: 'in_uk_valid', label: 'In the UK with a valid visa' },
      { value: 'outside_uk', label: 'Outside the UK' },
      { value: 'in_uk_no_visa', label: 'In the UK without a valid visa / overstayed' }
    ],
    showIf: () => true
  },
  {
    id: 'immigration_status',
    section: 'Background',
    label: 'What is your current immigration status?',
    type: 'singleSelect',
    options: [
      { value: 'none', label: 'No UK immigration history' },
      { value: 'visitor', label: 'Visitor' },
      { value: 'student', label: 'Student / Graduate' },
      { value: 'work', label: 'Skilled Worker / Work Visa' },
      { value: 'family', label: 'Family / Partner Visa' },
      { value: 'euss', label: 'EU Settlement Scheme' },
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
      { value: 'skilled', label: 'Skilled Worker Visa' },
      { value: 'other', label: 'Other / Not Sure' }
    ],
    showIf: () => true
  },
  {
    id: 'previous_refusals',
    section: 'History',
    label: 'Have you ever had a UK visa refusal?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'overstays',
    section: 'History',
    label: 'Have you ever stayed in the UK beyond your visa expiry date?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'criminal_history',
    section: 'History',
    label: 'Do you have any criminal convictions or pending charges?',
    type: 'boolean',
    showIf: () => true
  },
  {
    id: 'income_band',
    section: 'Financials',
    label: 'What is your approximate gross annual household income?',
    type: 'singleSelect',
    options: [
      { value: 'under_29k', label: 'Under £29,000' },
      { value: '29k_38k', label: '£29,000 – £38,700' },
      { value: 'over_38k', label: 'Over £38,700' },
      { value: 'unsure', label: 'Not sure / Variable' }
    ],
    showIf: () => true
  },
  {
    id: 'sponsor_status',
    section: 'Background',
    label: 'What is your sponsor’s nationality or status?',
    type: 'singleSelect',
    options: [
      { value: 'british', label: 'British Citizen' },
      { value: 'settled', label: 'Settled Status (ILR)' },
      { value: 'euss', label: 'Pre-settled EUSS' },
      { value: 'work_visa', label: 'Skilled Worker Visa' },
      { value: 'other', label: 'Other' }
    ],
    showIf: () => true
  },
  {
    id: 'english_met',
    section: 'Eligibility',
    label: 'Have you met the English language requirement?',
    type: 'singleSelect',
    options: [
      { value: 'test', label: 'Yes, passed approved test' },
      { value: 'degree', label: 'Yes, UK-recognised degree' },
      { value: 'exempt', label: 'Yes, from an exempt country' },
      { value: 'no', label: 'No / Not yet' },
      { value: 'unsure', label: 'I am not sure' }
    ],
    showIf: () => true
  },
  {
    id: 'apply_timing',
    section: 'Eligibility',
    label: 'When are you planning to submit your application?',
    type: 'singleSelect',
    options: [
      { value: 'under_3m', label: 'Within 3 months' },
      { value: '3m_6m', label: 'In 3–6 months' },
      { value: '6m_12m', label: 'In 6–12 months' },
      { value: 'over_12m', label: 'More than a year' }
    ],
    showIf: () => true
  },

  // --- FULL TIER EXTRAS (Spouse/Relationship) ---
  {
    id: 'live_together',
    section: 'Relationship',
    label: 'Do you and your partner currently live together?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes, we live together now' },
      { value: 'past', label: 'No, but we have lived together in the past' },
      { value: 'never', label: 'No, we have never lived together' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'first_met',
    section: 'Relationship',
    label: 'When did you first meet in person?',
    type: 'shortText',
    placeholder: 'Month / Year',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'serious_date',
    section: 'Relationship',
    label: 'When did the relationship become committed?',
    type: 'shortText',
    placeholder: 'Month / Year',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'living_arrangement',
    section: 'Relationship',
    label: 'What is your current living arrangement?',
    type: 'singleSelect',
    options: [
      { value: 'joint', label: 'Joint tenancy / mortgage' },
      { value: 'one_name', label: 'Tenancy in one name' },
      { value: 'family', label: 'Living with family / friends' },
      { value: 'separate', label: 'Living separately' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'rel_evidence',
    section: 'Relationship',
    label: 'Which relationship evidence do you have?',
    type: 'multiSelect',
    options: [
      { value: 'tenancy', label: 'Joint Tenancy / Mortgage' },
      { value: 'utilities', label: 'Joint Utilities' },
      { value: 'bank', label: 'Joint Bank Statements' },
      { value: 'tax', label: 'Council Tax' },
      { value: 'photos', label: 'Photos / Travel Tickets' },
      { value: 'chat', label: 'Chat Logs / Social Media' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'prev_marriages',
    section: 'Relationship',
    label: 'Have either of you been previously married or in a civil partnership?',
    type: 'singleSelect',
    options: [
      { value: 'me', label: 'Yes, I have' },
      { value: 'partner', label: 'Yes, my partner has' },
      { value: 'both', label: 'Yes, both of us have' },
      { value: 'no', label: 'No' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'divorce_docs',
    section: 'Relationship',
    label: 'Are divorce/dissolution documents available for all previous marriages?',
    type: 'singleSelect',
    options: [
      { value: 'all', label: 'Yes, all documents ready' },
      { value: 'some', label: 'Some, but not all' },
      { value: 'none', label: 'No' },
      { value: 'unsure', label: 'Not sure' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse' && ctx.answers.prev_marriages !== 'no'
  },

  // --- FULL TIER EXTRAS (Financial) ---
  {
    id: 'fin_req_method',
    section: 'Financials',
    label: 'How will you mainly meet the financial requirement?',
    type: 'singleSelect',
    options: [
      { value: 'employment', label: 'Employment Salary' },
      { value: 'self_employment', label: 'Self-employment / Director' },
      { value: 'savings', label: 'Cash Savings' },
      { value: 'pension', label: 'Pension' },
      { value: 'other', label: 'Other / Unsure' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'sponsor_emp_status',
    section: 'Financials',
    label: 'What is the employment situation of the sponsor?',
    type: 'singleSelect',
    options: [
      { value: 'same_6m', label: 'Same employer 6+ months' },
      { value: 'changed_6m', label: 'Changed jobs in last 6 months' },
      { value: 'variable', label: 'Variable income / Multiple jobs' },
      { value: 'self_employed', label: 'Self-employed' },
      { value: 'unemployed', label: 'Not currently working' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.answers.fin_req_method === 'employment'
  },
  {
    id: 'fin_docs_available',
    section: 'Financials',
    label: 'Which financial documents do you have available?',
    type: 'multiSelect',
    options: [
      { value: 'payslips_6', label: '6 months payslips' },
      { value: 'payslips_12', label: '12 months payslips' },
      { value: 'bank_matching', label: 'Matching bank statements' },
      { value: 'employer_letter', label: 'Employer letter / Contract' },
      { value: 'tax_return', label: 'Self-assessment tax returns' },
      { value: 'savings_6m', label: 'Savings held for 6+ months' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'debts',
    section: 'Financials',
    label: 'Are there any significant debts or financial commitments?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'unsure', label: 'Unsure' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },

  // --- FULL TIER EXTRAS (Skilled Worker) ---
  {
    id: 'job_offer_status',
    section: 'Employment',
    label: 'What is the status of your job offer?',
    type: 'singleSelect',
    options: [
      { value: 'formal', label: 'Formal written offer' },
      { value: 'verbal', label: 'Verbal offer / In process' },
      { value: 'no', label: 'No offer yet' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },
  {
    id: 'sponsor_license',
    section: 'Employment',
    label: 'Does the employer hold a valid UK sponsor licence?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'unsure', label: 'Not sure' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },
  {
    id: 'sw_salary_exact',
    section: 'Employment',
    label: 'What is the proposed annual gross salary?',
    type: 'currency',
    placeholder: 'e.g. 38700',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },
  {
    id: 'sw_allowances',
    section: 'Employment',
    label: 'Does the salary include any allowances or benefits?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'skilled'
  },

  // --- FULL TIER EXTRAS (Accommodation) ---
  {
    id: 'uk_living_plan',
    section: 'Accommodation',
    label: 'Where do you plan to live in the UK?',
    type: 'singleSelect',
    options: [
      { value: 'own', label: 'Own home' },
      { value: 'rent', label: 'Rented property' },
      { value: 'family', label: 'With family / friends' },
      { value: 'hotel', label: 'Temporary accommodation' },
      { value: 'none', label: 'Not arranged yet' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'acc_evidence',
    section: 'Accommodation',
    label: 'Which accommodation evidence do you have?',
    type: 'multiSelect',
    options: [
      { value: 'tenancy', label: 'Tenancy agreement' },
      { value: 'mortgage', label: 'Mortgage statement / Deeds' },
      { value: 'permission', label: 'Letter of permission' },
      { value: 'utility', label: 'Utility bills' },
      { value: 'inspection', label: 'Property inspection report' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },

  // --- FULL TIER EXTRAS (History Detail) ---
  {
    id: 'prev_visas_count',
    section: 'History',
    label: 'How many previous UK visas have you held?',
    type: 'singleSelect',
    options: [
      { value: 'none', label: 'None' },
      { value: '1', label: '1' },
      { value: '2-3', label: '2–3' },
      { value: '4+', label: '4 or more' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'work_without_permission',
    section: 'History',
    label: 'Have you ever worked in the UK without permission?',
    type: 'boolean',
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'refusal_letters',
    section: 'History',
    label: 'Do you still have your refusal letters/emails?',
    type: 'singleSelect',
    options: [
      { value: 'all', label: 'Yes, all of them' },
      { value: 'some', label: 'Some, but not all' },
      { value: 'none', label: 'No, I have lost them' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.answers.previous_refusals
  },

  // --- FULL TIER EXTRAS (Readiness) ---
  {
    id: 'doc_readiness',
    section: 'Readiness',
    label: 'How prepared are your documents today?',
    type: 'singleSelect',
    options: [
      { value: 'ready', label: 'Fully ready, just need a check' },
      { value: 'mostly', label: 'Mostly ready, some gaps' },
      { value: 'not_ready', label: 'Not ready, need to collect' },
      { value: 'none', label: 'No idea where to start' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },
  {
    id: 'main_worry',
    section: 'Readiness',
    label: 'What worries you most about the application?',
    type: 'singleSelect',
    options: [
      { value: 'income', label: 'Meeting income thresholds' },
      { value: 'evidence', label: 'Relationship evidence' },
      { value: 'history', label: 'Immigration history' },
      { value: 'criminality', label: 'Criminal record' },
      { value: 'complexity', label: 'Family complexity' },
      { value: 'unsure', label: 'Everything / Unsure' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human')
  },

  // --- HUMAN REVIEW EXTRAS ---
  {
    id: 'rel_narrative',
    section: 'Case Detail',
    label: 'Describe how you met and how your relationship developed.',
    type: 'longText',
    placeholder: 'Please provide as much detail as possible...',
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'spouse'
  },
  {
    id: 'rel_maintenance',
    section: 'Case Detail',
    label: 'How do you maintain the relationship day-to-day?',
    type: 'longText',
    placeholder: 'If you do not live together, how do you keep in touch?',
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'spouse'
  },
  {
    id: 'rel_difficulties',
    section: 'Case Detail',
    label: 'Describe any break-ups or major difficulties in the relationship.',
    type: 'longText',
    placeholder: 'Optional: Explain any significant periods of separation.',
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'spouse'
  },
  {
    id: 'career_background',
    section: 'Case Detail',
    label: 'Describe your career background and how this role fits.',
    type: 'longText',
    placeholder: 'Why are you the right fit for this sponsorship?',
    showIf: (ctx) => ctx.tier === 'human' && ctx.route === 'skilled'
  },
  {
    id: 'refusal_reasons_summary',
    section: 'Case Detail',
    label: 'Summarise the reasons for your previous refusal(s).',
    type: 'longText',
    placeholder: 'Explain what the decision letter stated...',
    showIf: (ctx) => ctx.tier === 'human' && ctx.answers.previous_refusals
  },
  {
    id: 'overstay_explanation',
    section: 'Case Detail',
    label: 'Explain any periods without legal status in the UK.',
    type: 'longText',
    placeholder: 'Include dates, reasons, and how it was resolved...',
    showIf: (ctx) => ctx.tier === 'human' && ctx.answers.overstays
  },
  {
    id: 'identities_used',
    section: 'Case Detail',
    label: 'Have you ever used any other identities in applications?',
    type: 'longText',
    placeholder: 'If yes, provide details of names, dates of birth, etc.',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'expected_gaps',
    section: 'Case Detail',
    label: 'What documents do you NOT have that might be expected?',
    type: 'longText',
    placeholder: 'Explain why any standard evidence is missing...',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'financial_narrative',
    section: 'Case Detail',
    label: 'Explain any unusual financial circumstances.',
    type: 'longText',
    placeholder: 'Irregular income, new business, debt, etc.',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'dependant_plans',
    section: 'Case Detail',
    label: 'If you have dependants, what are your plans for them?',
    type: 'longText',
    placeholder: 'Where do they live now and will they apply with you?',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'app_goal',
    section: 'Case Detail',
    label: 'What is the main goal of this application?',
    type: 'shortText',
    placeholder: 'e.g. First entry, switching route, settlement',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'worried_outcome',
    section: 'Case Detail',
    label: 'What outcome are you most worried about?',
    type: 'longText',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'unusual_explanation',
    section: 'Case Detail',
    label: 'Is there anything else a caseworker might find unusual?',
    type: 'longText',
    placeholder: 'Anything requiring extra explanation...',
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'prev_advice',
    section: 'History',
    label: 'Have you had formal immigration advice before?',
    type: 'singleSelect',
    options: [
      { value: 'solicitor', label: 'Solicitor' },
      { value: 'adviser', label: 'OISC Adviser' },
      { value: 'none', label: 'None' }
    ],
    showIf: (ctx) => ctx.tier === 'human'
  },
  {
    id: 'prev_advice_details',
    section: 'Case Detail',
    label: 'What advice were you given and do you agree with it?',
    type: 'longText',
    showIf: (ctx) => ctx.tier === 'human' && ctx.answers.prev_advice !== 'none'
  }
];
