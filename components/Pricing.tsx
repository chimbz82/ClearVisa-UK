import React from 'react';

interface PricingProps {
  onStartCheck: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheck }) => {
  return (
    <section id="pricing" className="pt-6 md:pt-10 lg:pt-12 pb-20 bg-slate-50/50 scroll-mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Simple, one-time pricing</h2>
          <p className="text-lg text-slate-600">No subscriptions. No hidden fees. Pay once per pre-check.</p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform hover:scale-[1.02] transition-transform">
            <div className="p-8 lg:p-10 text-center bg-slate-50 border-b border-slate-100">
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3 lg:mb-4">Full Eligibility Pre-Check</h3>
              <div className="flex items-center justify-center gap-1 mb-3 lg:mb-4">
                <span className="text-4xl font-bold text-navy">£19</span>
                <span className="text-slate-400 font-medium">/ check</span>
              </div>
              <p className="text-slate-600 text-[13px] lg:text-sm">Complete assessment for one route (e.g. spouse or skilled worker)</p>
            </div>
            <div className="p-8 lg:p-10">
              <ul className="space-y-3.5 lg:space-y-4 mb-8 lg:mb-10">
                {[
                  "Full eligibility verdict & explanation",
                  "Risk factor breakdown across key criteria",
                  "Suggested next steps before you apply",
                  "Downloadable summary (PDF-style)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onStartCheck}
                className="w-full bg-navy text-white py-3.5 lg:py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Start eligibility check
              </button>
            </div>
          </div>
          <p className="mt-7 text-center text-[13px] lg:text-sm text-slate-500 font-medium">
            No subscription. You only pay when you want to unlock a full result.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;