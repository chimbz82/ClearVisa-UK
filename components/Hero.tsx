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
    <section className="relative pt-24 pb-12 lg:pt-40 lg:pb-20 bg-white">
      <div className="app-container">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-3/5 mb-10 lg:mb-0 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-6">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]">ClearVisa UK – UK Visa Pre-Check</span>
            </div>
            
            <h1 className="text-4xl sm:text-5_xl font-bold tracking-tight text-[#041229] mb-6 leading-[1.1]">
              Check your UK visa eligibility in minutes, <br/>
              <span className="text-[#2BB24C]">before you spend thousands.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Answer a few simple questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button onClick={onStartCheck} size="lg">
                {t('hero.ctaPrimary')}
              </Button>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-sm font-semibold text-[#041229] hover:text-[#1877F2] transition-colors py-2"
              >
                {t('hero.ctaSecondary')} →
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium italic">
                Join <span className="text-[#041229] font-bold">12,000+ applicants</span> using ClearVisa UK
              </p>
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center">
            <div className="w-full max-w-[420px] bg-[#041229] rounded-2xl p-1 shadow-2xl overflow-hidden relative">
              <div className="bg-white rounded-[14px] overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Live Assessment</span>
                </div>
                <div className="p-6 space-y-5">
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-slate-100 rounded"></div>
                    <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-32 bg-slate-100 rounded"></div>
                    <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg"></div>
                  </div>
                  <div className="pt-2">
                    <div className="h-11 w-full bg-[#2BB24C] rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 min-w-[280px] animate-in slide-in-from-left duration-700 delay-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#2BB24C] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-[#2BB24C] block leading-tight uppercase tracking-tight">LIKELY ELIGIBLE</span>
                    <span className="text-[10px] text-slate-400 font-bold block leading-tight">Based on example answers</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">COMPLIANCE SCORE</span>
                    <span className="text-[9px] font-black text-[#2BB24C] uppercase tracking-widest">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2BB24C] w-[85%] transition-all duration-1000 delay-1000"></div>
                  </div>
                </div>

                <div className="space-y-1.5 border-t border-slate-50 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">NO LAWYER REQUIRED TO USE TOOL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">INSTANT ELIGIBILITY PREVIEW</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight">DOES NOT SUBMIT AN APPLICATION</span>
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
