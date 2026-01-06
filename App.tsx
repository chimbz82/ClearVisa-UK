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

export type PlanId = 'basic' | 'full' | 'humanReview';

export interface PlanConfig {
  id: PlanId;
  name: string;
  priceGBP: number;
  stripePriceId: string;
  description: string;
  includedFeatures: string[];
}

export const PLANS: PlanConfig[] = [
  {
    id: 'basic',
    name: 'Basic Pre-Check',
    priceGBP: 29,
    stripePriceId: 'price_basic_29',
    description: 'A quick eligibility verdict and high-level risk pointers.',
    includedFeatures: [
      'Automated eligibility verdict',
      'High-level risk heatmap',
      'Plain-English result explanation',
      'Downloadable PDF summary'
    ]
  },
  {
    id: 'full',
    name: 'Professional Audit + Checklist',
    priceGBP: 79,
    stripePriceId: 'price_full_79',
    description: 'A comprehensive audit with detailed compliance checks and a tailored checklist.',
    includedFeatures: [
      'Everything in Basic',
      'Per-requirement pass/fail table',
      'Personalised document checklist',
      'Detailed risk factor breakdown',
      'Step-by-step next-actions plan',
      'Full professional PDF report'
    ]
  },
  {
    id: 'humanReview',
    name: 'Pro Analysis Add-On',
    priceGBP: 149,
    stripePriceId: 'price_pro_149',
    description: 'Advanced automated deep-dive to identify hidden gaps in complex evidence.',
    includedFeatures: [
      'Everything in Professional Audit',
      'Automated evidence gap analysis',
      'Scenario-based compliance Q&A',
      'Advanced case improvement suggestions',
      'Common refusal risk identifiers'
    ]
  }
];

export type ViewState = 'landing' | 'questionnaire' | 'quickVerdict' | 'paywall' | 'report' | 'privacy' | 'terms';

const AppContent: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleStartCheck = () => {
    if (viewState === 'landing') {
      setAnswers({});
      setIsPaid(false);
      setSelectedPlan(null);
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

  const handlePaymentSuccess = (route: string, tier: string) => {
    setIsPaid(true);
    setIsPaymentModalOpen(false);
    
    if (selectedPlan === 'basic') {
      const routeKey = answers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
      const result = runAssessment(routeKey, answers);
      setAssessmentResult(result);
      setViewState('report');
      setIsLoadingReport(true);
      setTimeout(() => setIsLoadingReport(false), 2000);
    } else {
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
            <div className="pt-24 pb-12 app-container">
              <Questionnaire 
                onComplete={isPaid ? handleFullAssessmentComplete : handleQuickCheckComplete} 
                onCancel={() => setViewState('landing')} 
                isPaid={isPaid}
                initialAnswers={answers}
                selectedPlan={selectedPlan || 'full'}
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
              <h2 className="text-h2 mb-4">Initial Result: <span className="uppercase font-black">{assessmentResult?.verdict === 'likely' ? 'Likely Eligible' : assessmentResult?.verdict === 'borderline' ? 'Borderline' : 'High Risk'}</span></h2>
              <p className="text-body text-slate-600 mb-10 font-bold uppercase tracking-tight">
                Screening completed. Choose a plan below to unlock your detailed report and personalized checklist.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Button onClick={() => { setSelectedPlan('basic'); setViewState('paywall'); }} variant="outline" fullWidth>Unlock Basic (£29)</Button>
                 <Button onClick={() => { setSelectedPlan('full'); setViewState('paywall'); }} fullWidth>Professional Audit (£79)</Button>
              </div>
              <button onClick={() => setViewState('landing')} className="mt-8 text-caption text-slate-400 font-bold hover:text-navy uppercase tracking-widest">
                Return home
              </button>
            </div>
          </div>
        );
      case 'paywall':
        const plan = PLANS.find(p => p.id === (selectedPlan || 'full'))!;
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-[700px] w-full app-card border border-slate-200">
              <div className="text-center mb-8">
                <span className="text-caption text-accent mb-2 block font-black uppercase tracking-widest">{plan.name}</span>
                <h2 className="text-h2 mb-4 text-navy">Unlock your assessment</h2>
                <p className="text-body text-slate-600 font-medium">{plan.description}</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                <ul className="space-y-3">
                  {plan.includedFeatures.map((f, i) => (
                    <li key={i} className="flex gap-3 items-start text-small font-black text-slate-700 uppercase tracking-tight">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl mb-10 border border-emerald-100">
                <h4 className="text-body font-black text-emerald-800 mb-1 flex items-center gap-2 uppercase tracking-tight">
                  🛡️ Clear Outcome Guarantee
                </h4>
                <p className="text-small text-emerald-700 font-medium">
                  If your answers clearly show you are ineligible under current public rules, we refund your fee in full.
                </p>
              </div>

              <Button onClick={() => setIsPaymentModalOpen(true)} variant="primary" size="lg" fullWidth>
                Pay £{plan.priceGBP} & Continue
              </Button>
              
              <button onClick={() => setViewState('landing')} className="mt-6 w-full text-center text-caption text-slate-400 hover:text-navy font-bold uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 relative">
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-6 app-card shadow-2xl">
              <div>
                <h3 className="text-h3 mb-1 text-navy uppercase tracking-tighter">Assessment Ready</h3>
                <p className="text-small text-slate-500 font-black uppercase tracking-widest">Tier: {selectedPlan === 'basic' ? 'Basic' : (selectedPlan === 'humanReview' ? 'Pro' : 'Professional')}</p>
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
                  tier={selectedPlan || 'full'}
                  onUpgrade={() => { setSelectedPlan('humanReview'); setIsPaymentModalOpen(true); }}
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
              <Pricing onStartCheck={(planId) => {
                setSelectedPlan(planId as PlanId);
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
        selectedTier={selectedPlan || 'full'}
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
