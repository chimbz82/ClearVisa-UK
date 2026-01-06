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
    // Section Badges
    'badges.title': 'Trusted by applicants worldwide',
    'badges.stripe': 'Secure Payments',
    'badges.gdpr': 'GDPR Compliant',
    'badges.confidential': '100% Confidential',
    'badges.publicGuidance': 'Official Guidance',
    // Section Headers
    'section.howItWorks.title': 'How it works',
    'section.howItWorks.subtitle': 'A simple automated process to guide you through complex UKVI rules.',
    'section.howItWorks.step1Title': 'Answer basic questions',
    'section.howItWorks.step1Body': 'Provide details about your nationality, status, and financial situation using our simple questionnaire.',
    'section.howItWorks.step2Title': 'Get instant screening',
    'section.howItWorks.step2Body': 'Our rule-based engine screens your inputs against public UK immigration policies.',
    'section.howItWorks.step3Title': 'Unlock full report',
    'section.howItWorks.step3Body': 'Upgrade to receive a professional audit, document checklist, and step-by-step risk breakdown.',
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa is designed for real people making serious life decisions.',
    'section.whoFor.spouseTitle': 'Spouse & Partner',
    'section.whoFor.spouseBody': 'Couples looking to meet Appendix FM requirements without the anxiety of a refusal.',
    'section.whoFor.skilledTitle': 'Skilled Workers',
    'section.whoFor.skilledBody': 'Professionals checking salary thresholds and sponsorship compliance.',
    'section.whoFor.reapplyTitle': 'Re-applicants',
    'section.whoFor.reapplyBody': 'Applicants previously refused who need to understand their "suitability" risks.',
    'section.whoFor.plannersTitle': 'Future Planners',
    'section.whoFor.plannersBody': 'People still saving or preparing who want to know what to fix before they apply.',
    'section.whatYouGet.title': 'What you get from your report',
    'section.whatYouGet.subtitle': 'More than just a score—a structured roadmap for your application.',
    'section.whatYouGet.itemVerdictTitle': 'Eligibility Verdict',
    'section.whatYouGet.itemVerdictBody': 'A clear Likely, Borderline, or Unlikely status based on official rules.',
    'section.whatYouGet.itemRiskTitle': 'Risk Breakdown',
    'section.whatYouGet.itemRiskBody': 'Heatmap identifying specifically which sections of your case are sensitive.',
    'section.whatYouGet.itemPlainTitle': 'Plain-English explanations',
    'section.whatYouGet.itemPlainBody': 'We translate complex Home Office policy into actionable advice.',
    'section.whatYouGet.itemNextStepsTitle': 'Step-by-step next steps',
    'section.whatYouGet.itemNextStepsBody': 'Exactly what to gather and fix before paying government fees.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable PDF Audit',
    'section.whatYouGet.itemDownloadBody': 'A clean, structured report you can keep or show to a solicitor.',
    'section.whatYouGet.footerNote': 'Confidential automated assessment. We do not store sensitive identity documents.',
    'section.faq.title': 'Frequently Asked Questions',
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
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'We model our engine based on publicly available UK Home Office guidance, Appendix FM, and official caseworker policy documents.',
    'faq.q3': 'Can this guarantee my visa approval?',
    'faq.a3': 'No. Only UKVI can approve a visa. We provide an assessment of your eligibility against public rules to help you avoid common mistakes.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'Your full structured report appears instantly in your dashboard. You will receive a detailed verdict, risk factor breakdown, and suggested next steps based on official guidance.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'Your answers are encrypted and used only to generate your report. We do not sell your data or share it with the Home Office.',
    'faq.q7': 'Do you offer ongoing support?',
    'faq.a7': 'We provide technical support for account and billing issues. For individual legal advice on complex cases, we recommend consulting a qualified immigration solicitor.',
    // Legal
    'legal.title': 'Important Information',
    'legal.p1': 'is an automated assessment tool and is not a law firm. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser.',
    'legal.p2': 'Automated checks are based on publicly available guidance which can change without notice.',
    'legal.p3': 'Accuracy of the result depends entirely on the accuracy of your answers.',
    'footer.mission': 'Helping applicants understand their standing before they apply using automated rule-based analysis.',
    // Partner
    'partner.title': 'Partner with ClearVisa',
    'partner.subtitle': 'Empower your clients with instant eligibility screening.',
    'partner.benefit1': 'White-label Reports',
    'partner.benefit2': 'Seamless Integration',
    'partner.benefit3': 'Bulk Discounts',
    'partner.benefit4': 'Reliable Logic',
    'partner.commission': 'Contact for bulk license keys',
    'partner.cta': 'Inquire about Partnership'
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