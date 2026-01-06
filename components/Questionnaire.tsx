import React, { useState, useEffect } from 'react';
import { QuestionConfig } from '../types';
import { QUESTIONS } from '../data/questions';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

interface QuestionnaireProps {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  isPaid: boolean;
  initialAnswers?: Record<string, any>;
  selectedPlan: string;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onCancel, isPaid, initialAnswers = {}, selectedPlan }) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);

  // Stage 1 subset: Core identity and route questions
  const stage1Ids = ['nationality', 'current_location', 'immigration_status', 'visa_route', 'previous_refusals', 'income_band'];

  const getVisibleQuestions = () => {
    return QUESTIONS.filter(q => {
      const route = answers['visa_route'] === 'spouse' ? 'spouse' : answers['visa_route'] === 'skilled' ? 'skilled' : 'any';
      // If they haven't paid or chose basic, only show stage 1.
      if (!isPaid || selectedPlan === 'basic') {
        return stage1Ids.includes(q.id) && q.showIf({ tier: 'full', route, answers });
      }
      // Full/Pro tiers see all valid questions for their route
      return q.showIf({ tier: 'full', route, answers });
    });
  };

  const visibleQuestions = getVisibleQuestions();

  // Handle re-entry if isPaid flips to true while in the questionnaire
  useEffect(() => {
    if (isPaid && currentStep === 0 && !isReviewing) {
      // Auto-jump to the first unanswered question in the newly expanded list
      const firstUnansweredIndex = visibleQuestions.findIndex(q => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
    }
  }, [isPaid, visibleQuestions, answers, isReviewing]);

  const activeQuestion = visibleQuestions[currentStep];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const toggleMultiSelect = (value: string) => {
    const current = (answers[activeQuestion.id] as string[]) || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    handleAnswer(updated);
  };

  const next = () => {
    if (answers[activeQuestion.id] === undefined) return;
    if (currentStep < visibleQuestions.length - 1) {
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
      <div className="max-w-[720px] mx-auto pt-8">
        <h2 className="text-h2 mb-6 text-navy">Review your answers</h2>
        <div className="space-y-4 mb-10">
          {visibleQuestions.map((q, idx) => (
            <div key={q.id} className="app-card !p-4 flex justify-between items-center group">
              <div>
                <p className="text-caption text-slate-400 mb-1">{q.label}</p>
                <p className="text-small font-bold text-navy">
                  {Array.isArray(answers[q.id]) 
                    ? (answers[q.id] as string[]).join(', ') 
                    : String(answers[q.id] === true ? 'Yes' : answers[q.id] === false ? 'No' : answers[q.id] || 'Not answered')}
                </p>
              </div>
              <button 
                onClick={() => handleEdit(idx)}
                className="text-small font-bold text-accent hover:underline uppercase tracking-widest"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={() => onComplete(answers)} fullWidth size="lg">
            Confirm & Continue
          </Button>
          <button onClick={() => setIsReviewing(false)} className="text-small font-bold text-slate-400 uppercase tracking-widest py-3">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!activeQuestion && visibleQuestions.length > 0) {
    return (
      <div className="py-20 text-center app-card">
        <h3 className="text-h3 text-rose-600 mb-4">Assessment Flow Interrupted</h3>
        <p className="text-body mb-8">We encountered a configuration error at this step. Please refresh or return home.</p>
        <Button onClick={onCancel} variant="outline">Back to Home</Button>
      </div>
    );
  }

  if (!activeQuestion) return null;

  const renderField = (q: QuestionConfig) => {
    const val = answers[q.id];

    switch (q.type) {
      case 'boolean':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <button 
                onClick={() => handleAnswer(true)}
                className={`py-8 rounded-2xl border-2 text-h3 transition-all ${val === true ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-navy hover:text-navy'}`}
              >
                Yes
              </button>
              <button 
                onClick={() => handleAnswer(false)}
                className={`py-8 rounded-2xl border-2 text-h3 transition-all ${val === false ? 'border-navy bg-navy text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-navy hover:text-navy'}`}
              >
                No
              </button>
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={val === undefined}>
              Next question
            </Button>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {q.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full p-6 text-left border-2 rounded-2xl text-body font-bold transition-all flex justify-between items-center ${val === opt.value ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  {opt.label}
                  {val === opt.value && <span className="text-accent">●</span>}
                </button>
              ))}
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={val === undefined}>
              Next question
            </Button>
          </div>
        );
      case 'multiSelect':
        const currentMulti = (val as string[]) || [];
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {q.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => toggleMultiSelect(opt.value)}
                  className={`w-full p-5 text-left border-2 rounded-2xl text-body font-bold transition-all flex gap-4 items-center ${currentMulti.includes(opt.value) ? 'border-accent bg-accent/5' : 'border-slate-100 bg-white'}`}
                >
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${currentMulti.includes(opt.value) ? 'bg-accent border-accent text-white' : 'border-slate-200'}`}>
                    {currentMulti.includes(opt.value) && '✓'}
                  </div>
                  {opt.label}
                </button>
              ))}
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={currentMulti.length === 0}>
              Next question
            </Button>
          </div>
        );
      case 'currency':
      case 'number':
      case 'shortText':
      case 'longText':
        return (
          <div className="space-y-6">
            {q.type === 'longText' ? (
              <textarea 
                value={val || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={q.placeholder}
                className="w-full p-6 bg-white border-2 border-slate-200 rounded-2xl focus:border-navy outline-none text-body font-semibold min-h-[150px]"
              />
            ) : (
              <input 
                type={q.type === 'shortText' ? 'text' : 'number'}
                placeholder={q.placeholder || "Type your answer..."}
                value={val || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-6 bg-white border-2 border-slate-200 rounded-2xl focus:border-navy outline-none text-h3 font-semibold shadow-inner"
                autoFocus
              />
            )}
            <Button onClick={next} fullWidth size="lg" disabled={val === undefined || val === ""}>
              Next question
            </Button>
          </div>
        );
      default:
        return <div className="p-4 bg-amber-50 text-amber-700 rounded-xl">Renderer for {q.type} not found.</div>;
    }
  };

  const progress = Math.round(((currentStep + 1) / visibleQuestions.length) * 100);

  return (
    <div className="max-w-[720px] mx-auto min-h-[550px] flex flex-col pt-4">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-caption text-slate-400">
            {isPaid ? (selectedPlan === 'basic' ? 'Basic Summary' : 'Professional Audit') : 'Pre-Check Screen'} • Step {currentStep + 1} of {visibleQuestions.length}
          </span>
          <span className="text-small font-bold text-navy">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="text-h3 mb-4 text-navy tracking-tight">{activeQuestion.label}</h3>
        {activeQuestion.helpText && (
          <p className="text-small text-slate-500 mb-10 leading-relaxed font-medium">
            {activeQuestion.helpText}
          </p>
        )}
        <div className="mb-12">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-auto">
        <button onClick={back} disabled={currentStep === 0} className="text-small font-bold text-slate-400 hover:text-navy disabled:opacity-0 transition-colors px-4 py-2 uppercase tracking-widest">
          Back
        </button>
        <button onClick={onCancel} className="text-small font-bold text-rose-400 hover:text-rose-600 transition-colors px-4 py-2 uppercase tracking-widest">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;