import React from 'react';

interface HeroProps {
  onStartCheck: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCheck }) => {
  return (
    <section className="relative flex lg:items-center pt-20 pb-12 lg:pt-16 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-10 lg:mb-0 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-navy leading-[1.15] mb-4 lg:mb-5">
              Check your UK visa eligibility before you spend money on <span className="text-accent">applications or professional advice.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-lg text-slate-600 mb-6 lg:mb-7 leading-relaxed font-semibold max-w-lg">
              Get an instant ClearVisa UK – Immigration Eligibility Pre-Check Report for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.
            </p>
            
            <ul className="space-y-2.5 lg:space-y-3 mb-8 lg:mb-9">
              {[
                "No appointments or long forms required",
                "Instant result with a professional PDF summary",
                "Built around latest public Home Office rules",
                "Clear disclaimer: not legal advice"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <div className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="font-bold text-sm lg:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
              <button 
                onClick={onStartCheck}
                className="w-full sm:w-auto bg-navy text-white px-8 py-3.5 lg:px-9 lg:py-4 rounded-xl text-base lg:text-[17px] font-black hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
              >
                Start eligibility check
              </button>
              <a href="#how-it-works" className="text-navy font-black hover:text-accent flex items-center gap-2 group text-base lg:text-[17px]">
                See how it works
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
            <p className="text-[10px] lg:text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-6 lg:mt-7">Takes 2–3 minutes • Secure Assessment Engine</p>
          </div>

          <div className="relative">
            {/* Main App Preview Card */}
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform lg:scale-95 xl:scale-100">
              <div className="p-3 lg:p-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                </div>
                <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">ClearVisa Assessment Engine</span>
              </div>
              <div className="p-5 lg:p-8">
                <div className="flex gap-2 mb-6 lg:mb-8">
                  <div className="h-1.5 lg:h-2 flex-1 bg-navy rounded-full"></div>
                  <div className="h-1.5 lg:h-2 flex-1 bg-navy rounded-full"></div>
                  <div className="h-1.5 lg:h-2 flex-1 bg-navy rounded-full animate-pulse"></div>
                  <div className="h-1.5 lg:h-2 flex-1 bg-slate-100 rounded-full"></div>
                </div>
                <div className="space-y-5 lg:space-y-6">
                  <div className="p-3 lg:p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-xs lg:text-[13px] font-black uppercase">Skilled Worker Route Selected</div>
                  <div className="p-3 lg:p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-xs lg:text-[13px] font-bold uppercase">Salary Validated: £38,700</div>
                  <button onClick={onStartCheck} className="w-full bg-navy text-white py-3 lg:py-3.5 rounded-xl font-black text-xs lg:text-[13px] uppercase tracking-widest">Generate Assessment</button>
                </div>
              </div>
            </div>

            {/* Float-over Result Preview */}
            <div className="absolute -bottom-2 -left-4 md:-left-6 lg:-left-8 w-52 md:w-64 lg:w-72 bg-white rounded-xl lg:rounded-2xl shadow-2xl border border-accent/20 p-3.5 lg:p-5 transform hover:rotate-1 transition-transform">
              <div className="flex items-center justify-between mb-2.5 lg:mb-3">
                <span className="px-2 py-0.5 lg:px-2.5 lg:py-0.5 bg-accent/10 text-accent rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-wider">Likely Eligible</span>
              </div>
              <p className="text-[10px] lg:text-[11px] text-slate-600 mb-2.5 lg:mb-3 font-bold">ClearVisa UK Analysis: Parameters meet Appendix FM thresholds.</p>
              <div onClick={onStartCheck} className="text-navy text-[10px] lg:text-[11px] font-black uppercase tracking-widest border-t pt-3 lg:pt-3.5 cursor-pointer hover:text-accent flex items-center gap-2">
                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
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