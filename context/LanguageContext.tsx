import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'es';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    'nav.howItWorks': 'How it works',
    'nav.whosItFor': 'Who it’s for',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Start eligibility check',
    'hero.heading': 'Check your UK visa eligibility before you spend money on applications or professional advice.',
    'hero.headingAccent': 'applications or professional advice.',
    'hero.subheading': 'Get an instant ClearVisa UK – Immigration Eligibility Pre-Check Report for spouse or skilled worker routes – with a clear verdict, risk flags, and next steps.',
    'hero.bullet1': 'No appointments or long forms required',
    'hero.bullet2': 'Instant result with a professional PDF summary',
    'hero.bullet3': 'Built around latest public Home Office rules',
    'hero.bullet4': 'Clear disclaimer: not legal advice',
    'hero.ctaPrimary': 'Start eligibility check',
    'hero.ctaSecondary': 'See how it works',
    'hero.footerText': 'Takes 2–3 minutes • Secure Assessment Engine',
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per pre-check.',
    'pricing.card.title': 'Full Eligibility Pre-Check',
    'pricing.card.priceSuffix': '/ check',
    'pricing.card.desc': 'Comprehensive assessment for Spouse/Partner or Skilled Worker routes',
    'pricing.card.cta': 'Start eligibility check',
    'pricing.footer': 'Information only assessment • Not legal advice',
    'wizard.section.background': 'Background',
    'wizard.section.history': 'History',
    'wizard.section.job': 'Job & Sponsorship',
    'wizard.section.salary': 'Salary & Going Rate',
    'wizard.section.englishAndFunds': 'English & Funds',
    'wizard.button.continue': 'Continue',
    'wizard.button.back': 'Back',
    'wizard.button.cancel': 'Cancel',
    'wizard.button.seeResults': 'See Results',
    'wizard.progress': 'Complete',
    'wizard.question': 'Question',
    'wizard.footer': 'ClearVisa UK Pre-Check • Information Only • Secure',
    'common.legalConvenience': 'This translation is provided for convenience only. The official version of this guidance and disclaimer is in English.'
  },
  fr: {
    'nav.howItWorks': 'Comment ça marche',
    'nav.whosItFor': 'Pour qui',
    'nav.pricing': 'Tarifs',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Vérifier mon éligibilité',
    'hero.heading': 'Vérifiez votre éligibilité au visa britannique avant de dépenser de l’argent en ',
    'hero.headingAccent': 'frais de dossier ou conseils professionnels.',
    'hero.subheading': 'Obtenez instantanément un rapport de pré-vérification ClearVisa UK pour les conjoints ou les travailleurs qualifiés – avec un verdict clair et les prochaines étapes.',
    'hero.bullet1': 'Aucun rendez-vous ni formulaire interminable',
    'hero.bullet2': 'Résultat instantané avec un résumé PDF professionnel',
    'hero.bullet3': 'Basé sur les dernières règles officielles du Home Office',
    'hero.bullet4': 'Avis de non-responsabilité : pas de conseil juridique',
    'hero.ctaPrimary': 'Commencer la vérification',
    'hero.ctaSecondary': 'Voir comment ça marche',
    'hero.footerText': 'Prend 2-3 minutes • Moteur d\'évaluation sécurisé',
    'pricing.title': 'Tarification simple et unique',
    'pricing.subtitle': 'Pas d\'abonnement. Pas de frais cachés. Payez une fois par vérification.',
    'pricing.card.title': 'Pré-vérification complète',
    'pricing.card.priceSuffix': '/ vérification',
    'pricing.card.desc': 'Évaluation complète pour les visas conjoint ou travailleur qualifié',
    'pricing.card.cta': 'Vérifier mon éligibilité',
    'pricing.footer': 'Évaluation à titre informatif • Pas de conseil juridique',
    'wizard.section.background': 'Contexte',
    'wizard.section.history': 'Historique',
    'wizard.section.job': 'Emploi & Parrainage',
    'wizard.section.salary': 'Salaire',
    'wizard.section.englishAndFunds': 'Anglais & Fonds',
    'wizard.button.continue': 'Continuer',
    'wizard.button.back': 'Retour',
    'wizard.button.cancel': 'Annuler',
    'wizard.button.seeResults': 'Voir les résultats',
    'wizard.progress': 'Terminé',
    'wizard.question': 'Question',
    'wizard.footer': 'Pré-vérification ClearVisa UK • Information Uniquement • Sécurisé',
    'common.legalConvenience': 'Cette traduction est fournie uniquement pour votre commodité. La version officielle de ces conseils et de cet avis de non-responsabilité est en anglais.'
  },
  es: {
    'nav.howItWorks': 'Cómo funciona',
    'nav.whosItFor': 'Para quién es',
    'nav.pricing': 'Precios',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Verificar elegibilidad',
    'hero.heading': 'Verifique su elegibilidad para la visa del Reino Unido antes de gastar dinero en ',
    'hero.headingAccent': 'solicitudes o asesoramiento profesional.',
    'hero.subheading': 'Obtenga un informe instantáneo de verificación previa de ClearVisa UK para cónyuges o trabajadores calificados, con un veredicto claro y próximos pasos.',
    'hero.bullet1': 'Sin citas ni formularios largos',
    'hero.bullet2': 'Resultado instantáneo con resumen profesional en PDF',
    'hero.bullet3': 'Basado en las últimas reglas del Home Office',
    'hero.bullet4': 'Descargo de responsabilidad: no es asesoría legal',
    'hero.ctaPrimary': 'Iniciar verificación',
    'hero.ctaSecondary': 'Ver cómo funciona',
    'hero.footerText': 'Toma 2–3 minutos • Motor de evaluación seguro',
    'pricing.title': 'Precio único y sencillo',
    'pricing.subtitle': 'Sin suscripciones. Sin cargos ocultos. Paga una vez por verificación.',
    'pricing.card.title': 'Pre-verificación completa',
    'pricing.card.priceSuffix': '/ verificación',
    'pricing.card.desc': 'Evaluación integral para rutas de cónyuge o trabajador calificado',
    'pricing.card.cta': 'Iniciar verificación',
    'pricing.footer': 'Evaluación informativa • No es asesoría legal',
    'wizard.section.background': 'Antecedentes',
    'wizard.section.history': 'Historial',
    'wizard.section.job': 'Empleo y Patrocinio',
    'wizard.section.salary': 'Salario',
    'wizard.section.englishAndFunds': 'Inglés y Fondos',
    'wizard.button.continue': 'Continuar',
    'wizard.button.back': 'Atrás',
    'wizard.button.cancel': 'Cancelar',
    'wizard.button.seeResults': 'Ver resultados',
    'wizard.progress': 'Completado',
    'wizard.question': 'Pregunta',
    'wizard.footer': 'Pre-verificación de ClearVisa UK • Solo información • Seguro',
    'common.legalConvenience': 'Esta traducción se proporciona solo para su conveniencia. La versión oficial de esta guía y descargo de responsabilidad está en inglés.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('clearvisa_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem('clearvisa_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};