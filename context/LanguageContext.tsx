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
    'hero.subheading': 'Answer a few simple questions and get an instant eligibility verdict for spouse or skilled worker routes – then unlock a professional automated audit report with a full document checklist.',
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
    'section.howItWorks.subtitle': 'A structured three-step process to help you understand your immigration standing using automated logic.',
    'section.howItWorks.step1Title': 'Step 1 – Free pre-check',
    'section.howItWorks.step1Body': 'Answer a short set of questions about your chosen route, financial situation, and history. No payment details required for your initial result.',
    'section.howItWorks.step2Title': 'Step 2 – Instant verdict',
    'section.howItWorks.step2Body': 'See an immediate profile status: Likely Eligible, Borderline, or High Risk based on current public immigration rules.',
    'section.howItWorks.step3Title': 'Step 3 – Professional report',
    'section.howItWorks.step3Body': 'Unlock your full personalised audit, including a compliance checklist, risk breakdown, and recommended next steps.',
    // Who It's For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa UK helps applicants sanity-check their plans before committing thousands of pounds in fees.',
    'section.whoFor.spouseTitle': 'Spouse & partner visas',
    'section.whoFor.spouseBody': 'For people planning a family move who want to know if their income and relationship evidence meet the Appendix FM requirements.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For professionals and employers who need to verify salary thresholds and sponsorship compliance against the latest rules.',
    'section.whoFor.reapplyTitle': 'Refusal & complex history',
    'section.whoFor.reapplyBody': 'For those who have been refused before and need to identify specific risk areas before submitting a new application.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still preparing their case who want to know exactly what they need to fix or gather before they apply.',
    // What You Get
    'section.whatYouGet.title': 'What you get in your report',
    'section.whatYouGet.subtitle': 'Our reports are built using official guidance to provide a professional-grade audit of your case.',
    'section.whatYouGet.itemVerdictTitle': 'Eligibility Verdict',
    'section.whatYouGet.itemVerdictBody': 'A clear Likely, Borderline, or High Risk status with a plain-English explanation of why.',
    'section.whatYouGet.itemRiskTitle': 'Risk Heatmap',
    'section.whatYouGet.itemRiskBody': 'Visual identification of which specific areas of your case (income, history, evidence) are most sensitive.',
    'section.whatYouGet.itemPlainTitle': 'Requirement Check',
    'section.whatYouGet.itemPlainBody': 'A per-requirement pass/fail table showing where you meet or miss the Home Office baseline.',
    'section.whatYouGet.itemNextStepsTitle': 'Tailored Checklist',
    'section.whatYouGet.itemNextStepsBody': 'A custom document list telling you exactly what to gather for your specific circumstances.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable PDF',
    'section.whatYouGet.itemDownloadBody': 'A professional-style PDF report you can save, print, or share with a legal adviser.',
    'section.whatYouGet.footerNote': 'Confidential automated assessment. Your data is used only to generate your report.',
    // FAQ
    'section.faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK is an automated tool providing informational audits based on public guidance. We are not a law firm and do not provide legal advice or manual case representation.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our engine is modelled on publicly available UK Home Office caseworker guidance, official immigration rules, and Appendix FM financial requirements.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Only the Home Office (UKVI) can make a final decision. Our tool provides a risk assessment to help you identify potential issues before you apply.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'You will instantly unlock your full interactive report in your browser and receive a link to download your professional PDF summary.',
    'faq.q5': 'Do you replace an immigration solicitor?',
    'faq.a5': 'No. Many users use our reports to prepare their case and save time before consulting a solicitor. We help you identify the "red flags" early.',
    'faq.q7': 'Is my data shared with the Home Office?',
    'faq.a7': 'No. We are not affiliated with the UK Government. Your information is confidential and is only used to generate your eligibility report.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. Pay once per report.',
    'pricing.tier.basic.label': 'BASIC SUMMARY',
    'pricing.tier.basic.price': '£29',
    'pricing.tier.basic.desc': 'A concise eligibility verdict and high-level risk pointers.',
    'pricing.tier.full.label': 'RECOMMENDED',
    'pricing.tier.full.name': 'Professional Audit + Checklist',
    'pricing.tier.full.price': '£79',
    'pricing.tier.full.desc': 'Comprehensive audit, checklist, and per-requirement breakdown.',
    'pricing.tier.pro.label': 'ADVANCED ANALYSIS',
    'pricing.tier.pro.name': 'Pro Analysis Add-On',
    'pricing.tier.pro.price': '£149',
    'pricing.tier.pro.desc': 'Deep-dive automated analysis of evidence gaps for complex cases.',
    'pricing.b2b': 'Legal firms or agencies? Contact us for bulk licensing.',
    'pricing.guarantee.title': 'Outcome Confidence Guarantee',
    'pricing.guarantee.body': 'If your report shows you are clearly ineligible under current rules, we will refund your fee in full upon request.',
    // Legal
    'legal.title': 'Important Legal Information',
    'legal.p1': 'ClearVisa UK is an automated assessment tool and is not a law firm.',
    'legal.p2': 'Our reports are based on public information and your specific answers. They do not constitute legal advice and cannot guarantee any visa outcome.',
    'legal.p3': 'We recommend consulting a qualified solicitor for complex cases involving overstays, criminal records, or previous refusals.',
    // Footer
    'footer.mission': 'Providing clarity to UK visa applicants through rule-based automated analysis.',
    // Partner
    'partner.title': 'Partner with ClearVisa',
    'partner.subtitle': 'Help your clients or audience understand their UK visa eligibility with our automated reports.',
    'partner.benefit1': 'Earn commission on every referral.',
    'partner.benefit2': 'Provide instant value to your audience.',
    'partner.benefit3': 'Professional white-label options available.',
    'partner.benefit4': 'Reliable rule-based automated logic.',
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
      // Return a humanized version of the key as fallback
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
