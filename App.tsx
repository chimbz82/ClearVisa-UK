
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
import PartnerSection from './components/PartnerSection';
import { triggerReportPdfDownload } from './utils/downloadPdf';
import { runAssessment } from './utils/assessmentEngine';
import { AssessmentResult } from './types';
import { LanguageProvider } from './context/LanguageContext';

export type ViewState = 'landing' | 'questionnaire' | 'teaser' | 'report' | 'privacy' | 'terms';
export type PricingTier = 'basic' | 'full' | 'human';

const AppContent: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedRoute, setSelectedRoute] = useState<string>('Spouse Visa');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [applicantName, setApplicantName] = useState<string>("Alex Thompson");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [activeTier, setActiveTier] = useState<PricingTier>('basic');

  const handleStartCheck = (tierPreference: PricingTier = 'basic') => {
    setActiveTier(tierPreference);
    setViewState('questionnaire');
    window.scrollTo(0, 0);
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

  const handlePaymentSuccess = (route: string, tier: PricingTier) => {
    setViewState('report');
    setIsLoadingReport(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsLoadingReport(false);
    }, 2000);
  };

  const handleQuestionnaireComplete = (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers);
    const routeInAnswer = collectedAnswers['visa_route'];
    const routeLabel = routeInAnswer === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
    setSelectedRoute(routeLabel);
    
    const result = runAssessment(routeLabel, collectedAnswers);
    setAssessmentResult(result);
    setViewState('teaser');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'questionnaire':
        return (
          <div className="bg-white min-h-screen">
            <Header activeTier={activeTier} onStartCheck={() => handleStartCheck('basic')} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <div className="pt-24">
              <Questionnaire route={selectedRoute} onComplete={handleQuestionnaireComplete} onCancel={() => setViewState('landing')} activeTier={activeTier} />
            </div>
          </div>
        );
      case 'teaser':
        const tierPrices = { basic: '£29', full: '£79', human: '£149' };
        return (
          <div className="bg-slate-100 min-h-screen py-16 px-4 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-[32px] p-10 md:p-12 shadow-2xl text-center">
              <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 ${
                assessmentResult?.verdict === 'likely' ? 'bg-accent/10 text-accent' : 
                assessmentResult?.verdict === 'borderline' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
              }`}>
                Verdict: {assessmentResult?.verdict.toUpperCase()}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-navy uppercase tracking-tight mb-4">
                Unlock your full report
              </h2>
              <p className="text-slate-600 font-bold mb-10 leading-relaxed text-lg">
                Your preliminary analysis is ready. Pay {tierPrices[activeTier]} to unlock your professional risk breakdown, 
                {activeTier !== 'basic' && " personalized document audit,"} and exact next steps.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-accent text-white py-5 rounded-2xl font-black text-xl hover:bg-[#28a362] transition-all shadow-xl uppercase tracking-widest"
                >
                  Pay {tierPrices[activeTier]} & Generate Report
                </button>
                <button 
                  onClick={() => setViewState('landing')}
                  className="w-full py-4 text-slate-400 font-bold hover:text-navy uppercase tracking-widest text-xs"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 sm:px-6 relative">
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 bg-white rounded-[32px] shadow-xl border border-slate-100">
              <div>
                <h2 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">
                  {isLoadingReport ? 'Analyzing Evidence…' : 'Report Finalized'}
                </h2>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  {isLoadingReport ? 'Our engine is calculating thresholds against current UK immigration rules.' : 'Your ClearVisa UK – Eligibility Pre-Check is ready.'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setViewState('landing')} className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-50">Exit</button>
                <button disabled={isLoadingReport} onClick={triggerReportPdfDownload} className="bg-navy text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-slate-800 transition-all uppercase text-xs tracking-widest disabled:opacity-30">Download PDF</button>
              </div>
            </div>
            <div id="report-print-root">
              {isLoadingReport ? <ReportSkeleton /> : (
                <ReportTemplate 
                  applicantName={applicantName} 
                  visaRoute={selectedRoute} 
                  assessmentData={assessmentResult!}
                  answers={answers}
                  tier={activeTier}
                />
              )}
            </div>
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
            <Header onStartCheck={() => handleStartCheck('basic')} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <main>
              <Hero onStartCheck={() => handleStartCheck('basic')} onScrollToSection={scrollToSection} />
              <TrustStrip />
              <HowItWorks />
              <WhoItsFor />
              <WhatYouGet />
              <Pricing onStartCheck={handleStartCheck} />
              <FAQ />
              <PartnerSection />
              <Legal />
            </main>
            <Footer onPrivacyClick={() => setViewState('privacy')} onTermsClick={() => setViewState('terms')} onScrollToSection={scrollToSection} />
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
        onPaymentComplete={(route, tier) => handlePaymentSuccess(route, tier as PricingTier)}
        selectedTier={activeTier}
      />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
