import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-slate-100 last:border-0 transition-all">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-left focus:outline-none group">
      <span className={`text-base font-semibold transition-colors ${isOpen ? 'text-[#1877F2]' : 'text-[#041229]'}`}>
        {question}
      </span>
      <span className={`flex-shrink-0 ml-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1877F2]' : 'text-slate-400'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
      <div className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
        <p className="whitespace-pre-line">{answer}</p>
      </div>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') }
  ];

  return (
    <section id="faq" className="section-py bg-white scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">Support</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#041229]">Frequently asked questions</h2>
        </div>
        <div className="app-card px-6 sm:px-8 border-slate-100">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;