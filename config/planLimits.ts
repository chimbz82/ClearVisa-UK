export const PLAN_QUESTION_LIMITS = {
  basic: 20,
  full: 40,
  pro_plus: 46  // or total questions available
};

export const PLAN_PRICING = {
  basic: 29,
  full: 79,
  pro_plus: 99
};

export type PlanId = keyof typeof PLAN_PRICING;

export function getQuestionLimit(planId: PlanId | null): number {
  if (!planId) return 12; // Free pre-check
  return PLAN_QUESTION_LIMITS[planId] || 12;
}

export function getUpgradePrice(fromPlan: PlanId | null, toPlan: PlanId): number {
  if (!fromPlan) {
    return PLAN_PRICING[toPlan];
  }
  return PLAN_PRICING[toPlan] - PLAN_PRICING[fromPlan];
}

export function getUpgradeLabel(fromPlan: PlanId | null, toPlan: PlanId): string {
  if (!fromPlan) {
    return 'Secure Checkout';
  }
  const planNames = {
    basic: 'Basic Pre-Check',
    full: 'Professional Audit',
    pro_plus: 'Professional Plus'
  };
  return `Upgrade from ${planNames[fromPlan]} to ${planNames[toPlan]}`;
}