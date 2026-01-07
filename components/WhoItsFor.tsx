import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhoItsFor: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('section.whoFor.spouseTitle'),
      desc: t('section.whoFor.spouseBody'),
      icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    },
    {
      title: t('section.whoFor.skilledTitle'),
      desc: t('section.whoFor.skilledBody'),
      icon: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    },
    {
      title: t('section.whoFor.reapplyTitle'),
      desc: t('section.whoFor.reapplyBody'),
      icon: <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    },
    {
      title: t('section.whoFor.plannersTitle'),
      desc: t('section.whoFor.plannersBody'),
      icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    }
  ];

  const testimonials = [
    {
      quote: "I was worried about the new income rules for my husband's spouse visa. This report helped me see exactly where we stood before we spent a penny on the actual application.",
      route: "Spouse Visa Applicant"
    },
    {
      quote: "After a refusal last year, I used this to check if my new job met the salary requirements. It highlighted specific bank statement issues I hadn't even considered.",
      route: "Re-applying after refusal"
    },
    {
      quote: "Instant and clear. Much cheaper than a full legal consultation just to check basic eligibility. The checklist was exactly what I needed to organize my documents.",
      route: "Early-stage planner"
    }
  ];

  return (
    <section id="who-its-for" className="py-12 lg:py-16 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Target Audience</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4 tracking-tight">Who this tool is for</h2>
          <p className="text-base text-slate-600 font-medium leading-relaxed">ClearVisa UK is built for real people making serious life decisions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-7 flex flex-col group hover:shadow-lg transition-all h-full">
              <div className="mb-6 w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">{card.icon}</svg>
              </div>
              <h3 className="text-base font-bold text-navy mb-3 leading-tight uppercase tracking-tight">
                {card.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-grow font-semibold">
                {card.desc}
              </p>
              <div className="mt-8 pt-5 border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-accent">
                AVAILABLE NOW
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
           <div className="text-center mb-8">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 block">Testimonials</span>
              <h3 className="text-2xl font-extrabold text-navy uppercase tracking-tight">What real applicants say</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col bg-white p-6 rounded-2xl border border-white shadow-sm h-full">
                   <p className="text-sm text-slate-600 italic leading-relaxed mb-6 flex-grow font-medium">"{t.quote}"</p>
                   <div className="pt-5 border-t border-slate-100">
                      <span className="text-[10px] font-black text-navy uppercase tracking-widest leading-none block">{t.route}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;