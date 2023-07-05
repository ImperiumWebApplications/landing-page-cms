import { registerServiceTypeColumn } from './extensions/service-type-column';

export default {
  config: {
    locales: ['de'],
    translations: {
      de: {
        Domain: 'Domain',
        'Service type (internal)': 'Branche (intern)',
        Language: 'Sprache',
        Brand: 'Marke',
        'Google Tag Manager ID': 'Google Tag Manager ID',
        'Google indexation': 'Google-Indexierung',
        'Enabled postal code step': 'Aktivierter Postleitzahlenschritt',
        'SEO title': 'SEO-Titel',
        'SEO description': 'SEO-Beschreibung',
        'E-mail address': 'E-Mail Adresse',
        'Phone number': 'Rufnummer',
        'Company address': 'Adresse des Unternehmens',
        'VAT number': 'Umsatzsteueridentifikationsnummer',
        'Primary color': 'Primäre Farbe',
        'Secondary color': 'Sekundärfarbe',
        'Tertiary color': 'Tertiärfarbe',
        'Text color': 'Textfarbe',
        'Entry question for questionnaire': 'Einstiegsfrage für Fragebogen',
        Questionnaires: 'Fragebögen',
        'Questionnaire advantages': 'Fragebogen Vorteile',
        'Questionnaire (inactive - please use fields above)':
          'Fragebogen (inaktiv - bitte Felder oben verwenden)',
        Countries: 'Länder',
      },
    },
  },
  bootstrap(app) {
    registerServiceTypeColumn(app);
  },
};
