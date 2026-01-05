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

  // Define Stage 1 IDs explicitly
  const stage1Ids = ['nationality', 'current_location', 'immigration_status', 'visa_route', 'previous_refusals', 'income_band'];

  // Dynamic question filtering based on funnel stage
  const visibleQuestions = QUESTIONS.filter(q => {
    const route = answers['visa_route'] === 'spouse' ? 'spouse' : answers['visa_route'] === 'skilled' ? 'skilled' : 'any';
    const isSharedOrRoute = q.showIf({ tier: 'full', route, answers });
    
    if (!isPaid) {
      // Stage 1: only high-signal questions
      return stage1Ids.includes(q.id) && isSharedOrRoute;
    }
    
    // Stage 2: everything else that's relevant
    return isSharedOrRoute;
  });

  // When payment is successful, we start from the first question that doesn't have an answer
  useEffect(() => {
    if (isPaid) {
      const firstUnansweredIndex = visibleQuestions.findIndex(q => !answers[q.id]);
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
    }
  }, [isPaid]);

  const activeQuestion = visibleQuestions[currentStep];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const next = () => {
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
              onClick={() => { handleAnswer(true); next(); }}
              variant={val === true ? 'navy' : 'outline'}
              size="lg"
            >
              Yes
            </Button>
            <Button 
              onClick={() => { handleAnswer(false); next(); }}
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
                onClick={() => { handleAnswer(opt.value); next(); }}
                className={`w-full p-5 text-left border-2 rounded-2xl font-bold text-lg transition-all ${
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
          <div className="space-y-4">
            <input 
              type={q.type === 'shortText' ? 'text' : 'number'}
              placeholder={q.placeholder}
              value={val || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-navy outline-none text-xl font-black shadow-inner"
              autoFocus
            />
            <Button onClick={next} fullWidth size="lg" disabled={!val}>
              Continue
            </Button>
          </div>
        );
      default: return null;
    }
  };

  if (!activeQuestion) return null;

  const progress = Math.round(((currentStep + 1) / visibleQuestions.length) * 100);

  return (
    <div className="py-8 md:py-16 max-w-[720px] mx-auto min-h-[600px] flex flex-col">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[13px] font-black uppercase text-slate-400 tracking-widest leading-none">
            {isPaid ? 'Professional Assessment' : 'Free Quick Check'} • {currentStep + 1} of {visibleQuestions.length}
          </span>
          <span className="text-[13px] font-black text-navy leading-none">{progress}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-navy transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="mb-4 text-3xl font-black text-navy leading-tight uppercase tracking-tight">{activeQuestion.label}</h3>
        {activeQuestion.helpText && (
          <p className="text-slate-500 text-[15px] mb-10 leading-relaxed font-bold italic bg-navy/5 p-5 rounded-2xl border-l-4 border-accent">
            {activeQuestion.helpText}
          </p>
        )}
        <div className="mb-12">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-auto">
        <Button onClick={back} variant="ghost" disabled={currentStep === 0}>Back</Button>
        <Button onClick={onCancel} variant="ghost" className="text-rose-500 hover:bg-rose-50">Cancel Check</Button>
      </div>
    </div>
  );
};

export default Questionnaire;