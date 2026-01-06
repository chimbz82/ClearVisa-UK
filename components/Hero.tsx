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
    <section id="top" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="app-container relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div className="mb-16 lg:mb-0">
            <h1 className="text-h1 text-[#0B1F3B] mb-6 leading-[1.15]">
              {t('hero.heading')} <br/><span className="text-teal-600">{t('hero.headingAccent')}</span>
            </h1>
            <p className="text-body-lg text-slate-600 mb-8 max-w-xl font-medium">
              {t('hero.subheading')}
            </p>

            <ul className="space-y-4 mb-10">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs">✓</div>
                  {t(`hero.bullet${i}`)}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-4">
              <div className="w-full sm:w-auto">
                <Button onClick={onStartCheck} size="lg" className="w-full sm:w-auto px-10">
                  {t('hero.ctaPrimary')}
                </Button>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-3 text-center sm:text-left ml-1">
                  {t('hero.ctaSubtext')}
                </p>
              </div>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-small font-black text-[#0B1F3B] uppercase tracking-widest hover:text-teal-600 transition-colors py-4 px-2"
              >
                {t('hero.ctaSecondary')} →
              </button>
            </div>
            
            <p className="text-[12px] text-slate-400 font-medium leading-relaxed max-w-md mt-6">
              {t('hero.reassurance')}
            </p>
          </div>

          <div className="relative">
            {/* App Preview Card Wrapper */}
            <div className="relative z-10 p-2 bg-white rounded-[2rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-right-12 duration-1000">
              <div className="bg-slate-50 rounded-[1.75rem] overflow-hidden border border-slate-100">
                {/* App Toolbar */}
                <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligibility Check</span>
                </div>
                
                {/* App Content */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-widest">Step 2: Sponsor Details</span>
                    <span className="text-[10px] font-bold text-teal-600">60% Complete</span>
                  </div>
                  <div className="flex gap-2 h-1.5 mb-8">
                    <div className="flex-1 bg-teal-600 rounded-full"></div>
                    <div className="flex-1 bg-teal-600 rounded-full"></div>
                    <div className="flex-1 bg-teal-600 rounded-full"></div>
                    <div className="flex-1 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 bg-slate-200 rounded-full"></div>
                  </div>

                  {/* Fake Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-3 w-32 bg-slate-200 rounded"></div>
                      <div className="h-12 w-full bg-white border border-slate-200 rounded-xl"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-40 bg-slate-200 rounded"></div>
                      <div className="h-12 w-full bg-white border border-slate-200 rounded-xl"></div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="pt-4">
                    <div className="h-12 w-full bg-[#0B1F3B] rounded-xl flex items-center justify-center">
                      <div className="h-2 w-20 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Snippet Overlay */}
            <div className="absolute -bottom-10 -left-6 md:-left-12 z-20 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 max-w-[240px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[9px] font-black rounded-full uppercase tracking-tighter">Likely eligible</span>
                <span className="text-[9px] text-slate-400 font-bold">Today, 10:42 AM</span>
              </div>
              <p className="text-[11px] font-bold text-slate-700 leading-relaxed mb-4">
                Based on your inputs, you meet the primary income and relationship criteria.
              </p>
              <div className="flex items-center gap-2 text-teal-600 text-[10px] font-black uppercase tracking-widest">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                Download PDF Summary
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
