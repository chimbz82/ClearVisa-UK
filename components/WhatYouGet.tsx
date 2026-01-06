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
    <section className="section-py bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full"></div>

      <div className="app-container">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-16 lg:mb-0">
            <h2 className="text-h2 mb-4">{t('section.whatYouGet.title')}</h2>
            <p className="text-body text-slate-400 mb-10 font-medium">{t('section.whatYouGet.subtitle')}</p>
            
            <ul className="space-y-6">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="text-small font-black text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-slate-400 text-small font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-4 border border-slate-700 rounded-xl bg-slate-800/30 inline-block">
              <p className="text-small text-slate-400 italic font-medium">
                {t('section.whatYouGet.footerNote')}
              </p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-navy rounded flex items-center justify-center text-[10px] font-bold text-white">C</div>
                    <span className="text-[8px] font-black text-navy tracking-tight uppercase leading-tight">ClearVisa UK<br/>Audit Tool</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Report</span>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <h5 className="text-[10px] font-black text-navy uppercase mb-3">Risk heatmap</h5>
                    <div className="relative h-2 w-full bg-gradient-to-r from-accent via-amber-400 to-rose-500 rounded-full mb-2">
                      <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-3 h-3 bg-white border border-navy rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent text-xl font-bold">✓</div>
                    <div>
                      <h3 className="text-small font-black text-navy uppercase">Likely Eligible</h3>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Spouse Visa</p>
                    </div>
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

export default WhatYouGet;