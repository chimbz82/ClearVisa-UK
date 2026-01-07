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

const AppContent: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [paidPlan, setPaidPlan] = useState<PlanId | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    if (['questionnaire', 'analyzing', 'upgradePricing', 'paywall', 'report'].includes(viewState)) {
      const state = { answers, selectedPlan, paidPlan, viewState };
      localStorage.setItem('clearvisaState', JSON.stringify(state));
    }
  }, [answers, selectedPlan, paidPlan, viewState]);

  useEffect(() => {
    const saved = localStorage.getItem('clearvisaState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.answers && Object.keys(state.answers).length > 0) {
          setAnswers(state.answers);
          setSelectedPlan(state.selectedPlan);
          setPaidPlan(state.paidPlan);
          if (['questionnaire', 'analyzing', 'upgradePricing', 'paywall', 'report'].includes(state.viewState)) {
            setViewState(state.viewState);
            if (state.viewState === 'report' || state.viewState === 'upgradePricing') {
              const routeKey = state.answers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
              setAssessmentResult(runAssessment(routeKey, state.answers));
            }
          }
        }
      } catch (e) { console.error('State restore failed', e); }
    }
  }, []);

  const getVisibleQuestions = (currentAnswers: Record<string, any> = answers) => {
    const route = currentAnswers['visa_route'] === 'spouse' ? 'spouse' : 
                  currentAnswers['visa_route'] === 'skilled' ? 'skilled' : 'any';
    const tier = paidPlan || 'basic';
    
    return QUESTIONS.filter(q => q.showIf({ tier, route, answers: currentAnswers }));
  };

  const handleStartCheck = (planId?: PlanId) => {
    if (viewState !== 'report') {
      setAnswers({});
      setPaidPlan(null);
      localStorage.removeItem('clearvisaState');
    }
    setIsUpgrading(false);
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
    const planId = tier as PlanId;
    const isActuallyAnUpgrade = paidPlan !== null;
    setPaidPlan(planId);
    setIsPaymentModalOpen(false);
    const routeKey = answers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
    setAssessmentResult(runAssessment(routeKey, answers));
    
    setViewState('report');
    setIsLoadingReport(true);
    setTimeout(() => setIsLoadingReport(false), 2000);
    window.scrollTo(0, 0);
  };

  const handleQuestionnaireComplete = async (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers);
    const routeKey = collectedAnswers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
    setAssessmentResult(runAssessment(routeKey, collectedAnswers));
    
    setViewState('analyzing');
    setTimeout(() => {
      setViewState('upgradePricing');
      window.scrollTo(0, 0);
    }, 2800);
  };

  const handleExitReport = () => {
    localStorage.removeItem('clearvisaState');
    setAnswers({});
    setPaidPlan(null);
    setSelectedPlan(null);
    setViewState('landing');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'questionnaire':
        return (
          <div className="bg-white min-h-screen">
            <Header onStartCheck={() => handleStartCheck()} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <div className="pt-24 pb-12 app-container">
              <Questionnaire 
                onComplete={handleQuestionnaireComplete} 
                onCancel={() => setViewState('landing')} 
                isPaid={!!paidPlan}
                initialAnswers={answers}
                selectedPlan={selectedPlan || 'full'}
                visibleQuestionsList={getVisibleQuestions()}
                isUpgrading={isUpgrading}
              />
            </div>
          </div>
        );
      case 'analyzing':
        return (
          <div className="bg-white min-h-screen flex items-center justify-center">
            <AnalysisLoader />
          </div>
        );
      case 'upgradePricing':
        return (
          <UpgradePricingScreen 
            assessmentResult={assessmentResult!}
            onSelectPlan={(planId) => {
              setSelectedPlan(planId);
              setViewState('paywall');
            }}
            onViewFree={() => {
              setPaidPlan('basic');
              setViewState('report');
            }}
            onNavigateLegal={(view) => setViewState(view)}
          />
        );
      case 'paywall':
        const plan = PLANS.find(p => p.id === (selectedPlan || 'full'))!;
        return (
          <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-slate-50 text-left">
            <div className="max-w-[600px] w-full app-card border border-slate-200 p-10">
              <div className="text-center mb-8">
                <span className="text-[11px] text-accent mb-2 block font-black uppercase tracking-widest">{plan.name}</span>
                <h2 className="text-h2 mb-2 text-navy uppercase tracking-tighter">Secure Your Report</h2>
                <p className="text-body text-slate-600 font-bold uppercase tracking-tight">Access the finalized compliance analysis for your visa route.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                <ul className="space-y-3">
                  {plan.includedFeatures.map((f, i) => (
                    <li key={i} className="flex gap-3 items-start text-small font-bold text-slate-700 uppercase tracking-tight">
                      <span className="text-accent font-black">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => setIsPaymentModalOpen(true)} variant="primary" size="lg" fullWidth className="uppercase font-black tracking-widest">Pay £{plan.priceGBP} & View Report</Button>
              <button onClick={() => setViewState('upgradePricing')} className="mt-6 w-full text-center text-[11px] text-slate-400 hover:text-navy font-bold uppercase tracking-widest text-center">Back to selection</button>
            </div>
          </div>
        );
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 relative">
            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 app-card shadow-2xl">
              <div className="text-left">
                <h3 className="text-h3 mb-1 text-navy uppercase tracking-tighter">Official Compliance Audit</h3>
                <p className="text-small text-slate-500 font-bold uppercase tracking-widest">TIER: {PLANS.find(p => p.id === paidPlan)?.name.toUpperCase() || 'AUDIT'}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={handleExitReport} variant="outline" size="sm" className="uppercase font-black">Close</Button>
                <Button onClick={triggerReportPdfDownload} variant="navy" size="sm" className="uppercase font-black tracking-widest">Download PDF</Button>
              </div>
            </div>
            <div id="report-print-root">
              {isLoadingReport ? <ReportSkeleton /> : (
                <ReportTemplate 
                  visaRoute={answers['visa_route'] === 'spouse' ? 'Spouse Visa' : 'Skilled Worker Visa'} 
                  assessmentData={assessmentResult!}
                  answers={answers}
                  tier={paidPlan || 'full'}
                  paidPlan={paidPlan}
                  onUpgrade={(targetTier) => {
                    setIsUpgrading(true);
                    setSelectedPlan(targetTier);
                    setIsPaymentModalOpen(true);
                  }}
                  onViewLegal={(type) => setViewState(type)}
                  visibleQuestionsList={getVisibleQuestions()}
                />
              )}
            </div>
          </div>
        );
      case 'privacy': return <PrivacyPolicy onBack={() => setViewState(paidPlan ? 'report' : 'landing')} />;
      case 'terms': return <TermsOfUse onBack={() => setViewState(paidPlan ? 'report' : 'landing')} />;
      case 'refunds': return <RefundPolicy onBack={() => setViewState(paidPlan ? 'report' : 'landing')} />;
      default:
        return (
          <div className="no-print bg-white">
            <Header onStartCheck={() => handleStartCheck()} onNavigateHome={() => setViewState('landing')} onScrollToSection={scrollToSection} />
            <main>
              <Hero onStartCheck={() => handleStartCheck()} onScrollToSection={scrollToSection} />
              <TrustStrip />
              <HowItWorks />
              <WhoItsFor />
              <WhatYouGet />
              <Pricing onStartCheck={(planId) => handleStartCheck(planId)} onNavigateLegal={(view) => setViewState(view)} />
              <FAQ />
              <Legal onNavigateLegal={(view) => setViewState(view)} />
            </main>
            <Footer 
              onPrivacyClick={() => setViewState('privacy')} 
              onTermsClick={() => setViewState('terms')} 
              onRefundClick={() => setViewState('refunds')}
              onScrollToSection={scrollToSection} 
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderContent()}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onPaymentComplete={handlePaymentSuccess}
        selectedTier={selectedPlan || 'full'}
        paidPlan={paidPlan}
        onNavigateLegal={(view) => setViewState(view)}
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