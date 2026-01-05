import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 lg:p-14 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent"></div>
          <h3 className="text-2xl font-black text-navy mb-6 lg:mb-8 uppercase tracking-tight">{t('legal.title')}</h3>
          <div className="space-y-6 lg:space-y-8 text-slate-600 text-[13px] lg:text-sm leading-relaxed font-bold">
            <p>
              <strong className="text-navy uppercase tracking-tight">ClearVisa UK – Immigration Eligibility Pre-Check Report</strong> {t('legal.p1')}
            </p>
            <p>{t('legal.p2')}</p>
            <p>{t('legal.p3')}</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 lg:p-14 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-black text-navy mb-6 uppercase tracking-tight">Refunds</h3>
          <div className="space-y-6 text-slate-600 text-[13px] font-bold leading-relaxed">
            <p>We provide refunds where:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>your answers clearly indicate ineligibility under public rules</li>
              <li>there was a technical failure preventing delivery</li>
              <li>you were charged more than once in error</li>
            </ul>
            <p>We do not provide refunds for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>change of mind after report delivery</li>
              <li>outcomes different from what you hoped</li>
              <li>future rule changes after report date</li>
            </ul>
            <p className="italic border-t pt-4">This product is informational and based on publicly available Home Office guidance. We do not provide legal advice and we do not guarantee visa approval.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;