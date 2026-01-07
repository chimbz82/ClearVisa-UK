import React, { useState, useEffect } from 'react';
import { QuestionConfig } from '../types';
import Button from './Button';

interface QuestionnaireProps {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  visibleQuestionsList: QuestionConfig[];
  initialAnswers?: Record<string, any>;
  startStep?: number;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ 
  onComplete, 
  onCancel, 
  visibleQuestionsList,
  initialAnswers = {},
  startStep = 0
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(startStep);
  const [isReviewing, setIsReviewing] = useState(false);

  const activeQuestion = visibleQuestionsList[currentStep];

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
    
    if (currentStep < visibleQuestionsList.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
          <p className="text-sm text-slate-500">Verify before generating report.</p>
        </div>
        
        <div className="space-y-3 mb-10">
          {visibleQuestionsList.map((q, idx) => (
            <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
              <div className="flex-grow pr-4">
                <p className="text-xs text-slate-400 mb-1 font-bold uppercase">{q.section} • {q.label}</p>
                <p className="text-sm font-bold text-navy">
                  {Array.isArray(answers[q.id]) 
                    ? (answers[q.id] as string[]).map(v => q.options?.find(o => o.value === v)?.label || v).join(', ') 
                    : String(answers[q.id] === true ? 'Yes' : answers[q.id] === false ? 'No' : 
                        q.options?.find(o => o.value === answers[q.id])?.label || answers[q.id] || '—')}
                </p>
              </div>
              <button 
                onClick={() => handleEdit(idx)} 
                className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg uppercase tracking-wide"
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
          Cancel
        </button>
      </div>
    );
  }

  if (!activeQuestion) return null;

  const val = answers[activeQuestion.id];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="text-center mb-8">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">
          {activeQuestion.section} • Question {currentStep + 1} of {visibleQuestionsList.length}
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-md mx-auto">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / visibleQuestionsList.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 mb-6">
        <h3 className="text-2xl font-bold text-navy mb-2">{activeQuestion.label}</h3>
        {activeQuestion.helpText && (
          <p className="text-sm text-slate-500 mb-6">{activeQuestion.helpText}</p>
        )}

        <div className="space-y-3">
          {/* Single Select */}
          {activeQuestion.type === 'singleSelect' && activeQuestion.options?.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                val === opt.value 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-slate-200 hover:border-navy'
              }`}
            >
              {opt.label}
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
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 hover:border-navy'
                }`}
              >
                {selected && <span className="mr-2">✓</span>}
                {opt.label}
              </button>
            );
          })}

          {/* Boolean */}
          {activeQuestion.type === 'boolean' && (
            <>
              <button
                onClick={() => handleAnswer(true)}
                className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                  val === true 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-slate-200 hover:border-navy'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                  val === false 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-slate-200 hover:border-navy'
                }`}
              >
                No
              </button>
            </>
          )}

          {/* Text Inputs */}
          {(activeQuestion.type === 'shortText' || activeQuestion.type === 'longText') && (
            <input
              type="text"
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={activeQuestion.placeholder}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium"
            />
          )}

          {/* Number/Currency */}
          {(activeQuestion.type === 'number' || activeQuestion.type === 'currency') && (
            <input
              type="number"
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={activeQuestion.placeholder}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium"
            />
          )}

          {/* Date */}
          {activeQuestion.type === 'date' && (
            <input
              type="date"
              value={val || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none font-medium"
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mb-4">
        {currentStep > 0 && (
          <Button onClick={back} variant="outline" fullWidth>
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
          {currentStep === visibleQuestionsList.length - 1 ? 'Review Answers' : 'Next Step →'}
        </Button>
      </div>

      <button 
        onClick={onCancel} 
        className="w-full text-center text-xs text-slate-400 font-bold hover:text-navy uppercase tracking-wide"
      >
        Exit
      </button>
    </div>
  );
};

export default Questionnaire;