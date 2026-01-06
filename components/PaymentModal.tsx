import React, { useState, useEffect } from 'react';
import { PLANS, PlanId } from '../App';
import Button from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (route: string, tier: string) => void;
  selectedTier: PlanId;
}

type CheckoutStep = 'select-route' | 'payment';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentComplete, selectedTier }) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const plan = PLANS.find(p => p.id === selectedTier) || PLANS.find(p => p.id === 'full')!;

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        const routeName = selectedRoute === 'Spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
        onPaymentComplete?.(routeName, selectedTier);
        onClose?.();
        setStatus('idle');
        setStep('select-route');
        setSelectedRoute(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onPaymentComplete, onClose, selectedRoute, selectedTier]);

  if (!isOpen) return null;

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
    setStep('payment');
  };

  const handleMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    setTimeout(() => {
      // ✅ STEP 6.1: Simulate occasional failures for testing
      const success = Math.random() > 0.1; // 90% success rate
      
      if (success) {
        setStatus('success');
      } else {
        setStatus('error');
        // Auto-reset to idle after 3 seconds as a fallback
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 2000);
  };

  const resetAndClose = () => {
    if (status === 'processing') return;
    setStatus('idle');
    setStep('select-route');
    setSelectedRoute(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#07162A]/60 backdrop-blur-sm" onClick={status === 'idle' ? resetAndClose : undefined} />
      <div className="relative bg-white w-full max-w-md rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {status === 'idle' && (
          <div className="px-8 pt-8 pb-2 flex justify-between items-center">
            <h3 className="text-base font-bold text-[#07162A] uppercase tracking-tight">
              {step === 'select-route' ? 'Target Visa Route' : 'Secure Checkout'}
            </h3>
            <button onClick={resetAndClose} className="text-slate-400 hover:text-[#07162A] p-2 rounded-full hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}

        <div className={`px-8 ${status === 'idle' ? 'pb-8' : 'py-16'}`}>
          {status === 'idle' && step === 'select-route' && (
            <div className="space-y-3">
              <button onClick={() => handleRouteSelect('Spouse')} className="w-full flex items-center justify-between p-6 rounded-xl border border-slate-200 hover:border-[#07162A] hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="text-sm font-bold text-[#07162A] mb-1">Spouse / Partner</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Appendix FM Compliance</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-[#07162A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => handleRouteSelect('Skilled Worker')} className="w-full flex items-center justify-between p-6 rounded-xl border border-slate-200 hover:border-[#07162A] hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="text-sm font-bold text-[#07162A] mb-1">Skilled Worker</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Salary & Sponsorship Review</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-[#07162A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {status === 'idle' && step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 mb-2 uppercase font-bold tracking-widest leading-none">{plan.name}</p>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-[#07162A]">{selectedRoute} Route</h4>
                  <p className="text-lg font-bold text-[#07162A]">£{plan.priceGBP}</p>
                </div>
              </div>
              <div className="space-y-3">
                <input required type="text" placeholder="Card number" className="w-full p-4 bg-white border border-slate-200 rounded-lg text-sm outline-none font-semibold focus:border-[#07162A] transition-colors" />
                <div className="flex gap-3">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-4 bg-white border border-slate-200 rounded-lg text-sm outline-none font-semibold focus:border-[#07162A] transition-colors" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-4 bg-white border border-slate-200 rounded-lg text-sm outline-none font-semibold focus:border-[#07162A] transition-colors" />
                </div>
              </div>
              <Button type="submit" fullWidth size="lg" variant="navy">Complete Secure Payment</Button>
            </form>
          )}

          {(status === 'processing' || status === 'success') && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="relative w-16 h-16 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className={`absolute inset-0 border-4 border-[#16A34A] rounded-full border-t-transparent ${status === 'processing' ? 'animate-spin' : ''}`}></div>
                <div className={`absolute inset-0 flex items-center justify-center text-[#16A34A] text-2xl`}>
                  {status === 'processing' ? '' : '✓'}
                </div>
              </div>
              <h4 className={`text-lg font-bold text-[#07162A] uppercase mb-2 tracking-tight`}>
                {status === 'processing' ? 'Processing Transaction' : 'Payment Success'}
              </h4>
              <p className="text-sm text-slate-500 font-bold">
                {status === 'processing' 
                  ? 'Encrypting sensitive details...' 
                  : `Unlocking ${plan.name} features...`}
              </p>
            </div>
          )}

          {/* ✅ STEP 6.2: Error State UI */}
          {status === 'error' && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="w-24 h-24 mx-auto mb-10 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-rose-600 text-4xl">✕</span>
              </div>
              <h4 className="text-h3 text-navy uppercase mb-3 tracking-tight">
                Payment Failed
              </h4>
              <p className="text-body text-slate-600 font-bold mb-8">
                There was an issue processing your payment. Please check your card details and try again.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-small font-bold text-accent uppercase tracking-widest hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;