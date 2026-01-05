import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (route: string) => void;
}

type CheckoutStep = 'select-route' | 'payment';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentComplete }) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        // 1) Notify parent that payment is complete with the selected route
        const routeName = selectedRoute === 'Spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
        onPaymentComplete?.(routeName);

        // 2) Close the payment modal overlay
        onClose?.();
        
        // Reset local state for next time
        setStatus('idle');
        setStep('select-route');
        setSelectedRoute(null);
      }, 1200); // short delay for the success state to be visible

      return () => clearTimeout(timer);
    }
  }, [status, onPaymentComplete, onClose, selectedRoute]);

  if (!isOpen) return null;

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
    setStep('payment');
  };

  const handleMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate successful payment and processing
    setTimeout(() => {
      setStatus('success');
    }, 1800);
  };

  const resetAndClose = () => {
    if (status === 'processing') return; // Prevent closing while processing
    setStatus('idle');
    setStep('select-route');
    setSelectedRoute(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B2545]/60 backdrop-blur-sm transition-opacity"
        onClick={status === 'idle' ? resetAndClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header - Hidden during processing/success */}
        {status === 'idle' && (
          <div className="px-8 pt-8 pb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-navy uppercase tracking-tight">
              {step === 'select-route' && 'Select Assessment Route'}
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
        <div className={`px-8 ${status === 'idle' ? 'pb-8' : 'py-16'}`}>
          
          {/* Step 1: Select Route */}
          {status === 'idle' && step === 'select-route' && (
            <div className="space-y-4">
              <p className="text-slate-600 text-sm mb-6 font-semibold">Choose the visa type for your ClearVisa UK assessment.</p>
              
              <button 
                onClick={() => handleRouteSelect('Spouse')}
                className="w-full flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group"
              >
                <div>
                  <h4 className="font-black text-navy uppercase tracking-tight">Spouse & Partner Visa</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Appendix FM Compliance</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>

              <button 
                onClick={() => handleRouteSelect('Skilled Worker')}
                className="w-full flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group"
              >
                <div>
                  <h4 className="font-black text-navy uppercase tracking-tight">Skilled Worker Visa</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Salary & Sponsorship Check</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-8 uppercase tracking-widest font-black">
                Secure Assessment • GDPR Compliant • Confidential
              </p>
            </div>
          )}

          {/* Step 2: Payment */}
          {status === 'idle' && step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center mb-6 border border-slate-100">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">ClearVisa UK Assessment</p>
                  <p className="text-sm font-bold text-navy">{selectedRoute === 'Spouse' ? 'Spouse Pre-Check' : 'Skilled Worker Pre-Check'}</p>
                </div>
                <p className="text-xl font-black text-navy">£19.00</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Card Information</label>
                  <div className="space-y-px">
                    <input 
                      required
                      type="text" 
                      placeholder="Card number"
                      className="w-full p-4 bg-white border border-slate-200 rounded-t-xl text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none font-bold"
                    />
                    <div className="flex">
                      <input 
                        required
                        type="text" 
                        placeholder="MM / YY"
                        className="w-1/2 p-4 bg-white border border-slate-200 rounded-bl-xl border-t-0 border-r-0 text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none font-bold"
                      />
                      <input 
                        required
                        type="text" 
                        placeholder="CVC"
                        className="w-1/2 p-4 bg-white border border-slate-200 rounded-br-xl border-t-0 text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center font-bold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Secure payment via Stripe.
              </div>

              <button 
                type="submit"
                className="w-full bg-navy text-white py-4 rounded-xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl"
              >
                Complete Payment
              </button>
            </form>
          )}

          {/* Processing / Success State */}
          {(status === 'processing' || status === 'success') && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="relative w-20 h-20 mx-auto mb-10">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className={`absolute inset-0 border-4 border-accent rounded-full border-t-transparent ${status === 'processing' ? 'animate-spin' : ''}`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {status === 'processing' ? (
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 8v4l3 3" /></svg>
                  ) : (
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
              </div>
              <h4 className="text-2xl font-black text-navy mb-3 uppercase tracking-tight">
                {status === 'processing' ? 'Processing Payment' : 'Payment Successful'}
              </h4>
              <p className="text-slate-600 font-bold">
                {status === 'processing' ? 'Securely connecting to Stripe...' : 'Generating your confidential assessment report…'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;