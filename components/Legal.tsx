import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section-py bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Legal Card */}
        <div className="app-card border-slate-200 relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent"></div>
          <h3 className="text-h3 text-navy mb-8 uppercase tracking-tight">{t('legal.title')}</h3>
          <div className="space-y-6 text-slate-600 text-small leading-relaxed font-medium">
            <p>
              <strong className="text-navy uppercase tracking-tight">ClearVisa UK</strong> {t('legal.p1')}
            </p>
            <p>{t('legal.p2')}</p>
            <p>{t('legal.p3')}</p>
          </div>
        </div>

        {/* Refund Card */}
        <div className="app-card border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-navy"></div>
          <h3 className="text-h3 text-navy mb-8 uppercase tracking-tight">Refund Policy</h3>
          <div className="space-y-8 text-slate-600 text-small font-medium leading-relaxed">
            <div className="space-y-4">
              <p className="text-navy uppercase tracking-widest text-[10px] font-bold">Refunds are issued where:</p>
              <ul className="space-y-3">
                {[
                  "The tool shows you are ineligible under current public rules",
                  "A technical failure prevents report delivery",
                  "A billing error results in double charging"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-accent">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <p className="text-navy uppercase tracking-widest text-[10px] font-bold">No refunds are provided for:</p>
              <ul className="space-y-3">
                {[
                  "Change of mind after report delivery",
                  "Application outcomes different from the pre-check",
                  "Future Home Office rule changes"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-rose-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="italic border-t border-slate-100 pt-6 text-slate-400 text-[11px]">
              ClearVisa UK is an informational tool based on publicly available Home Office guidance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Legal;