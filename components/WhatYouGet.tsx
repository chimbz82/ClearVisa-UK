
import React from 'react';

const WhatYouGet: React.FC = () => {
  const deliverables = [
    { title: "Eligibility verdict", desc: "Likely eligible, borderline, or unlikely eligible based on your inputs." },
    { title: "Risk factor breakdown", desc: "Which key areas are strong, and which may cause problems (income, status, documents, etc.)." },
    { title: "Plain-English explanation", desc: "What this means for your specific situation in simple terms." },
    { title: "Suggested next steps", desc: "What to fix or prepare before you spend money on professional advice." },
    { title: "Downloadable summary", desc: "A clean PDF-style summary you can save or share with a solicitor." }
  ];

  return (
    <section className="py-24 bg-navy text-white overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What you get from your pre-check</h2>
            <p className="text-lg text-slate-400 mb-12">Not just a score – a structured summary you can actually use.</p>
            
            <ul className="space-y-8">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-4 border border-slate-700/50 rounded-lg bg-slate-800/30 inline-block">
              <p className="text-xs text-slate-400 italic">
                You can take this summary to a solicitor, advisor, or keep it for your own planning.
              </p>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 relative">
            <div className="bg-white rounded-2xl p-4 shadow-2xl rotate-3 transform">
              {/* PDF Mock Visual */}
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50">
                <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-navy rounded flex items-center justify-center text-[10px] font-bold text-white">UK</div>
                    <span className="text-xs font-bold text-navy">Eligibility Report</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Date: Oct 2024</span>
                </div>
                <div className="p-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl">✓</div>
                    <div>
                      <h3 className="text-xl font-bold text-navy">Likely Eligible</h3>
                      <p className="text-xs text-slate-500">Route: Spouse Visa</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-1 bg-teal-500 rounded"></div>
                    <div className="h-1 bg-teal-500 rounded"></div>
                    <div className="h-1 bg-teal-500 rounded"></div>
                    <div className="h-1 bg-slate-200 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                  </div>
                  <div className="pt-8 flex justify-center">
                    <div className="px-6 py-2 border-2 border-navy text-navy font-bold text-xs rounded-full">Report ID: PRE-40392</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full bg-teal-500/20 blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
