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
    <section id="top" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white text-left">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="app-container relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <h1 className="text-h1 text-navy mb-6 leading-[1.1]">
              {t('hero.heading')} <br/><span className="text-accent">{t('hero.headingAccent')}</span>
            </h1>
            <p className="text-body-lg text-slate-600 mb-10 max-w-xl font-medium leading-relaxed">
              {t('hero.subheading')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Button onClick={onStartCheck} size="lg" className="w-full sm:w-auto px-10">
                {t('hero.ctaPrimary')}
              </Button>
              <button 
                onClick={() => onScrollToSection('how-it-works')} 
                className="text-small font-black text-navy uppercase tracking-widest hover:text-accent transition-colors py-4 px-6"
              >
                {t('hero.ctaSecondary')} →
              </button>
            </div>
            
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">
              {t('hero.footerText')}
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            {/* App Preview Card */}
            <div className="app-card border border-slate-100 shadow-[0_32px_64px_-16px_rgba(11,31,59,0.15)] scale-105 lg:scale-110 bg-white p-1">
              <div className="bg-slate-50 rounded-[1.2rem] overflow-hidden">
                <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Eligibility Pre-Check</span>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black text-navy uppercase tracking-widest">Profile Progress</span>
                      <span className="text-[10px] font-bold text-navy">75%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden">
                      <div className="h-full bg-accent w-3/4"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Status Verdict</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-full">LIKELY</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded w-full"></div>
                    <div className="h-2 bg-slate-50 rounded w-2/3"></div>
                  </div>

                  <div className="p-4 bg-navy rounded-2xl shadow-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs">📄</div>
                      <div>
                        <p className="text-[10px] text-white font-black uppercase tracking-tight">Full Audit Report</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">Ready to unlock</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-[10px] font-bold">→</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust floaty */}
            <div className="absolute -bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 animate-bounce-slow">
              <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent">✓</div>
              <p className="text-[10px] font-black text-navy leading-none uppercase tracking-tight">Requirement Validated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
