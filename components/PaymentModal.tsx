
import React, { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (route: string) => void;
}

type CheckoutStep = 'select-route' | 'payment' | 'success';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
    setStep('payment');
  };

  const handleMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
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
        onClick={resetAndClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-navy">
            {step === 'select-route' && 'Select your visa route'}
            {step === 'payment' && 'Secure Checkout'}
            {step === 'success' && 'Payment Successful'}
          </h3>
          <button 
            onClick={resetAndClose}
            className="text-slate-400 hover:text-navy p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

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

              <p className="text-[10px] text-slate-400 text-center mt-6">
                Not sure? Don't worry, you can refine your details in the assessment.
              </p>
            </div>
          )}

          {/* Step 2: Payment (Stripe-like) */}
          {step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</p>
                  <p className="text-sm font-bold text-navy">{selectedRoute} Pre-Check</p>
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

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Cardholder Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Full name on card"
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Secure payment powered by Stripe. Encrypted connection.
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </>
                ) : (
                  `Pay £19.00`
                )}
              </button>
            </form>
          )}

          {/* Step 3: Success Confirmation */}
          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-2xl font-bold text-navy mb-2">Payment Confirmed</h4>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Thank you. Your access to the <strong>{selectedRoute} Pre-Check</strong> is now active. You can start the assessment immediately.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => onSuccess(selectedRoute || 'Spouse Visa')}
                  className="w-full bg-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg"
                >
                  Start My Pre-Check
                </button>
                <p className="text-xs text-slate-400">A receipt has been sent to your email.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
