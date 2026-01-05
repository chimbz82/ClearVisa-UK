import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'es';

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
    // Badges / Trust Strip
    'badges.title': 'Reliable Immigration Eligibility Pre-Check Reports',
    'badges.stripe': 'Secure payment by Stripe',
    'badges.gdpr': 'GDPR ready & Encrypted',
    'badges.confidential': 'Confidential assessment',
    'badges.publicGuidance': 'Based on public Home Office guidance',
    // How It Works
    'section.howItWorks.title': 'How ClearVisa UK – Immigration Eligibility Pre-Check Report works',
    'section.howItWorks.subtitle': 'A three-step flow to complete clarity before you apply.',
    'section.howItWorks.step1Title': 'Step 1 – Tell us about your situation',
    'section.howItWorks.step1Body': 'Choose your route (spouse, skilled worker, or other common categories) and answer a short series of questions about your status, sponsor, income, and history.',
    'section.howItWorks.step2Title': 'Step 2 – ClearVisa UK analysis',
    'section.howItWorks.step2Body': 'Our engine maps your answers against latest Home Office rules and provides a clear preview summary (likely eligible, borderline, or unlikely eligible).',
    'section.howItWorks.step3Title': 'Step 3 – Get your official report',
    'section.howItWorks.step3Body': 'Pay a one-time fee to unlock your full ClearVisa UK – Immigration Eligibility Pre-Check Report, covering every risk factor and recommended next steps.',
    // Who Its For
    'section.whoFor.title': 'Who this tool is for',
    'section.whoFor.subtitle': 'ClearVisa UK – Immigration Eligibility Pre-Check Report is built for real people trying to make serious decisions.',
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
    'section.whatYouGet.itemVerdictTitle': 'Eligibility verdict',
    'section.whatYouGet.itemVerdictBody': 'Likely, borderline, or unlikely based on your answers.',
    'section.whatYouGet.itemRiskTitle': 'Risk factor breakdown',
    'section.whatYouGet.itemRiskBody': 'Which areas look strong and which may cause problems.',
    'section.whatYouGet.itemPlainTitle': 'Plain-English explanation',
    'section.whatYouGet.itemPlainBody': 'What this means for your situation.',
    'section.whatYouGet.itemNextStepsTitle': 'Suggested next steps',
    'section.whatYouGet.itemNextStepsBody': 'What to fix or prepare before you spend money on applications or professional advice.',
    'section.whatYouGet.itemDownloadTitle': 'Downloadable summary',
    'section.whatYouGet.itemDownloadBody': 'A clean PDF-style report you can save or share.',
    'section.whatYouGet.footerNote': 'You can take this summary to a solicitor, advisor, or keep it for your own planning.',
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions. No hidden fees. Pay once per pre-check.',
    'pricing.card.title': 'Full Eligibility Pre-Check',
    'pricing.card.priceSuffix': '/ check',
    'pricing.card.desc': 'Comprehensive assessment for Spouse/Partner or Skilled Worker routes',
    'pricing.card.bullet1': 'Route-specific compliance questionnaire',
    'pricing.card.bullet2': 'Full eligibility verdict & explanation',
    'pricing.card.bullet3': 'Detailed risk flag breakdown',
    'pricing.card.bullet4': 'Downloadable summary (PDF report)',
    'pricing.card.bullet5': 'Home Office guidance references',
    'pricing.card.cta': 'Start eligibility check',
    'pricing.footer': 'Information only assessment • Not legal advice',
    // FAQ
    'section.faq.title': 'Frequently asked questions',
    'faq.q1': 'Is this legal advice?',
    'faq.a1': 'No. ClearVisa UK – Immigration Eligibility Pre-Check Report is for informational purposes only. We are not a law firm. Our report is based on publicly available Home Office guidance to help you understand your standing before you potentially spend thousands on legal fees or application costs.',
    'faq.q2': 'Where do you get your rules from?',
    'faq.a2': 'Our engine uses latest public Home Office caseworker guidance, policy documents, and immigration rules. We model these into structured flows to provide a highly accurate eligibility pre-check.',
    'faq.q3': 'Can this guarantee my visa will be approved?',
    'faq.a3': 'No. Final decisions are made solely by UK Visas and Immigration (UKVI). Our tool identifies potential risk areas and eligibility markers, but cannot guarantee an outcome.',
    'faq.q4': 'What happens after I pay?',
    'faq.a4': 'Your full result appears instantly. You will receive a detailed verdict, risk factor breakdown, and suggested next steps. A downloadable ClearVisa UK – Immigration Eligibility Pre-Check Report (PDF) will also be provided.',
    'faq.q5': 'Do you store my data?',
    'faq.a5': 'We take privacy seriously. All data is processed securely and encrypted. We do not sell your personal data to third parties. We are fully compliant with GDPR and modern data protection standards.',
    // Legal & Footer
    'legal.title': 'Legal Disclosure',
    'legal.p1': 'ClearVisa UK – Immigration Eligibility Pre-Check Report is not a law firm and does not provide legal advice. This service does not replace advice from a qualified immigration solicitor or OISC-regulated adviser.',
    'legal.p2': 'Your pre-check assessment is generated from the information you provide and publicly available UK Home Office guidance. Immigration rules can change without notice and no specific outcome is guaranteed.',
    'legal.p3': 'Final decisions are made solely by UK Visas and Immigration (UKVI) caseworkers. For complex cases, consult a qualified immigration solicitor or OISC-regulated adviser.',
    'legal.footer': 'Not affiliated with the UK Government or Home Office.',
    'footer.mission': 'Helping applicants understand their standing before they apply. Check your UK visa eligibility before you spend money on applications or professional advice.',
    'footer.nav': 'Navigation',
    'footer.support': 'Support',
    'footer.rights': '© 2026 ClearVisa UK – Immigration Eligibility Pre-Check Report. All rights reserved.',
    // Wizard
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
    // Nav
    'nav.howItWorks': 'Comment ça marche',
    'nav.whosItFor': 'Pour qui',
    'nav.pricing': 'Tarifs',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Vérifier mon éligibilité',
    // Hero
    'hero.heading': 'Vérifiez votre éligibilité au visa britannique avant de dépenser de l’argent en ',
    'hero.headingAccent': 'frais de dossier ou conseils professionnels.',
    'hero.subheading': 'Obtenez instantanément un rapport de pré-vérification ClearVisa UK pour les conjoints ou les travailleurs qualifiés – avec un verdict clair, des risques signalés et les étapes suivantes.',
    'hero.bullet1': 'Aucun rendez-vous ni formulaire interminable requis',
    'hero.bullet2': 'Résultat instantané avec un résumé PDF professionnel',
    'hero.bullet3': 'Basé sur les dernières règles officielles du Home Office',
    'hero.bullet4': 'Avis de non-responsabilité : ceci n’est pas un conseil juridique',
    'hero.ctaPrimary': 'Commencer la vérification',
    'hero.ctaSecondary': 'Voir comment ça marche',
    'hero.footerText': 'Prend 2-3 minutes • Moteur d\'évaluation sécurisé',
    // Badges / Trust Strip
    'badges.title': 'Rapports de pré-vérification d\'éligibilité à l\'immigration fiables',
    'badges.stripe': 'Paiement sécurisé par Stripe',
    'badges.gdpr': 'Conforme RGPD & Crypté',
    'badges.confidential': 'Évaluation confidentielle',
    'badges.publicGuidance': 'Basé sur les directives publiques du Home Office',
    // How It Works
    'section.howItWorks.title': 'Comment fonctionne le rapport ClearVisa UK',
    'section.howItWorks.subtitle': 'Un flux en trois étapes pour une clarté totale avant de postuler.',
    'section.howItWorks.step1Title': 'Étape 1 – Parlez-nous de votre situation',
    'section.howItWorks.step1Body': 'Choisissez votre itinéraire (conjoint, travailleur qualifié ou autres) et répondez à une courte série de questions sur votre statut, votre sponsor, vos revenus et votre historique.',
    'section.howItWorks.step2Title': 'Étape 2 – Analyse ClearVisa UK',
    'section.howItWorks.step2Body': 'Notre moteur confronte vos réponses aux dernières règles du Home Office et fournit un aperçu clair de l\'éligibilité (probable, incertaine ou peu probable).',
    'section.howItWorks.step3Title': 'Étape 3 – Obtenez votre rapport officiel',
    'section.howItWorks.step3Body': 'Payez des frais uniques pour débloquer votre rapport complet ClearVisa UK, couvrant chaque facteur de risque et les étapes recommandées.',
    // Who Its For
    'section.whoFor.title': 'À qui s\'adresse cet outil',
    'section.whoFor.subtitle': 'ClearVisa UK est conçu pour les personnes réelles prenant des décisions sérieuses.',
    'section.whoFor.spouseTitle': 'Demandeurs de visa conjoint & partenaire',
    'section.whoFor.spouseBody': 'Pour ceux qui envisagent de demander un visa de conjoint ou de partenaire au Royaume-Uni et souhaitent savoir si leurs preuves de revenus et de relation sont sur la bonne voie.',
    'section.whoFor.skilledTitle': 'Travailleurs qualifiés',
    'section.whoFor.skilledBody': 'Pour les travailleurs et employeurs souhaitant savoir rapidement si un emploi, un salaire et un parrainage répondent aux critères essentiels.',
    'section.whoFor.reapplyTitle': 'Ré-application après un refus',
    'section.whoFor.reapplyBody': 'Pour les candidats ayant déjà subi un refus et souhaitant éviter de répéter les mêmes erreurs en comprenant les zones sensibles.',
    'section.whoFor.plannersTitle': 'Planification précoce',
    'section.whoFor.plannersBody': 'Pour ceux qui économisent ou collectent encore des documents et veulent savoir ce qui doit être corrigé avant de postuler.',
    // What You Get
    'section.whatYouGet.title': 'Ce que vous obtenez',
    'section.whatYouGet.subtitle': 'Pas seulement un score – un résumé structuré que vous pouvez réellement utiliser.',
    'section.whatYouGet.itemVerdictTitle': 'Verdict d\'éligibilité',
    'section.whatYouGet.itemVerdictBody': 'Probable, limite ou peu probable selon vos réponses.',
    'section.whatYouGet.itemRiskTitle': 'Analyse des facteurs de risque',
    'section.whatYouGet.itemRiskBody': 'Quelles zones sont solides et lesquelles pourraient poser problème.',
    'section.whatYouGet.itemPlainTitle': 'Explications en français simple',
    'section.whatYouGet.itemPlainBody': 'Ce que cela signifie pour votre situation personnelle.',
    'section.whatYouGet.itemNextStepsTitle': 'Étapes suivantes suggérées',
    'section.whatYouGet.itemNextStepsBody': 'Ce qu\'il faut corriger avant de dépenser pour une demande officielle.',
    'section.whatYouGet.itemDownloadTitle': 'Résumé téléchargeable',
    'section.whatYouGet.itemDownloadBody': 'Un rapport professionnel au format PDF à conserver ou à partager.',
    'section.whatYouGet.footerNote': 'Vous pouvez présenter ce résumé à un avocat, un conseiller ou le garder pour votre propre planification.',
    // Pricing
    'pricing.title': 'Tarification simple et unique',
    'pricing.subtitle': 'Pas d\'abonnement. Pas de frais cachés. Payez par vérification.',
    'pricing.card.title': 'Pré-vérification complète',
    'pricing.card.priceSuffix': '/ vérification',
    'pricing.card.desc': 'Évaluation complète pour les visas conjoint/partenaire ou travailleur qualifié',
    'pricing.card.bullet1': 'Questionnaire de conformité spécifique à l\'itinéraire',
    'pricing.card.bullet2': 'Verdict d\'éligibilité complet et explications',
    'pricing.card.bullet3': 'Analyse détaillée des facteurs de risque',
    'pricing.card.bullet4': 'Résumé téléchargeable (rapport PDF)',
    'pricing.card.bullet5': 'Références aux directives du Home Office',
    'pricing.card.cta': 'Commencer la vérification',
    'pricing.footer': 'Évaluation informative uniquement • Pas de conseil juridique',
    // FAQ
    'section.faq.title': 'Questions fréquemment posées',
    'faq.q1': 'Est-ce un conseil juridique ?',
    'faq.a1': 'Non. Le rapport ClearVisa UK est uniquement à titre informatif. Nous ne sommes pas un cabinet d\'avocats. Notre rapport est basé sur les directives publiques pour vous aider à comprendre votre situation avant de dépenser des milliers de livres en frais officiels.',
    'faq.q2': 'D\'où proviennent vos règles ?',
    'faq.a2': 'Notre moteur utilise les dernières directives publiques, documents de politique et règles d\'immigration du Home Office pour fournir une vérification précise.',
    'faq.q3': 'Cela garantit-il l\'approbation de mon visa ?',
    'faq.a3': 'Non. Les décisions finales sont prises exclusivement par UK Visas and Immigration (UKVI). Notre outil identifie les risques mais ne garantit pas l\'issue.',
    'faq.q4': 'Que se passe-t-il après le paiement ?',
    'faq.a4': 'Votre résultat complet apparaît instantanément. Vous recevrez un verdict détaillé et un lien pour télécharger votre rapport PDF.',
    'faq.q5': 'Stockez-vous mes données ?',
    'faq.a5': 'Nous prenons la confidentialité au sérieux. Les données sont traitées de manière sécurisée et cryptée. Nous ne vendons pas vos données personnelles.',
    // Legal & Footer
    'legal.title': 'Divulgation Légale',
    'legal.p1': 'ClearVisa UK n\'est pas un cabinet d\'avocats et ne fournit pas de conseils juridiques. Ce service ne remplace pas les conseils d\'un avocat qualifié ou d\'un conseiller réglementé par l\'OISC.',
    'legal.p2': 'Votre évaluation est générée à partir des informations fournies et des directives publiques du Home Office. Les règles d\'immigration peuvent changer sans préavis.',
    'legal.p3': 'Les décisions finales sont prises par les agents du UKVI. Pour les cas complexes, consultez un professionnel.',
    'legal.footer': 'Non affilié au gouvernement britannique ou au Home Office.',
    'footer.mission': 'Aider les candidats à comprendre leur situation avant de postuler. Vérifiez votre éligibilité avant de dépenser pour des frais de dossier.',
    'footer.nav': 'Navigation',
    'footer.support': 'Assistance',
    'footer.rights': '© 2026 ClearVisa UK. Tous droits réservés.',
    // Wizard
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
    // Nav
    'nav.howItWorks': 'Cómo funciona',
    'nav.whosItFor': 'Para quién',
    'nav.pricing': 'Precios',
    'nav.faq': 'FAQ',
    'nav.startCheck': 'Verificar elegibilidad',
    // Hero
    'hero.heading': 'Verifique su elegibilidad para la visa del Reino Unido antes de gastar dinero en ',
    'hero.headingAccent': 'solicitudes o asesoramiento profesional.',
    'hero.subheading': 'Obtenga un informe instantáneo de verificación previa de ClearVisa UK para cónyuges o trabajadores calificados, con un veredicto claro, riesgos señalados y próximos pasos.',
    'hero.bullet1': 'Sin citas ni formularios interminables',
    'hero.bullet2': 'Resultado instantáneo con un resumen profesional en PDF',
    'hero.bullet3': 'Basado en las últimas reglas oficiales del Home Office',
    'hero.bullet4': 'Aviso legal: esto no es asesoría jurídica',
    'hero.ctaPrimary': 'Iniciar verificación',
    'hero.ctaSecondary': 'Ver cómo funciona',
    'hero.footerText': 'Toma 2-3 minutos • Motor de evaluación seguro',
    // Badges / Trust Strip
    'badges.title': 'Informes de pre-verificación de elegibilidad de inmigración confiables',
    'badges.stripe': 'Pago seguro por Stripe',
    'badges.gdpr': 'Cumple con RGPD y Encriptado',
    'badges.confidential': 'Evaluación confidencial',
    'badges.publicGuidance': 'Basado en la guía pública del Home Office',
    // How It Works
    'section.howItWorks.title': 'Cómo funciona el informe ClearVisa UK',
    'section.howItWorks.subtitle': 'Un proceso de tres pasos para obtener claridad total antes de solicitar.',
    'section.howItWorks.step1Title': 'Paso 1 – Cuéntenos su situación',
    'section.howItWorks.step1Body': 'Elija su ruta (cónyuge, trabajador calificado u otros) y responda preguntas breves sobre su estatus, patrocinador, ingresos e historial.',
    'section.howItWorks.step2Title': 'Paso 2 – Análisis de ClearVisa UK',
    'section.howItWorks.step2Body': 'Nuestro motor compara sus respuestas con las últimas reglas del Home Office y ofrece un resumen claro (probable, límite o poco probable).',
    'section.howItWorks.step3Title': 'Paso 3 – Obtenga su informe oficial',
    'section.howItWorks.step3Body': 'Pague una tarifa única para desbloquear su informe completo, que cubre cada factor de riesgo y los pasos recomendados.',
    // Who Its For
    'section.whoFor.title': 'Para quién es esta herramienta',
    'section.whoFor.subtitle': 'ClearVisa UK está diseñado para personas reales que toman decisiones importantes.',
    'section.whoFor.spouseTitle': 'Solicitantes de visa de cónyuge y pareja',
    'section.whoFor.spouseBody': 'Para quienes planean solicitar una visa de cónyuge o pareja en el Reino Unido y quieren saber si sus pruebas de ingresos y relación van por buen camino.',
    'section.whoFor.skilledTitle': 'Trabajadores calificados',
    'section.whoFor.skilledBody': 'Para trabajadores y empleadores que desean saber rápidamente si un empleo, salario y patrocinio cumplen con los requisitos clave.',
    'section.whoFor.reapplyTitle': 'Re-solicitud tras un rechazo',
    'section.whoFor.reapplyBody': 'Para solicitantes que han sido rechazados antes y quieren evitar los mismos errores entendiendo las áreas más sensibles.',
    'section.whoFor.plannersTitle': 'Planificación temprana',
    'section.whoFor.plannersBody': 'Para personas que aún están ahorrando o reuniendo documentos y quieren saber qué deben corregir antes de solicitar.',
    // What You Get
    'section.whatYouGet.title': 'Lo que obtiene con su pre-verificación',
    'section.whatYouGet.subtitle': 'No es solo una puntuación – es un resumen estructurado que realmente puede usar.',
    'section.whatYouGet.itemVerdictTitle': 'Veredicto de elegibilidad',
    'section.whatYouGet.itemVerdictBody': 'Probable, límite o poco probable según sus respuestas.',
    'section.whatYouGet.itemRiskTitle': 'Análisis de factores de riesgo',
    'section.whatYouGet.itemRiskBody': 'Qué áreas son sólidas y cuáles podrían causar problemas.',
    'section.whatYouGet.itemPlainTitle': 'Explicación en lenguaje claro',
    'section.whatYouGet.itemPlainBody': 'Lo que esto significa para su situación personal.',
    'section.whatYouGet.itemNextStepsTitle': 'Pasos a seguir sugeridos',
    'section.whatYouGet.itemNextStepsBody': 'Qué corregir antes de gastar dinero en solicitudes oficiales.',
    'section.whatYouGet.itemDownloadTitle': 'Resumen descargable',
    'section.whatYouGet.itemDownloadBody': 'Un informe profesional en PDF para guardar o compartir.',
    'section.whatYouGet.footerNote': 'Puede llevar este resumen a un abogado, asesor o guardarlo para su propia planificación.',
    // Pricing
    'pricing.title': 'Precios sencillos y únicos',
    'pricing.subtitle': 'Sin suscripciones. Sin cargos ocultos. Pague por verificación.',
    'pricing.card.title': 'Pre-verificación completa',
    'pricing.card.priceSuffix': '/ verificación',
    'pricing.card.desc': 'Evaluación integral para rutas de cónyuge/pareja o trabajador calificado',
    'pricing.card.bullet1': 'Cuestionario de cumplimiento específico para la ruta',
    'pricing.card.bullet2': 'Veredicto de elegibilidad completo y explicación',
    'pricing.card.bullet3': 'Desglose detallado de factores de riesgo',
    'pricing.card.bullet4': 'Resumen descargable (informe PDF)',
    'pricing.card.bullet5': 'Referencias a la guía del Home Office',
    'pricing.card.cta': 'Iniciar verificación',
    'pricing.footer': 'Evaluación informativa únicamente • No es asesoría legal',
    // FAQ
    'section.faq.title': 'Preguntas frecuentes',
    'faq.q1': '¿Es esto asesoría legal?',
    'faq.a1': 'No. El informe de ClearVisa UK es solo informativo. No somos un bufete de abogados. Nuestro informe se basa en guías públicas para ayudarle a entender su posición antes de gastar miles en honorarios.',
    'faq.q2': '¿De dónde obtienen sus reglas?',
    'faq.a2': 'Nuestro motor utiliza la última guía pública, documentos de política y reglas de inmigración del Home Office para ofrecer una verificación precisa.',
    'faq.q3': '¿Garantiza esto que mi visa será aprobada?',
    'faq.a3': 'No. Las decisiones finales las toma exclusivamente el UKVI. Nuestra herramienta identifica riesgos pero no garantiza el resultado.',
    'faq.q4': '¿Qué sucede después del pago?',
    'faq.a4': 'Su resultado completo aparece al instante. Recibirá un veredicto detallado y un enlace para descargar su informe en PDF.',
    'faq.q5': '¿Almacenan mis datos?',
    'faq.a5': 'Nos tomamos en serio la privacidad. Los datos se procesan de forma segura y encriptada. No vendemos sus datos personales a terceros.',
    // Legal & Footer
    'legal.title': 'Divulgación Legal',
    'legal.p1': 'ClearVisa UK no es un bufete de abogados y no ofrece asesoría legal. Este servicio no reemplaza el consejo de un abogado calificado o asesor regulado por la OISC.',
    'legal.p2': 'Su evaluación se genera a partir de la información proporcionada y la guía pública del Home Office. Las reglas pueden cambiar sin previo aviso.',
    'legal.p3': 'Las decisiones finales las toman los oficiales del UKVI. Para casos complejos, consulte a un profesional.',
    'legal.footer': 'No afiliado al gobierno británico ni al Home Office.',
    'footer.mission': 'Ayudando a los solicitantes a entender su situación antes de aplicar. Verifique su elegibilidad antes de gastar en solicitudes oficiales.',
    'footer.nav': 'Navegación',
    'footer.support': 'Soporte',
    'footer.rights': '© 2026 ClearVisa UK. Todos los derechos reservados.',
    // Wizard
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

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', language);
  }, [language]);

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