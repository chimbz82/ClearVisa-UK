import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Step 1 – Tell us about your situation",
      desc: "Choose your route (spouse, skilled worker, or other common categories) and answer a short series of questions about your status, sponsor, income, and history."
    },
    {
      title: "Step 2 – See your eligibility score preview",
      desc: "Based on your answers, we map you against key Home Office rules and give you a clear preview summary (likely eligible, borderline, or unlikely eligible)."
    },
    {
      title: "Step 3 – Unlock full result & summary",
      desc: "Pay a small one-off fee to unlock your full personalised ClearVisa UK – Immigration Eligibility Pre-Check Report: verdict, risk factors, and suggested next steps."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6 leading-tight">How ClearVisa UK – Immigration Eligibility Pre-Check Report works</h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium">A simple three-step flow from questions to a clear outcome.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-full hover:shadow-2xl hover:border-accent/20 transition-all duration-500">
                <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-10 group-hover:bg-accent transition-colors shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-navy mb-4 leading-tight">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 opacity-20">
                  <svg className="w-10 h-10 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
            Secure • GDPR Compliant • Encrypted
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;