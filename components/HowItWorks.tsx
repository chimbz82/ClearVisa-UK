
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
      desc: "Pay a small one-off fee to unlock your full personalised report: eligibility verdict, key risk factors, and suggested next steps you can discuss with a solicitor or advisor."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">How UK Visa Pre-Check works</h2>
          <p className="text-lg text-slate-600">A simple three-step flow from questions to clear outcome.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 h-full hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center text-xl font-bold mb-8 group-hover:bg-teal-600 transition-colors">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-navy mb-4 leading-tight">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            You stay in control: no automatic referrals, no unexpected calls.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
