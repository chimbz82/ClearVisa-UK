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
      name: 'Basic Pre-Check',
      price: t('pricing.tier.basic.price'),
      desc: t('pricing.tier.basic.desc'),
      bullets: [
        'Automated eligibility verdict',
        'Summary of strong vs weak areas',
        'Key risk flags based on public rules',
        'Plain-English explanation',
        'Downloadable summary (PDF-style)'
      ],
      cta: 'Start Pre-Check',
      recommended: false
    },
    {
      key: 'full',
      label: t('pricing.tier.full.label'),
      name: t('pricing.tier.full.name'),
      price: t('pricing.tier.full.price'),
      desc: t('pricing.tier.full.desc'),
      bullets: [
        'Everything in Basic',
        'Personalized document checklist',
        'Route-specific compliance checks',
        'Detailed risk factor breakdown',
        'Step-by-step "next actions" plan',
        'Priority in-app report delivery'
      ],
      cta: 'Get Full Audit',
      recommended: true
    },
    {
      key: 'pro',
      label: t('pricing.tier.pro.label'),
      name: t('pricing.tier.pro.name'),
      price: t('pricing.tier.pro.price'),
      desc: t('pricing.tier.pro.desc'),
      bullets: [
        'Everything in Full Pre-Check',
        'Automated evidence gap analysis',
        'Suggested case improvements',
        'Deeper rule-based review',
        'In-report Smart Q&A section'
      ],
      cta: 'Get Pro Assessment',
      recommended: false
    }
  ];

  return (
    <section id="pricing" className="section-py bg-slate-50/80">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-h2 text-navy mb-4">{t('pricing.title')}</h2>
          <p className="text-body text-secondary">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.key} 
              className={`flex flex-col app-card p-8 transition-all ${
                tier.recommended ? 'ring-2 ring-accent scale-105 z-10' : 'border border-slate-200'
              }`}
            >
              <div className="mb-10 text-center">
                <span className="text-caption text-slate-400 font-bold">{tier.label}</span>
                <h3 className="text-h3 mt-2 text-navy h-14 flex items-center justify-center leading-tight">{tier.name}</h3>
                <div className="mt-6 flex items-center justify-center gap-1">
                  <span className="text-display text-navy">{tier.price}</span>
                  <span className="text-caption text-slate-400 mt-2 font-bold tracking-widest uppercase">one-time</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                  {tier.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-sm text-slate-700 font-medium leading-snug">
                      <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => onStartCheck(tier.key)}
                variant={tier.recommended ? 'primary' : 'outline'}
                fullWidth
                size="md"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 mt-16 border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0">🛡️</div>
          <div>
            <h4 className="text-h3 text-navy mb-1">{t('pricing.guarantee.title')}</h4>
            <p className="text-body-sm text-secondary font-medium">{t('pricing.guarantee.body')}</p>
          </div>
        </div>

        <div className="mt-12 text-center">
           <a href="mailto:b2b@clearvisa.co.uk?subject=Bulk%20Pricing%20Inquiry" className="text-body-sm text-accent hover:underline font-bold">
            {t('pricing.b2b')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
