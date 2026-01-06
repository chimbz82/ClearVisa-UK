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
    <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 bg-white overflow-hidden">
      <div className="app-container">
        <div className="lg:flex lg:items-center lg:gap-10">
          <div className="lg:w-3/5 mb-10 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-6">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">ClearVisa UK – UK Visa Pre-Check</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#07162A] mb-6 leading-[1.1]">
              Check your UK visa eligibility in minutes, <br/>
              <span className="text-[#16A34A]">before you spend thousands.</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-lg leading-relaxed">
              Answer a few simple questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button onClick={onStartCheck} size="lg">
                {t('hero.ctaPrimary')}
              </Button>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-sm font-semibold text-[#07162A] hover:text-[#16A34A] transition-colors py-2 flex items-center gap-1.5"
              >
                {t('hero.ctaSecondary')} 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[12,13,14,15].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Used by <span className="text-[#07162A] font-bold">12,400+ applicants</span> this month
              </p>
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] bg-[#07162A] rounded-2xl p-1 shadow-2xl overflow-hidden relative rotate-1">
              <div className="bg-white rounded-[1.15rem] overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Assessment Tool</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="h-1.5 w-20 bg-slate-100 rounded"></div>
                    <div className="h-9 w-full bg-slate-50 border border-slate-100 rounded-lg"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-28 bg-slate-100 rounded"></div>
                    <div className="h-9 w-full bg-slate-50 border border-slate-100 rounded-lg"></div>
                  </div>
                  <div className="pt-2">
                    <div className="h-10 w-full bg-[#16A34A] rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-[180px] -rotate-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
                  <span className="text-[11px] font-bold text-[#07162A]">Likely Eligible</span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#16A34A] w-[85%]"></div>
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