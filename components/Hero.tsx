import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

interface HeroProps {
  onStartCheck: () => void;
  onScrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCheck, onScrollToSection }) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-24 bg-white overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-success/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="lg:flex lg:items-center lg:gap-20">
          <div className="lg:w-3/5 text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">v2026.04 Compliance Engine Active</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-navy mb-6 leading-[0.95] uppercase">
              Fix your UK visa <br className="hidden sm:block"/>
              <span className="text-accent">before you apply.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-semibold">
              Get an instant solicitor-grade audit of your eligibility for <span className="text-navy">Spouse</span> or <span className="text-navy">Skilled Worker</span> routes. Discover risk flags before they become refusals.
            </p>

            <div className="flex flex-wrap gap-5 items-center mb-16">
              <Button onClick={onStartCheck} size="lg" className="px-10 py-5 rounded-2xl shadow-2xl shadow-accent/20 hover:scale-105 transition-transform font-black uppercase tracking-widest text-sm">
                Start Pre-Check Now
              </Button>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-xs font-black text-slate-400 hover:text-navy uppercase tracking-[0.25em] transition-all flex items-center gap-2 group"
              >
                Learn Process <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-navy leading-none mb-1">12k+</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Successful Audits</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-accent leading-none mb-1">98%</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Rules Accuracy</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-success leading-none mb-1">2min</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Initial Verdict</span>
               </div>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md">
                    <img src={`https://i.pravatar.cc/100?u=visa${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
                Trusted by applicants from <span className="text-navy font-black">60+ countries</span>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-2/5 justify-end relative">
            {/* Main Mock Report Card */}
            <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] p-2 shadow-2xl relative border-2 border-slate-100/50 animate-float">
              <div className="bg-slate-50/30 rounded-[2.2rem] overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400/20"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20"></div>
                  </div>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Compliance Audit Log</span>
                </div>
                
                <div className="p-10 space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-success/10 text-success rounded-3xl flex items-center justify-center text-3xl shadow-inner">✓</div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Audit Outcome</span>
                      <h4 className="text-xl font-black text-navy uppercase tracking-tight">Likely Eligible</h4>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Score</span>
                      <span className="text-xs font-black text-success uppercase">92%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-success rounded-full w-[92%] shadow-[0_0_15px_rgba(43,178,76,0.3)]"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { l: "Financial Threshold", v: "PASS" },
                      { l: "Relationship Evidence", v: "STRONG" },
                      { l: "Suitability Check", v: "CLEAN" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{item.l}</span>
                         <span className="text-[9px] font-black text-success uppercase tracking-widest">{item.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Secondary Floating Card */}
              <div className="absolute -bottom-10 -left-12 bg-navy text-white p-8 rounded-[2rem] shadow-2xl min-w-[340px] border border-white/5 animate-pulse-slow">
                <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-6">Expert Guidance</h5>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-5 h-5 bg-accent rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={5} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-tight leading-relaxed">Personalised Document Checklist generated</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-5 h-5 bg-accent rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={5} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-tight leading-relaxed">Risk remediation steps identified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;