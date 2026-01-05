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

type ViewState = 'landing' | 'questionnaire' | 'teaser' | 'report' | 'privacy' | 'terms';
type PricingTier = 'basic' | 'full' | 'human';

const AppContent: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedRoute, setSelectedRoute] = useState<string>('Spouse Visa');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [applicantName, setApplicantName] = useState<string>("Alex Thompson");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTier, setActiveTier] = useState<PricingTier>('basic');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleStartFreeCheck = (tierPreference?: PricingTier) => {
    if (tierPreference) setActiveTier(tierPreference);
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
    setActiveTier(tier);
    setIsUnlocked(true);
    setViewState('report');
    setIsLoadingReport(true);
    window.scrollTo(0, 0);

    setTimeout(() => {
      setIsLoadingReport(false);
    }, 2000);
  };

  const handleQuestionnaireComplete = (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers);
    const result = runAssessment(selectedRoute, collectedAnswers);
    setAssessmentResult(result);
    setViewState('teaser');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'questionnaire':
        return (
          <div className="bg-white min-h-screen">
            <Header 
              onStartCheck={handleStartFreeCheck} 
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
      case 'teaser':
        return (
          <div className="bg-slate-100 min-h-screen py-16 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-2xl text-center">
              <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 ${
                assessmentResult?.verdict === 'likely' ? 'bg-accent/10 text-accent' : 
                assessmentResult?.verdict === 'borderline' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
              }`}>
                Verdict: {assessmentResult?.verdict.toUpperCase()}
              </div>
              <h2 className="text-3xl font-black text-navy uppercase tracking-tight mb-4">
                Unlock your full report
              </h2>
              <p className="text-slate-600 font-bold mb-10 leading-relaxed">
                See your detailed risk breakdown, personalized document checklist, and exact next steps to strengthen your case.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-accent text-white py-4 rounded-xl font-black text-lg hover:bg-[#28a362] transition-all shadow-xl uppercase tracking-widest"
                >
                  Unlock Full Report (£29)
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
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
              <div>
                <h2 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">
                  {isLoadingReport ? 'Analyzing Evidence…' : 'Report Finalized'}
                </h2>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  {isLoadingReport ? 'Our engine is calculating thresholds against current UK immigration appendices.' : 'Your ClearVisa UK – Eligibility Pre-Check is ready.'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setViewState('landing')} className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-xs tracking-widest">Exit</button>
                <button disabled={isLoadingReport} onClick={triggerReportPdfDownload} className="bg-navy text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-slate-800 transition-all uppercase text-xs tracking-widest">Download PDF</button>
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

            {!isLoadingReport && activeTier === 'basic' && (
              <div className="max-w-[210mm] mx-auto mt-12 p-8 bg-white rounded-2xl border-2 border-accent shadow-xl no-print text-center">
                <h3 className="text-2xl font-black text-navy mb-2 uppercase tracking-tight">Want a stronger case?</h3>
                <p className="text-slate-600 font-bold mb-6">Upgrade to Full Pre-Check for a personalized document checklist and detailed risk breakdown.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setIsPaymentModalOpen(true)} className="bg-accent text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg hover:bg-[#28a362]">Upgrade to Full (£50)</button>
                  <button onClick={() => setViewState('landing')} className="px-8 py-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Continue without upgrading</button>
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
            <Header onStartCheck={handleStartFreeCheck} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <main>
              <Hero onStartCheck={handleStartFreeCheck} onScrollToSection={scrollToSection} />
              <TrustStrip />
              <HowItWorks />
              <WhoItsFor />
              <WhatYouGet />
              <Pricing onStartCheck={handleStartFreeCheck} />
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