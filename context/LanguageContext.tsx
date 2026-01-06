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
    'hero.ctaPrimary': 'Start free pre-check',
    'hero.ctaSecondary': 'See how it works',
    'hero.footerText': 'Takes 2–3 minutes • No payment required to start',
    // Badges
    'badges.title': 'Built for privacy and transparency',
    'badges.stripe': 'Stripe-secured payments',
    'badges.gdpr': 'GDPR-aware data handling',
    'badges.confidential': 'Confidential and encrypted',
    'badges.publicGuidance': 'Based on public Home Office guidance',
    // How It Works
    'section.howItWorks.title': 'How it works',
    'section.howItWorks.subtitle': 'Assess your UK visa eligibility in a few minutes, then unlock a professional-style report.',
    'section.howItWorks.step1Title': 'Step 1 – Free pre-check',
    'section.howItWorks.step1Body': 'Answer a short set of questions about your route, income and history. No payment details needed.',
    'section.howItWorks.step2Title': 'Step 2 – Instant verdict',
    'section.howItWorks.step2Body': 'See a quick profile: Likely, Borderline, High Risk or Unlikely under current public rules.',
    'section.howItWorks.step3Title': 'Step 3 – Unlock your full report',
    'section.howItWorks.step3Body': 'Upgrade to receive a professional audit, document checklist, and step-by-step risk breakdown.',
    // Who It's For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa UK helps real people make smarter decisions before they spend thousands on applications or legal fees.',
    'section.whoFor.spouseTitle': 'Spouse & partner applicants',
    'section.whoFor.spouseBody': 'For people planning a UK spouse or partner visa who want to know if their income, relationship evidence and history are on the right track.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers who need a quick sense of whether the job, salary and sponsorship arrangement meet current rules.',
    'section.whoFor.reapplyTitle': 'People re-applying after refusal',
    'section.whoFor.reapplyBody': 'For applicants who’ve been refused before and want to understand risk factors and avoid repeating the same mistakes.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving, preparing documents or planning a move who want to know what needs fixing before they apply.',
    // What You Get
    'section.whatYouGet.title': 'What you get in your report',
    'section.whatYouGet.subtitle': 'Your report is built from public Home Office guidance and updated rules.',
    'section.whatYouGet.itemVerdictTitle': 'Clear verdict',
    'section.whatYouGet.itemVerdictBody': 'A simple summary of how your profile fits current public rules for your chosen route.',
    'section.whatYouGet.itemRiskTitle': 'Risk heatmap',
    'section.whatYouGet.itemRiskBody': 'Highlight of the highest-risk areas in your case so you can see where problems are likely.',
    'section.whatYouGet.itemPlainTitle': 'Plain-English explanation',
    'section.whatYouGet.itemPlainBody': 'Key rules explained in normal language, not legal jargon.',
    'section.whatYouGet.itemNextStepsTitle': 'Next-step actions',
    'section.whatYouGet.itemNextStepsBody': 'Practical steps you can take to improve your position before you apply.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable report',
    'section.whatYouGet.itemDownloadBody': 'A PDF-style summary you can save, re-read or share with an adviser if you choose.',
    'section.whatYouGet.footerNote': 'Confidential automated assessment. We do not store sensitive identity documents.',
    // FAQ
    'section.faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK is an automated tool for informational purposes only. We are not a law firm and do not provide legal advice or 1:1 representation.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our rules are based on publicly available Home Office guidance and official immigration rules. We model our logic on latest caseworkers instructions.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Only the Home Office can make a final decision on any visa application. Our tool gives you an informed view based on public rules.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'You’ll unlock your full report instantly in the browser and be able to download a PDF-style version including your tailored checklist.',
    'faq.q5': 'Do you replace an immigration adviser?',
    'faq.a5': 'No. We do not replace advice from a qualified immigration solicitor. Many people use our report to prepare questions before speaking to a professional.',
    'faq.q7': 'Do you offer ongoing support?',
    'faq.a7': 'We provide technical support for account and billing issues. For individual legal advice, we recommend consulting a qualified immigration solicitor.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per report.',
    'pricing.tier.basic.label': 'BASIC PRE-CHECK',
    'pricing.tier.basic.price': '£29',
    'pricing.tier.basic.desc': 'Quick automated eligibility pre-check.',
    'pricing.tier.full.label': 'RECOMMENDED',
    'pricing.tier.full.name': 'Professional Audit + Checklist',
    'pricing.tier.full.price': '£79',
    'pricing.tier.full.desc': 'Most popular option for serious applicants.',
    'pricing.tier.pro.label': 'ADVANCED AUDIT',
    'pricing.tier.pro.name': 'Pro Analysis Add-On',
    'pricing.tier.pro.price': '£149',
    'pricing.tier.pro.desc': 'Deeper automated review of evidence gaps.',
    'pricing.b2b': 'Agencies or law firms? Contact us for bulk pricing.',
    'pricing.guarantee.title': 'Clear Outcome Guarantee',
    'pricing.guarantee.body': 'If your answers clearly show you are ineligible under current public rules, we will refund your fee in full.',
    // Legal
    'legal.title': 'Important legal information',
    'legal.p1': 'is an automated assessment tool and is not a law firm. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser.',
    'legal.p2': 'It uses public Home Office rules to provide an informational profile. Accuracy depends on the accuracy of your answers.',
    'legal.p3': 'It does not provide legal advice or 1:1 representation.',
    // Footer
    'footer.mission': 'Helping applicants understand their standing before they apply using automated rule-based analysis.',
    // Partner
    'partner.title': 'Partner with ClearVisa UK',
    'partner.subtitle': 'Offer your audience a smarter way to sanity-check their UK visa plans before they spend thousands.',
    'partner.benefit1': 'Earn commission on every completed report.',
    'partner.benefit2': 'Simple referral links and tracking.',
    'partner.benefit3': 'Helpful reports your audience can actually understand.',
    'partner.benefit4': 'Built on transparent public guidance, not guesswork.',
    'partner.commission': 'View commission details',
    'partner.cta': 'Apply to become a partner'
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
      console.warn(`Translation key missing: ${key}`);
      return key;
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
