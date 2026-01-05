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
import ReportTemplate from './components/ReportTemplate';
import ReportSkeleton from './components/ReportSkeleton';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';

type ViewState = 'landing' | 'report' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedRoute, setSelectedRoute] = useState<string>('Spouse Visa');
  const [applicantName, setApplicantName] = useState<string>("Alex Thompson");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleStartCheck = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (route: string) => {
    setSelectedRoute(route);
    setViewState('report');
    setIsLoadingReport(true);
    setShowToast(true);
    window.scrollTo(0, 0);

    // Simulate report generation time
    setTimeout(() => {
      setIsLoadingReport(false);
    }, 2500);
  };

  const renderContent = () => {
    switch (viewState) {
      case 'report':
        return (
          <div className="bg-slate-100 min-h-screen py-12 px-4 sm:px-6 relative">
            {/* Success Toast */}
            {showToast && (
              <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-500">
                <div className="bg-navy text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Payment successful</p>
                    <p className="text-xs text-slate-400">Generating your confidential assessment report...</p>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-[210mm] mx-auto no-print flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-navy mb-1 uppercase tracking-tight">
                  {isLoadingReport ? 'Generating Assessment…' : 'Assessment Ready'}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  {isLoadingReport ? 'Our engine is checking your answers against current Home Office guidance.' : 'Your ClearVisa UK – Immigration Eligibility Pre-Check Report is finalized.'}
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setViewState('landing')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Home
                </button>
                <button 
                  disabled={isLoadingReport}
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none bg-navy text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download & Share with Lawyer
                </button>
              </div>
            </div>
            
            {isLoadingReport ? (
              <ReportSkeleton />
            ) : (
              <ReportTemplate 
                applicantName={applicantName} 
                visaRoute={selectedRoute} 
              />
            )}
            
            <div className={`max-w-[210mm] mx-auto mt-12 p-8 bg-navy rounded-2xl text-white no-print shadow-2xl overflow-hidden relative transition-opacity duration-500 ${isLoadingReport ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">OISC Consultation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-semibold">
                    Present your ClearVisa UK – Immigration Eligibility Pre-Check Report to an OISC-regulated adviser to fast-track your legal consultation.
                  </p>
                </div>
                <button className="whitespace-nowrap bg-accent hover:bg-emerald-400 text-navy px-8 py-4 rounded-xl font-black transition-all shadow-xl uppercase tracking-widest text-sm">
                  Find an OISC Adviser
                </button>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return <PrivacyPolicy onBack={() => setViewState('landing')} />;
      case 'terms':
        return <TermsOfUse onBack={() => setViewState('landing')} />;
      case 'landing':
      default:
        return (
          <>
            <Header onStartCheck={handleStartCheck} onNavigateHome={() => setViewState('landing')} />
            <main>
              <Hero onStartCheck={handleStartCheck} />
              <TrustStrip />
              <HowItWorks />
              <WhoItsFor />
              <WhatYouGet />
              <Pricing onStartCheck={handleStartCheck} />
              <FAQ />
              <Legal />
            </main>
            <Footer 
              onPrivacyClick={() => { setViewState('privacy'); window.scrollTo(0, 0); }} 
              onTermsClick={() => { setViewState('terms'); window.scrollTo(0, 0); }} 
            />
          </>
        );
    }
  };

  return (
    <div id="top" className="min-h-screen bg-off-white selection:bg-accent/20 selection:text-navy">
      {renderContent()}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onPaymentComplete={handlePaymentSuccess}
      />
    </div>
  );
};

export default App;