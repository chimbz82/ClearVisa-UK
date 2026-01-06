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

  useEffect(() => {
    if (isPaid && (selectedPlan === 'full' || selectedPlan === 'pro_plus') && currentStep === 0 && !isReviewing) {
      const firstUnansweredIndex = visibleQuestionsList.findIndex(q => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
    }
  }, [isPaid, selectedPlan, visibleQuestionsList, answers, isReviewing]);

  const activeQuestion = visibleQuestionsList[currentStep];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: value }));
  };

  const toggleMultiSelect = (value: string) => {
    const current = (answers[activeQuestion.id] as string[]) || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    handleAnswer(updated);
  };

  const next = () => {
    const val = answers[activeQuestion.id];
    const isAnswered = (activeQuestion.type === 'longText' || activeQuestion.type === 'number' || activeQuestion.type === 'shortText') 
      ? (val !== undefined && val !== null && val !== "")
      : (activeQuestion.type === 'multiSelect')
      ? (Array.isArray(val) && val.length > 0)
      : (val !== undefined && val !== null && val !== "");

    if (!isAnswered) return;

    if (currentStep < visibleQuestionsList.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleEdit = (index: number) => {
    setCurrentStep(index);
    setIsReviewing(false);
  };

  if (isReviewing) {
    return (
      <div className="max-w-2xl mx-auto pt-4 animate-in fade-in duration-300">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-[#041229]">Review your audit details</h2>
          <p className="text-sm text-slate-500 font-medium">Verify your responses before generating the report.</p>
        </div>
        
        <div className="space-y-3 mb-10">
          {visibleQuestionsList.map((q, idx) => (
            <div key={q.id} className="app-card border border-slate-100 p-4 flex justify-between items-center group transition-all">
              <div className="flex-grow pr-4">
                <p className="text-[10px] text-slate-400 mb-0.5 font-bold uppercase tracking-wider">{q.section} • {q.label}</p>
                <p className="text-sm font-semibold text-[#041229]">
                  {Array.isArray(answers[q.id]) 
                    ? (answers[q.id] as string[]).map(v => q.options?.find(o => o.value === v)?.label || v).join(', ') 
                    : String(answers[q.id] === true ? 'Yes' : answers[q.id] === false ? 'No' : 
                        q.options?.find(o => o.value === answers[q.id])?.label || answers[q.id] || '—')}
                </p>
              </div>
              <button onClick={() => handleEdit(idx)} className="text-[11px] font-bold text-[#1877F2] hover:bg-slate-50 px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors">Edit</button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          <Button onClick={() => onComplete(answers)} fullWidth size="lg">Finalize & generate report</Button>
          <button onClick={() => setIsReviewing(false)} className="text-xs font-bold text-slate-400 hover:text-[#041229] uppercase tracking-widest py-3 transition-colors">Back to questionnaire</button>
        </div>
      </div>
    );
  }

  if (!activeQuestion) return null;

  const renderField = (q: QuestionConfig) => {
    const val = answers[q.id];
    const isAnswered = (q.type === 'longText' || q.type === 'number' || q.type === 'shortText') 
      ? (val !== undefined && val !== null && val !== "") 
      : (q.type === 'multiSelect')
      ? (Array.isArray(val) && val.length > 0)
      : (val !== undefined && val !== null && val !== "");

    switch (q.type) {
      case 'boolean':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleAnswer(true)} className={`py-8 rounded-2xl border-2 text-lg font-bold transition-all ${val === true ? 'border-[#041229] bg-[#041229] text-white shadow-md' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}>Yes</button>
              <button onClick={() => handleAnswer(false)} className={`py-8 rounded-2xl border-2 text-lg font-bold transition-all ${val === false ? 'border-[#041229] bg-[#041229] text-white shadow-md' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}>No</button>
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>Continue</Button>
          </div>
        );
      case 'singleSelect':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              {q.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full p-4 text-left border-2 rounded-xl text-sm font-semibold transition-all flex justify-between items-center ${val === opt.value ? 'border-[#1877F2] bg-[#1877F2]/5 text-[#1877F2]' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                >
                  {opt.label}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${val === opt.value ? 'border-[#1877F2] bg-[#1877F2]' : 'border-slate-200'}`}>
                    {val === opt.value && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>Continue</Button>
          </div>
        );
      case 'multiSelect':
        const currentMulti = (val as string[]) || [];
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {q.options?.map(opt => (
                <button 
                  key={opt.value}
                  onClick={() => toggleMultiSelect(opt.value)}
                  className={`p-3.5 text-left border-2 rounded-xl text-xs font-semibold transition-all flex gap-3 items-center ${currentMulti.includes(opt.value) ? 'border-[#1877F2] bg-[#1877F2]/5 text-[#1877F2]' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${currentMulti.includes(opt.value) ? 'bg-[#1877F2] border-[#1877F2] text-white' : 'border-slate-200 bg-slate-50'}`}>
                    {currentMulti.includes(opt.value) && '✓'}
                  </div>
                  <span className="leading-tight font-bold">{opt.label}</span>
                </button>
              ))}
            </div>
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>Continue</Button>
          </div>
        );
      case 'number':
      case 'shortText':
      case 'longText':
        return (
          <div className="space-y-6">
            {q.type === 'longText' ? (
              <textarea value={val || ""} onChange={(e) => handleAnswer(e.target.value)} placeholder={q.placeholder} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#041229] outline-none text-sm font-semibold min-h-[140px] transition-all" />
            ) : (
              <input type={q.type === 'shortText' ? 'text' : 'number'} placeholder={q.placeholder || "Enter details..."} value={val || ""} onChange={(e) => handleAnswer(e.target.value)} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#041229] outline-none text-xl font-bold transition-all text-[#041229]" autoFocus />
            )}
            <Button onClick={next} fullWidth size="lg" disabled={!isAnswered}>Continue</Button>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = Math.round(((currentStep + 1) / visibleQuestionsList.length) * 100);

  return (
    <div className="max-w-2xl mx-auto min-h-[440px] flex flex-col pt-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Step {currentStep + 1} of {visibleQuestionsList.length} • {activeQuestion.section}</span>
          <span className="text-xs font-bold text-[#041229]">{progress}% Complete</span>
        </div>
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#1877F2] transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-grow animate-in fade-in slide-in-from-bottom-2 duration-300 text-left">
        <h3 className="text-2xl font-bold mb-3 text-[#041229] tracking-tight leading-snug">{activeQuestion.label}</h3>
        {activeQuestion.helpText && <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium italic">{activeQuestion.helpText}</p>}
        <div className="mb-10">{renderField(activeQuestion)}</div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
        <button onClick={back} disabled={currentStep === 0} className="text-[11px] font-bold text-slate-400 hover:text-[#041229] disabled:opacity-0 transition-colors uppercase tracking-widest">Back</button>
        <button onClick={onCancel} className="text-[11px] font-bold text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest">Quit</button>
      </div>
    </div>
  );
};

export default Questionnaire;