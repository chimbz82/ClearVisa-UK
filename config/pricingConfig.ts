/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICING
 * Update prices here ONLY - nowhere else
 */

export type PlanId = 'basic' | 'full' | 'pro_plus';

export interface PlanDetails {
  id: PlanId;
  name: string;
  shortName: string;
  priceGBP: number;
  stripePriceId: string;
  description: string;
  questionCountLabel: string;
  questionLimit: number;
  features: string[];
}

// ============================================
// PRICING CONSTANTS
// ============================================

export const PRICING = {
  BASIC: 29,
  PROFESSIONAL: 79,
  PRO_PLUS: 99
} as const;

export const QUESTION_LIMITS = {
  BASIC: 20,
  PROFESSIONAL: 40,
  PRO_PLUS: 46
} as const;

// ============================================
// PLAN DEFINITIONS
// ============================================

export const PLANS: Record<PlanId, PlanDetails> = {
  basic: {
    id: 'basic',
    name: 'Basic Pre-Check',
    shortName: 'Basic',
    priceGBP: PRICING.BASIC,
    stripePriceId: 'price_basic_29',
    description: 'Quick automated eligibility verdict and audit summary.',
    questionCountLabel: 'BASIC PRE-CHECK · UP TO 20 QUESTIONS',
    questionLimit: QUESTION_LIMITS.BASIC,
    features: [
      'Eligibility likelihood verdict',
      'Traffic-light risk summary',
      'Key refusing risk flags',
      'Plain-English explanation',
      'Downloadable summary (short PDF)',
      'List of all questions answered'
    ]
  },
  
  full: {
    id: 'full',
    name: 'Professional Audit',
    shortName: 'Professional',
    priceGBP: PRICING.PROFESSIONAL,
    stripePriceId: 'price_full_79',
    description: 'Full audit and professional PDF report for straightforward cases.',
    questionCountLabel: 'PROFESSIONAL AUDIT · AROUND 20–40 QUESTIONS',
    questionLimit: QUESTION_LIMITS.PROFESSIONAL,
    features: [
      'Everything in Basic Pre-Check',
      'Personalised document checklist',
      'Route-specific compliance scoring',
      'Detailed risk factor breakdown',
      'Full detailed PDF report'
    ]
  },
  
  pro_plus: {
    id: 'pro_plus',
    name: 'Professional Plus',
    shortName: 'Pro Plus',
    priceGBP: PRICING.PRO_PLUS,
    stripePriceId: 'price_pro_99',
    description: 'Ideal for complex histories and borderline cases.',
    questionCountLabel: 'PROFESSIONAL PLUS · 40+ QUESTIONS',
    questionLimit: QUESTION_LIMITS.PRO_PLUS,
    features: [
      'Everything in Professional Audit',
      'Evidence gap analysis',
      'Solicitor-style action plan',
      'Priority risk remediation guidance',
      'Specific evidence strengthening steps',
      'Sample evidence wording templates'
    ]
  }
};

export const PLANS_ARRAY: PlanDetails[] = [
  PLANS.basic,
  PLANS.full,
  PLANS.pro_plus
];

// ============================================
// UPGRADE RULES
// ============================================

interface UpgradeRule {
  from: PlanId;
  to: PlanId;
  price: number;
  label: string;
}

export const UPGRADE_MATRIX: UpgradeRule[] = [
  {
    from: 'basic',
    to: 'full',
    price: PRICING.PROFESSIONAL - PRICING.BASIC, // £50
    label: 'Upgrade from Basic Pre-Check to Professional Audit'
  },
  {
    from: 'basic',
    to: 'pro_plus',
    price: PRICING.PRO_PLUS - PRICING.BASIC, // £70
    label: 'Upgrade from Basic Pre-Check to Professional Plus'
  },
  {
    from: 'full',
    to: 'pro_plus',
    price: PRICING.PRO_PLUS - PRICING.PROFESSIONAL, // £20
    label: 'Upgrade from Professional Audit to Professional Plus'
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getUpgradePrice(
  fromPlan: PlanId | null, 
  toPlan: PlanId
): number | null {
  if (!fromPlan) {
    return PLANS[toPlan].priceGBP;
  }
  if (fromPlan === toPlan) {
    return null;
  }
  const upgrade = UPGRADE_MATRIX.find(
    u => u.from === fromPlan && u.to === toPlan
  );
  return upgrade ? upgrade.price : null;
}

export function getUpgradeLabel(
  fromPlan: PlanId | null, 
  toPlan: PlanId
): string {
  if (!fromPlan) {
    return 'Secure Checkout';
  }
  const upgrade = UPGRADE_MATRIX.find(
    u => u.from === fromPlan && u.to === toPlan
  );
  return upgrade?.label || `ONE-TIME UPGRADE / NO AUTO-RENEWALS`;
}

export function isValidUpgrade(
  fromPlan: PlanId | null,
  toPlan: PlanId
): boolean {
  if (!fromPlan) return true;
  if (fromPlan === toPlan) return false;
  return UPGRADE_MATRIX.some(
    u => u.from === fromPlan && u.to === toPlan
  );
}

export function getQuestionLimit(planId: PlanId): number {
  return PLANS[planId].questionLimit;
}
