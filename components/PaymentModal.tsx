import React, { useState, useEffect } from 'react';
import { PLANS, PlanId } from '../App';
import Button from './Button';
import { getUpgradePrice, getUpgradeLabel } from '../config/planLimits';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (route: string, tier: string) => void;
  selectedTier: PlanId;
  paidPlan: PlanId | null;
  currentRoute?: string;
  onNavigateLegal: (view: any) => void;
}

type CheckoutStep = 'select-route' | 'payment';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentComplete, 
  selectedTier, 
  paidPlan, 
  currentRoute,
  onNavigateLegal 
}) => {
  const [step, setStep] = useState<CheckoutStep>('select-route');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const targetPlan = PLANS.find(p => p.id === selectedTier) || PLANS[0];
  const paymentAmount = getUpgradePrice(paidPlan, selectedTier);
  const isUpgrade = paidPlan !== null;
  const modalTitle = getUpgradeLabel(paidPlan, selectedTier);

  useEffect(() => {
    if (isOpen) {
      if (isUpgrade && currentRoute) {
        setSelectedRoute(currentRoute);
        setStep('payment');
      } else {
        setStep('select-route');
        setSelectedRoute(null);
      }
      setStatus('idle');
    }
  }, [isOpen, isUpgrade, currentRoute]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        const routeName = selectedRoute || currentRoute || 'Spouse Visa';
        onPaymentComplete?.(routeName, selectedTier);
        onClose?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onPaymentComplete, onClose, selectedRoute, selectedTier, currentRoute]);

  if (!isOpen) return null;

  const handleRouteSelect = (route: string) => {
    const routeName = route === 'Spouse' ? 'Spouse Visa' : 'Skilled Worker Visa';
    setSelectedRoute(routeName);
    setStep('payment');
  };

  const handleMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setTimeout(() => {
       // 95% success rate simulation
       if (Math.random() > 0.05) {
         setStatus('success');
       } else {
         setStatus('error');
       }
    }, 2000);
  };

  const resetAndClose = () => {
    if (status === 'processing') return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-md" onClick={status === 'idle' ? resetAndClose : undefined} />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 text-left">
        
        {status === 'idle' && (
          <div className="px-8 pt-8 pb-2 flex justify-between items-center">
            <h3 className="text-base font-black text-navy uppercase tracking-tight">
              {step === 'select-route' ? 'Target Visa Route' : modalTitle}
            </h3>
            <button onClick={resetAndClose} className="text-slate-400 hover:text-navy p-2 rounded-full hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
            <form onSubmit={handleMockPayment} className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 mb-2 uppercase font-black tracking-[0.2em]">
                  {isUpgrade ? 'UPGRADE ORDER SUMMARY' : 'ORDER SUMMARY'}
                </p>
                {isUpgrade && (
                  <p className="text-xs text-slate-500 mb-3 font-bold uppercase tracking-tight">
                    Upgrading from {PLANS.find(p => p.id === paidPlan)?.name}
                  </p>
                )}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-black text-navy uppercase tracking-tight">{targetPlan.name}</h4>
                  <p className="text-2xl font-black text-navy">£{paymentAmount}</p>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Route: {selectedRoute || currentRoute} • {isUpgrade ? 'One-time upgrade' : 'One-time fee'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input required type="text" placeholder="CARD NUMBER" className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl text-base outline-none font-black focus:border-navy transition-colors shadow-sm uppercase tracking-widest pl-12" />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                  </div>
                </div>
                <div className="flex gap-4">
                  <input required type="text" placeholder="MM / YY" className="w-1/2 p-5 bg-white border-2 border-slate-100 rounded-2xl text-base outline-none font-black focus:border-navy transition-colors shadow-sm uppercase tracking-widest" />
                  <input required type="text" placeholder="CVC" className="w-1/2 p-5 bg-white border-2 border-slate-100 rounded-2xl text-base outline-none font-black focus:border-navy transition-colors shadow-sm uppercase tracking-widest" />
                </div>
              </div>

              <div className="space-y-5 pt-2">
                <Button type="submit" fullWidth size="lg" variant="navy" className="py-6 shadow-2xl uppercase font-black tracking-widest text-base hover:scale-[1.02]">
                  Pay £{paymentAmount} & Confirm
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black leading-tight uppercase tracking-[0.2em]">
                   <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                   Secure Stripe Checkout • encrypted
                </div>
                <div className="text-[9px] text-center text-slate-300 font-bold leading-tight uppercase tracking-tight border-t border-slate-50 pt-4">
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
                <div className={`absolute inset-0 flex items-center justify-center text-success transition-transform duration-500 ${status === 'success' ? 'scale-110' : 'scale-100'}`}>
                  {status === 'success' && <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth={5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <h4 className={`text-2xl font-black text-navy uppercase mb-4 tracking-tight`}>
                {status === 'processing' ? 'Authorizing' : 'Payment Success'}
              </h4>
              <p className="text-sm text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                {status === 'processing' ? 'Securing transaction...' : `${targetPlan.name.toUpperCase()} Activated`}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 mx-auto mb-8 bg-rose-50 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h4 className="text-2xl font-black text-navy uppercase mb-4 tracking-tight">Payment Declined</h4>
              <p className="text-sm text-slate-500 font-bold mb-8 px-4 uppercase tracking-tight">Your bank declined the transaction. Please try another card.</p>
              <Button onClick={() => setStatus('idle')} fullWidth variant="outline" className="py-4 font-black uppercase">Try Again</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;