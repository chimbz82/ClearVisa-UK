import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="bg-white border border-slate-100 rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left focus:outline-none group">
      <span className="text-base md:text-lg font-black text-navy group-hover:text-accent transition-colors uppercase tracking-tight">{question}</span>
      <span className={`flex-shrink-0 ml-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
      <div className="p-6 pt-0 text-slate-600 leading-relaxed text-sm font-bold border-t border-slate-50">
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
    <section id="faq" className="py-20 bg-white scroll-mt-[80px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-black text-navy mb-16 text-center uppercase tracking-tight">
          {t('section.faq.title')}
        </h2>
        <div className="space-y-2">
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