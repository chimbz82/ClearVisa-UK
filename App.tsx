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
    description: 'Quick automated eligibility verdict and summary.',
    includedFeatures: [
      'Automated eligibility verdict',
      'Summary of strong vs weak areas',
      'Risk flag indicators',
      'Downloadable summary (PDF)'
    ]
  },
  {
    id: 'full',
    name: 'Professional Assessment',
    priceGBP: 79,
    stripePriceId: 'price_full_79',
    description: 'Full 25–30 question audit and PDF report.',
    includedFeatures: [
      'Everything in Basic',
      'Personalised document checklist',
      'Detailed risk factor breakdown',
      'Step-by-step next-actions plan',
      'Downloadable PDF report'
    ]
  },
  {
    id: 'humanReview',
    name: 'Pro Analysis Add-On',
    priceGBP: 149,
    stripePriceId: 'price_pro_149',
    description: 'Extra deep-dive analysis on top of the professional report.',
    includedFeatures: [
      'Everything in Professional Assessment',
      'Enhanced evidence quality review (automated)',
      'Additional risk commentary section',
      'Priority engine processing',
      'Smart scenario Q&A inside report'
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
              <h2 className="heading-m mb-4">Initial Result: <span className="uppercase">{assessmentResult?.verdict === 'unlikely' ? 'High Risk' : (assessmentResult?.verdict === 'likely' ? 'Likely Eligible' : 'Borderline')}</span></h2>
              <p className="body-m text-slate-600 mb-10">
                Screening completed. Choose a plan to unlock your detailed report and personalized checklist.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Button onClick={() => { setSelectedPlan('basic'); setViewState('paywall'); }} variant="outline">Unlock Basic (£29)</Button>
                 <Button onClick={() => { setSelectedPlan('full'); setViewState('paywall'); }}>Professional Audit (£79)</Button>
              </div>
            </div>
          </div>
        );
      case 'paywall':
        const plan = PLANS.find(p => p.id === (selectedPlan || 'full'))!;
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50">
            <div className="max-w-[700px] w-full app-card border border-slate-200">
              <div className="text-center mb-8">
                <span className="caption text-accent mb-2 block uppercase font-bold">{plan.name}</span>
                <h2 className="heading-l mb-4">Unlock your full report</h2>
                <p className="body-m text-slate-600">{plan.description}</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                <ul className="space-y-3">
                  {plan.includedFeatures.map((f, i) => (
                    <li key={i} className="flex gap-2 items-start body-s font-semibold text-slate-700">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl mb-10 border border-emerald-100">
                <h4 className="body-m font-bold text-emerald-800 mb-1 flex items-center gap-2">
                  🛡️ Clear Outcome Guarantee
                </h4>
                <p className="body-s text-emerald-700 leading-relaxed">
                  If your answers show you are clearly ineligible, we refund your fee in full. We do not refund for change of mind or subjective dissatisfaction.
                </p>
              </div>

              <Button onClick={() => setIsPaymentModalOpen(true)} variant="primary" size="lg" fullWidth>
                Pay £{plan.priceGBP} & Continue
              </Button>
              
              <button onClick={() => setViewState('landing')} className="mt-6 w-full text-center caption text-slate-400 hover:text-navy font-bold">
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
                <h3 className="heading-s mb-1">Assessment Ready</h3>
                <p className="body-s text-slate-500 font-medium">Your {selectedPlan === 'basic' ? 'Basic' : 'Full'} Audit is ready.</p>
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