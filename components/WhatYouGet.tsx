import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhatYouGet: React.FC = () => {
  const { t } = useLanguage();

  const deliverables = [
    t('section.whatYouGet.item1'),
    t('section.whatYouGet.item2'),
    t('section.whatYouGet.item3'),
    t('section.whatYouGet.item4'),
    t('section.whatYouGet.item5')
  ];

  return (
    <section className="section-py bg-white">
      <div className="app-container">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-16 lg:mb-0">
            <h2 className="text-h2 text-[#0B1F3B] mb-4 uppercase tracking-tight">
              {t('section.whatYouGet.title')}
            </h2>
            <p className="text-body text-slate-600 mb-10 font-medium">
              {t('section.whatYouGet.subtitle')}
            </p>
            
            <ul className="space-y-6">
              {deliverables.map((text, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <p className="text-slate-700 text-small font-semibold leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-5 bg-teal-50 rounded-2xl border border-teal-100 inline-block">
              <p className="text-[12px] text-teal-800 font-bold uppercase tracking-wide">
                {t('section.whatYouGet.footer')}
              </p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4 shadow-xl">
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
                <div className="p-5 bg-[#0B1F3B] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-[10px] font-bold text-[#0B1F3B]">C</div>
                    <span className="text-[9px] font-black uppercase tracking-tight">Eligibility Report</span>
                  </div>
                  <span className="text-[9px] font-bold opacity-60">ID: CV-942103</span>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-3xl font-bold">✓</div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status verdict</span>
                      <h4 className="text-lg font-black text-[#0B1F3B] uppercase">Likely Eligible</h4>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Risk analysis</span>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="h-2 bg-teal-500 rounded-full"></div>
                        <div className="h-2 bg-teal-500 rounded-full"></div>
                        <div className="h-2 bg-amber-400 rounded-full"></div>
                        <div className="h-2 bg-slate-100 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="h-2 w-full bg-slate-200 rounded mb-2"></div>
                      <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-teal-600 text-white p-4 rounded-xl shadow-lg">
                    <span className="text-[11px] font-black uppercase tracking-widest">Download PDF Summary</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
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
