
import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  // --- SHARED PRE-SCREEN ---
  {
    id: 'current_location',
    route: 'shared',
    section: 'Background',
    label: 'Where are you currently located?',
    type: 'singleSelect',
    options: [
      { value: 'outside_uk', label: 'Outside the UK' },
      { value: 'in_uk_valid', label: 'In the UK (valid visa)' },
      { value: 'in_uk_no_visa', label: 'In the UK (no valid visa)' },
      { value: 'in_uk_visitor', label: 'In the UK (as a visitor)' }
    ]
  },
  {
    id: 'immigration_status',
    route: 'shared',
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
    ]
  },
  {
    id: 'previous_refusals',
    route: 'shared',
    section: 'History',
    label: 'Have you had any previous UK visa refusals or overstays?',
    helpText: 'Include any time you stayed in the UK past your visa expiry date.',
    type: 'singleSelect',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_once', label: 'Yes, once' },
      { value: 'yes_multiple', label: 'Yes, more than once' }
    ]
  },
  {
    id: 'criminal_history',
    route: 'shared',
    section: 'History',
    label: 'Do you have any criminal history?',
    type: 'singleSelect',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_minor', label: 'Yes - minor / spent conviction' },
      { value: 'yes_serious', label: 'Yes - serious / unspent / prison' }
    ]
  },
  {
    id: 'security_ban',
    route: 'shared',
    section: 'History',
    label: 'Have you ever been subject to an immigration or security ban?',
    type: 'boolean'
  },

  // --- SPOUSE / PARTNER ROUTE ---
  {
    id: 'relationship_type',
    route: 'spouse',
    section: 'Relationship details',
    label: 'What is your relationship type?',
    type: 'singleSelect',
    options: [
      { value: 'married', label: 'Married' },
      { value: 'civil', label: 'Civil Partners' },
      { value: 'unmarried', label: 'Unmarried Partners (2+ yrs living together)' },
      { value: 'fiance', label: 'Fiancé(e)' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'living_together',
    route: 'spouse',
    section: 'Relationship details',
    label: 'Have you lived together in a relationship similar to marriage?',
    type: 'singleSelect',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_less_2', label: 'Yes, but for less than 2 years' },
      { value: 'yes_more_2', label: 'Yes, for 2 years or more' }
    ]
  },
  {
    id: 'sponsor_status',
    route: 'spouse',
    section: 'Sponsor’s status',
    label: 'What is your sponsor’s nationality or status?',
    type: 'singleSelect',
    options: [
      { value: 'british', label: 'British Citizen' },
      { value: 'irish', label: 'Irish Citizen' },
      { value: 'ilr', label: 'Settled Status (ILR)' },
      { value: 'euss', label: 'Pre-settled or Settled EUSS' },
      { value: 'refugee', label: 'Refugee / Humanitarian Protection' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'income_source',
    route: 'spouse',
    section: 'Financial requirement',
    label: 'What is the main source of income for the financial requirement?',
    type: 'multiSelect',
    options: [
      { value: 'employment', label: 'Employment' },
      { value: 'self_employment', label: 'Self-employment' },
      { value: 'pension', label: 'Pension' },
      { value: 'savings', label: 'Cash Savings' }
    ]
  },
  {
    id: 'annual_income',
    route: 'spouse',
    section: 'Financial requirement',
    label: 'What is the gross annual employment income? (GBP)',
    type: 'currency',
    placeholder: 'e.g. 30000',
    conditionalOn: { questionId: 'income_source', values: ['employment'] }
  },
  {
    id: 'savings_amount',
    route: 'spouse',
    section: 'Financial requirement',
    label: 'Total cash savings held for at least 6 months? (GBP)',
    type: 'currency',
    placeholder: 'e.g. 62500',
    conditionalOn: { questionId: 'income_source', values: ['savings'] }
  },

  // --- SKILLED WORKER ROUTE ---
  {
    id: 'job_offer',
    route: 'skilledWorker',
    section: 'Job & sponsorship',
    label: 'Do you already have a job offer?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes, confirmed' },
      { value: 'discussion', label: 'In discussion' },
      { value: 'no', label: 'No' }
    ]
  },
  {
    id: 'approved_sponsor',
    route: 'skilledWorker',
    section: 'Job & sponsorship',
    label: 'Is your employer on the approved sponsor list?',
    type: 'singleSelect',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'not_sure', label: 'Not sure' }
    ]
  },
  {
    id: 'job_title',
    route: 'skilledWorker',
    section: 'Job & sponsorship',
    label: 'Job Title',
    type: 'shortText',
    placeholder: 'e.g. Software Engineer'
  },
  {
    id: 'sw_annual_salary',
    route: 'skilledWorker',
    section: 'Salary & going rate',
    label: 'What is your proposed annual gross salary? (GBP)',
    type: 'currency',
    placeholder: 'e.g. 38700'
  },
  {
    id: 'sw_english',
    route: 'skilledWorker',
    section: 'English & Funds',
    label: 'How will you meet the English language requirement?',
    type: 'singleSelect',
    options: [
      { value: 'test', label: 'Approved SELT test' },
      { value: 'degree', label: 'Degree taught in English' },
      { value: 'country', label: 'Majority English speaking country' },
      { value: 'not_sure', label: 'Not sure' }
    ]
  }
];
