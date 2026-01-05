import React, { useState } from 'react';
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
    // If we're already halfway through, don't clear answers
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
    // If they were buying the human upsell
    if (activeTier === 'human') {
      setViewState('report');
      setIsLoadingReport(true);
      setTimeout(() => setIsLoadingReport(false), 2000);
    } else {
      // Standard flow: proceed to full assessment
      setViewState('questionnaire');
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
            <div className="pt-24 max-w-[1040px] mx-auto px-4">
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
            <div className="max-w-[640px] w-full bg-white rounded-[32px] p-10 shadow-xl text-center">
              <div className="mb-6 flex justify-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-inner ${
                  assessmentResult?.verdict === 'likely' ? 'bg-emerald-100 text-emerald-600' :
                  assessmentResult?.verdict === 'borderline' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {assessmentResult?.verdict === 'likely' ? '✓' : assessmentResult?.verdict === 'borderline' ? '!' : '×'}
                </div>
              </div>
              <h2 className="mb-4">Preliminary Verdict: {assessmentResult?.verdict === 'likely' ? 'Likely Eligible' : assessmentResult?.verdict === 'borderline' ? 'Borderline' : 'High Risk'}</h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                Based on your initial answers, your status is <strong>{assessmentResult?.verdict.toUpperCase()}</strong>. 
                Unlock the full assessment to see your detailed risk breakdown, document checklist, and professional report.
              </p>
              <Button onClick={() => setViewState('paywall')} variant="primary" size="lg" fullWidth>
                Unlock Full Assessment
              </Button>
            </div>
          </div>
        );
      case 'paywall':
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-[640px] w-full bg-white rounded-[32px] p-10 shadow-xl border border-slate-100">
              <h2 className="mb-4 text-center">Unlock your full assessment</h2>
              <p className="text-slate-600 mb-8 text-center text-lg">
                Get the complete professional audit of your UK visa eligibility.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <ul className="space-y-3 text-sm text-slate-600 font-bold">
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Complete 25-30 question audit</li>
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Personalized document checklist</li>
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Route-specific compliance check</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <ul className="space-y-3 text-sm text-slate-600 font-bold">
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Detailed risk breakdown</li>
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Step-by-step next actions</li>
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Downloadable PDF Report</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border border-emerald-100">
                <h4 className="text-emerald-800 font-bold mb-1 flex items-center gap-2">
                  <span className="text-xl">🛡️</span> Clear Outcome Guarantee
                </h4>
                <p className="text-emerald-700 text-sm font-medium">
                  If your answers clearly show you are ineligible under current public rules, we refund your fee in full.
                </p>
              </div>

              <div className="text-center mb-8">
                <p className="text-[14px] uppercase tracking-widest text-slate-400 font-black mb-1 leading-none">Access Fee</p>
                <p className="text-5xl font-black text-navy leading-none">£79</p>
              </div>

              <Button onClick={() => { setActiveTier('full'); setIsPaymentModalOpen(true); }} variant="primary" size="lg" fullWidth>
                Pay £79 & Continue Assessment
              </Button>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mb-4">Refund Exclusions</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[9px] text-slate-400 font-bold uppercase tracking-tight list-disc pl-4">
                  <li>No refund for change of mind</li>
                  <li>No refund after report delivery</li>
                  <li>No refund if outcome differs from hope</li>
                  <li>No refund for future rule changes</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 sm:px-6 relative">
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 bg-white rounded-[32px] shadow-xl border border-slate-100">
              <div className="text-center sm:text-left">
                <h3 className="mb-1 uppercase tracking-tight">Full Report Generated</h3>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">Based on your detailed 25+ question assessment.</p>
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
      case 'landing':
      default:
        return (
          <>
            <Header onStartCheck={handleStartCheck} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <main className="space-y-20 pb-20">
              <Hero onStartCheck={handleStartCheck} onScrollToSection={scrollToSection} />
              <TrustStrip />
              <HowItWorks />
              <WhoItsFor />
              <WhatYouGet />
              <Pricing onStartCheck={(tier) => {
                if (tier === 'basic') {
                  // We treat basic as the funnel entry now
                  handleStartCheck();
                } else {
                  setActiveTier(tier as PricingTier);
                  handleStartCheck();
                }
              }} />
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
    <div className="min-h-screen bg-off-white selection:bg-accent/20">
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