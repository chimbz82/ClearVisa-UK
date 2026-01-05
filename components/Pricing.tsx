import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

interface PricingProps {
  onStartCheck: (tier: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck }) => {
  const { t } = useLanguage();

  const tiers = [
    {
      key: 'basic',
      label: t('pricing.tier.basic.label'),
      price: t('pricing.tier.basic.price'),
      desc: t('pricing.tier.basic.desc'),
      bullets: [
        'Automated eligibility verdict',
        'Summary of strong vs weak areas',
        'Risk flag indicators',
        'Plain-English explanation'
      ],
      cta: 'Get Basic Pre-Check',
      note: t('pricing.tier.basic.note')
    },
    {
      key: 'full',
      label: t('pricing.tier.full.label'),
      name: 'Full Pre-Check + Checklist',
      price: t('pricing.tier.full.price'),
      desc: t('pricing.tier.full.desc'),
      bullets: [
        'Everything in Basic',
        'Personalized document checklist',
        'Detailed risk factor breakdown',
        'Step-by-step next-actions plan',
        'Professional PDF Report'
      ],
      cta: 'Get Full Pre-Check',
      recommended: true
    },
    {
      key: 'human',
      label: t('pricing.tier.human.label'),
      price: t('pricing.tier.human.price'),
      desc: t('pricing.tier.human.desc'),
      bullets: [
        'Everything in Full tier',
        'Human review of your case',
        'Expert feedback on evidence',
        'Follow-up Q&A email support'
      ],
      cta: 'Get Human Review'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50/50">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="mb-4">{t('pricing.title')}</h2>
          <p className="text-lg text-slate-600 font-medium">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.key} 
              className={`flex flex-col bg-white rounded-[24px] shadow-sm border p-8 transition-all ${
                tier.recommended ? 'ring-2 ring-accent border-transparent scale-105 z-10' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="mb-8 text-center">
                <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{tier.label}</span>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <span className="text-4xl font-black text-navy">{tier.price}</span>
                  <span className="text-[13px] font-bold text-slate-400 mt-2">one-time</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                  {tier.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-slate-700 font-medium">
                      <span className="text-accent text-lg leading-none">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <Button 
                  onClick={() => onStartCheck(tier.key)}
                  variant={tier.recommended ? 'primary' : 'outline'}
                  fullWidth
                >
                  {tier.cta}
                </Button>
                {tier.note && (
                  <p className="mt-4 text-[12px] text-center text-slate-400 font-medium">{tier.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-slate-500 text-sm">
          <p className="max-w-2xl mx-auto italic">
            ClearVisa UK – Providing professional eligibility assessments since 2024. Not a government entity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;