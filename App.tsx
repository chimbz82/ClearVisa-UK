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
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600 && viewState === 'landing');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewState]);

  const handleStartCheck = (planId: PlanId = 'basic') => {
    setSelectedPlan(planId);
    setViewState('questionnaire');
    window.scrollTo(0, 0);
  };

  const handlePaymentComplete = (route: string, tier: string) => {
    const planId = tier as PlanId;
    setPaidPlan(planId);
    setIsPaymentModalOpen(false);
    setViewState('report');
    window.scrollTo(0, 0);
  };

  const handleQuestionnaireComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setViewState('analyzing');
    
    setTimeout(() => {
      const result = runAssessment(
        finalAnswers.visa_route || 'spouse', 
        finalAnswers, 
        selectedPlan
      );
      setAssessmentResult(result);
      setViewState('verdict');
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
    const questionLimit = getQuestionLimit(selectedPlan);
    
    const allQuestions = QUESTIONS.filter(q => 
      q.showIf({ 
        tier: selectedPlan, 
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
          <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
            <Questionnaire 
              onComplete={handleQuestionnaireComplete}
              onCancel={() => setViewState('landing')}
              visibleQuestionsList={limitedQuestions}
              initialAnswers={answers}
              paidPlan={selectedPlan}
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
            onGoBack={() => setViewState('questionnaire')}
          />
        ) : null;
        
      case 'report':
        return assessmentResult && paidPlan ? (
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
              tier={paidPlan}
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
            onStartCheck={() => handleStartCheck('basic')} 
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