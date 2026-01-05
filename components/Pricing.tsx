import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PricingProps {
  onStartCheck: (tier?: 'basic' | 'full' | 'human') => void;
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
        'Plain-English explanation',
        'Downloadable PDF report'
      ],
      cta: 'Get Basic Pre-Check',
      note: t('pricing.tier.basic.note'),
      recommended: false
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
        'Route-specific compliance check',
        'Detailed risk factor breakdown',
        'Step-by-step next-actions plan',
        'Priority email support'
      ],
      cta: 'Get Full Pre-Check + Checklist',
      recommended: true
    },
    {
      key: 'human',
      label: t('pricing.tier.human.label'),
      price: t('pricing.tier.human.price'),
      desc: t('pricing.tier.human.desc'),
      bullets: [
        'Everything in Full tier',
        'Human review of your answers',
        'Feedback on missing evidence',
        'Suggested corrections to case',
        'Follow-up email Q&A'
      ],
      cta: 'Get Human Review',
      recommended: false,
      disclaimer: t('pricing.tier.human.disclaimer')
    }
  ];

  const comparisonRows = [
    { name: t('compare.row1.name'), get: t('compare.row1.get'), cost: t('compare.row1.cost') },
    { name: t('compare.row2.name'), get: t('compare.row2.get'), cost: t('compare.row2.cost') },
    { name: t('compare.row3.name'), get: t('compare.row3.get'), cost: t('compare.row3.cost'), highlight: true }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50/50 scroll-mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tight">{t('pricing.title')}</h2>
          <p className="text-lg text-slate-600 font-bold">{t('pricing.subtitle')}</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.key} 
              className={`flex flex-col bg-white rounded-3xl shadow-xl border overflow-hidden relative transition-all duration-300 ${
                tier.recommended ? 'border-accent ring-2 ring-accent ring-opacity-20 transform md:scale-[1.05] z-10' : 'border-slate-100 hover:scale-[1.02]'
              }`}
            >
              {tier.recommended && (
                <div className="bg-accent text-white text-[10px] font-black uppercase tracking-widest text-center py-2">
                  Most Popular
                </div>
              )}
              <div className="p-8 lg:p-10 text-center bg-slate-50/50 border-b border-slate-100">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{tier.label}</h3>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <span className="text-4xl lg:text-5xl font-black text-navy">{tier.price}</span>
                  <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{t('pricing.card.priceSuffix')}</span>
                </div>
                {tier.name && <h4 className="text-navy font-black text-sm uppercase mb-2 tracking-tight">{tier.name}</h4>}
                <p className="text-slate-600 text-xs font-bold leading-relaxed">{tier.desc}</p>
              </div>
              
              <div className="p-8 lg:p-10 flex flex-col flex-grow">
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px] text-slate-700 font-bold leading-tight">
                      <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                
                {tier.disclaimer && (
                  <p className="text-[9px] text-slate-400 font-bold mb-5 italic leading-relaxed">
                    {tier.disclaimer}
                  </p>
                )}

                <button 
                  onClick={() => onStartCheck(tier.key as any)}
                  className={`w-full py-4 rounded-xl text-sm font-black transition-all shadow-lg uppercase tracking-widest mt-auto ${
                    tier.recommended ? 'bg-accent text-white hover:bg-[#28a362]' : 'bg-navy text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.cta}
                </button>
                {tier.note && <p className="mt-3 text-[10px] text-center text-slate-400 font-black uppercase tracking-widest">{tier.note}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20 overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-black text-navy text-center mb-10 uppercase tracking-tight">{t('compare.title')}</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('compare.col.service')}</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('compare.col.get')}</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('compare.col.cost')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={row.highlight ? 'bg-accent/5' : ''}>
                    <td className={`px-6 py-6 font-black uppercase tracking-tight ${row.highlight ? 'text-accent' : 'text-navy'}`}>{row.name}</td>
                    <td className="px-6 py-6 text-slate-600 font-bold">{row.get}</td>
                    <td className={`px-6 py-6 font-black uppercase tracking-widest ${row.highlight ? 'text-accent' : 'text-slate-900'}`}>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Capacity / Urgency */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-slate-100 shadow-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Human review slots limited</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-slate-100 shadow-sm">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Capacity resets monthly</span>
          </div>
        </div>

        {/* Footnotes */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-navy uppercase tracking-tight mb-2">{t('pricing.guarantee.title')}</h3>
            <p className="text-slate-600 text-sm font-bold leading-relaxed">{t('pricing.guarantee.body')}</p>
          </div>
        </div>

        <div className="text-center space-y-5">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
            {t('pricing.footer')}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 text-[11px] font-black text-navy uppercase tracking-widest">
            <span>{t('pricing.currency.note')}</span>
            <span className="hidden md:block opacity-20">|</span>
            <a href="mailto:b2b@clearvisa.co.uk" className="hover:text-accent underline transition-colors">{t('pricing.b2b')}</a>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {["🇮🇳", "🇳🇬", "🇿🇦", "🇵🇭", "🇵🇰", "🇧🇩", "🇧🇷", "🇪🇬", "🇺🇦", "🇲🇽"].map((f, i) => (
            <span key={i} className="text-3xl hover:scale-125 transition-transform cursor-default">{f}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;