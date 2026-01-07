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
import RefundPolicy from './components/RefundPolicy';
import AnalysisLoader from './components/AnalysisLoader';
import UpgradePricingScreen from './components/UpgradePricingScreen';
import { runAssessment } from './utils/assessmentEngine';
import { AssessmentResult, QuestionConfig } from './types';
import { LanguageProvider } from './context/LanguageContext';
import Button from './components/Button';
import { QUESTIONS } from './data/questions';
import { triggerReportPdfDownload } from './utils/downloadPdf';

export type PlanId = 'basic' | 'full' | 'pro_plus';

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
    description: 'Quick automated eligibility verdict and audit summary.',
    includedFeatures: [
      'Eligibility likelihood verdict',
      'Traffic-light risk summary',
      'Key refusing risk flags',
      'Plain-English explanation',
      'Downloadable summary (short PDF)',
      'List of all questions answered'
    ]
  },
  {
    id: 'full',
    name: 'Professional Audit',
    priceGBP: 79,
    stripePriceId: 'price_full_79',
    description: 'Full audit and professional PDF report for straightforward cases.',
    includedFeatures: [
      'Everything in Basic Pre-Check',
      'Personalised document checklist',
      'Route-specific compliance scoring',
      'Gap analysis of missing evidence',
      'Detailed risk factor breakdown',
      'Full detailed PDF report'
    ]
  },
  {
    id: 'pro_plus',
    name: 'Professional Plus',
    priceGBP: 99,
    stripePriceId: 'price_pro_99',
    description: 'Ideal for complex histories and borderline cases.',
    includedFeatures: [
      'Everything in Professional Audit',
      'Solicitor-style action plan',
      'Priority risk remediation guidance',
      'Specific evidence strengthening steps',
      'Sample evidence templates recommended'
    ]
  }
];

export type ViewState = 'landing' | 'questionnaire' | 'analyzing' | 'upgradePricing' | 'paywall' | 'report' | 'privacy' | 'terms' | 'refunds';

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [paidPlan, setPaidPlan] = useState<PlanId | null>(null);

  const handleStartCheck = (planId?: PlanId) => {
    if (planId) {
      setSelectedPlan(planId);
      setIsPaymentModalOpen(true);
    } else {
      setViewState('questionnaire');
    }
  };

  const handlePaymentComplete = (route: string, tier: string) => {
    const planId = tier as PlanId;
    setPaidPlan(planId);
    setIsPaymentModalOpen(false);
    if (assessmentResult) {
      setViewState('report');
    } else {
      setViewState('questionnaire');
    }
  };

  const handleQuestionnaireComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setViewState('analyzing');
    
    setTimeout(() => {
      const result = runAssessment(finalAnswers.visa_route || 'spouse', finalAnswers);
      setAssessmentResult(result);
      if (!paidPlan || paidPlan === 'basic') {
        setViewState('upgradePricing');
      } else {
        setViewState('report');
      }
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleQuestions = QUESTIONS.filter(q => q.showIf({ 
    tier: paidPlan || 'basic', 
    route: answers.visa_route || 'spouse', 
    answers 
  }));

  const renderView = () => {
    switch (viewState) {
      case 'landing':
        return (
          <>
            <Hero onStartCheck={() => handleStartCheck()} onScrollToSection={scrollToSection} />
            <TrustStrip />
            <HowItWorks />
            <WhoItsFor />
            <WhatYouGet />
            <Pricing onStartCheck={handleStartCheck} onNavigateLegal={(v) => setViewState(v)} />
            <FAQ />
            <Legal onNavigateLegal={(v) => setViewState(v)} />
          </>
        );
      case 'questionnaire':
        return (
          <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
            <Questionnaire 
              onComplete={handleQuestionnaireComplete}
              onCancel={() => setViewState('landing')}
              isPaid={!!paidPlan && paidPlan !== 'basic'}
              selectedPlan={paidPlan || 'basic'}
              visibleQuestionsList={visibleQuestions}
              initialAnswers={answers}
            />
          </div>
        );
      case 'analyzing':
        return <AnalysisLoader />;
      case 'upgradePricing':
        return assessmentResult ? (
          <UpgradePricingScreen 
            assessmentResult={assessmentResult}
            onSelectPlan={(planId) => {
              setSelectedPlan(planId);
              setIsPaymentModalOpen(true);
            }}
            onViewFree={() => {
              setPaidPlan('basic');
              setViewState('report');
            }}
            onNavigateLegal={(v) => setViewState(v)}
            onGoBack={() => setViewState('questionnaire')}
          />
        ) : null;
      case 'report':
        return assessmentResult ? (
          <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen">
             <div className="max-w-[210mm] mx-auto space-y-8 no-print">
               <div className="flex justify-between items-center no-print mb-8">
                 <Button variant="outline" onClick={() => setViewState('landing')}>Back to Home</Button>
                 <Button onClick={triggerReportPdfDownload} variant="navy" className="uppercase font-black tracking-widest">Download PDF</Button>
               </div>
             </div>
             <div className="mt-8">
               <ReportTemplate 
                visaRoute={answers.visa_route === 'skilled' ? 'Skilled Worker' : 'Spouse Visa'}
                assessmentData={assessmentResult}
                answers={answers}
                tier={paidPlan || 'basic'}
                paidPlan={paidPlan}
                visibleQuestionsList={visibleQuestions}
              />
             </div>
          </div>
        ) : null;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setViewState('landing')} />;
      case 'terms':
        return <TermsOfUse onBack={() => setViewState('landing')} />;
      case 'refunds':
        return <RefundPolicy onBack={() => setViewState('landing')} />;
      default:
        return null;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        {viewState === 'landing' && (
          <Header 
            onStartCheck={() => handleStartCheck()} 
            onNavigateHome={() => setViewState('landing')}
            onScrollToSection={scrollToSection}
          />
        )}
        <main>
          {renderView()}
        </main>
        {(viewState === 'landing' || viewState === 'privacy' || viewState === 'terms' || viewState === 'refunds') && (
          <Footer 
            onPrivacyClick={() => setViewState('privacy')}
            onTermsClick={() => setViewState('terms')}
            onRefundClick={() => setViewState('refunds')}
            onScrollToSection={scrollToSection}
          />
        )}
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentComplete={handlePaymentComplete}
          selectedTier={selectedPlan || 'full'}
          paidPlan={paidPlan}
          onNavigateLegal={(v) => {
            setIsPaymentModalOpen(false);
            setViewState(v);
          }}
        />
      </div>
    </LanguageProvider>
  );
};

export default App;
