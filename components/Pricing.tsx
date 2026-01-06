import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';
import { PLANS } from '../App';

interface PricingProps {
  onStartCheck: (planId: any) => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="section-py bg-slate-50/80">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-h2 text-navy mb-4">{t('pricing.title')}</h2>
          <p className="text-body text-slate-600 font-medium">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1140px] mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col app-card transition-all hover:translate-y-[-4px] ${
                plan.id === 'full' 
                ? 'ring-2 ring-accent scale-105 z-10 border-accent/20 shadow-xl' 
                : 'border border-slate-200'
              }`}
            >
              <div className="mb-8 text-center">
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  plan.id === 'full' ? 'text-accent' : 
                  plan.id === 'humanReview' ? 'text-navy' : 'text-slate-400'
                }`}>
                  {plan.id === 'basic' ? 'BUDGET' : (plan.id === 'humanReview' ? 'ENHANCED' : 'RECOMMENDED')}
                </span>
                <h3 className="text-h3 mt-3 text-navy min-h-[3rem] flex items-center justify-center leading-tight">
                  {plan.name}
                </h3>
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-h1 text-navy leading-none">£{plan.priceGBP}</span>
                  <span className="text-caption text-slate-400 font-bold tracking-widest lowercase">once</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-small text-slate-500 font-semibold mb-6 text-center leading-relaxed italic">
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {plan.includedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-small text-slate-700 font-medium leading-tight">
                      <span className="text-accent font-bold mt-0.5 flex-shrink-0">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => onStartCheck(plan.id)}
                variant={plan.id === 'full' ? 'primary' : 'outline'}
                fullWidth
                size="md"
              >
                Select Plan
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 mt-16 border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-3xl flex-shrink-0">🛡️</div>
          <div>
            <h4 className="text-h3 text-navy mb-2 leading-none">{t('pricing.guarantee.title')}</h4>
            <p className="text-small text-slate-600 font-medium">{t('pricing.guarantee.body')}</p>
          </div>
        </div>

        <div className="mt-12 text-center">
           <a href="mailto:b2b@clearvisa.co.uk?subject=Bulk%20Pricing%20Inquiry" className="text-small text-accent hover:underline font-bold uppercase tracking-widest">
            {t('pricing.b2b')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;