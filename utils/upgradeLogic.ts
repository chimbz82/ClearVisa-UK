import { PlanId } from '../App';

export interface UpgradeConfig {
  from: PlanId;
  to: PlanId;
  priceGBP: number;
  stripePriceId: string;
  displayName: string;
}

export const UPGRADE_CONFIGS: UpgradeConfig[] = [
  {
    from: 'basic',
    to: 'full',
    priceGBP: 50,
    stripePriceId: 'price_upgrade_basic_full_50',
    displayName: 'Upgrade to Professional Audit'
  },
  {
    from: 'basic',
    to: 'pro_plus',
    priceGBP: 70,
    stripePriceId: 'price_upgrade_basic_proplus_70',
    displayName: 'Upgrade to Professional Plus'
  },
  {
    from: 'full',
    to: 'pro_plus',
    priceGBP: 20,
    stripePriceId: 'price_upgrade_full_proplus_20',
    displayName: 'Upgrade to Professional Plus'
  }
];

export const getUpgradeConfig = (
  from: PlanId | null,
  to: PlanId
): UpgradeConfig | null => {
  if (!from) return null;
  return UPGRADE_CONFIGS.find(u => u.from === from && u.to === to) || null;
};