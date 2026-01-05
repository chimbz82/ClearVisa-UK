import React from 'react';

const WhoItsFor: React.FC = () => {
  const cards = [
    {
      title: "Spouse & partner applicants",
      desc: "For people planning to apply for a UK spouse or partner visa and want to know if their income, relationship evidence, and status are on the right track.",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      )
    },
    {
      title: "Skilled worker applicants",
      desc: "For workers and employers who want a quick sense of whether a job, salary, and sponsorship arrangement meet key skilled worker requirements.",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      )
    },
    {
      title: "People re-applying after refusal",
      desc: "For applicants who have been refused before and want to avoid repeating the same mistakes by understanding which areas are most sensitive.",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      )
    },
    {
      title: "Early-stage planners",
      desc: "For people still saving, planning, or collecting documents who want to know what needs to be fixed before they apply.",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      )
    }
  ];

  return (
    <section id="who-its-for" className="pt-4 pb-20 bg-white scroll-mt-[140px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Who this tool is for</h2>
          <p className="text-lg text-slate-600">ClearVisa UK – Immigration Eligibility Pre-Check Report is built for real people trying to make serious decisions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-slate-50 p-7 lg:p-8 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all group">
              <div className="mb-5 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="text-xl font-bold text-navy mb-2.5">{card.title}</h3>
              <p className="text-slate-600 text-[13px] lg:text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;