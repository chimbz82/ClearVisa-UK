
import React, { useState, useEffect } from 'react';
import { QuestionConfig, QuestionType } from '../types';
import { QUESTIONS } from '../data/questions';
import { useLanguage } from '../context/LanguageContext';

interface QuestionnaireProps {
  route: string; // "Spouse Visa" or "Skilled Worker Visa"
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
  activeTier: string; // 'basic', 'full', 'human'
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ route, onComplete, onCancel, activeTier }) => {
  const { t } = useLanguage();
  
  // Normalize route for showIf context
  const normalizedRoute = route.toLowerCase().includes('spouse') ? 'spouse' : 
                         route.toLowerCase().includes('skilled') ? 'skilled' : 'other';

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // We filter dynamically to ensure we only count questions that should actually be shown
  const getVisibleQuestions = () => {
    return QUESTIONS.filter(q => q.showIf({ tier: activeTier, route: normalizedRoute, answers }));
  };

  const visibleQuestions = getVisibleQuestions();
  const activeQuestion = visibleQuestions[currentStep];

  const getSectionTitle = (section: string) => {
    const keyMap: Record<string, string> = {
      'Background': 'wizard.section.background',
      'History': 'wizard.section.history',
      'Job & sponsorship': 'wizard.section.job',
      'Salary & going rate': 'wizard.section.salary',
      'English & Funds': 'wizard.section.englishAndFunds',
      'Relationship details': 'wizard.section.background',
      'Sponsor’s status': 'wizard.section.background',
      'Financial requirement': 'wizard.section.salary',
      'Relationship': 'wizard.section.background',
      'Financials': 'wizard.section.salary',
      'Employment': 'wizard.section.job',
      'Accommodation': 'wizard.section.background',
      'Readiness': 'wizard.section.background',
      'Case Detail': 'wizard.section.history'
    };
    return t(keyMap[section] || 'wizard.section.background');
  };

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
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = Math.round(((currentStep + 1) / visibleQuestions.length) * 100);

  const renderField = (q: QuestionConfig) => {
    const val = answers[q.id] || "";

    switch (q.type) {
      case 'boolean':
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleAnswer(true)}
              className={`flex-1 py-5 px-6 rounded-2xl border-2 font-black transition-all text-lg uppercase tracking-widest ${val === true ? 'border-navy bg-navy/5 text-navy shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
            >
              Yes
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className={`flex-1 py-5 px-6 rounded-2xl border-2 font-black transition-all text-lg uppercase tracking-widest ${val === false ? 'border-navy bg-navy/5 text-navy shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
            >
              No
            </button>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="flex flex-col gap-3">
            {q.options?.map(opt => (
              <button 
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`w-full min-h-[64px] p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group whitespace-normal break-words ${val === opt.value ? 'border-navy bg-navy/5 text-navy shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                <span className="pr-4 leading-tight">{opt.label}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${val === opt.value ? 'border-navy bg-navy' : 'border-slate-200'}`}>
                  {val === opt.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
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
          <div className="flex flex-col gap-3">
            {q.options?.map(opt => (
              <button 
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={`w-full min-h-[64px] p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group whitespace-normal break-words ${currentArr.includes(opt.value) ? 'border-navy bg-navy/5 text-navy shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                <span className="pr-4 leading-tight">{opt.label}</span>
                <div className={`w-6 h-6 rounded flex items-center justify-center border-2 flex-shrink-0 ${currentArr.includes(opt.value) ? 'border-navy bg-navy' : 'border-slate-200'}`}>
                  {currentArr.includes(opt.value) && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                </div>
              </button>
            ))}
          </div>
        );
      case 'currency':
      case 'number':
        return (
          <div className="relative">
            {q.type === 'currency' && <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xl">£</span>}
            <input 
              type="number"
              placeholder={q.placeholder}
              value={val}
              onChange={(e) => handleAnswer(e.target.value)}
              className={`w-full p-5 ${q.type === 'currency' ? 'pl-10' : 'pl-5'} bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-navy outline-none font-black text-2xl transition-all shadow-sm focus:shadow-md`}
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
            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-navy outline-none font-black text-2xl transition-all shadow-sm focus:shadow-md"
          />
        );
      case 'longText':
        return (
          <textarea 
            placeholder={q.placeholder}
            value={val}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full h-48 p-5 bg-slate-50 border-2 border-slate-100 rounded-[24px] focus:border-navy outline-none font-bold text-lg leading-relaxed transition-all shadow-sm focus:shadow-md"
          />
        );
      default:
        return null;
    }
  };

  if (!activeQuestion) {
    // If somehow we end up with no question, complete with whatever we have
    if (Object.keys(answers).length > 0) {
      onComplete(answers);
    }
    return null;
  }

  const continueLabel = activeTier === 'basic' ? 'Basic Assessment' : 
                        activeTier === 'full' ? 'Full Assessment' : 'Human Review Assessment';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-[600px] flex flex-col">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            {getSectionTitle(activeQuestion.section)} • Question {currentStep + 1} of {visibleQuestions.length}
          </span>
          <span className="text-[11px] font-black text-navy uppercase tracking-widest">{progress}% {t('wizard.progress')}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl md:text-3xl font-black text-navy mb-4 leading-tight uppercase tracking-tight">
          {activeQuestion.label}
        </h2>
        {activeQuestion.helpText && (
          <p className="text-slate-600 text-sm font-bold mb-8 bg-navy/5 p-5 rounded-2xl border-l-4 border-accent leading-relaxed">
            {activeQuestion.helpText}
          </p>
        )}

        <div className="mb-10">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100 mt-auto">
        <button 
          onClick={back}
          disabled={currentStep === 0}
          className="px-6 py-3 text-slate-400 font-black hover:text-navy disabled:opacity-0 transition-all uppercase tracking-widest text-xs cursor-pointer focus:outline-none"
        >
          {t('wizard.button.back')}
        </button>
        <div className="flex w-full sm:w-auto gap-4">
          <button 
            onClick={onCancel}
            className="hidden sm:block px-6 py-3 text-slate-400 font-black hover:text-rose-500 transition-all uppercase tracking-widest text-xs cursor-pointer focus:outline-none"
          >
            {t('wizard.button.cancel')}
          </button>
          <button 
            onClick={next}
            disabled={answers[activeQuestion.id] === undefined || answers[activeQuestion.id] === ""}
            className="w-full sm:w-auto bg-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl active:scale-95"
          >
            {currentStep === visibleQuestions.length - 1 ? t('wizard.button.seeResults') : 'Next Question'}
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
        {continueLabel}
      </p>
    </div>
  );
};

export default Questionnaire;
