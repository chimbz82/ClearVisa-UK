import React, { createContext, useContext, ReactNode } from 'react';

export type Language = 'en';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Nav
    'nav.logo': 'ClearVisa UK',
    'nav.howItWorks': 'How it works',
    'nav.whosItFor': 'Who it’s for',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Start eligibility check',
    
    // Hero
    'hero.heading': 'Check your UK visa eligibility in minutes,',
    'hero.headingAccent': 'before you spend thousands',
    'hero.subheading': 'Answer a few simple questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear eligibility verdict, risk flags, and next steps.',
    'hero.ctaPrimary': 'Start eligibility check',
    'hero.ctaSubtext': 'Takes 2–3 minutes',
    'hero.ctaSecondary': 'See how it works',
    
    // Who it's for
    'section.whoFor.spouseTitle': 'Spouse & partner applicants',
    'section.whoFor.spouseBody': 'For people planning to apply for a UK spouse or partner visa and want to know if their income and status are on the right track.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers who want a quick sense of whether a salary and sponsorship meets key requirements.',
    'section.whoFor.reapplyTitle': 'People re-applying after refusal',
    'section.whoFor.reapplyBody': 'For applicants who have been refused before and want to see which areas are most sensitive before trying again.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving or planning who want to know what needs to be fixed before they apply.',
    
    // How it works
    'section.howItWorks.step1Title': 'Step 1 – Tell us about your situation',
    'section.howItWorks.step1Body': 'Choose your route and answer a short series of questions about your status, sponsor, income, and history.',
    'section.howItWorks.step2Title': 'Step 2 – See your eligibility score preview',
    'section.howItWorks.step2Body': 'We map you against key Home Office rules and give you a clear preview summary.',
    'section.howItWorks.step3Title': 'Step 3 – Unlock full result & report',
    'section.howItWorks.step3Body': 'Pay a one-off fee to unlock your full personalised report: verdict, risk factors, and suggested next steps.',
    
    // Badges
    'badges.route': 'Supports UK spouse & skilled worker routes',
    'badges.guidance': 'Based on public Home Office guidance',
    'badges.instant': 'Instant result',
    'badges.disclaimer': 'Clear disclaimer: not a law firm',
    
    // FAQ (Tightened for Legal Risk & Human Tone)
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK is an automated information tool. It is not a law firm and does not provide legal advice or act as your legal representative. Results are for preliminary guidance only.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our system maps your answers against publicly available UK Government (Home Office) rules and policy guidance. We do not have "insider" access to private Home Office systems.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. No tool can guarantee a visa outcome. The Home Office makes the final decision based on your full evidence. Our report is a pre-check tool designed to identify risk areas before you apply.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'The full audit report appears instantly on screen. You can download it as a PDF for your records or to share with a professional solicitor for a formal legal opinion.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'Your answers are encrypted and used solely to generate your report. We do not sell your data to third parties or share it with the Home Office.',
    'faq.q6': 'Can I use this if I have a complex history?',
    'faq.a6': 'Yes, but for borderline cases or complex histories (e.g. overstays, previous refusals), we strongly recommend using the Professional Plus tier and consulting an OISC-regulated adviser or solicitor.',
    'faq.q7': 'Does this submit my application?',
    'faq.a7': 'No. This is a pre-check tool only. It does not complete, submit, or monitor your application with the Home Office. The Home Office always makes the final decision.',
    
    // Footer
    'footer.disclaimer': 'Not affiliated with the UK Government or Home Office.'
  }
};

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    const value = translations['en'][key];
    if (!value) {
      return key.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim() || key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language: 'en', t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
