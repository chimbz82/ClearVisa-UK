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
    'nav.startCheck': 'Start eligibility check',
    // Hero
    'hero.heading': 'Check your UK visa eligibility in minutes,',
    'hero.headingAccent': 'before you spend thousands.',
    'hero.subheading': 'Answer a few simple questions and get an instant eligibility verdict for spouse or skilled worker routes – with a clear risk assessment and next steps.',
    'hero.ctaPrimary': 'Start eligibility check',
    'hero.ctaSecondary': 'See how it works',
    'hero.footerText': 'Takes 2–3 minutes • No account required • Fully confidential',
    // Badges
    'badges.title': 'Trust & Reliability',
    'badges.stripe': 'Stripe-secured payments',
    'badges.gdpr': 'GDPR-compliant data handling',
    'badges.confidential': '100% Secure & Confidential',
    'badges.publicGuidance': 'Based on public Home Office guidance',
    // How It Works
    'section.howItWorks.title': 'How UK Visa Pre-Check works',
    'section.howItWorks.subtitle': 'A simple three-step process from initial questions to a structured outcome.',
    'section.howItWorks.step1Title': 'Step 1 – Tell us about your situation',
    'section.howItWorks.step1Body': 'Choose your route and answer a short series of questions about your status, sponsor, income, and history.',
    'section.howItWorks.step2Title': 'Step 2 – See your eligibility preview',
    'section.howItWorks.step2Body': 'Based on your answers, we map you against key rules and provide a clear status preview: Likely Eligible, Borderline, or Unlikely.',
    'section.howItWorks.step3Title': 'Step 3 – Unlock full audit report',
    'section.howItWorks.step3Body': 'Pay a one-off fee to unlock your full personalised report: eligibility verdict, risk heatmap, and tailored document checklist.',
    // Who It's For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'UK Visa Pre-Check is built for real people making serious decisions about their future.',
    'section.whoFor.spouseTitle': 'Spouse & Partner applicants',
    'section.whoFor.spouseBody': 'For individuals planning to apply for a UK family visa who want to verify income, relationship, and status requirements.',
    'section.whoFor.skilledTitle': 'Skilled Worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers needing a quick sense of whether a job, salary, and sponsorship meet the latest requirements.',
    'section.whoFor.reapplyTitle': 'Re-applying after refusal',
    'section.whoFor.reapplyBody': 'For applicants who have faced refusals and want to avoid repeating mistakes by understanding sensitive risk areas.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving or preparing who want to know exactly what to fix before they pay thousands in visa fees.',
    // What You Get
    'section.whatYouGet.title': 'What you get from your pre-check',
    'section.whatYouGet.subtitle': 'Not just a score – a structured summary you can actually use for your planning.',
    'section.whatYouGet.itemVerdictTitle': 'Eligibility Verdict',
    'section.whatYouGet.itemVerdictBody': 'A clear status of Likely Eligible, Borderline, or Unlikely based on current public immigration rules.',
    'section.whatYouGet.itemRiskTitle': 'Risk Factor Heatmap',
    'section.whatYouGet.itemRiskBody': 'Visual identification of strong areas vs. sensitive flags in your profile (income, history, evidence).',
    'section.whatYouGet.itemPlainTitle': 'Requirement Compliance Matrix',
    'section.whatYouGet.itemPlainBody': 'A breakdown of how you meet specific Home Office requirements like the £29,000 income baseline.',
    'section.whatYouGet.itemNextStepsTitle': 'Suggested Next Steps',
    'section.whatYouGet.itemNextStepsBody': 'Clear instructions on what to fix, gather, or prepare before you consult a solicitor or apply.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable PDF Summary',
    'section.whatYouGet.itemDownloadBody': 'A clean, professional PDF report you can save, print, or share with a legal advisor to save time.',
    'section.whatYouGet.footerNote': 'Note: This tool is not legal advice and is based on publicly available Home Office caseworker guidance.',
    // FAQ
    'section.faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. UK Visa Pre-Check is an automated assessment tool. It is not a law firm and does not provide legal advice or 1-to-1 case representation.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our engine is modelled on publicly available Home Office caseworker guidance, official immigration rules, and published Appendix FM instructions.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Only the Home Office can make a final decision. Our tool identifies potential risk factors to help you prepare before you pay visa fees.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'You will instantly unlock your full report in your browser. You can also download a PDF version to keep for your records.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'Your data is handled securely and used only to generate your report. We do not sell your data or share it with the Home Office or third parties.',
    'faq.q7': 'Can I use this if I’ve been refused before?',
    'faq.a7': 'Yes. The tool is designed to help you understand potential sensitivity in your history, though complex cases should always consult a solicitor.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per pre-check report.',
    'pricing.guarantee.title': 'Confidence Guarantee',
    'pricing.guarantee.body': 'If your report shows you are clearly ineligible under current public rules, we will refund your fee in full upon request.',
    'pricing.tier.basic.badge': 'BUDGET',
    'pricing.tier.full.badge': 'RECOMMENDED',
    'pricing.tier.humanReview.badge': 'ENHANCED',
    'pricing.b2b': 'Legal firms or agencies? Contact us for bulk licensing.',
    // Legal
    'legal.title': 'Important Information',
    'legal.p1': 'is not a law firm and does not provide legal advice.',
    'legal.p2': 'The tool is designed as a pre-check based on your answers and public information. It cannot guarantee any visa outcome.',
    'legal.p3': 'For complex situations (e.g. previous refusals, criminal records, overstays), we strongly recommend consulting a qualified solicitor.',
    // Footer
    'footer.mission': 'Helping applicants understand where they stand before they apply.'
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
