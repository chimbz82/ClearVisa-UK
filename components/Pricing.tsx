import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';
import { PLANS } from '../App';

interface PricingProps {
  onStartCheck: (planId: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck }) => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="section-py bg-slate-50/80">
      <div className="app-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-l text-navy mb-4">{t('pricing.title')}</h2>
          <p className="body-m text-slate-600 font-bold">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1100px] mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col app-card !p-8 transition-all hover:translate-y-[-4px] max-w-[360px] mx-auto w-full ${
                plan.id === 'full' ? 'ring-2 ring-accent lg:scale-105 z-10' : 'border border-slate-200'
              }`}
            >
              <div className="mb-10 text-center">
                <span className={`caption font-bold tracking-widest ${plan.id === 'full' ? 'text-accent' : 'text-slate-400'}`}>
                  {plan.id === 'basic' ? 'BUDGET' : (plan.id === 'humanReview' ? 'PRO ANALYSIS' : 'MOST POPULAR')}
                </span>
                <h3 className="heading-s mt-2 text-navy h-14 flex items-center justify-center leading-tight">{plan.name}</h3>
                <div className="mt-6 flex items-center justify-center gap-1">
                  <span className="heading-xl text-navy leading-none">£{plan.priceGBP}</span>
                  <span className="caption text-slate-400 mt-2 font-bold tracking-widest">once</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-12">
                  {plan.includedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 body-s text-slate-700 font-medium leading-tight">
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

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 mt-20 border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-3xl flex-shrink-0">🛡️</div>
          <div>
            <h4 className="heading-s text-navy mb-2 leading-none">{t('pricing.guarantee.title')}</h4>
            <p className="body-s text-slate-600 font-bold">{t('pricing.guarantee.body')}</p>
          </div>
        </div>

        <div className="mt-12 text-center">
           <a href="mailto:b2b@clearvisa.co.uk?subject=Bulk%20Pricing%20Inquiry" className="body-s text-accent hover:underline font-bold uppercase tracking-widest">
            {t('pricing.b2b')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;