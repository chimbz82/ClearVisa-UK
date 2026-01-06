import React, { useState, useEffect } from 'react';
import { PLANS, PlanId } from '../App';

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
      setStatus('success');
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
      <div className="absolute inset-0 bg-[#0B2545]/60 backdrop-blur-sm" onClick={status === 'idle' ? resetAndClose : undefined} />
      <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {status === 'idle' && (
          <div className="px-10 pt-10 pb-4 flex justify-between items-center">
            <h3 className="heading-s text-navy uppercase tracking-tight">
              {step === 'select-route' ? 'Target Visa Route' : 'Secure Checkout'}
            </h3>
            <button onClick={resetAndClose} className="text-slate-400 hover:text-navy p-2 rounded-full hover:bg-slate-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}

        <div className={`px-10 ${status === 'idle' ? 'pb-10' : 'py-20'}`}>
          {status === 'idle' && step === 'select-route' && (
            <div className="space-y-4">
              <button onClick={() => handleRouteSelect('Spouse')} className="w-full flex items-center justify-between p-8 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="heading-s text-navy mb-1">Spouse / Partner</h4>
                  <p className="caption text-slate-500 font-bold">Appendix FM Compliance Check</p>
                </div>
                <svg className="w-6 h-6 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => handleRouteSelect('Skilled Worker')} className="w-full flex items-center justify-between p-8 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="heading-s text-navy mb-1">Skilled Worker</h4>
                  <p className="caption text-slate-500 font-bold">Salary & Sponsorship Review</p>
                </div>
                <svg className="w-6 h-6 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {status === 'idle' && step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <p className="caption text-slate-400 mb-2 leading-none uppercase font-bold tracking-widest">{plan.name}</p>
                <div className="flex justify-between items-end">
                  <h4 className="heading-s text-navy leading-none">{selectedRoute} Route</h4>
                  <p className="heading-m text-navy leading-none">£{plan.priceGBP}</p>
                </div>
              </div>
              <div className="space-y-4">
                <input required type="text" placeholder="Card number" className="w-full p-5 bg-white border-2 border-slate-200 rounded-xl body-m outline-none font-bold focus:border-navy transition-colors" />
                <div className="flex gap-4">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-5 bg-white border-2 border-slate-200 rounded-xl body-m outline-none font-bold focus:border-navy transition-colors" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-5 bg-white border-2 border-slate-200 rounded-xl body-m outline-none font-bold focus:border-navy transition-colors" />
                </div>
              </div>
              <button type="submit" className="w-full bg-navy text-white py-5 rounded-2xl heading-s shadow-2xl uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">Complete Secure Payment</button>
            </form>
          )}

          {(status === 'processing' || status === 'success') && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="relative w-24 h-24 mx-auto mb-10">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className={`absolute inset-0 border-4 border-accent rounded-full border-t-transparent ${status === 'processing' ? 'animate-spin' : ''}`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-accent text-3xl font-black">
                  {status === 'processing' ? '' : '✓'}
                </div>
              </div>
              <h4 className="heading-m text-navy uppercase mb-3 tracking-tight">
                {status === 'processing' ? 'Processing Transaction' : 'Payment Success'}
              </h4>
              <p className="body-m text-slate-600 font-bold">
                {status === 'processing' ? 'Encrypting sensitive details...' : `Unlocking ${plan.name} features...`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;