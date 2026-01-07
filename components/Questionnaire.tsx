import React, { useState, useEffect } from 'react';
import { QuestionConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Button from './Button';

interface QuestionnaireProps {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  initialAnswers?: Record<string, any>;
  visibleQuestionsList: QuestionConfig[];
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ 
  onComplete, 
  onCancel, 
  initialAnswers = {}, 
  visibleQuestionsList
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    // Jump to first unanswered question if applicable
    const firstUnanswered = visibleQuestionsList.findIndex(q => answers[q.id] === undefined);
    if (firstUnanswered !== -1 && firstUnanswered > currentStep) {
      setCurrentStep(firstUnanswered);
    }
  }, [visibleQuestionsList]);

  const activeQuestion = visibleQuestionsList[currentStep];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const next = () => {
    if (answers[activeQuestion.id] === undefined) return;
    if (currentStep < visibleQuestionsList.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsReviewing(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isReviewing) {
    return (
      <div className="max-w-3xl mx-auto pt-4 animate-in fade-in duration-500 text-left">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-navy uppercase tracking-tight mb-2">Review Your Answers</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Ensure everything is correct before proceeding.</p>
        </header>
        <div className="space-y-3 mb-12 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          {visibleQuestionsList.map((q, idx) => {
            const answer = answers[q.id];
            return (
              <div key={q.id} className="bg-white border border-slate-100 p-6 rounded-2xl flex justify-between items-center group transition-all hover:border-slate-300">
                <div className="flex-grow pr-6">
                  <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-widest">{q.section}</p>
                  <p className="text-sm font-bold text-slate-700 mb-2 leading-tight">{q.label}</p>
                  <p className="text-base font-black text-navy">
                    {answer === true ? 'Yes' : answer === false ? 'No' : String(answer || '—')}
                  </p>
                </div>
                <button onClick={() => { setCurrentStep(idx); setIsReviewing(false); }} className="text-[11px] font-black text-accent uppercase tracking-widest hover:underline">Edit</button>
              </div>
            );
          })}
        </div>
        <Button onClick={() => onComplete(answers)} fullWidth size="lg" variant="navy" className="py-6 font-black uppercase tracking-widest shadow-2xl">Confirm & Generate Result</Button>
      </div>
    );
  }

  if (!activeQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto min-h-[600px] flex flex-col pt-4">
      {/* CLEAN LINEAR PROGRESS BAR - NO PERCENTAGE */}
      <div className="mb-14">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Question {currentStep + 1} of {visibleQuestionsList.length}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-navy transition-all duration-700 ease-in-out" 
            style={{ width: `${((currentStep + 1) / visibleQuestionsList.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <h3 className="text-2xl sm:text-3xl font-black mb-12 text-navy tracking-tight leading-[1.2]">
          {activeQuestion.label}
        </h3>
        
        <div className="min-h-[250px] space-y-8">
          {activeQuestion.type === 'boolean' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button 
                onClick={() => handleAnswer(true)} 
                className={`py-12 rounded-[1.5rem] border-2 text-xl font-black transition-all ${answers[activeQuestion.id] === true ? 'border-navy bg-navy text-white shadow-xl' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'}`}
              >
                Yes
              </button>
              <button 
                onClick={() => handleAnswer(false)} 
                className={`py-12 rounded-[1.5rem] border-2 text-xl font-black transition-all ${answers[activeQuestion.id] === false ? 'border-navy bg-navy text-white shadow-xl' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'}`}
              >
                No
              </button>
            </div>
          )}

          {activeQuestion.type === 'singleSelect' && (
            <div className="space-y-4">
              {activeQuestion.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full p-6 text-left border-2 rounded-2xl text-lg font-extrabold transition-all flex justify-between items-center ${answers[activeQuestion.id] === opt.value ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'}`}
                >
                  {opt.label}
                  <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${answers[activeQuestion.id] === opt.value ? 'border-navy bg-navy' : 'border-slate-200'}`}>
                    {answers[activeQuestion.id] === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          )}

          {['currency', 'number', 'shortText', 'date'].includes(activeQuestion.type) && (
            <input 
              type={activeQuestion.type === 'date' ? 'date' : 'text'}
              value={answers[activeQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-8 bg-white border-2 border-slate-200 rounded-[1.5rem] focus:border-navy outline-none text-2xl font-black transition-all"
              autoFocus
            />
          )}
        </div>

        <div className="mt-12">
          <Button 
            onClick={next} 
            fullWidth 
            size="lg" 
            variant="navy" 
            disabled={answers[activeQuestion.id] === undefined}
          >
            Continue
          </Button>
        </div>
      </div>

      <footer className="flex items-center justify-between pt-12 border-t border-slate-100 mt-20">
        <button onClick={back} disabled={currentStep === 0} className="text-[11px] font-black text-slate-400 hover:text-navy disabled:opacity-0 transition-all uppercase tracking-widest">
          ← Back
        </button>
        <button onClick={onCancel} className="text-[11px] font-black text-rose-400 hover:text-rose-600 transition-all uppercase tracking-widest">Exit</button>
      </footer>
    </div>
  );
};

export default Questionnaire;