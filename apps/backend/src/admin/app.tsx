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
        'Advantage no. 1': 'Vorteil Nr. 1',
        'Advantage no. 2': 'Vorteil Nr. 2',
        'Advantage no. 3': 'Vorteil nein. 3',
        'Trust Badges': 'Vertrauensabzeichen',
        'Questionnaire (inactive - please use fields above)':
          'Fragebogen (inaktiv - bitte Felder oben verwenden)',
        Countries: 'Länder',
        Headline: 'Überschrift',
        Subtitle: 'Untertitel',
        'Background image': 'Hintergrundbild',
        Video: 'Video',
        'Video thumbnail': 'Video-Miniaturansicht',
        Description: 'Beschreibung',
        Statistics: 'Statistik',
        Advantages: 'Vorteile',
        Image: 'Bild',
        'Service Details': 'Details zur Dienstleistung',
        inactive: 'inaktiv',
        Reviews: 'Bewertungen',
        'Frequently asked questions': 'Häufig gestellte Fragen',
      },
    },
  },
  bootstrap(app) {
    registerServiceTypeColumn(app);
  },
};
