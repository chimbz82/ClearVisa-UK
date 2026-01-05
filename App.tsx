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
import Button from './components/Button';

export type ViewState = 'landing' | 'questionnaire' | 'quickVerdict' | 'paywall' | 'report' | 'privacy' | 'terms';
export type PricingTier = 'full' | 'human';

const AppContent: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [activeTier, setActiveTier] = useState<PricingTier>('full'); 
  const [isPaid, setIsPaid] = useState(false);

  const handleStartCheck = () => {
    if (viewState === 'landing') {
      setAnswers({});
      setIsPaid(false);
    }
    setViewState('questionnaire');
    window.scrollTo(0, 0);
  };

  const scrollToSection = (id: string) => {
    if (viewState !== 'landing') {
      setViewState('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsPaymentModalOpen(false);
    // If buying from paywall, return to questionnaire to finish full assessment
    if (viewState === 'paywall') {
      setViewState('questionnaire');
    } else if (viewState === 'report') {
      // If buying Human Review upsell from report page
      setViewState('report');
      setIsLoadingReport(true);
      setTimeout(() => setIsLoadingReport(false), 2000);
    }
    window.scrollTo(0, 0);
  };

  const handleQuickCheckComplete = (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers);
    const routeKey = collectedAnswers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
    const result = runAssessment(routeKey, collectedAnswers);
    setAssessmentResult(result);
    setViewState('quickVerdict');
    window.scrollTo(0, 0);
  };

  const handleFullAssessmentComplete = (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers);
    const routeKey = collectedAnswers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
    const result = runAssessment(routeKey, collectedAnswers);
    setAssessmentResult(result);
    setViewState('report');
    setIsLoadingReport(true);
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoadingReport(false), 2000);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'questionnaire':
        return (
          <div className="bg-white min-h-screen">
            <Header onStartCheck={handleStartCheck} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <div className="pt-24 pb-12 app-container">
              <Questionnaire 
                onComplete={isPaid ? handleFullAssessmentComplete : handleQuickCheckComplete} 
                onCancel={() => setViewState('landing')} 
                isPaid={isPaid}
                initialAnswers={answers}
              />
            </div>
          </div>
        );
      case 'quickVerdict':
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-[640px] w-full app-card text-center border-t-8 border-accent">
              <div className="mb-6 flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-inner ${
                  assessmentResult?.verdict === 'likely' ? 'bg-emerald-100 text-emerald-600' :
                  assessmentResult?.verdict === 'borderline' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {assessmentResult?.verdict === 'likely' ? '✓' : assessmentResult?.verdict === 'borderline' ? '!' : '×'}
                </div>
              </div>
              <h2 className="text-h2 mb-4">Preliminary Status: <span className="uppercase">{assessmentResult?.verdict === 'likely' ? 'Likely Eligible' : assessmentResult?.verdict === 'borderline' ? 'Borderline' : 'High Risk'}</span></h2>
              <p className="text-body text-secondary mb-10">
                Your initial profile has been screened. To see the specific risk factors, personalized document checklist, and professional report, unlock the full assessment.
              </p>
              <Button onClick={() => setViewState('paywall')} variant="primary" size="lg" fullWidth>
                Continue to Full Assessment
              </Button>
            </div>
          </div>
        );
      case 'paywall':
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-[700px] w-full app-card border border-slate-200">
              <h2 className="text-h2 mb-4 text-center">Unlock your professional audit</h2>
              <p className="text-body text-secondary mb-8 text-center">
                Get the complete breakdown and document checklist used by immigration professionals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-caption mb-4 text-slate-500">Includes</h3>
                  <ul className="space-y-3 text-body-sm font-semibold text-slate-700">
                    <li className="flex gap-2 items-start"><span className="text-accent">✓</span> 30-Question Assessment</li>
                    <li className="flex gap-2 items-start"><span className="text-accent">✓</span> Document Checklist</li>
                    <li className="flex gap-2 items-start"><span className="text-accent">✓</span> Risk Heatmap</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-caption mb-4 text-slate-500">Deliverables</h3>
                  <ul className="space-y-3 text-body-sm font-semibold text-slate-700">
                    <li className="flex gap-2 items-start"><span className="text-accent">✓</span> Professional PDF Report</li>
                    <li className="flex gap-2 items-start"><span className="text-accent">✓</span> Step-by-Step Next Actions</li>
                    <li className="flex gap-2 items-start"><span className="text-accent">✓</span> Expert Gaps Identification</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl mb-10 border border-emerald-100">
                <h4 className="text-body font-bold text-emerald-800 mb-1 flex items-center gap-2">
                  🛡️ Clear Outcome Guarantee
                </h4>
                <p className="text-body-sm text-emerald-700">
                  If your answers clearly show you are ineligible under current public rules, we refund your fee in full.
                </p>
              </div>

              <div className="text-center mb-8">
                <p className="text-caption text-slate-400 mb-1">One-Time Access Fee</p>
                <p className="text-display text-navy">£79</p>
              </div>

              <Button onClick={() => { setActiveTier('full'); setIsPaymentModalOpen(true); }} variant="primary" size="lg" fullWidth>
                Pay £79 & Finish Assessment
              </Button>
              
              <button onClick={() => setViewState('landing')} className="mt-6 w-full text-center text-caption text-slate-400 hover:text-navy">
                Cancel and return to home
              </button>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 relative">
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-6 app-card">
              <div>
                <h3 className="text-h3 mb-1">Assessment Ready</h3>
                <p className="text-body-sm text-secondary font-medium">Your Full Eligibility Audit has been finalized.</p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setViewState('landing')} variant="outline" size="sm">Exit</Button>
                <Button onClick={triggerReportPdfDownload} variant="navy" size="sm">Download PDF</Button>
              </div>
            </div>
            <div id="report-print-root">
              {isLoadingReport ? <ReportSkeleton /> : (
                <ReportTemplate 
                  visaRoute={answers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa'} 
                  assessmentData={assessmentResult!}
                  answers={answers}
                  tier={activeTier}
                  onUpgrade={() => { setActiveTier('human'); setIsPaymentModalOpen(true); }}
                />
              )}
            </div>
          </div>
        );
      case 'privacy': return <PrivacyPolicy onBack={() => setViewState('landing')} />;
      case 'terms': return <TermsOfUse onBack={() => setViewState('landing')} />;
      default:
        return (
          <div className="no-print">
            <Header onStartCheck={handleStartCheck} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <main>
              <Hero onStartCheck={handleStartCheck} onScrollToSection={scrollToSection} />
              <TrustStrip />
              <div className="app-container section-py">
                <HowItWorks />
              </div>
              <div className="bg-white border-y border-slate-100">
                <div className="app-container section-py">
                  <WhoItsFor />
                </div>
              </div>
              <div className="app-container section-py">
                <WhatYouGet />
              </div>
              <Pricing onStartCheck={(tier) => {
                setActiveTier(tier as PricingTier);
                handleStartCheck();
              }} />
              <div className="bg-white">
                <div className="app-container section-py">
                  <FAQ />
                </div>
              </div>
              <PartnerSection />
              <div className="app-container section-py">
                <Legal />
              </div>
            </main>
            <Footer onPrivacyClick={() => setViewState('privacy')} onTermsClick={() => setViewState('terms')} onScrollToSection={scrollToSection} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onPaymentComplete={handlePaymentSuccess}
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