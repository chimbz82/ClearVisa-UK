
import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (route: string) => void;
}

type CheckoutStep = 'select-route' | 'payment' | 'processing';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
    setStep('payment');
  };

  const handleMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate successful payment and processing
    setTimeout(() => {
      onSuccess(selectedRoute === 'Spouse' ? 'Spouse Visa' : 'Skilled Worker Visa');
      resetAndClose();
    }, 1800);
  };

  const resetAndClose = () => {
    setStep('select-route');
    setSelectedRoute(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
        onClick={step !== 'processing' ? resetAndClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header - Hidden during processing */}
        {step !== 'processing' && (
          <div className="px-8 pt-8 pb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-navy">
              {step === 'select-route' && 'Select your visa route'}
              {step === 'payment' && 'Secure Checkout'}
            </h3>
            <button 
              onClick={resetAndClose}
              className="text-slate-400 hover:text-navy p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-8 pb-8">
          
          {/* Step 1: Select Route */}
          {step === 'select-route' && (
            <div className="space-y-4">
              <p className="text-slate-600 text-sm mb-6">Choose the visa type you want to check eligibility for.</p>
              
              <button 
                onClick={() => handleRouteSelect('Spouse')}
                className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group"
              >
                <div>
                  <h4 className="font-bold text-navy group-hover:text-navy">Spouse & Partner Visa</h4>
                  <p className="text-xs text-slate-500">Based on relationship and financial rules.</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <button 
                onClick={() => handleRouteSelect('Skilled Worker')}
                className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group"
              >
                <div>
                  <h4 className="font-bold text-navy">Skilled Worker Visa</h4>
                  <p className="text-xs text-slate-500">Based on salary, job code, and sponsorship.</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-widest font-bold">
                Secure Assessment • GDPR Compliant
              </p>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assessment</p>
                  <p className="text-sm font-bold text-navy">{selectedRoute === 'Spouse' ? 'Spouse Pre-Check' : 'Skilled Worker Pre-Check'}</p>
                </div>
                <p className="text-lg font-bold text-navy">£19.00</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Card Information</label>
                  <div className="space-y-px">
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        placeholder="Card number"
                        className="w-full p-4 bg-white border border-slate-200 rounded-t-xl text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <div className="w-8 h-5 bg-slate-100 rounded"></div>
                        <div className="w-8 h-5 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                    <div className="flex">
                      <input 
                        required
                        type="text" 
                        placeholder="MM / YY"
                        className="w-1/2 p-4 bg-white border border-slate-200 rounded-bl-xl border-t-0 border-r-0 text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none"
                      />
                      <input 
                        required
                        type="text" 
                        placeholder="CVC"
                        className="w-1/2 p-4 bg-white border border-slate-200 rounded-br-xl border-t-0 text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Secure payment powered by Stripe.
              </div>

              <button 
                type="submit"
                className="w-full bg-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                Pay £19.00
              </button>
            </form>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-navy mb-2">Payment Successful</h4>
              <p className="text-slate-600 font-medium">Generating your report, please wait...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
