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
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onCancel, isPaid, initialAnswers = {} }) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);

  // Stage 1 filter
  const stage1Ids = ['nationality', 'current_location', 'immigration_status', 'visa_route', 'previous_refusals', 'income_band'];

  // Calculate visible questions based on current stage and answered logic
  const getVisibleQuestions = () => {
    return QUESTIONS.filter(q => {
      const route = answers['visa_route'] === 'spouse' ? 'spouse' : answers['visa_route'] === 'skilled' ? 'skilled' : 'any';
      const showIfResult = q.showIf({ tier: 'full', route, answers });
      
      if (!isPaid) {
        return stage1Ids.includes(q.id) && showIfResult;
      }
      return showIfResult;
    });
  };

  const visibleQuestions = getVisibleQuestions();

  // Defensive: jump to first unanswered question when paying
  useEffect(() => {
    if (isPaid && currentStep === 0) {
      const firstUnansweredIndex = visibleQuestions.findIndex(q => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
    }
  }, [isPaid, visibleQuestions, answers]);

  const activeQuestion = visibleQuestions[currentStep];

  // Defensive: Fallback for missing config
  if (!activeQuestion && visibleQuestions.length > 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-h3 text-rose-600 mb-4">Assessment Loading Error</h3>
        <p className="text-body mb-8">We encountered a temporary issue loading the next question.</p>
        <Button onClick={onCancel} variant="outline">Back to Home</Button>
      </div>
    );
  }

  if (!activeQuestion) return null;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const next = () => {
    if (answers[activeQuestion.id] === undefined) return;
    if (currentStep < visibleQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderField = (q: QuestionConfig) => {
    const val = answers[q.id];

    switch (q.type) {
      case 'boolean':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => { handleAnswer(true); setTimeout(next, 200); }}
              variant={val === true ? 'navy' : 'outline'}
              size="lg"
            >
              Yes
            </Button>
            <Button 
              onClick={() => { handleAnswer(false); setTimeout(next, 200); }}
              variant={val === false ? 'navy' : 'outline'}
              size="lg"
            >
              No
            </Button>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="space-y-3">
            {q.options?.map(opt => (
              <button 
                key={opt.value}
                onClick={() => { handleAnswer(opt.value); setTimeout(next, 200); }}
                className={`w-full p-6 text-left border-2 rounded-2xl text-body font-bold transition-all ${
                  val === opt.value ? 'border-navy bg-navy/5 text-navy shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );
      case 'currency':
      case 'number':
      case 'shortText':
        return (
          <div className="space-y-6">
            <input 
              type={q.type === 'shortText' ? 'text' : 'number'}
              placeholder={q.placeholder || "Type your answer..."}
              value={val || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-6 bg-white border-2 border-slate-200 rounded-2xl focus:border-navy outline-none text-h3 font-semibold shadow-inner transition-colors"
              autoFocus
            />
            <Button onClick={next} fullWidth size="lg" disabled={val === undefined || val === ""}>
              Next Question
            </Button>
          </div>
        );
      default: return null;
    }
  };

  const progress = Math.round(((currentStep + 1) / visibleQuestions.length) * 100);

  return (
    <div className="max-w-[720px] mx-auto min-h-[500px] flex flex-col pt-8">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-caption text-slate-400">
            {isPaid ? 'Full Audit' : 'Initial Screen'} • {currentStep + 1} of {visibleQuestions.length}
          </span>
          <span className="text-body-sm font-bold text-navy">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="text-h3 mb-3 text-navy tracking-tight">{activeQuestion.label}</h3>
        {activeQuestion.helpText && (
          <p className="text-body-sm text-slate-500 mb-8 leading-relaxed font-medium">
            {activeQuestion.helpText}
          </p>
        )}
        <div className="mb-12">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-auto">
        <button onClick={back} disabled={currentStep === 0} className="text-body-sm font-bold text-slate-400 hover:text-navy disabled:opacity-0 transition-colors px-4 py-2">
          Back
        </button>
        <button onClick={onCancel} className="text-body-sm font-bold text-rose-400 hover:text-rose-600 transition-colors px-4 py-2">
          Cancel Check
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;