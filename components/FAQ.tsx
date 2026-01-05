
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-slate-100 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
    >
      <span className="text-lg font-bold text-navy group-hover:text-teal-600 transition-colors">{question}</span>
      <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{answer}</p>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this legal advice?",
      answer: "No. This tool is for informational purposes only and does not constitute legal advice. We are not a law firm. Our pre-check is based on publicly available Home Office guidance to help you understand your situation before you potentially spend money on a solicitor or application fees."
    },
    {
      question: "Where do you get your rules from?",
      answer: "Our logic is built around the latest publicly available Home Office guidance, policy documents, and statutory instruments. We model these into structured flows to match your situation against official requirements."
    },
    {
      question: "Can this guarantee my visa will be approved?",
      answer: "No. Visa decisions are made solely by the Home Office. Their caseworkers evaluate your full evidence, credibility, and application details. Our tool helps identify potential issues, but it cannot guarantee an outcome."
    },
    {
      question: "What happens after I pay?",
      answer: "The full result appears instantly on your screen. You will see your detailed eligibility verdict, risk factors, and recommended steps. You'll also be provided with a link to download or email a high-quality PDF summary."
    },
    {
      question: "Do you store my data?",
      answer: "We take privacy seriously. Your answers are processed securely to generate your report. We do not sell your personal data to third parties. Reports are encrypted and handled in compliance with modern privacy standards."
    },
    {
      question: "Can I use this if I’ve already been refused?",
      answer: "Yes. In fact, it's very helpful for understanding why you might have been refused and how to address those specific risk areas in a future application. However, for complex immigration histories, we always recommend consulting a solicitor."
    },
    {
      question: "Do you connect me to lawyers?",
      answer: "We do not have automatic referrals. We believe you should stay in control of your journey. You can use our report as a structured brief when you choose to approach a solicitor, making your consultation more efficient."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Frequently asked questions</h2>
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
