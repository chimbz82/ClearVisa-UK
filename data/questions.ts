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
    label: 'Have you ever had a visa refusal (UK or any other country)?',
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

  // --- FULL TIER EXTRAS (PAID) ---
  {
    id: 'income_sources',
    section: 'Financials',
    label: 'Which income sources apply to your household?',
    helpText: 'You can select multiple sources if you combine income.',
    type: 'multiSelect',
    options: [
      { value: 'salaried', label: 'Salaried Employment' },
      { value: 'self_employment', label: 'Self-employment / Director' },
      { value: 'savings', label: 'Cash Savings' },
      { value: 'pension', label: 'Pension Income' },
      { value: 'benefits', label: 'Exempt Benefits / PIP / Disability' },
      { value: 'property', label: 'Property Rental Income' }
    ],
    showIf: (ctx) => ctx.tier === 'full' || ctx.tier === 'human'
  },
  {
    id: 'rel_evidence',
    section: 'Relationship',
    label: 'Which relationship evidence do you have available?',
    helpText: 'Select all that apply to your situation.',
    type: 'multiSelect',
    options: [
      { value: 'marriage_cert', label: 'Marriage / Civil Partnership Certificate' },
      { value: 'joint_tenancy', label: 'Joint Tenancy / Mortgage' },
      { value: 'joint_bills', label: 'Joint Utility Bills' },
      { value: 'photos', label: 'Photos / Travel Evidence' },
      { value: 'chat_logs', label: 'Chat Logs / Communication Records' },
      { value: 'children', label: 'Shared Responsibility for Children' }
    ],
    showIf: (ctx) => (ctx.tier === 'full' || ctx.tier === 'human') && ctx.route === 'spouse'
  },
  {
    id: 'acc_evidence',
    section: 'Accommodation',
    label: 'Which accommodation evidence can you provide?',
    helpText: 'Multiple documents strengthen the proof of adequate housing.',
    type: 'multiSelect',
    options: [
      { value: 'tenancy', label: 'Tenancy Agreement' },
      { value: 'mortgage', label: 'Mortgage Statement / Deeds' },
      { value: 'landlord_letter', label: 'Landlord Permission Letter' },
      { value: 'council_tax', label: 'Council Tax Bills' },
      { value: 'utility', label: 'Utility Bills' }
    ],
    showIf: (ctx) => ctx.tier === 'full' || ctx.tier === 'human'
  },
  {
    id: 'immigration_facts',
    section: 'History',
    label: 'Do any of these immigration history facts apply to you?',
    helpText: 'Be honest; these are primary causes for automated flags.',
    type: 'multiSelect',
    options: [
      { value: 'overstay', label: 'Previous UK Overstay' },
      { value: 'refusal', label: 'Previous Visa Refusal' },
      { value: 'deportation', label: 'Previous Deportation / Removal' },
      { value: 'illegal_work', label: 'Worked without permission' },
      { value: 'fraud', label: 'Accused of deception/fraud' },
      { value: 'none', label: 'None of the above' }
    ],
    showIf: (ctx) => ctx.tier === 'full' || ctx.tier === 'human'
  }
];
