
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
import AnalysisLoader from './components/AnalysisLoader';
import UpgradePricingScreen from './components/UpgradePricingScreen';
import { runAssessment } from './utils/assessmentEngine';
import { AssessmentResult, QuestionConfig } from './types';
import { LanguageProvider } from './context/LanguageContext';
import Button from './components/Button';
import { QUESTIONS } from './data/questions';
import { triggerReportPdfDownload } from './utils/downloadPdf';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import RefundPolicy from './components/RefundPolicy';
import RiskNotice from './components/RiskNotice';

export type PlanId = 'free' | 'basic' | 'full' | 'pro_plus';

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
    id: 'free',
    name: 'Free Pre-Check',
    priceGBP: 0,
    stripePriceId: '',
    description: 'Instant eligibility verdict.',
    includedFeatures: ['Verdict', 'Brief risk flags']
  },
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

export type ViewState = 'landing' | 'free-check' | 'analyzing-free' | 'free-result-preview' | 'full-check' | 'analyzing-full' | 'report' | 'privacy' | 'terms' | 'refunds' | 'risk-notice';

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('free');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [paidPlan, setPaidPlan] = useState<PlanId | null>(null);

  const handleStartCheck = () => {
    setViewState('free-check');
  };

  const handleFreeCheckComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setViewState('analyzing-free');
    
    // Simulate initial high-level logic check
    setTimeout(() => {
      const result = runAssessment(finalAnswers.visa_route || 'spouse', finalAnswers, 'free');
      setAssessmentResult(result);
      setViewState('free-result-preview');
    }, 2000);
  };

  const handlePaymentComplete = (route: string, tier: string) => {
    const planId = tier as PlanId;
    setPaidPlan(planId);
    setIsPaymentModalOpen(false);
    setViewState('full-check'); // Move to Stage 2: Deep Audit
  };

  const handleFullAuditComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setViewState('analyzing-full');
    
    setTimeout(() => {
      const result = runAssessment(finalAnswers.visa_route || 'spouse', finalAnswers, paidPlan || 'basic');
      setAssessmentResult(result);
      setViewState('report');
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderView = () => {
    // Stage 1: Initial 12 questions
    const freeQuestions = QUESTIONS.filter(q => q.section === 'Initial');
    
    // Stage 2: Full question set based on tier
    const fullQuestions = QUESTIONS.filter(q => q.showIf({ 
      tier: paidPlan || 'free', 
      route: answers.visa_route || 'spouse', 
      answers 
    }));

    switch (viewState) {
      case 'landing':
        return (
          <>
            <Hero onStartCheck={handleStartCheck} onScrollToSection={scrollToSection} />
            <TrustStrip />
            <HowItWorks />
            <WhoItsFor />
            <WhatYouGet />
            <Pricing onStartCheck={(p) => { setSelectedPlan(p); setIsPaymentModalOpen(true); }} onNavigateLegal={setViewState} />
            <FAQ />
            <Legal onNavigateLegal={setViewState} />
          </>
        );
      case 'free-check':
        return (
          <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
            <Questionnaire 
              onComplete={handleFreeCheckComplete}
              onCancel={() => setViewState('landing')}
              visibleQuestionsList={freeQuestions}
              initialAnswers={answers}
            />
          </div>
        );
      case 'analyzing-free':
      case 'analyzing-full':
        return <AnalysisLoader />;
      case 'free-result-preview':
        return assessmentResult ? (
          <UpgradePricingScreen 
            assessmentResult={assessmentResult}
            onSelectPlan={(planId) => {
              setSelectedPlan(planId);
              setIsPaymentModalOpen(true);
            }}
            onNavigateLegal={setViewState}
            onGoBack={() => setViewState('free-check')}
          />
        ) : null;
      case 'full-check':
        return (
          <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
            <Questionnaire 
              onComplete={handleFullAuditComplete}
              onCancel={() => setViewState('landing')}
              visibleQuestionsList={fullQuestions}
              initialAnswers={answers}
            />
          </div>
        );
      case 'report':
        return assessmentResult ? (
          <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen">
             <div className="max-w-[210mm] mx-auto space-y-8 no-print">
               <div className="flex justify-between items-center no-print mb-8">
                 <Button variant="outline" onClick={() => setViewState('landing')}>Back to Home</Button>
                 <Button onClick={triggerReportPdfDownload} variant="navy" className="uppercase font-black tracking-widest">Download PDF</Button>
               </div>
             </div>
             <ReportTemplate 
                visaRoute={answers.visa_route === 'skilled' ? 'Skilled Worker' : 'Spouse Visa'}
                assessmentData={assessmentResult}
                answers={answers}
                tier={paidPlan || 'basic'}
                paidPlan={paidPlan}
                visibleQuestionsList={fullQuestions}
              />
          </div>
        ) : null;
      case 'privacy': return <PrivacyPolicy onBack={() => setViewState('landing')} />;
      case 'terms': return <TermsOfUse onBack={() => setViewState('landing')} />;
      case 'refunds': return <RefundPolicy onBack={() => setViewState('landing')} />;
      case 'risk-notice': return <RiskNotice onBack={() => setViewState('landing')} />;
      default: return null;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        {viewState === 'landing' && (
          <Header 
            onStartCheck={handleStartCheck} 
            onNavigateHome={() => setViewState('landing')}
            onScrollToSection={scrollToSection}
          />
        )}
        <main>{renderView()}</main>
        {(viewState === 'landing' || ['privacy', 'terms', 'refunds', 'risk-notice'].includes(viewState)) && (
          <Footer 
            onPrivacyClick={() => setViewState('privacy')}
            onTermsClick={() => setViewState('terms')}
            onRefundClick={() => setViewState('refunds')}
            onRiskNoticeClick={() => setViewState('risk-notice')}
            onScrollToSection={scrollToSection}
          />
        )}
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentComplete={handlePaymentComplete}
          selectedTier={selectedPlan}
          paidPlan={paidPlan}
          onNavigateLegal={setViewState}
        />
      </div>
    </LanguageProvider>
  );
};

export default App;
