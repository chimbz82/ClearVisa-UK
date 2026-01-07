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
    <section className="relative pt-28 pb-16 lg:pt-44 lg:pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-3/5 mb-12 lg:mb-0 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-6">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">ClearVisa UK – UK Visa Pre-Check</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#041229] mb-6 leading-[1.05]">
              Check your UK visa eligibility in minutes, <br className="hidden sm:block"/>
              <span className="text-[#2BB24C]">before you spend thousands.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
              Answer a few simple questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-12">
              <Button onClick={onStartCheck} size="lg">
                {t('hero.ctaPrimary')}
              </Button>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-sm font-bold text-[#041229] hover:text-[#1877F2] transition-colors py-2"
              >
                {t('hero.ctaSecondary')} →
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
               <div>
                  <div className="text-2xl font-black text-navy leading-none mb-1">20+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Countries served</div>
               </div>
               <div>
                  <div className="text-2xl font-black text-[#1877F2] leading-none mb-1">94%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spouse Visa focus</div>
               </div>
               <div>
                  <div className="text-2xl font-black text-[#2BB24C] leading-none mb-1">&lt;10min</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Completion</div>
               </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-semibold italic">
                Join <span className="text-[#041229] font-bold">12,000+ applicants</span> using ClearVisa UK
              </p>
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-[#041229] rounded-2xl p-1 shadow-2xl overflow-hidden relative group">
              <div className="bg-white rounded-[14px] overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Live Assessment</span>
                </div>
                <div className="p-7 space-y-6">
                  <div className="space-y-3">
                    <div className="h-2 w-24 bg-slate-100 rounded"></div>
                    <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-xl"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-32 bg-slate-100 rounded"></div>
                    <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-xl"></div>
                  </div>
                  <div className="pt-2">
                    <div className="h-12 w-full bg-[#2BB24C] rounded-xl shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 min-w-[300px] animate-in slide-in-from-left duration-700 delay-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-[#2BB24C] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-black text-[#2BB24C] block leading-tight uppercase tracking-tight">LIKELY ELIGIBLE</span>
                    <span className="text-[10px] text-slate-400 font-bold block leading-tight">Based on example answers</span>
                  </div>
                </div>
                
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">COMPLIANCE SCORE</span>
                    <span className="text-[10px] font-black text-[#2BB24C] uppercase tracking-widest">85%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2BB24C] w-[85%] transition-all duration-1000 delay-1000"></div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">NO LAWYER REQUIRED TO USE TOOL</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">INSTANT ELIGIBILITY PREVIEW</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">DOES NOT SUBMIT AN APPLICATION</span>
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