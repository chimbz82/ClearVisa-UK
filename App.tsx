
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
import ReportTemplate from './components/ReportTemplate';

type ViewState = 'landing' | 'report';

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [selectedRoute, setSelectedRoute] = useState<string>('Spouse Visa');

  const handleStartCheck = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (route: string) => {
    setSelectedRoute(route);
    setViewState('report');
    window.scrollTo(0, 0);
  };

  if (viewState === 'report') {
    return (
      <div className="bg-slate-100 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 no-print flex justify-between items-center mb-8">
          <button 
            onClick={() => setViewState('landing')}
            className="flex items-center gap-2 text-slate-600 hover:text-navy font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-navy text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Download PDF
          </button>
        </div>
        <ReportTemplate visaRoute={selectedRoute} />
      </div>
    );
  }

  return (
    <div id="top" className="min-h-screen bg-off-white selection:bg-teal-100 selection:text-teal-900">
      <Header onStartCheck={handleStartCheck} />
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
      <Footer />
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default App;
