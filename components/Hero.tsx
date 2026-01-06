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
    <section id="top" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      <div className="app-container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <h1 className="text-h1 text-navy mb-6">
              {t('hero.heading')} <span className="text-accent">{t('hero.headingAccent')}</span>
            </h1>
            <p className="text-body-lg text-slate-600 mb-10 max-w-xl">
              {t('hero.subheading')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button onClick={onStartCheck} size="lg" className="w-full sm:w-auto">
                {t('hero.ctaPrimary')}
              </Button>
              <Button onClick={() => onScrollToSection('how-it-works')} variant="outline" size="lg" className="w-full sm:w-auto">
                {t('hero.ctaSecondary')}
              </Button>
            </div>
            
            <p className="text-caption text-slate-400 mt-8 font-bold">
              {t('hero.footerText')}
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="app-card border border-slate-100 shadow-2xl scale-105 lg:scale-110">
              <div className="flex gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
              </div>
              <div className="space-y-6">
                <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-navy w-3/4"></div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-caption text-slate-400 mb-1">Analysis Result</p>
                  <p className="text-h3 text-navy">LIKELY ELIGIBLE</p>
                </div>
                <Button variant="navy" size="sm" fullWidth disabled>Detailed Risk Breakdown Locked</Button>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded flex items-center justify-center text-accent">✓</div>
                <p className="text-small font-bold text-navy leading-none">Compliant with Appendix FM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;