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

  const targetPlan = PLANS.find(p => p.id === selectedTier) || PLANS[0];
  const currentPlan = PLANS.find(p => p.id === paidPlan);

  // Business model pricing deltas
  const getUpgradePrice = (from: PlanId | null, to: PlanId): number => {
    if (!from) return PLANS.find(p => p.id === to)?.priceGBP || 0;
    
    // Hard-coded deltas from the business requirements
    if (from === 'basic' && to === 'full') return 50;
    if (from === 'basic' && to === 'pro_plus') return 70;
    if (from === 'full' && to === 'pro_plus') return 20;
    
    return 0; // Invalid or same tier
  };

  const paymentAmount = getUpgradePrice(paidPlan, selectedTier);
  const isUpgrade = paidPlan !== null;

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
      const success = Math.random() > 0.05; 
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
      <div className="absolute inset-0 bg-[#041229]/70 backdrop-blur-sm" onClick={status === 'idle' ? resetAndClose : undefined} />
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 text-left">
        
        {status === 'idle' && (
          <div className="px-10 pt-10 pb-2 flex justify-between items-center">
            <h3 className="text-base font-black text-navy uppercase tracking-tight">
              {step === 'select-route' ? 'Target Visa Route' : (isUpgrade ? 'Upgrade Audit Tier' : 'Secure Checkout')}
            </h3>
            <button onClick={resetAndClose} className="text-slate-400 hover:text-navy p-2 rounded-full hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}

        <div className={`px-10 ${status === 'idle' ? 'pb-10' : 'py-20'}`}>
          {status === 'idle' && step === 'select-route' && (
            <div className="space-y-4 pt-4">
              <button onClick={() => handleRouteSelect('Spouse')} className="w-full flex items-center justify-between p-7 rounded-2xl border-2 border-slate-100 hover:border-accent hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="text-base font-black text-navy mb-1 uppercase tracking-tight">Spouse / Partner</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Appendix FM Compliance Audit</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-accent transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => handleRouteSelect('Skilled Worker')} className="w-full flex items-center justify-between p-7 rounded-2xl border-2 border-slate-100 hover:border-accent hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="text-base font-black text-navy mb-1 uppercase tracking-tight">Skilled Worker</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Salary & Sponsorship Review</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-accent transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {status === 'idle' && step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-8 pt-4">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/60 shadow-inner">
                <p className="text-[10px] text-slate-400 mb-3 uppercase font-black tracking-widest leading-none">
                  {isUpgrade ? `UPGRADING TO ${targetPlan.name}` : `PLAN: ${targetPlan.name}`}
                </p>
                <div className="flex justify-between items-baseline mb-4">
                  <h4 className="text-lg font-black text-navy uppercase tracking-tight">{selectedRoute} Route</h4>
                  <p className="text-3xl font-black text-navy tracking-tighter">£{paymentAmount}</p>
                </div>
                {isUpgrade && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                      Upgrade from <span className="text-navy">{currentPlan?.name}</span> to <span className="text-navy">{targetPlan.name}</span>. Total charged now: £{paymentAmount}.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-navy uppercase tracking-widest ml-1">Card Details</label>
                  <input required type="text" placeholder="Card number" className="w-full p-5 bg-white border-2 border-slate-100 rounded-xl text-sm outline-none font-bold focus:border-navy transition-colors" />
                </div>
                <div className="flex gap-4">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-5 bg-white border-2 border-slate-100 rounded-xl text-sm outline-none font-bold focus:border-navy transition-colors" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-5 bg-white border-2 border-slate-100 rounded-xl text-sm outline-none font-bold focus:border-navy transition-colors" />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <Button type="submit" fullWidth size="lg" variant="navy" className="py-5 shadow-2xl uppercase font-black tracking-widest">
                  Secure Payment • £{paymentAmount}
                </Button>
                <div className="text-[10px] text-center text-slate-400 font-bold leading-tight uppercase tracking-tight">
                  Secure checkout via Stripe • By proceeding, you agree to our{' '}
                  <button type="button" onClick={() => onNavigateLegal('terms')} className="underline hover:text-navy">Terms</button> and{' '}
                  <button type="button" onClick={() => onNavigateLegal('refunds')} className="underline hover:text-navy">Refund Policy</button>.
                </div>
              </div>
            </form>
          )}

          {(status === 'processing' || status === 'success') && (
            <div className="text-center animate-in fade-in duration-700">
              <div className="relative w-24 h-24 mx-auto mb-10">
                <div className="absolute inset-0 border-8 border-slate-50 rounded-full"></div>
                <div className={`absolute inset-0 border-8 border-success rounded-full border-t-transparent ${status === 'processing' ? 'animate-spin' : ''}`}></div>
                <div className={`absolute inset-0 flex items-center justify-center text-success text-4xl`}>
                  {status === 'processing' ? '' : <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <h4 className={`text-xl font-black text-navy uppercase mb-3 tracking-tight`}>
                {status === 'processing' ? 'Processing Securely' : 'Payment Verified'}
              </h4>
              <p className="text-[13px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                {status === 'processing' 
                  ? 'Verifying bank details with Stripe...' 
                  : `Success! Unlocking ${targetPlan.name} audit...`}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="w-24 h-24 mx-auto mb-10 bg-rose-50 rounded-full flex items-center justify-center">
                <span className="text-rose-500 text-5xl font-black">✕</span>
              </div>
              <h4 className="text-xl font-black text-navy uppercase mb-3 tracking-tight">Transaction Declined</h4>
              <p className="text-sm text-slate-600 font-bold mb-10 leading-relaxed uppercase tracking-tight px-4">
                We couldn't process your payment. Please verify your card numbers and funds, then try again.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[11px] font-black text-accent uppercase tracking-widest hover:underline decoration-2 underline-offset-8"
              >
                Return to checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;