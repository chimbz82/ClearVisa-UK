import React from 'react';

interface HeroProps {
  onStartCheck: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCheck }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-16 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy leading-tight mb-8">
              Check your UK visa eligibility before you spend money on <span className="text-accent">applications or professional advice.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-semibold">
              Get an instant ClearVisa UK – Immigration Eligibility Pre-Check Report for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.
            </p>
            
            <ul className="space-y-5 mb-12">
              {[
                "No appointments or long forms required",
                "Instant result with a professional PDF summary",
                "Built around latest public Home Office rules",
                "Clear disclaimer: not legal advice"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-slate-700">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="font-bold text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={onStartCheck}
                className="w-full sm:w-auto bg-navy text-white px-10 py-5 rounded-xl text-lg font-black hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
              >
                Start eligibility check
              </button>
              <a href="#how-it-works" className="text-navy font-black hover:text-accent flex items-center gap-2 group text-lg">
                See how it works
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-8">Takes 2–3 minutes • Secure Assessment Engine</p>
          </div>

          <div className="relative">
            {/* Main App Preview Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ClearVisa Assessment Engine</span>
              </div>
              <div className="p-10">
                <div className="flex gap-2 mb-10">
                  <div className="h-2 flex-1 bg-navy rounded-full"></div>
                  <div className="h-2 flex-1 bg-navy rounded-full"></div>
                  <div className="h-2 flex-1 bg-navy rounded-full animate-pulse"></div>
                  <div className="h-2 flex-1 bg-slate-100 rounded-full"></div>
                </div>
                <div className="space-y-8">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm font-black uppercase">Skilled Worker Route Selected</div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm font-bold uppercase">Salary Validated: £38,700</div>
                  <button onClick={onStartCheck} className="w-full bg-navy text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest">Generate Assessment</button>
                </div>
              </div>
            </div>

            {/* Float-over Result Preview */}
            <div className="absolute -bottom-8 -left-8 md:-left-12 w-64 md:w-80 bg-white rounded-2xl shadow-2xl border border-accent/20 p-6 transform hover:rotate-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[11px] font-black uppercase tracking-wider">Likely Eligible</span>
              </div>
              <p className="text-xs text-slate-600 mb-4 font-bold">ClearVisa UK Analysis: Parameters meet Appendix FM thresholds.</p>
              <div onClick={onStartCheck} className="text-navy text-xs font-black uppercase tracking-widest border-t pt-4 cursor-pointer hover:text-accent flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                DOWNLOAD PDF REPORT
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;