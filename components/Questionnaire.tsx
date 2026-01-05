
import React, { useState } from 'react';
import { QuestionConfig, QuestionType } from '../types';
import { QUESTIONS } from '../data/questions';

interface QuestionnaireProps {
  route: string;
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ route, onComplete, onCancel }) => {
  const routeKey = route === 'Spouse Visa' ? 'spouse' : 'skilledWorker';
  const relevantQuestions = QUESTIONS.filter(q => q.route === 'shared' || q.route === routeKey);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const activeQuestion = relevantQuestions[currentStep];

  // Logic for conditional questions
  const isVisible = (q: QuestionConfig) => {
    if (!q.conditionalOn) return true;
    const parentAnswer = answers[q.conditionalOn.questionId];
    if (!parentAnswer) return false;
    
    if (Array.isArray(parentAnswer)) {
      return q.conditionalOn.values.some(v => parentAnswer.includes(v));
    }
    return q.conditionalOn.values.includes(parentAnswer);
  };

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const next = () => {
    if (currentStep < relevantQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = Math.round(((currentStep + 1) / relevantQuestions.length) * 100);

  const renderField = (q: QuestionConfig) => {
    const val = answers[q.id] || "";

    switch (q.type) {
      case 'boolean':
        return (
          <div className="flex gap-4">
            <button 
              onClick={() => handleAnswer(true)}
              className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all ${val === true ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'}`}
            >
              Yes
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all ${val === false ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'}`}
            >
              No
            </button>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="space-y-3">
            {q.options?.map(opt => (
              <button 
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`w-full p-5 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between group ${val === opt.value ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <span>{opt.label}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${val === opt.value ? 'border-navy bg-navy' : 'border-slate-200'}`}>
                  {val === opt.value && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
              </button>
            ))}
          </div>
        );
      case 'multiSelect':
        const currentArr = Array.isArray(val) ? val : [];
        const toggle = (v: string) => {
          if (currentArr.includes(v)) {
            handleAnswer(currentArr.filter(i => i !== v));
          } else {
            handleAnswer([...currentArr, v]);
          }
        };
        return (
          <div className="space-y-3">
            {q.options?.map(opt => (
              <button 
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={`w-full p-5 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between group ${currentArr.includes(opt.value) ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <span>{opt.label}</span>
                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${currentArr.includes(opt.value) ? 'border-navy bg-navy' : 'border-slate-200'}`}>
                  {currentArr.includes(opt.value) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                </div>
              </button>
            ))}
          </div>
        );
      case 'currency':
      case 'number':
        return (
          <div className="relative">
            {q.type === 'currency' && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>}
            <input 
              type="number"
              placeholder={q.placeholder}
              value={val}
              onChange={(e) => handleAnswer(e.target.value)}
              className={`w-full p-4 ${q.type === 'currency' ? 'pl-8' : 'pl-4'} bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-navy outline-none font-bold text-lg`}
            />
          </div>
        );
      case 'shortText':
        return (
          <input 
            type="text"
            placeholder={q.placeholder}
            value={val}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-navy outline-none font-bold text-lg"
          />
        );
      default:
        return null;
    }
  };

  // If question is conditional and not met, skip automatically
  if (!isVisible(activeQuestion)) {
    // This is a simple skip. In a real app we might want a more robust way to skip multiple.
    setTimeout(() => next(), 0);
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 min-h-[600px] flex flex-col">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {activeQuestion.section} • Question {currentStep + 1} of {relevantQuestions.length}
          </span>
          <span className="text-[10px] font-black text-navy uppercase tracking-widest">{progress}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl md:text-3xl font-black text-navy mb-4 leading-tight uppercase tracking-tight">
          {activeQuestion.label}
        </h2>
        {activeQuestion.helpText && (
          <p className="text-slate-500 text-sm font-semibold mb-8 bg-slate-50 p-4 rounded-xl border-l-4 border-navy">
            {activeQuestion.helpText}
          </p>
        )}

        <div className="mb-12">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <button 
          onClick={back}
          disabled={currentStep === 0}
          className="px-6 py-3 text-slate-400 font-bold hover:text-navy disabled:opacity-0 transition-all uppercase tracking-widest text-xs"
        >
          Back
        </button>
        <div className="flex gap-4">
          <button 
            onClick={onCancel}
            className="px-6 py-3 text-slate-400 font-bold hover:text-red-500 transition-all uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <button 
            onClick={next}
            disabled={answers[activeQuestion.id] === undefined || answers[activeQuestion.id] === ""}
            className="bg-navy text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl"
          >
            {currentStep === relevantQuestions.length - 1 ? 'See Results' : 'Continue'}
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        ClearVisa UK Pre-Check • Information Only • Secure
      </p>
    </div>
  );
};

export default Questionnaire;
