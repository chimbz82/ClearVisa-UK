
import React, { useState, useEffect } from 'react';
import { PLANS, PlanId } from '../App';
import Button from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (route: string, tier: string) => void;
  selectedTier: PlanId;
  paidPlan: PlanId | null;
  onNavigateLegal: (view: 'privacy' | 'terms' | 'refunds') => void;
}

type CheckoutStep = 'select-route' | 'payment';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentComplete, selectedTier, paidPlan, onNavigateLegal }) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const plan = PLANS.find(p => p.id === selectedTier) || PLANS.find(p => p.id === 'full')!;
  
  // Added 'free' property to match PlanId definition
  const basePrices: Record<PlanId, number> = {
    free: 0,
    basic: 29,
    full: 79,
    pro_plus: 99
  };

  const isUpgrade = paidPlan !== null && basePrices[selectedTier] > (basePrices[paidPlan] || 0);
  const paymentAmount = isUpgrade ? basePrices[selectedTier] - basePrices[paidPlan!] : basePrices[selectedTier];

  const isPreview = window.location.hostname === 'localhost' || window.location.hostname.includes('stackblitz');

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
      const success = Math.random() > 0.05; // 95% success rate for simulation
      if (success) {
        setStatus('success');
      } else {
        setStatus('error');
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
      <div className="relative bg-white w-full max-w-md rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 text-left">
        
        {status === 'idle' && (
          <div className="px-8 pt-8 pb-2 flex justify-between items-center">
            <h3 className="text-base font-bold text-[#07162A] uppercase tracking-tight">
              {step === 'select-route' ? 'Target Visa Route' : (isUpgrade ? 'Upgrade Account' : 'Secure Checkout')}
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
              {isPreview && (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-[10px] text-amber-700 font-bold uppercase tracking-tight text-center leading-tight">
                    Preview environment: use test card numbers only. No real payments are processed here.
                  </p>
                </div>
              )}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 mb-2 uppercase font-bold tracking-widest leading-none">
                  {isUpgrade ? `Upgrade from ${PLANS.find(p => p.id === paidPlan)?.name} to ${plan.name}` : plan.name}
                </p>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-[#07162A]">{selectedRoute} Route</h4>
                  <p className="text-lg font-bold text-[#07162A]">£{paymentAmount}</p>
                </div>
                {isUpgrade && (
                  <p className="text-[9px] text-slate-400 mt-2 italic font-bold">
                    Upgrade from {PLANS.find(p => p.id === paidPlan)?.name} to {plan.name} – total charged now: £{paymentAmount}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <input required type="text" placeholder="Card number" className="w-full p-4 bg-white border border-slate-200 rounded-lg text-sm outline-none font-semibold focus:border-[#07162A] transition-colors" />
                <div className="flex gap-3">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-4 bg-white border border-slate-200 rounded-lg text-sm outline-none font-semibold focus:border-[#07162A] transition-colors" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-4 bg-white border border-slate-200 rounded-lg text-sm outline-none font-semibold focus:border-[#07162A] transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <Button type="submit" fullWidth size="lg" variant="navy">Complete Secure Payment</Button>
                <div className="text-[10px] text-center text-slate-400 font-medium leading-tight">
                  By proceeding, you agree to our{' '}
                  <button type="button" onClick={() => onNavigateLegal('terms')} className="underline">Terms</button>,{' '}
                  <button type="button" onClick={() => onNavigateLegal('privacy')} className="underline">Privacy</button>, and{' '}
                  <button type="button" onClick={() => onNavigateLegal('refunds')} className="underline">Refund Policy</button>.
                </div>
              </div>
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
