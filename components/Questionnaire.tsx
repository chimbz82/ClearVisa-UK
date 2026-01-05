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

  // Define which questions belong to which stage
  const visibleQuestions = QUESTIONS.filter(q => {
    // If not paid, only show quick check questions
    if (!isPaid) return q.showIf({ tier: 'basic', route: 'any', answers }) && (q.id === 'nationality' || q.id === 'current_location' || q.id === 'immigration_status' || q.id === 'visa_route' || q.id === 'previous_refusals' || q.id === 'income_band');
    
    // If paid, show everything relevant
    const route = answers['visa_route'] === 'spouse' ? 'spouse' : answers['visa_route'] === 'skilled' ? 'skilled' : 'any';
    return q.showIf({ tier: 'full', route, answers });
  });

  // Reset step when paid status changes (to start second stage from first new question)
  useEffect(() => {
    if (isPaid) {
      // Find index of first question not answered or first question in stage 2
      // For simplicity, we just reset to 0 and filter will handle the jump
      setCurrentStep(0);
    }
  }, [isPaid]);

  const activeQuestion = visibleQuestions[currentStep];

  if (!activeQuestion) {
    // Should not happen if filtered correctly
    return null;
  }

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
    const val = answers[q.id] || "";

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
                className={`w-full p-5 text-left border-2 rounded-2xl font-semibold text-lg transition-all ${
                  val === opt.value ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'
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
              value={val}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-navy outline-none text-xl font-medium"
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

  const progress = Math.round(((currentStep + 1) / visibleQuestions.length) * 100);

  return (
    <div className="py-8 md:py-16 max-w-[720px] mx-auto min-h-[500px] flex flex-col">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[13px] font-black uppercase text-slate-400 tracking-widest">
            {isPaid ? 'Full Assessment' : 'Quick Check'} • Question {currentStep + 1} of {visibleQuestions.length}
          </span>
          <span className="text-[13px] font-bold text-navy">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="mb-3 leading-tight">{activeQuestion.label}</h3>
        {activeQuestion.helpText && (
          <p className="text-slate-500 text-[15px] mb-8 leading-relaxed font-medium">
            {activeQuestion.helpText}
          </p>
        )}
        <div className="mb-12">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-auto">
        <Button onClick={back} variant="ghost" disabled={currentStep === 0}>Back</Button>
        <Button onClick={onCancel} variant="ghost" className="text-rose-500 hover:bg-rose-50">Cancel</Button>
      </div>
    </div>
  );
};

export default Questionnaire;