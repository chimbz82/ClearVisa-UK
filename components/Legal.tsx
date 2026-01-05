import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Legal Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent"></div>
          <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-tight leading-none">{t('legal.title')}</h3>
          <div className="space-y-6 text-slate-600 text-sm leading-relaxed font-bold">
            <p>
              <strong className="text-navy uppercase tracking-tight">ClearVisa UK</strong> {t('legal.p1')}
            </p>
            <p>{t('legal.p2')}</p>
            <p>{t('legal.p3')}</p>
          </div>
        </div>

        {/* Refund Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-navy"></div>
          <h3 className="text-2xl font-black text-navy mb-8 uppercase tracking-tight leading-none">Refund Policy</h3>
          <div className="space-y-8 text-slate-600 text-sm font-bold leading-relaxed">
            <div className="space-y-4">
              <p className="text-navy uppercase tracking-widest text-[10px]">We provide refunds where:</p>
              <ul className="space-y-3">
                {[
                  "Your answers clearly indicate ineligibility under public rules",
                  "There was a technical failure preventing delivery",
                  "You were charged more than once in error"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-accent">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <p className="text-navy uppercase tracking-widest text-[10px]">We do not provide refunds for:</p>
              <ul className="space-y-3">
                {[
                  "Change of mind after report delivery",
                  "Outcomes different from what you hoped",
                  "Future rule changes after report date"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-rose-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="italic border-t border-slate-100 pt-6 text-slate-400 text-xs">
              ClearVisa UK is an informational tool based on publicly available Home Office guidance. We do not provide legal advice and we do not guarantee visa approval.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Legal;