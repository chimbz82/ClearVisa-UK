import React, { useState } from 'react';
import { QuestionConfig } from '../types';
import Button from './Button';

interface QuestionnaireProps {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  visibleQuestionsList: QuestionConfig[];
  initialAnswers?: Record<string, any>;
  paidPlan?: string | null;
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
    if (activeQuestion.type === 'boolean') {
      return val === true || val === false;
    }
    if (activeQuestion.type === 'multiSelect') {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== undefined && val !== null && val !== '';
  };

  const next = () => {
    if (!isAnswered()) return;
    
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setIsReviewing(true);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleEdit = (index: number) => {
    setCurrentStep(index);
    setIsReviewing(false);
  };

  if (isReviewing) {
    return (
      <div className="max-w-2xl mx-auto pt-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-navy">Review Your Answers</h2>
          <p className="text-sm text-slate-500">
            You answered {totalQuestions} questions for your {paidPlan?.toUpperCase()} audit.
          </p>
        </div>
        
        <div className="space-y-3 mb-10">
          {visibleQuestionsList.map((q, idx) => (
            <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center hover:border-navy transition-all">
              <div className="flex-grow pr-4">
                <p className="text-xs text-slate-400 mb-1 font-bold uppercase">
                  {q.section} • {q.label}
                </p>
                <p className="text-sm font-bold text-navy">
                  {Array.isArray(answers[q.id]) 
                    ? (answers[q.id] as string[]).map(v => 
                        q.options?.find(o => o.value === v)?.label || v
                      ).join(', ') 
                    : String(
                        answers[q.id] === true ? 'Yes' : 
                        answers[q.id] === false ? 'No' : 
                        q.options?.find(o => o.value === answers[q.id])?.label || 
                        answers[q.id] || 
                        '—'
                      )}
                </p>
              </div>
              <button 
                onClick={() => handleEdit(idx)} 
                className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg uppercase tracking-wide transition-all"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        
        <Button onClick={() => onComplete(answers)} fullWidth size="lg">
          Generate Report
        </Button>
        
        <button 
          onClick={onCancel} 
          className="mt-4 w-full text-center text-xs text-slate-400 font-bold hover:text-navy uppercase tracking-wide"
        >
          Cancel & Return Home
        </button>
      </div>
    );
  }

  if (!activeQuestion) return null;

  const val = answers[activeQuestion.id];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Plan Badge */}
      {paidPlan && (
        <div className="mb-6 text-center">
          <span className="inline-block px-4 py-2 bg-navy text-white rounded-full text-xs font-bold uppercase tracking-widest">
            {paidPlan.replace('_', ' ')} Plan • {totalQuestions} Questions
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="text-center mb-8">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">
          {activeQuestion.section} • Step {currentStep + 1} of {totalQuestions}
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-md mx-auto">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 mb-6 shadow-sm">
        <h3 className="text-2xl font-bold text-navy mb-2">
          {activeQuestion.label}
        </h3>
        {activeQuestion.helpText && (
          <p className="text-sm text-slate-500 mb-6">
            {activeQuestion.helpText}
          </p>
        )}

        <div className="space-y-3">
          {/* Single Select */}
          {activeQuestion.type === 'singleSelect' && activeQuestion.options?.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                val === opt.value 
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-md scale-[1.02]' 
                  : 'border-slate-200 hover:border-navy hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  val === opt.value ? 'border-green-500 bg-green-500' : 'border-slate-300'
                }`}>
                  {val === opt.value && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>{opt.label}</span>
              </div>
            </button>
          ))}

          {/* Multi Select */}
          {activeQuestion.type === 'multiSelect' && activeQuestion.options?.map(opt => {
            const selected = Array.isArray(val) && val.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const current = (val as string[]) || [];
                  const updated = selected 
                    ? current.filter(v => v !== opt.value) 
                    : [...current, opt.value];
                  handleAnswer(updated);
                }}
                className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                  selected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                    : 'border-slate-200 hover:border-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                  }`}>
                    {selected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span>{opt.label}</span>
                </div>
              </button>
            );
          })}

          {/* Boolean */}
          {activeQuestion.type === 'boolean' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className={`p-6 rounded-xl border-2 font-bold transition-all ${
                  val === true 
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md scale-105' 
                    : 'border-slate-200 hover:border-navy hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl mb-2">✓</div>
                <div>Yes</div>
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`p-6 rounded-xl border-2 font-bold transition-all ${
                  val === false 
                    ? 'border-red-500 bg-red-50 text-red-700 shadow-md scale-105' 
                    : 'border-slate-200 hover:border-navy hover:bg-slate-50'
                }`}
              >
                <div className="text-3xl mb-2">✕</div>
                <div>No</div>
              </button>
            </div>
          )}

          {/* Text Inputs */}
          {activeQuestion.type === 'shortText' && (
            <input
              type="text"
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={activeQuestion.placeholder || 'Enter your answer...'}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium transition-all"
            />
          )}

          {activeQuestion.type === 'longText' && (
            <textarea
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={activeQuestion.placeholder || 'Enter your answer...'}
              rows={4}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium transition-all resize-none"
            />
          )}

          {/* Number/Currency */}
          {(activeQuestion.type === 'number' || activeQuestion.type === 'currency') && (
            <input
              type="number"
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={activeQuestion.placeholder || '0'}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium transition-all"
            />
          )}

          {/* Date */}
          {activeQuestion.type === 'date' && (
            <input
              type="date"
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium transition-all"
            />
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mb-4">
        {currentStep > 0 && (
          <Button onClick={back} variant="outline" fullWidth size="lg">
            ← Previous
          </Button>
        )}
        <Button 
          onClick={next} 
          fullWidth 
          size="lg" 
          disabled={!isAnswered()}
          className={!isAnswered() ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {currentStep === totalQuestions - 1 ? 'Review Answers' : 'Next Step →'}
        </Button>
      </div>

      <button 
        onClick={onCancel} 
        className="w-full text-center text-xs text-slate-400 font-bold hover:text-navy uppercase tracking-wide transition-colors"
      >
        Exit Assessment
      </button>
    </div>
  );
};

export default Questionnaire;