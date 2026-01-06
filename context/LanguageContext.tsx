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
    'hero.subheading': 'Answer a few simple questions and get an instant eligibility verdict for spouse or skilled worker routes – then unlock a professional audit report with a full document checklist.',
    'hero.ctaPrimary': 'Start free pre-check',
    'hero.ctaSecondary': 'See how it works',
    'hero.footerText': 'Takes 2–3 minutes • No credit card required to start',
    // Badges
    'badges.title': 'Transparent & Secure Assessment',
    'badges.stripe': 'Stripe-secured payments',
    'badges.gdpr': 'GDPR-aware data handling',
    'badges.confidential': '100% Confidential',
    'badges.publicGuidance': 'Based on public Home Office guidance',
    // How It Works
    'section.howItWorks.title': 'How ClearVisa Works',
    'section.howItWorks.subtitle': 'A simple three-step process to give you total clarity on your immigration position.',
    'section.howItWorks.step1Title': 'Step 1 – Free pre-check',
    'section.howItWorks.step1Body': 'Answer a short set of questions about your route, income, and history. No payment details needed to see your initial result.',
    'section.howItWorks.step2Title': 'Step 2 – Instant verdict',
    'section.howItWorks.step2Body': 'See your profile mapped against public rules: Likely, Borderline, or High Risk status delivered immediately.',
    'section.howItWorks.step3Title': 'Step 3 – Unlock full audit',
    'section.howItWorks.step3Body': 'Purchase a professional-grade report including a tailored document checklist, risk breakdown, and recommended next steps.',
    // Who It's For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa UK is built for real people making serious decisions about their future.',
    'section.whoFor.spouseTitle': 'Spouse & partner visas',
    'section.whoFor.spouseBody': 'For people planning a family move who want to know if their income, relationship evidence, and status meet the latest rules.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers who need a quick sense of whether a job, salary, and sponsorship meet key requirements.',
    'section.whoFor.reapplyTitle': 'Previous refusal or complex history',
    'section.whoFor.reapplyBody': 'For applicants who have been refused before and want to understand risk factors before spending thousands on a new application.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving or preparing who want to know exactly what they need to fix or gather before they officially apply.',
    // What You Get
    'section.whatYouGet.title': 'What you get in your report',
    'section.whatYouGet.subtitle': 'Your report is a structured, professional-style audit built from official Home Office guidance.',
    'section.whatYouGet.itemVerdictTitle': 'Eligibility Verdict',
    'section.whatYouGet.itemVerdictBody': 'A clear Likely, Borderline, or Unlikely status based on your specific inputs and current public rules.',
    'section.whatYouGet.itemRiskTitle': 'Risk Factor Heatmap',
    'section.whatYouGet.itemRiskBody': 'Visual identification of high-risk areas in your case like income gaps, document shortfalls, or history flags.',
    'section.whatYouGet.itemPlainTitle': 'Requirement Breakdown',
    'section.whatYouGet.itemPlainBody': 'A per-requirement pass/fail table showing exactly where you meet or miss the Home Office baseline.',
    'section.whatYouGet.itemNextStepsTitle': 'Tailored Checklist',
    'section.whatYouGet.itemNextStepsBody': 'A personalized list of documents you specifically need based on your income type and relationship status.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable PDF',
    'section.whatYouGet.itemDownloadBody': 'A clean, professional PDF summary you can save, print, or share with a solicitor to save time and money.',
    'section.whatYouGet.footerNote': 'Confidential automated assessment. We use public guidance to model all eligibility logic.',
    // FAQ
    'section.faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK is an automated information tool. We are not a law firm and do not provide legal advice or 1:1 representation.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our engine is modelled on publicly available Home Office guidance, official immigration rules, and Appendix FM caseworker instructions.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Only the Home Office can make a final decision. Our tool helps you understand your profile so you can identify risks before you pay visa fees.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'You unlock your full report instantly in your browser. You can also download a PDF version to keep for your records or share with an adviser.',
    'faq.q5': 'Do you store my sensitive data?',
    'faq.a5': 'We handle data securely and only use it to generate your report. We do not sell your data to third parties or shared it with the Home Office.',
    'faq.q7': 'Can I use this if I’ve been refused before?',
    'faq.a7': 'Yes. The tool is particularly helpful for identifying why you might have been refused and what areas of your case remain high-risk.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay only for the depth you need.',
    'pricing.tier.basic.label': 'BASIC SUMMARY',
    'pricing.tier.basic.price': '£29',
    'pricing.tier.basic.desc': 'A concise eligibility verdict and high-level risk pointers.',
    'pricing.tier.full.label': 'RECOMMENDED',
    'pricing.tier.full.name': 'Professional Audit + Checklist',
    'pricing.tier.full.price': '£79',
    'pricing.tier.full.desc': 'Comprehensive audit, checklist, and per-requirement breakdown.',
    'pricing.tier.pro.label': 'ADVANCED AUDIT',
    'pricing.tier.pro.name': 'Pro Analysis Add-On',
    'pricing.tier.pro.price': '£149',
    'pricing.tier.pro.desc': 'Deep automated evidence gap analysis for complex cases.',
    'pricing.b2b': 'Agencies or law firms? Contact us for bulk licensing.',
    'pricing.guarantee.title': 'Outcome Confidence Guarantee',
    'pricing.guarantee.body': 'If your report shows you are clearly ineligible under current public rules, we will refund your fee in full upon request.',
    // Legal
    'legal.title': 'Important Legal Information',
    'legal.p1': 'ClearVisa UK is an automated assessment tool and is not a law firm.',
    'legal.p2': 'Our reports are based on public Home Office rules and the information you provide. They do not constitute legal advice and cannot guarantee any specific outcome.',
    'legal.p3': 'For complex situations like previous overstays or criminal records, we strongly recommend consulting a qualified immigration solicitor.',
    // Footer
    'footer.mission': 'Helping applicants understand their standing before they apply using automated rule-based analysis.',
    // Partner
    'partner.title': 'Partner with ClearVisa UK',
    'partner.subtitle': 'Help your audience navigate UK immigration with confidence using our automated assessment tools.',
    'partner.benefit1': 'Earn commission on every referral.',
    'partner.benefit2': 'Provide instant value to your clients.',
    'partner.benefit3': 'Reliable rule-based assessment engine.',
    'partner.benefit4': 'Professional-grade audit outputs.',
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
      // Fallback to humanizing the key if missing
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
