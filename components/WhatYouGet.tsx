import React from 'react';

const WhatYouGet: React.FC = () => {
  const deliverables = [
    { title: "Eligibility verdict", desc: "Likely, borderline, or unlikely based on your answers." },
    { title: "Risk factor breakdown", desc: "Which areas look strong and which may cause problems." },
    { title: "Plain-English explanation", desc: "What this means for your situation." },
    { title: "Suggested next steps", desc: "What to fix or prepare before you spend money on applications or professional advice." },
    { title: "Downloadable summary", desc: "A clean PDF-style report you can save or share." }
  ];

  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-14 lg:pt-20 lg:pb-[72px] mb-8 md:mb-12 bg-navy text-white overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 lg:mb-5 leading-tight">What you get from your pre-check</h2>
            <p className="text-lg text-slate-400 mb-8 lg:mb-10 font-medium">Not just a score – a structured summary you can actually use.</p>
            
            <ul className="space-y-5 lg:space-y-6">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
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
                You can take this summary to a solicitor, advisor, or keep it for your own planning.
              </p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="max-w-[340px] md:max-w-[360px] lg:max-w-[380px] w-full bg-white rounded-2xl p-4 shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
              {/* PDF Mock Visual */}
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50">
                <div className="p-5 lg:p-6 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-navy rounded flex items-center justify-center text-[10px] font-bold text-white">C</div>
                    <span className="text-[8px] font-bold text-navy tracking-tight uppercase leading-tight">ClearVisa UK – Immigration<br/>Eligibility Pre-Check Report</span>
                  </div>
                  <span className="text-[9px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confidential</span>
                </div>
                <div className="p-8 lg:p-10 space-y-7 lg:space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl shadow-inner font-bold">✓</div>
                    <div>
                      <h3 className="text-xl font-bold text-navy uppercase tracking-tight">Likely Eligible</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Route: Spouse Visa</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-1 bg-teal-500 rounded"></div>
                    <div className="h-1 bg-teal-500 rounded"></div>
                    <div className="h-1 bg-teal-500 rounded"></div>
                    <div className="h-1 bg-slate-200 rounded"></div>
                  </div>
                  <div className="space-y-3.5 lg:space-y-4">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                  </div>
                  <div className="pt-6 lg:pt-8 flex justify-center">
                    <div className="px-5 py-2 border-2 border-navy text-navy font-bold text-[9px] lg:text-[10px] uppercase tracking-widest rounded-full">Report ID: PRE-40392</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-teal-500/20 blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;