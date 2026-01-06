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
import { runAssessment } from './utils/assessmentEngine';
import { AssessmentResult } from './types';
import { LanguageProvider } from './context/LanguageContext';
import Button from './components/Button';
import { QUESTIONS } from './data/questions';

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
      'Key risk flag indicators',
      'Plain-English explanation',
      'Downloadable summary (short PDF)'
    ]
  },
  {
    id: 'full',
    name: 'Professional Audit + Checklist',
    priceGBP: 79,
    stripePriceId: 'price_full_79',
    description: 'Full 25–30 question audit and professional PDF report.',
    includedFeatures: [
      'Everything in Basic',
      'Personalised document checklist',
      'Route-specific compliance checks',
      'Detailed risk factor breakdown',
      'Step-by-step next-actions plan',
      'Full detailed PDF report'
    ]
  },
  {
    id: 'humanReview',
    name: 'Professional Plus',
    priceGBP: 99,
    stripePriceId: 'price_pro_99',
    description: 'Enhanced professional audit with additional insights.',
    includedFeatures: [
      'Everything in Professional Audit',
      'Extended questionnaire with narrative fields',
      'Deeper relationship/career analysis',
      'Additional compliance review layers',
      'Priority support access'
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

  const stage1Ids = ['nationality', 'current_location', 'immigration_status', 'visa_route', 'income_band', 'previous_refusals'];

  const getVisibleQuestions = () => {
    return QUESTIONS.filter(q => {
      const route = answers['visa_route'] === 'spouse' ? 'spouse' : 
                    answers['visa_route'] === 'skilled' ? 'skilled' : 'any';
      
      // ✅ CORRECT: Tier now properly set based on payment status
      let tier = isPaid ? 
        (selectedPlan === 'humanReview' ? 'human' : 
         (selectedPlan === 'full' ? 'full' : 'basic')) 
        : 'basic';
      
      if (!isPaid) {
        return stage1Ids.includes(q.id) && q.showIf({ tier: 'basic', route, answers });
      }
      
      if (selectedPlan === 'basic') {
        return stage1Ids.includes(q.id) && q.showIf({ tier: 'basic', route, answers });
      }

      // ✅ CORRECT: Pro users get 'human' tier, Professional get 'full'
      return q.showIf({ tier: selectedPlan === 'humanReview' ? 'human' : 'full', route, answers });
    });
  };

  const handleStartCheck = (planId?: PlanId) => {
    setAnswers({});
    setIsPaid(false);
    setSelectedPlan(planId || null);
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
            <Header onStartCheck={() => handleStartCheck()} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <div className="pt-24 pb-12 app-container">
              <Questionnaire 
                onComplete={isPaid ? handleFullAssessmentComplete : handleQuickCheckComplete} 
                onCancel={() => setViewState('landing')} 
                isPaid={isPaid}
                initialAnswers={answers}
                selectedPlan={selectedPlan || 'full'}
                visibleQuestionsList={getVisibleQuestions()}
              />
            </div>
          </div>
        );
      case 'quickVerdict':
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50 text-left">
            <div className="max-w-[640px] w-full app-card border-t-8 border-accent">
              <div className="mb-8 text-center">
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-inner mb-6 ${
                  assessmentResult?.verdict === 'likely' ? 'bg-emerald-100 text-emerald-600' :
                  assessmentResult?.verdict === 'borderline' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {assessmentResult?.verdict === 'likely' ? '✓' : assessmentResult?.verdict === 'borderline' ? '!' : '×'}
                </div>
                <h2 className="text-h2 mb-2 text-navy">Eligibility Preview</h2>
                <p className="text-body text-slate-500 font-bold uppercase tracking-tight">Status: <span className={assessmentResult?.verdict === 'likely' ? 'text-emerald-600' : assessmentResult?.verdict === 'borderline' ? 'text-amber-600' : 'text-rose-600'}>{assessmentResult?.verdict?.toUpperCase()}</span></p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                <p className="text-small text-slate-600 leading-relaxed font-medium">
                  Based on your initial answers, you meet the core requirements for the {answers['visa_route']?.toUpperCase()} route. To see your full risk analysis, requirement matrix, and document checklist, unlock a full report below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Button onClick={() => { setSelectedPlan('basic'); setViewState('paywall'); }} variant="outline" fullWidth>Basic Summary (£29)</Button>
                 <Button onClick={() => { setSelectedPlan('full'); setViewState('paywall'); }} fullWidth>Full Audit Report (£79)</Button>
              </div>
              
              <button onClick={() => setViewState('landing')} className="mt-8 w-full text-center text-caption text-slate-400 font-bold hover:text-navy uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        );
      case 'paywall':
        const plan = PLANS.find(p => p.id === (selectedPlan || 'full'))!;
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50 text-left">
            <div className="max-w-[600px] w-full app-card border border-slate-200">
              <div className="text-center mb-8">
                <span className="text-caption text-accent mb-2 block font-black uppercase tracking-widest">{plan.name}</span>
                <h2 className="text-h2 mb-2 text-navy">Unlock your assessment</h2>
                <p className="text-body text-slate-600 font-medium">{plan.description}</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                <ul className="space-y-3">
                  {plan.includedFeatures.map((f, i) => (
                    <li key={i} className="flex gap-3 items-start text-small font-bold text-slate-700 uppercase tracking-tight">
                      <span className="text-accent text-lg">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button onClick={() => setIsPaymentModalOpen(true)} variant="primary" size="lg" fullWidth>
                Pay £{plan.priceGBP} & Continue
              </Button>
              
              <button onClick={() => setViewState('landing')} className="mt-6 w-full text-center text-caption text-slate-400 hover:text-navy font-bold uppercase tracking-widest">
                Go back
              </button>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 relative">
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-6 app-card shadow-xl">
              <div className="text-left">
                <h3 className="text-h3 mb-1 text-navy uppercase tracking-tighter">Your Audit is Ready</h3>
                <p className="text-small text-slate-500 font-bold uppercase tracking-widest">Report Level: {selectedPlan?.toUpperCase()}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setViewState('landing')} variant="outline" size="sm">Exit</Button>
                <Button onClick={() => window.print()} variant="navy" size="sm">Download PDF</Button>
              </div>
            </div>
            <div id="report-print-root">
              {isLoadingReport ? <ReportSkeleton /> : (
                <ReportTemplate 
                  visaRoute={answers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa'} 
                  assessmentData={assessmentResult!}
                  answers={answers}
                  tier={selectedPlan || 'full'}
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
            <Header onStartCheck={() => handleStartCheck()} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <main>
              <Hero onStartCheck={() => handleStartCheck()} onScrollToSection={scrollToSection} />
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
                handleStartCheck(planId as PlanId);
              }} />
              <div className="bg-white">
                <div className="app-container section-py">
                  <FAQ />
                </div>
              </div>
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
