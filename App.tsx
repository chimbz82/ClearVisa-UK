
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

const App: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleStartCheck = () => {
    setIsPaymentModalOpen(true);
  };

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
      />
    </div>
  );
};

export default App;
