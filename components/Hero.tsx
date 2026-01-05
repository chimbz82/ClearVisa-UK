
import React from 'react';

interface HeroProps {
  onStartCheck: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCheck }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="mb-16 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              Check your UK visa eligibility in minutes, <span className="text-teal-600">before you spend thousands</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Answer a few questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear eligibility verdict, risk flags, and next steps.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "No appointments, no long forms, no sales calls",
                "Instant online result with a downloadable summary",
                "Built around public Home Office rules",
                "Clear disclaimer: not legal advice"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button 
                onClick={onStartCheck}
                className="w-full sm:w-auto bg-navy text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1"
              >
                Start eligibility check
              </button>
              <a href="#how-it-works" className="text-slate-600 font-semibold hover:text-navy flex items-center gap-2 group">
                See how it works
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
            <p className="text-sm text-slate-500 italic">Takes 2–3 minutes. No account required.</p>

            <div className="mt-12 flex items-center gap-2 text-slate-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Your answers are encrypted and not shared with third parties.
            </div>
          </div>

          {/* Visual Mock App */}
          <div className="relative">
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            
            {/* Main App Preview Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Step 3: Income & Documents</span>
              </div>
              <div className="p-8">
                {/* Progress Steps */}
                <div className="flex gap-2 mb-8">
                  <div className="h-1.5 flex-1 bg-navy rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-navy rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-navy rounded-full animate-pulse"></div>
                  <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Are you applying as a spouse or partner?</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border-2 border-navy bg-slate-50 rounded-lg text-center font-medium text-navy text-sm cursor-default">Yes</div>
                      <div className="p-3 border-2 border-transparent bg-slate-100 rounded-lg text-center font-medium text-slate-500 text-sm cursor-default">No</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Total annual combined gross income (£)</label>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm">e.g. 29000</div>
                  </div>
                  <button onClick={onStartCheck} className="w-full bg-navy text-white py-3 rounded-lg font-bold text-sm">Continue</button>
                </div>
              </div>
            </div>

            {/* Float-over Result Preview */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 w-64 md:w-72 bg-white rounded-xl shadow-xl border border-teal-100 p-5 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-teal-100 text-teal-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Likely Eligible</span>
                <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.633.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">Your financial and relationship parameters meet the current thresholds.</p>
              <div onClick={onStartCheck} className="flex items-center gap-2 text-navy text-[10px] font-bold border-t border-slate-50 pt-3 cursor-pointer">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                Download summary (PDF)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
