import React, { useState, useEffect } from 'react';
import { PLANS, PlanId } from '../App';
import Button from './Button';
import { getUpgradeConfig } from '../utils/upgradeLogic';

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

  // Business logic for first purchase vs upgrade
  const upgradeConfig = getUpgradeConfig(paidPlan, selectedTier);
  const paymentAmount = paidPlan ? (upgradeConfig?.priceGBP || 0) : targetPlan.priceGBP;
  const isUpgrade = paidPlan !== null;

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
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={status === 'idle' ? resetAndClose : undefined} />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 text-left">
        
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
            <div className="space-y-4 pt-6">
              <button onClick={() => handleRouteSelect('Spouse')} className="w-full flex items-center justify-between p-8 rounded-2xl border-2 border-slate-100 hover:border-accent hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="text-base font-black text-navy mb-1 uppercase tracking-tight">Spouse / Partner</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Appendix FM Compliance Audit</p>
                </div>
                <svg className="w-6 h-6 text-slate-300 group-hover:text-accent transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => handleRouteSelect('Skilled Worker')} className="w-full flex items-center justify-between p-8 rounded-2xl border-2 border-slate-100 hover:border-accent hover:bg-slate-50 transition-all text-left group">
                <div>
                  <h4 className="text-base font-black text-navy mb-1 uppercase tracking-tight">Skilled Worker</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Salary & Sponsorship Review</p>
                </div>
                <svg className="w-6 h-6 text-slate-300 group-hover:text-accent transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {status === 'idle' && step === 'payment' && (
            <form onSubmit={handleMockPayment} className="space-y-8 pt-6">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200/60 shadow-inner">
                <p className="text-[10px] text-slate-400 mb-4 uppercase font-black tracking-widest leading-none">
                  {isUpgrade ? `UPGRADING TO ${targetPlan.name.toUpperCase()}` : `ORDER SUMMARY: ${targetPlan.name.toUpperCase()}`}
                </p>
                <div className="flex justify-between items-baseline mb-6">
                  <h4 className="text-xl font-black text-navy uppercase tracking-tight">{selectedRoute}</h4>
                  <p className="text-4xl font-black text-navy tracking-tighter">£{paymentAmount}</p>
                </div>
                {isUpgrade && (
                  <div className="pt-5 border-t border-slate-200">
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                      Upgrade from <span className="text-navy">{currentPlan?.name}</span> to <span className="text-navy">{targetPlan.name}</span> – total charged now: <span className="text-accent">£{paymentAmount}</span>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <input required type="text" placeholder="Card number" className="w-full p-6 bg-white border-2 border-slate-100 rounded-[1.25rem] text-base outline-none font-black focus:border-navy transition-colors shadow-sm" />
                <div className="flex gap-4">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-6 bg-white border-2 border-slate-100 rounded-[1.25rem] text-base outline-none font-black focus:border-navy transition-colors shadow-sm" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-6 bg-white border-2 border-slate-100 rounded-[1.25rem] text-base outline-none font-black focus:border-navy transition-colors shadow-sm" />
                </div>
              </div>

              <div className="space-y-5 pt-2">
                <Button type="submit" fullWidth size="lg" variant="navy" className="py-6 shadow-2xl uppercase font-black tracking-widest text-base">
                  Pay £{paymentAmount} & Continue
                </Button>
                <div className="text-[10px] text-center text-slate-400 font-black leading-tight uppercase tracking-[0.1em]">
                  Secure Stripe Checkout • No auto-renewals • One-off payment
                </div>
                <div className="text-[9px] text-center text-slate-300 font-bold leading-tight">
                  By paying, you agree to our{' '}
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
                <div className={`absolute inset-0 flex items-center justify-center text-success text-5xl`}>
                  {status === 'processing' ? '' : <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={6} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <h4 className={`text-2xl font-black text-navy uppercase mb-4 tracking-tight`}>
                {status === 'processing' ? 'Authorizing' : 'Payment Success'}
              </h4>
              <p className="text-sm text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                {status === 'processing' 
                  ? 'Verifying bank credentials...' 
                  : `Tier Unlocked: ${targetPlan.name.toUpperCase()}`}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="w-24 h-24 mx-auto mb-10 bg-rose-50 rounded-full flex items-center justify-center">
                <span className="text-rose-500 text-6xl font-black">✕</span>
              </div>
              <h4 className="text-2xl font-black text-navy uppercase mb-4 tracking-tight">Declined</h4>
              <p className="text-sm text-slate-600 font-black mb-10 uppercase tracking-tight px-6 leading-relaxed">
                Transaction was unsuccessful. Please check your card balance or use another method.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[12px] font-black text-accent uppercase tracking-[0.2em] hover:underline decoration-2 underline-offset-8"
              >
                Back to payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;