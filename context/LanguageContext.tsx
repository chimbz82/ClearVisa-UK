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
    'hero.bullet1': 'No appointments, no long forms, no sales calls',
    'hero.bullet2': 'Instant online result with a downloadable summary',
    'hero.bullet3': 'Built around public Home Office rules',
    'hero.bullet4': 'Clear disclaimer: not legal advice',
    'hero.ctaPrimary': 'Start eligibility check',
    'hero.ctaSubtext': 'Takes 2–3 minutes',
    'hero.ctaSecondary': 'See how it works',
    'hero.reassurance': 'No account required. Your answers are encrypted and not shared with third parties.',
    // Badges
    'badges.title': 'Built for applicants who want clarity before they apply',
    'badges.route': 'Supports UK spouse & skilled worker routes',
    'badges.guidance': 'Based on public Home Office guidance',
    'badges.instant': 'Instant result, no waiting for callbacks',
    'badges.disclaimer': 'Clear disclaimer: we are not a law firm',
    // How It Works
    'section.howItWorks.title': 'How ClearVisa UK works',
    'section.howItWorks.subtitle': 'A simple three-step flow from questions to clear outcome.',
    'section.howItWorks.step1Title': 'Step 1 – Tell us about your situation',
    'section.howItWorks.step1Body': 'Choose your route and answer a short series of questions about your status, sponsor, income, and history.',
    'section.howItWorks.step2Title': 'Step 2 – See your eligibility score preview',
    'section.howItWorks.step2Body': 'We map you against key Home Office rules and give you a clear preview summary.',
    'section.howItWorks.step3Title': 'Step 3 – Unlock full result & summary',
    'section.howItWorks.step3Body': 'Pay a one-off fee to unlock your full personalised report: verdict, risk factors, and suggested next steps.',
    'section.howItWorks.footer': 'You stay in control: no automatic referrals, no unexpected calls.',
    // Who It's For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa UK is built for real people making serious life decisions.',
    'section.whoFor.spouseTitle': 'Spouse & partner applicants',
    'section.whoFor.spouseBody': 'For people planning to apply for a UK spouse or partner visa and want to know if their income and status are on the right track.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers who want a quick sense of whether a salary and sponsorship meets key requirements.',
    'section.whoFor.reapplyTitle': 'People re-applying after refusal',
    'section.whoFor.reapplyBody': 'Understand areas that are most sensitive to avoid repeating previous mistakes.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving or planning who want to know what needs to be fixed before they apply.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per pre-check.',
    'pricing.reassurance': 'No subscription. You only pay to unlock results.',
    // FAQ
    'section.faq.title': 'Frequently asked questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'ClearVisa UK is not a law firm and does not provide legal advice. It is a preliminary pre-check tool based on public rules.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our system uses publicly available Home Office guidance and policy documents.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Visa decisions are made exclusively by the Home Office based on final evidence.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'The full result appears instantly on screen, and a link is provided to download or email a summary.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'Data is handled securely, only used for generating the result, and never sold to third parties.',
    'faq.q6': 'Can I use this if I’ve already applied or been refused?',
    'faq.a6': 'Yes, to understand specific risk areas. However, for complex histories, consult a solicitor.',
    'faq.q7': 'Do you connect me to lawyers?',
    'faq.a7': 'No. We provide no automatic referrals. You stay in control of your data.',
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