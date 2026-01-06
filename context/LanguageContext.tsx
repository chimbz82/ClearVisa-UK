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
    'nav.logo': 'UK Visa Pre-Check',
    'nav.howItWorks': 'How it works',
    'nav.whosItFor': 'Who it’s for',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Start eligibility check',
    // Hero
    'hero.heading': 'Check your UK visa eligibility in minutes,',
    'hero.headingAccent': 'before you spend thousands',
    'hero.subheading': 'Answer a few questions and get a personalised UK visa pre-check for spouse or skilled worker routes – with a clear eligibility verdict, risk flags, and next steps.',
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
    'section.howItWorks.title': 'How UK Visa Pre-Check works',
    'section.howItWorks.subtitle': 'A simple three-step flow from questions to clear outcome.',
    'section.howItWorks.step1Title': 'Step 1 – Tell us about your situation',
    'section.howItWorks.step1Body': 'Choose your route (spouse, skilled worker, or other common categories) and answer a short series of questions about your status, sponsor, income, and history.',
    'section.howItWorks.step2Title': 'Step 2 – See your eligibility score preview',
    'section.howItWorks.step2Body': 'Based on your answers, we map you against key Home Office rules and give you a clear preview summary (likely eligible, borderline, or unlikely eligible).',
    'section.howItWorks.step3Title': 'Step 3 – Unlock full result & summary',
    'section.howItWorks.step3Body': 'Pay a small one-off fee to unlock your full personalised report: eligibility verdict, key risk factors, and suggested next steps you can discuss with a solicitor or advisor.',
    'section.howItWorks.footer': 'You stay in control: no automatic referrals, no unexpected calls.',
    // Who It's For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'UK Visa Pre-Check is built for real people trying to make serious decisions.',
    'section.whoFor.spouseTitle': 'Spouse & partner applicants',
    'section.whoFor.spouseBody': 'For people planning to apply for a UK spouse or partner visa and want to know if their income, relationship evidence, and status are on the right track.',
    'section.whoFor.skilledTitle': 'Skilled worker applicants',
    'section.whoFor.skilledBody': 'For workers and employers who want a quick sense of whether a job, salary, and sponsorship arrangement meet key skilled worker requirements.',
    'section.whoFor.reapplyTitle': 'People re-applying after refusal',
    'section.whoFor.reapplyBody': 'For applicants who have been refused before and want to avoid repeating the same mistakes by understanding which areas are most sensitive.',
    'section.whoFor.plannersTitle': 'Early-stage planners',
    'section.whoFor.plannersBody': 'For people still saving, planning, or collecting documents who want to know what needs to be fixed before they apply.',
    // What You Get
    'section.whatYouGet.title': 'What you get from your pre-check',
    'section.whatYouGet.subtitle': 'Not just a score – a structured summary you can actually use.',
    'section.whatYouGet.item1': 'Eligibility verdict: likely eligible, borderline, or unlikely eligible based on your inputs.',
    'section.whatYouGet.item2': 'Risk factor breakdown: which key areas are strong, and which may cause problems (income, status, documents, etc.).',
    'section.whatYouGet.item3': 'Plain-English explanation: what this means for your situation.',
    'section.whatYouGet.item4': 'Suggested next steps: what to fix or prepare before you spend money on applications or professional advice.',
    'section.whatYouGet.item5': 'Downloadable summary: a clean PDF-style summary you can save or share.',
    'section.whatYouGet.footer': 'You can take this summary to a solicitor, advisor, or keep it for your own planning.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per pre-check.',
    'pricing.planName': 'Full Eligibility Pre-Check',
    'pricing.price': '£19',
    'pricing.description': 'Complete assessment for one route (e.g. spouse or skilled worker)',
    'pricing.feat1': 'Full eligibility verdict & explanation',
    'pricing.feat2': 'Risk factor breakdown across key criteria',
    'pricing.feat3': 'Suggested next steps before you apply',
    'pricing.feat4': 'Downloadable summary (PDF-style)',
    'pricing.reassurance': 'No subscription. You only pay when you want to unlock a full result.',
    'pricing.tier.basic.badge': 'BUDGET',
    'pricing.tier.full.badge': 'RECOMMENDED',
    'pricing.tier.humanReview.badge': 'ENHANCED',
    // FAQ
    'section.faq.title': 'Frequently asked questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'UK Visa Pre-Check is not a law firm and does not provide legal advice. It is a preliminary pre-check tool based on public rules to help you understand your situation before seeking professional help from a qualified immigration solicitor.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our system uses publicly available Home Office guidance and policy documents, modelled into structured question flows to give you a clear assessment based on official rules.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Visa decisions are made exclusively by the Home Office and depend on full evidence and final application details. Our tool is a risk assessment based on your answers.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'The full result appears instantly on screen, and a link is provided to download or email a summary of your results for your records.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'Data is handled securely, only used for generating the result, and never sold to third parties. We value your privacy and data security.',
    'faq.q6': 'Can I use this if I’ve already applied or been refused?',
    'faq.a6': 'Yes, if you are planning a new application or want to understand specific risk areas. However, for complex histories, you should still consider legal advice.',
    'faq.q7': 'Do you connect me to lawyers?',
    'faq.a7': 'No. We make it clear there are no automatic referrals or unexpected sales calls. You stay in control of your data and next steps.',
    // Legal
    'legal.title': 'Important information',
    'legal.item1': 'UK Visa Pre-Check is not a law firm and does not provide legal advice.',
    'legal.item2': 'The tool is designed as a pre-check based on your answers and public information.',
    'legal.item3': 'It cannot guarantee any visa outcome.',
    'legal.item4': 'For complex situations (e.g. previous refusals, overstays), users should consult a qualified immigration solicitor.',
    // Footer
    'footer.mission': 'Helping applicants understand where they stand before they apply.',
    'footer.disclaimer': 'Not affiliated with the UK government or Home Office.'
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
