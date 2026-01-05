import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhatYouGet: React.FC = () => {
  const { t } = useLanguage();

  const deliverables = [
    { title: t('section.whatYouGet.itemVerdictTitle'), desc: t('section.whatYouGet.itemVerdictBody') },
    { title: t('section.whatYouGet.itemRiskTitle'), desc: t('section.whatYouGet.itemRiskBody') },
    { title: t('section.whatYouGet.itemPlainTitle'), desc: t('section.whatYouGet.itemPlainBody') },
    { title: t('section.whatYouGet.itemNextStepsTitle'), desc: t('section.whatYouGet.itemNextStepsBody') },
    { title: t('section.whatYouGet.itemDownloadTitle'), desc: t('section.whatYouGet.itemDownloadBody') }
  ];

  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-14 lg:pt-20 lg:pb-[72px] mb-8 md:mb-12 bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 lg:mb-5 leading-tight">{t('section.whatYouGet.title')}</h2>
            <p className="text-lg text-slate-400 mb-8 lg:mb-10 font-medium">{t('section.whatYouGet.subtitle')}</p>
            
            <ul className="space-y-5 lg:space-y-6">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-0.5 lg:mb-1 leading-tight text-sm lg:text-base">{item.title}</h4>
                    <p className="text-slate-400 text-xs lg:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 lg:mt-10 p-3.5 border border-slate-700/50 rounded-lg bg-slate-800/30 inline-block">
              <p className="text-xs text-slate-400 italic font-medium">
                {t('section.whatYouGet.footerNote')}
              </p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="max-w-[340px] md:max-w-[360px] lg:max-w-[380px] w-full bg-white rounded-2xl p-4 shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50">
                <div className="p-5 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-navy rounded flex items-center justify-center text-[8px] font-bold text-white">C</div>
                    <span className="text-[7px] font-bold text-navy tracking-tight uppercase leading-tight">ClearVisa UK Pre-Check</span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Confidential</span>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Heatmap Visual Mock */}
                  <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <h5 className="text-[9px] font-black text-navy uppercase tracking-widest mb-3">Your risk areas visualized clearly</h5>
                    <div className="relative h-2.5 w-full bg-gradient-to-r from-accent via-amber-400 to-rose-500 rounded-full mb-3">
                      <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-3 h-3 bg-white border-2 border-navy rounded-full shadow-lg"></div>
                    </div>
                    <div className="flex justify-between text-[7px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent text-lg shadow-inner font-bold">✓</div>
                    <div>
                      <h3 className="text-xs font-bold text-navy uppercase tracking-tight">Likely Eligible</h3>
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Route: Spouse Visa</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                    <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-accent/20 blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;