import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (route: string, tier: string) => void;
  selectedTier?: string;
}

type CheckoutStep = 'select-route' | 'payment';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentComplete, selectedTier = 'full' }) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const pricing = {
    basic: { name: 'Basic Pre-Check', price: '£29' },
    full: { name: 'Full Pre-Check + Checklist', price: '£79' },
    pro: { name: 'Pro Assessment Add-On', price: '£149' }
  };

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        const routeName = selectedRoute === 'Spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
        onPaymentComplete?.(routeName, selectedTier);
        onClose?.();
        setStatus('idle');
        setStep('select-route');
        setSelectedRoute(null);
      }, 1200);
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
    }, 1800);
  };

  const resetAndClose = () => {
    if (status === 'processing') return;
    setStatus('idle');
    setStep('select-route');
    setSelectedRoute(null);
    onClose();
  };

  const activePrice = pricing[selectedTier as keyof typeof pricing] || pricing.full;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B2545]/60 backdrop-blur-sm transition-opacity" onClick={status === 'idle' ? resetAndClose : undefined} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {status === 'idle' && (
          <div className="px-8 pt-8 pb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-navy uppercase tracking-tight">
              {step === 'select-route' ? 'Select Route' : 'Secure Checkout'}
            </h3>
            <button onClick={resetAndClose} className="text-slate-400 hover:text-navy p-2 rounded-full hover:bg-slate-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        <div className={`px-8 ${status === 'idle' ? 'pb-8' : 'py-16'}`}>
          {status === 'idle' && step === 'select-route' && (
            <div className="space-y-4">
              <button onClick={() => handleRouteSelect('Spouse')} className="w-full flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="font-black text-navy uppercase tracking-tight">Spouse & Partner Visa</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Appendix FM Compliance</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => handleRouteSelect('Skilled Worker')} className="w-full flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 hover:border-navy hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="font-black text-navy uppercase tracking-tight">Skilled Worker Visa</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Salary & Sponsorship Check</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
          {status === 'idle' && step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center border border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{activePrice.name}</p>
                  <p className="text-sm font-bold text-navy mt-1">{selectedRoute} Assessment</p>
                </div>
                <p className="text-2xl font-black text-navy">{activePrice.price}</p>
              </div>
              <div className="space-y-4">
                <input required type="text" placeholder="Card number" className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-bold" />
                <div className="flex gap-2">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-bold" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-bold" />
                </div>
              </div>
              <button type="submit" className="w-full bg-navy text-white py-4 rounded-xl font-black text-lg shadow-xl uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">Complete Secure Payment</button>
            </form>
          )}
          {(status === 'processing' || status === 'success') && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="relative w-20 h-20 mx-auto mb-10">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className={`absolute inset-0 border-4 border-accent rounded-full border-t-transparent ${status === 'processing' ? 'animate-spin' : ''}`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-accent text-2xl font-bold">
                  {status === 'processing' ? '' : '✓'}
                </div>
              </div>
              <h4 className="text-2xl font-black text-navy uppercase mb-3 tracking-tight leading-none">
                {status === 'processing' ? 'Processing' : 'Success'}
              </h4>
              <p className="text-slate-600 font-bold">
                {status === 'processing' ? 'Finalising secure transaction...' : 'Unlocking your Pro assessment tools...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
