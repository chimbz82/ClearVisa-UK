import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-slate-100 last:border-0">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-6 text-left focus:outline-none group">
      <span className="text-lg font-black text-navy group-hover:text-accent transition-colors">{question}</span>
      <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-slate-600 leading-relaxed text-sm font-semibold whitespace-pre-line">{answer}</p>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this legal advice?",
      answer: "No. ClearVisa UK – Immigration Eligibility Pre-Check Report is for informational purposes only. We are not a law firm. Our report is based on publicly available Home Office guidance to help you understand your standing before you potentially spend thousands on legal fees or application costs."
    },
    {
      question: "Where do you get your rules from?",
      answer: "Our engine uses latest public Home Office caseworker guidance, policy documents, and immigration rules. We model these into structured flows to provide a highly accurate eligibility pre-check."
    },
    {
      question: "Can this guarantee my visa will be approved?",
      answer: "No. Final decisions are made solely by UK Visas and Immigration (UKVI). Our tool identifies potential risk areas and eligibility markers, but cannot guarantee an outcome."
    },
    {
      question: "What happens after I pay?",
      answer: "Your full result appears instantly. You will receive a detailed verdict, risk factor breakdown, and suggested next steps. A downloadable ClearVisa UK – Immigration Eligibility Pre-Check Report (PDF) will also be provided."
    },
    {
      question: "Do you store my data?",
      answer: "We take privacy seriously. All data is processed securely and encrypted. We do not sell your personal data to third parties. We are fully compliant with GDPR and modern data protection standards."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-black text-navy mb-16 text-center uppercase tracking-tight">Frequently asked questions</h2>
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