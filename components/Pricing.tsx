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
      key: 'full',
      label: 'Most Professional',
      name: 'Full Eligibility Audit',
      price: '£79',
      desc: 'Complete detailed risk assessment and document checklist.',
      bullets: [
        'Complete 30-Question assessment',
        'Personalized document checklist',
        'Detailed risk factor identification',
        'Step-by-step next actions plan',
        'Professional PDF Audit Report'
      ],
      cta: 'Start Free Pre-Check',
      recommended: true
    },
    {
      key: 'human',
      label: 'Expert Support',
      name: 'Human Review Add-On',
      price: '£149',
      desc: 'Everything in Full tier plus expert manual verification.',
      bullets: [
        'Expert caseworker review',
        'Manual evidence verification',
        'Follow-up Q&A email support',
        'Strategic corrections to case'
      ],
      cta: 'Inquire Now',
      recommended: false
    }
  ];

  return (
    <section id="pricing" className="section-py bg-slate-50/80">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-h2 text-navy mb-4">Professional Eligibility Audit</h2>
          <p className="text-body text-secondary">Simple, one-time fees. No subscriptions or hidden costs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.key} 
              className={`flex flex-col app-card p-10 transition-all ${
                tier.recommended ? 'ring-2 ring-accent scale-105 z-10' : 'border border-slate-200'
              }`}
            >
              <div className="mb-10 text-center">
                <span className="text-caption text-slate-400 font-bold">{tier.label}</span>
                <h3 className="text-h3 mt-2 text-navy">{tier.name}</h3>
                <div className="mt-6 flex items-center justify-center gap-1">
                  <span className="text-display text-navy">{tier.price}</span>
                  <span className="text-caption text-slate-400 mt-2">one-time</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-12">
                  {tier.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-sm text-slate-700 font-medium">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => onStartCheck(tier.key)}
                variant={tier.recommended ? 'primary' : 'outline'}
                fullWidth
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-body-sm text-slate-400 mt-16 max-w-xl mx-auto italic font-medium">
          Professional UK visa eligibility reports built around official Home Office policy. We identify risks before you lose your application fees.
        </p>
      </div>
    </section>
  );
};

export default Pricing;