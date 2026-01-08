import React, { useState } from 'react';
import { QuestionConfig } from '../types';
import Button from './Button';
import { PLANS, PlanId } from '../config/pricingConfig';

interface QuestionnaireProps {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  visibleQuestionsList: QuestionConfig[];
  initialAnswers?: Record<string, any>;
  paidPlan?: PlanId | null;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ 
  onComplete, 
  onCancel, 
  visibleQuestionsList,
  initialAnswers = {},
  paidPlan
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);

  const activeQuestion = visibleQuestionsList[currentStep];
  const totalQuestions = visibleQuestionsList.length;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const isAnswered = () => {
    const val = answers[activeQuestion.id];
    if (activeQuestion.type === 'boolean') return val === true || val === false;
    if (activeQuestion.type === 'multiSelect') return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== null && val !== '';
  };

  const next = () => {
    if (!isAnswered()) return;
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsReviewing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (index: number) => {
    setCurrentStep(index);
    setIsReviewing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProgressLabel = () => {
    if (!paidPlan || paidPlan === 'basic') return 'BASIC PRE-CHECK · UP TO 20 QUESTIONS';
    if (paidPlan === 'full') return 'PROFESSIONAL AUDIT · AROUND 20–40 QUESTIONS';
    if (paidPlan === 'pro_plus') return 'PROFESSIONAL PLUS · 40+ QUESTIONS';
    return 'PRE-CHECK';
  };

  if (isReviewing) {
    return (
      <div className="max-w-4xl mx-auto pt-4 text-left animate-in fade-in duration-500">
        <div className="mb-8 text-center">
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-1 block">Verification Required</span>
          <h2 className="text-3xl font-black text-navy uppercase tracking-tight mb-2">Review Your Audit Data</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-tight">
            Confirm your {totalQuestions} responses before locking.
          </p>
        </div>
        
        {/* Compact Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {visibleQuestionsList.map((q, idx) => (
            <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:border-navy transition-all group shadow-sm min-h-[80px]">
              <div className="flex-grow pr-3">
                <p className="text-[11px] text-slate-400 mb-1 font-semibold uppercase tracking-tight">
                  {q.label}
                </p>
                <p className="text-[14px] font-bold text-navy uppercase tracking-tight leading-tight">
                  {Array.isArray(answers[q.id]) 
                    ? (answers[q.id] as string[]).map(v => q.options?.find(o => o.value === v)?.label || v).join(', ') 
                    : String(
                        answers[q.id] === true ? 'AFFIRMATIVE' : 
                        answers[q.id] === false ? 'NEGATIVE' : 
                        q.options?.find(o => o.value === answers[q.id])?.label || answers[q.id] || '—'
                      ).toUpperCase()}
                </p>
              </div>
              <button 
                onClick={() => handleEdit(idx)} 
                className="p-2 text-slate-300 hover:text-accent transition-colors flex-shrink-0"
                title="Edit Response"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-navy p-8 rounded-[2rem] shadow-2xl text-center border border-white/10">
          <h3 className="text-xl font-black text-white uppercase tracking-widest mb-3">Finalize Assessment</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-tight mb-8">Lock answers and generate compliance report.</p>
          <Button onClick={() => onComplete(answers)} fullWidth size="lg" className="py-5 shadow-xl uppercase font-black tracking-[0.2em] text-base bg-success hover:bg-success/90">
            Show Verdict
          </Button>
        </div>
        
        <button onClick={onCancel} className="mt-8 w-full text-center text-[10px] text-slate-400 font-black hover:text-navy uppercase tracking-[0.25em] transition-colors py-4">
          Exit assessment
        </button>
      </div>
    );
  }

  if (!activeQuestion) return null;
  const val = answers[activeQuestion.id];

  return (
    <div className="max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 text-center">
        <span className="inline-block px-4 py-2 bg-navy text-white rounded-full text-[10px] font-black uppercase tracking-widest">
          {getProgressLabel()}
        </span>
      </div>

      <div className="text-center mb-12">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">
          {activeQuestion.section.toUpperCase()} COMPLIANCE
        </p>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden max-w-sm mx-auto shadow-inner">
          <div 
            className="h-full bg-success transition-all duration-700 ease-out shadow-[0_0_10px_rgba(43,178,76,0.5)]"
            style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-10 md:p-14 rounded-[3rem] border-2 border-slate-100 mb-10 shadow-xl relative overflow-hidden group text-left">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-50"></div>
        <h3 className="text-3xl font-black text-navy mb-4 uppercase tracking-tight leading-[1.1]">
          {activeQuestion.label}
        </h3>
        {activeQuestion.helpText && (
          <p className="text-base text-slate-500 mb-10 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-6">
            {activeQuestion.helpText}
          </p>
        )}

        <div className="space-y-4">
          {activeQuestion.type === 'singleSelect' && activeQuestion.options?.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`w-full p-6 rounded-2xl border-2 text-left font-black transition-all group/btn ${
                val === opt.value 
                  ? 'border-success bg-emerald-50 text-emerald-700 shadow-md scale-[1.01]' 
                  : 'border-slate-100 bg-white hover:border-navy hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  val === opt.value ? 'border-success bg-success' : 'border-slate-200 group-hover/btn:border-navy'
                }`}>
                  {val === opt.value && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="uppercase tracking-tight text-base">{opt.label}</span>
              </div>
            </button>
          ))}

          {activeQuestion.type === 'boolean' && (
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleAnswer(true)}
                className={`p-10 rounded-3xl border-2 font-black transition-all text-center group/yes ${
                  val === true ? 'border-success bg-emerald-50 text-emerald-700 shadow-xl scale-[1.03]' : 'border-slate-100 bg-white hover:border-navy'
                }`}
              >
                <div className={`text-5xl mb-4 transition-transform group-active/yes:scale-90 ${val === true ? 'animate-bounce' : ''}`}>✓</div>
                <div className="uppercase tracking-[0.2em] text-xs">Affirmative</div>
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`p-10 rounded-3xl border-2 font-black transition-all text-center group/no ${
                  val === false ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xl scale-[1.03]' : 'border-slate-100 bg-white hover:border-navy'
                }`}
              >
                <div className={`text-5xl mb-4 transition-transform group-active/no:scale-90 ${val === false ? 'animate-bounce' : ''}`}>✕</div>
                <div className="uppercase tracking-[0.2em] text-xs">Negative</div>
              </button>
            </div>
          )}

          {['shortText', 'longText', 'number', 'currency', 'date'].includes(activeQuestion.type) && (
            <div className="relative pt-2">
              {activeQuestion.type === 'currency' && <div className="absolute left-6 top-[54%] font-black text-slate-400 text-xl">£</div>}
              <input
                type={activeQuestion.type === 'date' ? 'date' : activeQuestion.type === 'number' || activeQuestion.type === 'currency' ? 'number' : 'text'}
                value={val || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={activeQuestion.placeholder || 'TYPE HERE...'}
                className={`w-full p-7 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-success focus:bg-white outline-none font-black text-lg transition-all shadow-inner uppercase tracking-tight ${activeQuestion.type === 'currency' ? 'pl-12' : ''}`}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {currentStep > 0 && (
          <Button onClick={back} variant="outline" fullWidth size="lg" className="py-6 uppercase font-black tracking-widest border-2">
            ← PREVIOUS
          </Button>
        )}
        <Button 
          onClick={next} 
          fullWidth 
          size="lg" 
          variant="navy"
          disabled={!isAnswered()}
          className={`py-6 uppercase font-black tracking-widest transition-all ${!isAnswered() ? 'opacity-30 grayscale cursor-not-allowed' : 'shadow-2xl shadow-navy/20 hover:translate-y-[-2px]'}`}
        >
          {currentStep === totalQuestions - 1 ? 'REVIEW FINAL AUDIT' : 'SAVE & CONTINUE →'}
        </Button>
      </div>

      <button onClick={onCancel} className="w-full text-center text-[10px] text-slate-400 font-black hover:text-navy uppercase tracking-[0.3em] transition-colors py-4">
        Exit assessment
      </button>
    </div>
  );
};

export default Questionnaire;