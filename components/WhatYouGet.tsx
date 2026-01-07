import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhatYouGet: React.FC = () => {
  const { t } = useLanguage();

  const deliverables = [
    "Clear eligibility verdict for your chosen route",
    "Risk breakdown across key Home Office rules",
    "Personalised document checklist to fix weak areas",
    "Practical next-step suggestions before you apply",
    "PDF report you can download and keep"
  ];

  const whyChoose = [
    { title: "Zero Guesswork", desc: "Map yourself against actual public Home Office rules with automated logic." },
    { title: "Risk Awareness", desc: "Identify 'red flags' before you submit and lose thousands in visa fees." },
    { title: "Complete Preparation", desc: "Get a personalised checklist for your evidence before you apply." },
    { title: "Peace of Mind", desc: "Know your compliance score in minutes, not weeks." }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center mb-16">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#07162A] mb-6 tracking-tight">
              What your ClearVisa UK report includes
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-10 font-semibold leading-relaxed">
              A professional-grade summary you can use for your own planning or with a solicitor.
            </p>
            
            <ul className="space-y-5 mb-10">
              {deliverables.map((text, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <p className="text-slate-800 text-sm font-bold">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 w-full">
              <p className="text-[11px] text-emerald-800 font-black uppercase tracking-widest text-center">
                Use this summary for planning or share it with a solicitor.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] bg-white border border-slate-200/60 rounded-[2rem] p-4 shadow-2xl">
              <div className="bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-100">
                <div className="p-5 bg-[#07162A] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-[11px] font-black text-[#07162A]">C</div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Audit Summary</span>
                  </div>
                  <span className="text-[10px] font-bold opacity-60">ID: CV-942103</span>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-sm">✓</div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status verdict</span>
                      <h4 className="text-lg font-black text-[#07162A] uppercase tracking-tight">Likely Eligible</h4>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Risk score</span>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-2 bg-emerald-500 rounded-full"></div>
                      <div className="h-2 bg-emerald-500 rounded-full"></div>
                      <div className="h-2 bg-emerald-500 rounded-full"></div>
                      <div className="h-2 bg-slate-200 rounded-full"></div>
                      <div className="h-2 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-emerald-600 text-white px-5 py-4 rounded-2xl shadow-xl cursor-pointer hover:bg-emerald-700 transition-all active:scale-[0.98]">
                    <span className="text-xs font-black uppercase tracking-widest">Download PDF Report</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200">
           <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-navy tracking-tight">Why people choose ClearVisa UK</h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {whyChoose.map((item, i) => (
                <div key={i} className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                   <h4 className="text-base font-bold text-navy mb-3">{item.title}</h4>
                   <p className="text-xs text-slate-500 font-semibold leading-relaxed flex-grow">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;