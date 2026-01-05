import React, { useState } from 'react';
import { QuestionConfig, QuestionType } from '../types';
import { QUESTIONS } from '../data/questions';
import { useLanguage } from '../context/LanguageContext';

interface QuestionnaireProps {
  route: string;
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ route, onComplete, onCancel }) => {
  const { t } = useLanguage();
  const routeKey = route === 'Spouse Visa' ? 'spouse' : 'skilledWorker';
  const relevantQuestions = QUESTIONS.filter(q => q.route === 'shared' || q.route === routeKey);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const activeQuestion = relevantQuestions[currentStep];

  const getSectionTitle = (section: string) => {
    const keyMap: Record<string, string> = {
      'Background': 'wizard.section.background',
      'History': 'wizard.section.history',
      'Job & sponsorship': 'wizard.section.job',
      'Salary & going rate': 'wizard.section.salary',
      'English & Funds': 'wizard.section.englishAndFunds',
      'Relationship details': 'wizard.section.background', // Fallback
      'Sponsor’s status': 'wizard.section.background', // Fallback
      'Financial requirement': 'wizard.section.salary' // Fallback
    };
    return t(keyMap[section] || 'wizard.section.background');
  };

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
                className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between group ${val === opt.value ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <span className="pr-4">{opt.label}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${val === opt.value ? 'border-navy bg-navy' : 'border-slate-200'}`}>
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
                className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between group ${currentArr.includes(opt.value) ? 'border-navy bg-navy/5 text-navy' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <span className="pr-4">{opt.label}</span>
                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 ${currentArr.includes(opt.value) ? 'border-navy bg-navy' : 'border-slate-200'}`}>
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

  if (!isVisible(activeQuestion)) {
    setTimeout(() => next(), 0);
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 min-h-[500px] flex flex-col">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {getSectionTitle(activeQuestion.section)} • {t('wizard.question')} {currentStep + 1} of {relevantQuestions.length}
          </span>
          <span className="text-[10px] font-black text-navy uppercase tracking-widest">{progress}% {t('wizard.progress')}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-2 duration-400">
        <h2 className="text-xl md:text-2xl font-black text-navy mb-3 leading-tight uppercase tracking-tight">
          {activeQuestion.label}
        </h2>
        {activeQuestion.helpText && (
          <p className="text-slate-500 text-[13px] font-semibold mb-6 bg-slate-50 p-3 rounded-xl border-l-4 border-navy">
            {activeQuestion.helpText}
          </p>
        )}

        <div className="mb-8">
          {renderField(activeQuestion)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <button 
          onClick={back}
          disabled={currentStep === 0}
          className="px-4 py-2 text-slate-400 font-bold hover:text-navy disabled:opacity-0 transition-all uppercase tracking-widest text-[10px]"
        >
          {t('wizard.button.back')}
        </button>
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-slate-400 font-bold hover:text-red-500 transition-all uppercase tracking-widest text-[10px]"
          >
            {t('wizard.button.cancel')}
          </button>
          <button 
            onClick={next}
            disabled={answers[activeQuestion.id] === undefined || answers[activeQuestion.id] === ""}
            className="bg-navy text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {currentStep === relevantQuestions.length - 1 ? t('wizard.button.seeResults') : t('wizard.button.continue')}
          </button>
        </div>
      </div>
      
      <p className="mt-6 text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        {t('wizard.footer')}
      </p>
    </div>
  );
};

export default Questionnaire;