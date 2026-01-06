import React, { useState, useEffect } from 'react';
import { QuestionConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

interface QuestionnaireProps {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  isPaid: boolean;
  initialAnswers?: Record<string, any>;
  selectedPlan: string;
  visibleQuestionsList: QuestionConfig[];
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ 
  onComplete, 
  onCancel, 
  isPaid, 
  initialAnswers = {}, 
  selectedPlan,
  visibleQuestionsList 
}) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    // If we've paid for Full or Human, find the first unanswered question from the expanded set
    if (isPaid && (selectedPlan === 'full' || selectedPlan === 'humanReview') && currentStep === 0 && !isReviewing) {
      const firstUnansweredIndex = visibleQuestionsList.findIndex(q => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
    }
  }, [isPaid, selectedPlan, visibleQuestionsList, answers, isReviewing]);

  const activeQuestion = visibleQuestionsList[currentStep];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const toggleMultiSelect = (value: string) => {
    const current = (answers[activeQuestion.id] as string[]) || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    handleAnswer(updated);
  };

  const next = () => {
    if (answers[activeQuestion.id] === undefined && activeQuestion.type !== 'longText' && activeQuestion.type !== 'number') return;
    if (currentStep < visibleQuestionsList.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleEdit = (index: number) => {
    setCurrentStep(index);
    setIsReviewing(false);
  };

  if (isReviewing) {
    return (
      <div className="max-w-[720px] mx-auto pt-8 text-left">
        <h2 className="text-h2 mb-6 text-navy">Review your assessment details</h2>
        <div className="space-y-3 mb-12">
          {visibleQuestionsList.map((q, idx) => (
            <div key={q.id} className="app-card !p-4 flex justify-between items-center group bg-slate-50/50 border-slate-100">
              <div className="flex-grow pr-4">
                <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-widest">{q.label}</p>
                <p className="text-small font-bold text-navy">
                  {Array.isArray(answers[q.id]) 
                    ? (answers[q.id] as string[]).map(v => q.options?.find(o => o.value === v)?.label || v).join(', ') 
                    : String(answers[q.id] === true ? 'Yes' : answers[q.id] === false ? 'No' : 
                        q.options?.find(o => o.value === answers[q.id])?.label || answers[q.id] || 'Not provided')}
                </p>
              </div>
              <button 
                onClick={() => handleEdit(idx)}
                className="text-caption font-black text-accent hover:underline flex-shrink-0"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={() => onComplete(answers)} fullWidth size="lg">
            Complete & generate audit
          </Button>
          <button onClick={() => setIsReviewing(false)} className="text-caption font-black text-slate-400 hover:text-navy uppercase tracking-[0.2em] py-4">
            Back to questions
          </button>
        </div>
      </div>
    );
  }

  if (!activeQuestion) return null;

  const renderField = (q: QuestionConfig) => {
    const val = answers[q.id];
    // For numbers and longText, we allow them to proceed if touched or specifically skipped via next()
    const isAnswered = (q.type === 'longText' || q.type === 'number') ? true : (val !== undefined && val !== "" && (Array.isArray(val) ? val.length > 0 : true));

    switch (q.type) {
      case 'boolean':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <button 
                onClick={() => handleAnswer(true)}
                className={`py-12 rounded-2xl border-2 text-h3 transition-all ${val === true ? 'border-navy bg-navy text-white shadow-xl' : 'border-slate-100 bg-white text-slate-400 hover:border-navy hover:text-navy'}`}
              >
                Yes
              </button>
              <button 
                onClick={() => handleAnswer(false)}
                className={`py-12 rounded-2xl border-2 text-h3 transition-all ${val === false ? 'border-navy bg-navy text-white shadow-xl' : 'border-slate-100 bg-white text-slate-400 hover:border-navy hover:text-navy'}`}
              >
                No
              </button>
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>
              Continue
            </Button>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              {q.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full p-6 text-left border-2 rounded-2xl text-body font-bold transition-all flex justify-between items-center ${val === opt.value ? 'border-navy bg-navy text-white shadow-md' : 'border-slate-100 bg-white text-navy hover:border-slate-200'}`}
                >
                  {opt.label}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${val === opt.value ? 'border-white bg-accent' : 'border-slate-200'}`}>
                    {val === opt.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>
              Continue
            </Button>
          </div>
        );
      case 'multiSelect':
        const currentMulti = (val as string[]) || [];
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {q.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => toggleMultiSelect(opt.value)}
                  className={`p-5 text-left border-2 rounded-2xl text-small font-bold transition-all flex gap-4 items-center ${currentMulti.includes(opt.value) ? 'border-navy bg-navy text-white shadow-md' : 'border-slate-100 bg-white text-navy hover:border-slate-200'}`}
                >
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${currentMulti.includes(opt.value) ? 'bg-accent border-white text-white' : 'border-slate-200 bg-slate-50'}`}>
                    {currentMulti.includes(opt.value) && '✓'}
                  </div>
                  <span className="leading-tight uppercase tracking-tight">{opt.label}</span>
                </button>
              ))}
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>
              Continue
            </Button>
          </div>
        );
      case 'number':
      case 'shortText':
      case 'longText':
        return (
          <div className="space-y-8">
            {q.type === 'longText' ? (
              <textarea 
                value={val || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={q.placeholder}
                className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[32px] focus:border-navy outline-none text-body font-bold min-h-[240px] transition-all shadow-inner leading-relaxed"
              />
            ) : (
              <input 
                type={q.type === 'shortText' ? 'text' : 'number'}
                placeholder={q.placeholder || "Enter details..."}
                value={val || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-navy outline-none text-h3 font-black shadow-inner transition-all text-navy uppercase tracking-tight"
                autoFocus
              />
            )}
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>
              Continue
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = Math.round(((currentStep + 1) / visibleQuestionsList.length) * 100);

  return (
    <div className="max-w-[720px] mx-auto min-h-[550px] flex flex-col pt-4">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-caption text-slate-400 font-black uppercase tracking-[0.2em]">
            Step {currentStep + 1} of {visibleQuestionsList.length} • {activeQuestion.section}
          </span>
          <span className="text-small font-black text-navy">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <h3 className="text-h2 mb-4 text-navy tracking-tight font-black leading-tight">{activeQuestion.label}</h3>
        {activeQuestion.helpText && (
          <p className="text-small text-slate-500 mb-10 leading-relaxed font-bold italic uppercase tracking-tight">
            {activeQuestion.helpText}
          </p>
        )}
        <div className="mb-12">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-auto">
        <button onClick={back} disabled={currentStep === 0} className="text-caption font-black text-slate-400 hover:text-navy disabled:opacity-0 transition-colors px-4 py-2 uppercase tracking-widest">
          Back
        </button>
        <button onClick={onCancel} className="text-caption font-black text-rose-400 hover:text-rose-600 transition-colors px-4 py-2 uppercase tracking-widest">
          Quit check
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;