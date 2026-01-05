import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="bg-white rounded-2xl mb-4 overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
      <span className="text-[18px] font-bold text-[#111827] group-hover:text-navy transition-colors">{question}</span>
      <span className={`flex-shrink-0 ml-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
      <div className="p-6 pt-0 text-slate-600 leading-relaxed font-medium">
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
    { question: t('faq.q5'), answer: t('faq.a5') }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        <h2 className="text-center mb-16">{t('section.faq.title')}</h2>
        <div className="space-y-4">
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