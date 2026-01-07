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
    <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-3/5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ClearVisa UK – Official Eligibility Pre-Check</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy mb-6 leading-[1.05]">
              Check your UK visa eligibility in minutes, <br className="hidden sm:block"/>
              <span className="text-success">before you spend thousands.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed font-medium">
              Answer a few simple questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-10">
              <Button onClick={onStartCheck} size="lg">
                {t('hero.ctaPrimary')}
              </Button>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-sm font-bold text-navy hover:text-accent transition-colors py-2 flex items-center gap-1"
              >
                {t('hero.ctaSecondary')} <span className="text-lg">→</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-navy leading-none mb-1">20+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Countries served</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-accent leading-none mb-1">94%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spouse Visa focus</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-success leading-none mb-1">&lt;10min</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Completion</span>
               </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[11,12,13,14].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-semibold italic">
                Join <span className="text-navy font-bold">12,000+ applicants</span> using ClearVisa UK
              </p>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-2/5 justify-end relative">
            <div className="w-full max-w-[420px] bg-navy rounded-2xl p-1 shadow-2xl relative">
              <div className="bg-white rounded-[14px] overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assessment View</span>
                </div>
                <div className="p-7 space-y-6">
                  <div className="space-y-2">
                    <div className="h-1.5 w-24 bg-slate-100 rounded"></div>
                    <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-xl"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-32 bg-slate-100 rounded"></div>
                    <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-xl"></div>
                  </div>
                  <div className="pt-2">
                    <div className="h-11 w-full bg-success rounded-xl shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-8 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 min-w-[320px]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-success text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-black text-success block leading-tight uppercase tracking-tight">LIKELY ELIGIBLE</span>
                    <span className="text-[10px] text-slate-400 font-bold block leading-tight">Based on example answers</span>
                  </div>
                </div>
                
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">COMPLIANCE SCORE</span>
                    <span className="text-[10px] font-black text-success uppercase tracking-widest">85%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[85%]"></div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-50 pt-4">
                  {[
                    "NO LAWYER REQUIRED TO USE TOOL",
                    "INSTANT ELIGIBILITY PREVIEW",
                    "DOES NOT SUBMIT AN APPLICATION"
                  ].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">{bullet}</span>
                    </div>
                  ))}
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