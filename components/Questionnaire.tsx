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
  isUpgrading?: boolean;
}

const SECTIONS = [
  'Background',
  'Status',
  'Relationship',
  'Finances',
  'Accommodation',
  'Suitability',
  'English Language'
];

const Questionnaire: React.FC<QuestionnaireProps> = ({ 
  onComplete, 
  onCancel, 
  isPaid, 
  initialAnswers = {}, 
  selectedPlan,
  visibleQuestionsList,
  isUpgrading = false
}) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isPaid && currentStep === 0 && !isReviewing) {
      const firstUnansweredIndex = visibleQuestionsList.findIndex(q => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
    }
  }, [isPaid, visibleQuestionsList, answers, isReviewing]);

  const activeQuestion = visibleQuestionsList[currentStep];
  const currentSection = activeQuestion?.section;
  const currentSectionIndex = SECTIONS.indexOf(currentSection || '');

  const handleAnswer = (value: any) => {
    setIsSaving(true);
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
    setTimeout(() => setIsSaving(false), 400);
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
          <h2 className="text-3xl font-extrabold text-navy uppercase tracking-tight mb-2">Audit Submission Review</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Verify your entries before generating the final compliance report.</p>
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
        <Button onClick={() => onComplete(answers)} fullWidth size="lg" variant="primary" className="py-6 font-black uppercase tracking-widest shadow-2xl">Execute Professional Audit</Button>
      </div>
    );
  }

  if (!activeQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto min-h-[600px] flex flex-col pt-4">
      {/* SECTION-BASED PROGRESS INDICATOR */}
      <div className="mb-14">
        <div className="flex justify-between items-center mb-8 overflow-x-auto no-scrollbar pb-2">
          {SECTIONS.map((section, idx) => (
            <div key={section} className="flex items-center group px-1">
              <div className={`flex flex-col items-center gap-3 transition-all ${idx === currentSectionIndex ? 'opacity-100' : idx < currentSectionIndex ? 'opacity-50' : 'opacity-20'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black border-2 transition-all ${idx === currentSectionIndex ? 'bg-navy border-navy text-white shadow-xl' : idx < currentSectionIndex ? 'bg-slate-200 border-slate-200 text-slate-600' : 'bg-white border-slate-100 text-slate-300'}`}>
                  {idx < currentSectionIndex ? '✓' : idx + 1}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${idx === currentSectionIndex ? 'text-navy' : 'text-slate-400'}`}>{section}</span>
              </div>
              {idx < SECTIONS.length - 1 && <div className="w-6 h-px bg-slate-100 mx-2"></div>}
            </div>
          ))}
        </div>
        
        <div className="relative pt-1">
           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
             <div 
                className="h-full bg-navy transition-all duration-700 ease-in-out" 
                style={{ width: `${((currentSectionIndex + 1) / SECTIONS.length) * 100}%` }}
             ></div>
           </div>
           {isSaving && (
             <div className="absolute top-4 right-0 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Processing Data</span>
             </div>
           )}
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <div className="mb-4">
           <span className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">{activeQuestion.section}</span>
        </div>
        <h3 className="text-3xl font-black mb-12 text-navy tracking-tight leading-[1.2]">{activeQuestion.label}</h3>
        
        <div className="min-h-[200px]">
          {activeQuestion.type === 'boolean' && (
            <div className="grid grid-cols-2 gap-5">
              <button 
                onClick={() => handleAnswer(true)} 
                className={`py-14 rounded-[2rem] border-2 text-xl font-black transition-all ${answers[activeQuestion.id] === true ? 'border-navy bg-navy text-white shadow-2xl scale-[1.02]' : 'border-slate-100 bg-white text-slate-300 hover:border-slate-300 hover:text-navy'}`}
              >
                Yes
              </button>
              <button 
                onClick={() => handleAnswer(false)} 
                className={`py-14 rounded-[2rem] border-2 text-xl font-black transition-all ${answers[activeQuestion.id] === false ? 'border-navy bg-navy text-white shadow-2xl scale-[1.02]' : 'border-slate-100 bg-white text-slate-300 hover:border-slate-300 hover:text-navy'}`}
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
                  className={`w-full p-7 text-left border-2 rounded-2xl text-base font-extrabold transition-all flex justify-between items-center ${answers[activeQuestion.id] === opt.value ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'}`}
                >
                  {opt.label}
                  <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${answers[activeQuestion.id] === opt.value ? 'border-navy bg-navy shadow-lg' : 'border-slate-200'}`}>
                    {answers[activeQuestion.id] === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          )}

          {['currency', 'number', 'shortText', 'date'].includes(activeQuestion.type) && (
            <div className="space-y-6">
              <input 
                type={activeQuestion.type === 'date' ? 'date' : activeQuestion.type === 'number' || activeQuestion.type === 'currency' ? 'number' : 'text'}
                value={answers[activeQuestion.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={activeQuestion.placeholder || "Provide entry..."}
                className="w-full p-10 bg-white border-2 border-slate-200 rounded-[2.5rem] focus:border-navy outline-none text-3xl font-black shadow-inner transition-all placeholder:text-slate-100"
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="mt-16">
          <Button 
            onClick={next} 
            fullWidth 
            size="lg" 
            variant="navy" 
            className="font-black uppercase tracking-widest py-6" 
            disabled={answers[activeQuestion.id] === undefined}
          >
            Continue Assessment
          </Button>
        </div>
      </div>

      <footer className="flex items-center justify-between pt-12 border-t border-slate-100 mt-20">
        <button onClick={back} disabled={currentStep === 0} className="text-[11px] font-black text-slate-400 hover:text-navy disabled:opacity-0 transition-all uppercase tracking-widest flex items-center gap-2">
          <span>←</span> Previous Entry
        </button>
        <button onClick={onCancel} className="text-[11px] font-black text-rose-400 hover:text-rose-600 transition-all uppercase tracking-widest">Abandon Check</button>
      </footer>
    </div>
  );
};

export default Questionnaire;