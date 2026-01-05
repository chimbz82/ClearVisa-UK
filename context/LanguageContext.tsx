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
    'nav.howItWorks': 'How it works',
    'nav.whosItFor': 'Who it’s for',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Start free pre-check',
    // Hero
    'hero.heading': 'Check your UK visa eligibility before you spend money on',
    'hero.headingAccent': 'applications or professional advice.',
    'hero.subheading': 'Start a free eligibility pre-check for spouse or skilled worker routes – see your verdict instantly, then unlock your full professional report.',
    'hero.bullet1': 'Free initial eligibility verdict',
    'hero.bullet2': 'Instant risk screening',
    'hero.bullet3': 'Built around latest public Home Office rules',
    'hero.bullet4': 'Confidential and encrypted',
    'hero.ctaPrimary': 'Start free pre-check',
    'hero.ctaSecondary': 'See how it works',
    'hero.footerText': 'Takes 2–3 minutes • No payment required to start',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per report.',
    'pricing.card.priceSuffix': 'per report',
    'pricing.tier.basic.label': 'BASIC PRE-CHECK',
    'pricing.tier.basic.price': '£29',
    'pricing.tier.basic.desc': 'Quick automated eligibility pre-check.',
    'pricing.tier.full.label': 'RECOMMENDED',
    'pricing.tier.full.name': 'Full Pre-Check + Checklist',
    'pricing.tier.full.price': '£79',
    'pricing.tier.full.desc': 'Most popular option for serious applicants.',
    'pricing.tier.pro.label': 'PRO ASSESSMENT',
    'pricing.tier.pro.name': 'Pro Assessment Add-On',
    'pricing.tier.pro.price': '£149',
    'pricing.tier.pro.desc': 'Deeper rule-based review using our automated engine.',
    'pricing.currency.note': 'Currency automatically converted at checkout.',
    'pricing.b2b': 'Agencies or law firms? Contact us for bulk pricing.',
    'pricing.guarantee.title': 'Clear Outcome Guarantee',
    'pricing.guarantee.body': 'If your answers clearly show you are ineligible under current public rules, we will refund your fee in full. We don’t benefit from telling you what you don’t want to hear.',
    // FAQ
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK is an automated tool for informational purposes only. We are not a law firm and do not provide legal advice or 1:1 caseworker representation.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'Your full structured report appears instantly in your dashboard. You will receive a detailed verdict, risk factor breakdown, and suggested next steps based on official guidance.',
    'faq.q7': 'Do you offer ongoing support?',
    'faq.a7': 'We provide technical support for account and billing issues. For individual legal advice on complex cases, we recommend consulting a qualified immigration solicitor.',
    // Legal
    'legal.p1': 'is an automated assessment tool and is not a law firm. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser.',
    'footer.mission': 'Helping applicants understand their standing before they apply using automated rule-based analysis.'
  }
};

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    return translations['en'][key] || key;
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
