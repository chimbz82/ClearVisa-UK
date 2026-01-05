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
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per pre-check.',
    'pricing.card.priceSuffix': '/ report',
    'pricing.tier.basic.label': 'BASIC PRE-CHECK',
    'pricing.tier.basic.price': '£29',
    'pricing.tier.basic.desc': 'Quick automated eligibility pre-check.',
    'pricing.tier.basic.note': 'Best for people starting out or just checking eligibility.',
    'pricing.tier.full.label': 'RECOMMENDED',
    'pricing.tier.full.name': 'Full Pre-Check + Document Checklist',
    'pricing.tier.full.price': '£79',
    'pricing.tier.full.desc': 'Most popular option for serious applicants.',
    'pricing.tier.human.label': 'HUMAN REVIEW ADD-ON',
    'pricing.tier.human.price': '£149',
    'pricing.tier.human.desc': 'Expert review without full solicitor fees.',
    'pricing.tier.human.disclaimer': 'Not legal advice. Not a law firm. Informational review service based on public guidance.',
    'pricing.currency.note': 'Currency automatically converted at checkout.',
    'pricing.b2b': 'Agencies or law firms? Contact us for bulk pricing.',
    'pricing.guarantee.title': 'Clear Outcome Guarantee',
    'pricing.guarantee.body': 'If your answers clearly show you are ineligible under current public rules, we will refund your fee in full. We don’t benefit from telling you what you don’t want to hear.',
    // Comparison
    'compare.title': 'Avoid expensive mistakes before you apply.',
    'compare.col.service': 'Service',
    'compare.col.get': 'What you get',
    'compare.col.cost': 'Typical cost',
    'compare.row1.name': 'Immigration lawyer consultation',
    'compare.row1.get': '30–60 minute conversation',
    'compare.row1.cost': '£150–£300',
    'compare.row2.name': 'Visa application fees',
    'compare.row2.get': 'Non-refundable, paid to government',
    'compare.row2.cost': '£1,200+',
    'compare.row3.name': 'ClearVisa UK Pre-Check',
    'compare.row3.get': 'Full risk screen before you apply',
    'compare.row3.cost': 'from £29',
    // Partner
    'partner.title': 'Partner with ClearVisa UK',
    'partner.subtitle': 'Immigration YouTubers, agencies, student advisors, and recruiters.',
    'partner.benefit1': 'Simple dashboard',
    'partner.benefit2': 'Tracked referral links',
    'partner.benefit3': 'Monthly payouts',
    'partner.benefit4': 'No legal risk (informational only)',
    'partner.cta': 'Apply for Affiliate Program',
    'partner.commission': 'Earn 20–30% commission per sale.',
    // Teaser
    'teaser.lock.title': 'Unlock your full report',
    'teaser.lock.body': 'See your detailed risk breakdown, personalized document checklist, and exact next steps to strengthen your case.',
    'teaser.upgrade.title': 'Want a stronger case?',
    'teaser.upgrade.body': 'Upgrade to Full Pre-Check for a personalized document checklist and detailed risk breakdown.',
    // Badges / Trust Strip
    'badges.title': 'Reliable Immigration Eligibility Pre-Check Reports',
    'badges.stripe': 'Secure payment by Stripe',
    'badges.gdpr': 'GDPR ready & Encrypted',
    'badges.confidential': 'Confidential assessment',
    'badges.publicGuidance': 'Based on public Home Office guidance',
    // How It Works
    'section.howItWorks.title': 'How it works',
    'section.howItWorks.subtitle': 'Assess your eligibility for free in minutes.',
    'section.howItWorks.step1Title': 'Step 1 – Free Assessment',
    'section.howItWorks.step1Body': 'Answer a few simple questions about your status and route. No credit card required.',
    'section.howItWorks.step2Title': 'Step 2 – Instant Verdict',
    'section.howItWorks.step2Body': 'See an immediate eligibility verdict (Likely, Borderline, or Unlikely) based on public rules.',
    'section.howItWorks.step3Title': 'Step 3 – Unlock Full Report',
    'section.howItWorks.step3Body': 'Unlock your professional report with a document checklist, risk breakdown, and heatmap visualization.',
    // Who Its For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa UK is built for real people trying to make serious decisions.',
    'section.whoFor.spouseTitle': 'Spouse & partner applicants',
    'section.whoFor.spouseBody': 'For people planning to apply for a UK spouse or partner visa and want to know if their income, relationship evidence, and status are on the right track.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers who want a quick sense of whether a job, salary, and sponsorship arrangement meet requirements.',
    'section.whoFor.reapplyTitle': 'People re-applying after refusal',
    'section.whoFor.reapplyBody': 'For applicants who have been refused before and want to avoid repeating mistakes by understanding sensitive areas.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving or collecting documents who want to know what needs to be fixed before they apply.',
    // What You Get
    'section.whatYouGet.title': 'What you get from your pre-check',
    'section.whatYouGet.subtitle': 'Not just a score – a structured summary you can actually use.',
    'section.whatYouGet.itemVerdictTitle': 'Eligibility verdict',
    'section.whatYouGet.itemVerdictBody': 'Likely, borderline, or unlikely based on your answers.',
    'section.whatYouGet.itemRiskTitle': 'Risk factor breakdown',
    'section.whatYouGet.itemRiskBody': 'Which areas look strong and which may cause problems.',
    'section.whatYouGet.itemPlainTitle': 'Plain-English explanation',
    'section.whatYouGet.itemPlainBody': 'What this means for your situation.',
    'section.whatYouGet.itemNextStepsTitle': 'Suggested next steps',
    'section.whatYouGet.itemNextStepsBody': 'What to fix or prepare before you spend money on applications.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable summary',
    'section.whatYouGet.itemDownloadBody': 'A clean PDF-style report you can save or share.',
    'section.whatYouGet.footerNote': 'You can take this summary to a solicitor, advisor, or keep it for your own planning.',
    // FAQ
    'section.faq.title': 'Frequently asked questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK is for informational purposes only. We are not a law firm. Our report is based on publicly available Home Office guidance to help you understand your standing before you potentially spend thousands.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our engine uses latest public Home Office caseworker guidance, policy documents, and immigration rules. We model these into structured flows.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Final decisions are made solely by UK Visas and Immigration (UKVI). Our tool identifies potential risk areas but cannot guarantee an outcome.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'Your full result appears instantly. You will receive a detailed verdict, risk factor breakdown, and suggested next steps. A downloadable PDF report will also be provided.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'We take privacy seriously. All data is processed securely and encrypted. We do not sell your personal data to third parties. We are fully compliant with GDPR.',
    // Legal & Footer
    'legal.title': 'Legal Disclosure',
    'legal.p1': 'ClearVisa UK is not a law firm and does not provide legal advice. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser.',
    'legal.p2': 'Your pre-check assessment is generated from the information you provide and publicly available UK Home Office guidance. Immigration rules can change without notice and no specific outcome is guaranteed.',
    'legal.p3': 'Final decisions are made solely by UK Visas and Immigration (UKVI) caseworkers. For complex cases, consult a qualified professional.',
    'legal.footer': 'Not affiliated with the UK Government or Home Office.',
    'footer.mission': 'Helping applicants understand their standing before they apply. Check your UK visa eligibility before you spend money on applications or professional advice.',
    'footer.nav': 'Navigation',
    'footer.support': 'Support',
    'footer.rights': '© 2026 ClearVisa UK. All rights reserved.',
    // Wizard
    'wizard.section.background': 'Background',
    'wizard.section.history': 'History',
    'wizard.section.job': 'Job & Sponsorship',
    'wizard.section.salary': 'Salary & Going Rate',
    'wizard.section.englishAndFunds': 'English & Funds',
    'wizard.button.continue': 'Continue',
    'wizard.button.back': 'Back',
    'wizard.button.cancel': 'Cancel',
    'wizard.button.seeResults': 'See free result',
    'wizard.progress': 'Complete',
    'wizard.question': 'Question',
    'wizard.footer': 'ClearVisa UK Pre-Check • Information Only • Secure'
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
    <LanguageProviderInternal value={{ language: 'en', t }}>
      {children}
    </LanguageProviderInternal>
  );
};

const LanguageProviderInternal = LanguageContext.Provider;

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};