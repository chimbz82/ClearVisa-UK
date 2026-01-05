
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import HowItWorks from './components/HowItWorks';
import WhoItsFor from './components/WhoItsFor';
import WhatYouGet from './components/WhatYouGet';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Legal from './components/Legal';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';
import Questionnaire from './components/Questionnaire';
import ReportTemplate from './components/ReportTemplate';
import ReportSkeleton from './components/ReportSkeleton';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import { triggerReportPdfDownload } from './utils/downloadPdf';
import { runAssessment } from './utils/assessmentEngine';
import { AssessmentResult } from './types';

type ViewState = 'landing' | 'questionnaire' | 'report' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedRoute, setSelectedRoute] = useState<string>('Spouse Visa');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [applicantName, setApplicantName] = useState<string>("Alex Thompson");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleStartCheck = () => {
    setIsPaymentModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (viewState !== 'landing') {
      setViewState('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePaymentSuccess = (route: string) => {
    setSelectedRoute(route);
    setViewState('questionnaire');
    window.scrollTo(0, 0);
  };

  const handleQuestionnaireComplete = (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers);
    setViewState('report');
    setIsLoadingReport(true);
    setShowToast(true);
    window.scrollTo(0, 0);

    const result = runAssessment(selectedRoute, collectedAnswers);
    setAssessmentResult(result);

    setTimeout(() => {
      setIsLoadingReport(false);
    }, 2800);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'questionnaire':
        return (
          <div className="bg-white min-h-screen">
            <Header 
              onStartCheck={() => {}} 
              onNavigateHome={() => setViewState('landing')} 
              onScrollToSection={() => {}}
            />
            <div className="pt-16 md:pt-20">
              <Questionnaire 
                route={selectedRoute} 
                onComplete={handleQuestionnaireComplete}
                onCancel={() => setViewState('landing')}
              />
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 sm:px-6 relative">
            {showToast && (
              <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-500">
                <div className="bg-navy text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-tight">Assessment Engine Active</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mapping Appendix Compliance...</p>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
              <div>
                <h2 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">
                  {isLoadingReport ? 'Analyzing Evidence…' : 'Report Finalized'}
                </h2>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  {isLoadingReport ? 'Our engine is calculating thresholds against current UK immigration appendices.' : 'Your ClearVisa UK – Eligibility Pre-Check is ready for review.'}
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setViewState('landing')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all uppercase text-xs tracking-widest"
                >
                  Exit
                </button>
                <button 
                  type="button"
                  disabled={isLoadingReport}
                  onClick={triggerReportPdfDownload}
                  className="flex-1 sm:flex-none bg-navy text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase text-xs tracking-widest"
                >
                  Download PDF
                </button>
              </div>
            </div>
            
            <div id="report-print-root">
              {isLoadingReport ? (
                <ReportSkeleton />
              ) : (
                <ReportTemplate 
                  applicantName={applicantName} 
                  visaRoute={selectedRoute} 
                  onDownload={triggerReportPdfDownload}
                  assessmentData={assessmentResult!}
                  answers={answers}
                />
              )}
            </div>
            
            {!isLoadingReport && (
              <div className="max-w-[210mm] mx-auto mt-12 p-8 bg-navy rounded-2xl text-white no-print shadow-2xl overflow-hidden relative">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-black mb-3 uppercase tracking-tight text-accent">Professional Review</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-semibold">
                      Your pre-check identified specific risks. Present this report to an OISC-regulated adviser to fast-track your formal legal review.
                    </p>
                  </div>
                  <button className="whitespace-nowrap bg-white text-navy px-8 py-4 rounded-xl font-black transition-all shadow-xl uppercase tracking-widest text-sm hover:bg-accent hover:text-white">
                    Find OISC Solicitor
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'privacy':
        return <PrivacyPolicy onBack={() => setViewState('landing')} />;
      case 'terms':
        return <TermsOfUse onBack={() => setViewState('landing')} />;
      case 'landing':
      default:
        return (
          <>
            <Header 
              onStartCheck={handleStartCheck} 
              onNavigateHome={() => setViewState('landing')} 
              onScrollToSection={scrollToSection}
            />
            <main>
              <Hero onStartCheck={handleStartCheck} onScrollToSection={scrollToSection} />
              <TrustStrip />
              <HowItWorks />
              <WhoItsFor />
              <WhatYouGet />
              <Pricing onStartCheck={handleStartCheck} />
              <FAQ />
              <Legal />
            </main>
            <Footer 
              onPrivacyClick={() => { setViewState('privacy'); window.scrollTo(0, 0); }} 
              onTermsClick={() => { setViewState('terms'); window.scrollTo(0, 0); }} 
              onScrollToSection={scrollToSection}
            />
          </>
        );
    }
  };

  return (
    <div id="top" className="min-h-screen bg-off-white selection:bg-accent/20 selection:text-navy">
      {renderContent()}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onPaymentComplete={handlePaymentSuccess}
      />
    </div>
  );
};

export default App;
