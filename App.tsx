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
import { AssessmentResult } from './types';
import { LanguageProvider } from './context/LanguageContext';
import Button from './components/Button';
import { QUESTIONS } from './data/questions';
import { triggerReportPdfDownload } from './utils/downloadPdf';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import RefundPolicy from './components/RefundPolicy';
import RiskNotice from './components/RiskNotice';

import { PLANS_ARRAY, PLANS, PlanId, getQuestionLimit } from './config/pricingConfig';

export type ViewState = 'landing' | 'questionnaire' | 'analyzing' | 'verdict' | 'report' | 'privacy' | 'terms' | 'refunds' | 'risk-notice';

const StickyCTA: React.FC<{ onStart: () => void; isVisible: boolean }> = ({ onStart, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 lg:hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
      <button 
        onClick={onStart}
        className="w-full bg-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-center gap-3"
      >
        <span className="flex h-2 w-2 rounded-full bg-success"></span>
        Start Eligibility Check
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('basic');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [paidPlan, setPaidPlan] = useState<PlanId | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600 && viewState === 'landing');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewState]);

  const handleStartCheck = (planId: PlanId = 'basic') => {
    // Reset state for a clean fresh start
    setAnswers({});
    setPaidPlan(null);
    setAssessmentResult(null);
    setSelectedPlan(planId);
    setViewState('questionnaire');
    window.scrollTo(0, 0);
  };

  const handleExit = () => {
    setAnswers({});
    setPaidPlan(null);
    setAssessmentResult(null);
    setViewState('landing');
    window.scrollTo(0, 0);
  };

  const handlePaymentComplete = (_route: string, tier: string) => {
    const planId = tier as PlanId;
    setPaidPlan(planId);
    setIsPaymentModalOpen(false);
    
    // Check if user needs to answer more questions for this tier
    const targetLimit = getQuestionLimit(planId);
    const answeredCount = Object.keys(answers).filter(k => k !== 'visa_route').length;

    // If they just paid for a tier deeper than what they've currently answered,
    // take them back to questionnaire to complete the flow.
    if (answeredCount < targetLimit && planId !== 'basic') {
      setViewState('questionnaire');
    } else {
      // Re-run assessment with the new tier context
      const result = runAssessment(
        answers.visa_route || 'spouse', 
        answers, 
        planId
      );
      setAssessmentResult(result);
      setViewState('report');
    }
    window.scrollTo(0, 0);
  };

  const handleQuestionnaireComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setViewState('analyzing');
    
    setTimeout(() => {
      const activeTier = paidPlan || selectedPlan;
      const result = runAssessment(
        finalAnswers.visa_route || 'spouse', 
        finalAnswers, 
        activeTier
      );
      setAssessmentResult(result);
      
      if (paidPlan) {
        setViewState('report');
      } else {
        setViewState('verdict');
      }
      window.scrollTo(0, 0);
    }, 2500);
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

  const renderView = () => {
    const route = answers.visa_route || 'spouse';
    const activeTier = paidPlan || selectedPlan;
    const questionLimit = getQuestionLimit(activeTier);
    
    const allQuestions = QUESTIONS.filter(q => 
      q.showIf({ 
        tier: activeTier, 
        route: route, 
        answers 
      })
    );
    
    const limitedQuestions = allQuestions.slice(0, questionLimit);

    switch (viewState) {
      case 'landing':
        return (
          <>
            <Hero onStartCheck={() => handleStartCheck('basic')} onScrollToSection={scrollToSection} />
            <TrustStrip />
            <HowItWorks />
            <WhoItsFor />
            <WhatYouGet />
            <Pricing 
              onStartCheck={(planId) => handleStartCheck(planId)} 
              onNavigateLegal={setViewState} 
            />
            <FAQ />
            <Legal onNavigateLegal={setViewState} />
            <StickyCTA onStart={() => handleStartCheck('basic')} isVisible={showStickyCTA} />
          </>
        );
        
      case 'questionnaire':
        return (
          <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <Questionnaire 
              onComplete={handleQuestionnaireComplete}
              onCancel={handleExit}
              visibleQuestionsList={limitedQuestions}
              initialAnswers={answers}
              paidPlan={activeTier}
            />
          </div>
        );
        
      case 'analyzing':
        return <AnalysisLoader />;

      case 'verdict':
        return assessmentResult ? (
          <UpgradePricingScreen 
            assessmentResult={assessmentResult}
            onSelectPlan={(planId) => {
              setSelectedPlan(planId);
              setIsPaymentModalOpen(true);
            }}
            onNavigateLegal={setViewState}
            onGoBack={handleExit}
          />
        ) : null;
        
      case 'report':
        return assessmentResult && paidPlan ? (
          <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen">
            <div className="max-w-[210mm] mx-auto space-y-8 no-print mb-8">
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={handleExit} className="font-bold">
                  ← Back to home
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
              tier={paidPlan}
              paidPlan={paidPlan}
              visibleQuestionsList={limitedQuestions}
              onUpgrade={(targetPlan) => {
                setSelectedPlan(targetPlan);
                setIsPaymentModalOpen(true);
              }}
              onExit={handleExit}
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
        <Header 
          onStartCheck={() => handleStartCheck('basic')} 
          onNavigateHome={() => setViewState('landing')}
          onScrollToSection={scrollToSection}
        />
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