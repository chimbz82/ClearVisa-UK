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
import AnalysisLoader from './components/AnalysisLoader';
import { runAssessment } from './utils/assessmentEngine';
import { AssessmentResult } from './types';
import { LanguageProvider } from './context/LanguageContext';
import Button from './components/Button';
import { QUESTIONS } from './data/questions';
import { triggerReportPdfDownload } from './utils/downloadPdf';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import RefundPolicy from './components/RefundPolicy';
import RiskNotice from './components/RiskNotice';
import { getQuestionLimit } from './config/planLimits';

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

export type ViewState = 'landing' | 'questionnaire' | 'analyzing' | 'report' | 'privacy' | 'terms' | 'refunds' | 'risk-notice';

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('basic');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [paidPlan, setPaidPlan] = useState<PlanId | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const handleStartCheck = () => {
    setSelectedPlan('basic');
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = (route: string, tier: string) => {
    const planId = tier as PlanId;
    setPaidPlan(planId);
    setSelectedRoute(route);
    setIsPaymentModalOpen(false);
    
    setAnswers(prev => ({ 
      ...prev, 
      visa_route: route.includes('Spouse') ? 'spouse' : 'skilled' 
    }));
    
    setViewState('questionnaire');
  };

  const handleQuestionnaireComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setViewState('analyzing');
    
    setTimeout(() => {
      const result = runAssessment(
        finalAnswers.visa_route || 'spouse', 
        finalAnswers, 
        paidPlan || 'basic'
      );
      setAssessmentResult(result);
      setViewState('report');
      window.scrollTo(0, 0);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderView = () => {
    const route = answers.visa_route || (selectedRoute.includes('Spouse') ? 'spouse' : 'skilled') || 'spouse';
    const questionLimit = getQuestionLimit(paidPlan);
    
    const allQuestions = QUESTIONS.filter(q => 
      q.showIf({ 
        tier: paidPlan || 'basic', 
        route: route, 
        answers 
      })
    );
    
    const limitedQuestions = allQuestions.slice(0, questionLimit);

    switch (viewState) {
      case 'landing':
        return (
          <>
            <Hero onStartCheck={handleStartCheck} onScrollToSection={scrollToSection} />
            <TrustStrip />
            <HowItWorks />
            <WhoItsFor />
            <WhatYouGet />
            <Pricing 
              onStartCheck={(planId) => { 
                setSelectedPlan(planId); 
                setIsPaymentModalOpen(true); 
              }} 
              onNavigateLegal={setViewState} 
            />
            <FAQ />
            <Legal onNavigateLegal={setViewState} />
          </>
        );
        
      case 'questionnaire':
        return (
          <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
            <Questionnaire 
              onComplete={handleQuestionnaireComplete}
              onCancel={() => setViewState('landing')}
              visibleQuestionsList={limitedQuestions}
              initialAnswers={answers}
              paidPlan={paidPlan}
            />
          </div>
        );
        
      case 'analyzing':
        return <AnalysisLoader />;
        
      case 'report':
        return assessmentResult ? (
          <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen">
            <div className="max-w-[210mm] mx-auto space-y-8 no-print mb-8">
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setViewState('landing')} className="font-bold">
                  ← Back to Home
                </Button>
                <Button onClick={triggerReportPdfDownload} variant="navy" className="font-bold">
                  Download Full Report (PDF)
                </Button>
              </div>
            </div>
            <ReportTemplate 
              visaRoute={answers.visa_route === 'skilled' ? 'Skilled Worker' : 'Spouse Visa'}
              assessmentData={assessmentResult}
              answers={answers}
              tier={paidPlan || 'basic'}
              paidPlan={paidPlan}
              visibleQuestionsList={limitedQuestions}
              onUpgrade={(targetPlan) => {
                setSelectedPlan(targetPlan);
                setIsPaymentModalOpen(true);
              }}
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
      <div className="min-h-screen bg-white font-sans text-slate-900 antialiased text-left">
        {(viewState === 'landing' || ['privacy', 'terms', 'refunds', 'risk-notice'].includes(viewState)) && (
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
          currentRoute={selectedRoute}
          onNavigateLegal={setViewState}
        />
      </div>
    </LanguageProvider>
  );
};

export default App;