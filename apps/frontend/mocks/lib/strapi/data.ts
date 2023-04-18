import {
  LandingPage,
  Questionnaire,
  StaticContent,
} from '../../../src/lib/strapi';

export const content: { data: { id: number; attributes: LandingPage }[] } = {
  data: [
    {
      id: 4,
      attributes: {
        seo_title: 'Mehr Leads mit Leadquelle. Ganz sicher!',
        seo_description:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
        domain: 'localhost:3000',
        brand_name: 'Leadquelle',
        color_primary: '#673A99',
        color_secondary: '#FF6658',
        color_tertiary: '#FEF7E5',
        color_text: '#505050',
        contact_email: 'info@kmuenster.com',
        contact_phone: '+49123456789',
        createdAt: '2023-03-06T18:02:40.609Z',
        updatedAt: '2023-04-04T07:33:27.469Z',
        publishedAt: '2023-03-06T18:02:41.884Z',
        client_address:
          'Leadquelle Schweiz GmbH\nGeschäftsführer:\nDominik Eisenhardt\nGrafenauweg 8\n6300 Zug',
        client_vat: 'DE123333',
        service_type: null,
        google_allow_indexation: false,
        google_tag_manager_id: null,
        funnel_target: 'Questionnaire',
        sections: [
          {
            id: 3,
            __component: 'sections.hero',
            title: 'Erreichen Sie Ihre Werbeziele',
            subtitle:
              'Als lokale Online-Marketing-Agentur konzipieren und gestalten wir Online-Produkte für kleine und mittlere Unternehmen.',
            description: null,
            background_image: {
              data: {
                id: 176,
                attributes: {
                  name: 'Gruppe maskieren 80.png',
                  alternativeText: null,
                  caption: null,
                  width: 1340,
                  height: 1220,
                  formats: {
                    large: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/large_Gruppe_maskieren_80_4640cccb6d.png',
                      hash: 'large_Gruppe_maskieren_80_4640cccb6d',
                      mime: 'image/png',
                      name: 'large_Gruppe maskieren 80.png',
                      path: null,
                      size: 1827.05,
                      width: 1000,
                      height: 910,
                    },
                    small: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/small_Gruppe_maskieren_80_4640cccb6d.png',
                      hash: 'small_Gruppe_maskieren_80_4640cccb6d',
                      mime: 'image/png',
                      name: 'small_Gruppe maskieren 80.png',
                      path: null,
                      size: 482.71,
                      width: 500,
                      height: 455,
                    },
                    medium: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/medium_Gruppe_maskieren_80_4640cccb6d.png',
                      hash: 'medium_Gruppe_maskieren_80_4640cccb6d',
                      mime: 'image/png',
                      name: 'medium_Gruppe maskieren 80.png',
                      path: null,
                      size: 1056.17,
                      width: 750,
                      height: 683,
                    },
                    thumbnail: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/thumbnail_Gruppe_maskieren_80_4640cccb6d.png',
                      hash: 'thumbnail_Gruppe_maskieren_80_4640cccb6d',
                      mime: 'image/png',
                      name: 'thumbnail_Gruppe maskieren 80.png',
                      path: null,
                      size: 65.05,
                      width: 171,
                      height: 156,
                    },
                  },
                  hash: 'Gruppe_maskieren_80_4640cccb6d',
                  ext: '.png',
                  mime: 'image/png',
                  size: 609.45,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Gruppe_maskieren_80_4640cccb6d.png',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-04T07:29:14.343Z',
                  updatedAt: '2023-04-04T07:29:14.343Z',
                  related: {
                    data: [
                      {
                        id: 3,
                        attributes: {
                          __type: 'sections.hero',
                          title: 'Erreichen Sie Ihre Werbeziele',
                          subtitle:
                            'Als lokale Online-Marketing-Agentur konzipieren und gestalten wir Online-Produkte für kleine und mittlere Unternehmen.',
                          description: null,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            id: 2,
            __component: 'sections.video',
            video_title: 'Unser Prinzip für Ihren Erfolg!',
            video_description:
              'Unser Video enthält eine ausführliche Vorstellung unserer Dienstleistungen und zeigt Ihnen, wie Sie davon profitieren können. Mit anschaulichen Beispielen und Anwendungsfällen demonstrieren wir, wie unsere Lösungen Ihnen helfen können, Ihre Ziele zu erreichen.',
            statistics: [
              {
                id: 16,
                label: 'Premiumpartner',
                number: 322,
                number_suffix: null,
              },
              {
                id: 17,
                label: 'Premiumpartner',
                number: 322,
                number_suffix: null,
              },
              {
                id: 18,
                label: 'Kundenzufriedenheit',
                number: 100,
                number_suffix: '%',
              },
              {
                id: 19,
                label: 'Kundenzufriedenheit',
                number: 100,
                number_suffix: '%',
              },
            ],
          },
          {
            id: 2,
            __component: 'sections.services',
            title: 'Unsere Mission',
            description:
              'Zielführendes Online-Marketing für regionale Unternehmen, einfach und effizient.',
            service_image: {
              data: {
                id: 177,
                attributes: {
                  name: 'online-marketing.png',
                  alternativeText: null,
                  caption: null,
                  width: 920,
                  height: 1100,
                  formats: {
                    large: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/large_online_marketing_d08af8020f.png',
                      hash: 'large_online_marketing_d08af8020f',
                      mime: 'image/png',
                      name: 'large_online-marketing.png',
                      path: null,
                      size: 1001.28,
                      width: 836,
                      height: 1000,
                    },
                    small: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/small_online_marketing_d08af8020f.png',
                      hash: 'small_online_marketing_d08af8020f',
                      mime: 'image/png',
                      name: 'small_online-marketing.png',
                      path: null,
                      size: 263.18,
                      width: 418,
                      height: 500,
                    },
                    medium: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/medium_online_marketing_d08af8020f.png',
                      hash: 'medium_online_marketing_d08af8020f',
                      mime: 'image/png',
                      name: 'medium_online-marketing.png',
                      path: null,
                      size: 577.7,
                      width: 627,
                      height: 750,
                    },
                    thumbnail: {
                      ext: '.png',
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/thumbnail_online_marketing_d08af8020f.png',
                      hash: 'thumbnail_online_marketing_d08af8020f',
                      mime: 'image/png',
                      name: 'thumbnail_online-marketing.png',
                      path: null,
                      size: 29.42,
                      width: 130,
                      height: 156,
                    },
                  },
                  hash: 'online_marketing_d08af8020f',
                  ext: '.png',
                  mime: 'image/png',
                  size: 280.65,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/online_marketing_d08af8020f.png',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-04T07:32:51.472Z',
                  updatedAt: '2023-04-04T07:32:51.472Z',
                  related: {
                    data: [
                      {
                        id: 2,
                        attributes: {
                          __type: 'sections.services',
                          title: 'Unsere Mission',
                          description:
                            'Zielführendes Online-Marketing für regionale Unternehmen, einfach und effizient.',
                        },
                      },
                    ],
                  },
                },
              },
            },
            benefits: [
              {
                id: 1,
                title: 'Kunden gewinnen',
                description:
                  'Wir haben eine Erfolgsbilanz, die für sich spricht, und wir sind stolz darauf, dass wir unseren helfen konnten, ihre Ziele zu erreichen. Kunden',
              },
              {
                id: 2,
                title: 'Gefunden werden',
                description:
                  'Mit unserer Hilfe können Sie sicher sein, dass Ihre Website die notwendigen Keywords und Inhalte enthält, um in den Suchmaschinenergebnissen ganz oben zu stehen. ',
              },
              {
                id: 3,
                title: 'Bekanntheit erhöhen',
                description:
                  'Wir bieten eine breite Palette von Marketingdienst- Leistungen an, um Ihre Marke ins Rampenlicht zu stellen und Ihre Bekanntheit zu steigern. Unsere Experten helfen, eine effektive Marketingstrategie zu entwickeln, die auf Ihre Zielgruppe und Ziele abgestimmt ist.',
              },
            ],
            service_tab: [],
          },
          {
            id: 4,
            __component: 'sections.reviews',
            rating: [
              {
                id: 7,
                name: 'Simone Bach',
                biography: 'Lorem Ipsum',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin ipsum sed urna ornare aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin ip',
                avatar: {
                  data: {
                    id: 168,
                    attributes: {
                      name: 'Gruppe maskieren 70.jpg',
                      alternativeText: null,
                      caption: null,
                      width: 160,
                      height: 160,
                      formats: {
                        thumbnail: {
                          ext: '.jpg',
                          url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/thumbnail_Gruppe_maskieren_70_f4ca0c056f.jpg',
                          hash: 'thumbnail_Gruppe_maskieren_70_f4ca0c056f',
                          mime: 'image/jpeg',
                          name: 'thumbnail_Gruppe maskieren 70.jpg',
                          path: null,
                          size: 5.6,
                          width: 156,
                          height: 156,
                        },
                      },
                      hash: 'Gruppe_maskieren_70_f4ca0c056f',
                      ext: '.jpg',
                      mime: 'image/jpeg',
                      size: 5.75,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Gruppe_maskieren_70_f4ca0c056f.jpg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2023-03-06T18:20:19.961Z',
                      updatedAt: '2023-03-06T18:20:19.961Z',
                      related: {
                        data: [
                          {
                            id: 7,
                            attributes: {
                              __type: 'sections.rating',
                              name: 'Simone Bach',
                              biography: 'Lorem Ipsum',
                              description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin ipsum sed urna ornare aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin ip',
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                id: 6,
                name: 'Simone Bach',
                biography: 'Lorem Ipsum',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin ipsum sed urna ornare aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                avatar: {
                  data: {
                    id: 169,
                    attributes: {
                      name: 'Gruppe maskieren 77.jpg',
                      alternativeText: null,
                      caption: null,
                      width: 160,
                      height: 160,
                      formats: {
                        thumbnail: {
                          ext: '.jpg',
                          url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/thumbnail_Gruppe_maskieren_77_8cb600412d.jpg',
                          hash: 'thumbnail_Gruppe_maskieren_77_8cb600412d',
                          mime: 'image/jpeg',
                          name: 'thumbnail_Gruppe maskieren 77.jpg',
                          path: null,
                          size: 5.79,
                          width: 156,
                          height: 156,
                        },
                      },
                      hash: 'Gruppe_maskieren_77_8cb600412d',
                      ext: '.jpg',
                      mime: 'image/jpeg',
                      size: 6.03,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Gruppe_maskieren_77_8cb600412d.jpg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2023-03-06T18:20:19.976Z',
                      updatedAt: '2023-03-06T18:20:35.126Z',
                      related: {
                        data: [
                          {
                            id: 6,
                            attributes: {
                              __type: 'sections.rating',
                              name: 'Simone Bach',
                              biography: 'Lorem Ipsum',
                              description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin ipsum sed urna ornare aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            id: 2,
            __component: 'sections.faq',
            faq_item: [
              {
                id: 4,
                question: 'Was unterscheidet Ihre Firma von anderen Anbietern?',
                answer:
                  'Die genauen Kosten für eine professionelle Planung Ihres Gartens schwanken stark von Region zu Region und hängen natürlich auch vom Umfang der Planung ab. Wir empfehlen, sich zunächst mit unseren Experten in Verbindung zu setzen und im Rahmen der Bedarfsanalyse zu prüfen, ob Sie überhaupt einen Landschaftsbauer oder Architekten für Ihre Gartenplanung benötigen. Vieles lässt sich mit fachkundigem Rat und einem guten Online Gartenplaner heute alleine planen.',
              },
              {
                id: 5,
                question: 'Wie teuer ist ein Gartenplaner?',
                answer:
                  'Die genauen Kosten für eine professionelle Planung Ihres Gartens schwanken stark von Region zu Region und hängen natürlich auch vom Umfang der Planung ab. Wir empfehlen, sich zunächst mit unseren Experten in Verbindung zu setzen und im Rahmen der Bedarfsanalyse zu prüfen, ob Sie überhaupt einen Landschaftsbauer oder Architekten für Ihre Gartenplanung benötigen. Vieles lässt sich mit fachkundigem Rat und einem guten Online Gartenplaner heute alleine planen.',
              },
              {
                id: 6,
                question: 'Wie gestalte ich meine Terrasse?',
                answer:
                  'Die genauen Kosten für eine professionelle Planung Ihres Gartens schwanken stark von Region zu Region und hängen natürlich auch vom Umfang der Planung ab. Wir empfehlen, sich zunächst mit unseren Experten in Verbindung zu setzen und im Rahmen der Bedarfsanalyse zu prüfen, ob Sie überhaupt einen Landschaftsbauer oder Architekten für Ihre Gartenplanung benötigen. Vieles lässt sich mit fachkundigem Rat und einem guten Online Gartenplaner heute alleine planen.',
              },
              {
                id: 7,
                question: 'Brauche ich eine Genehmigung für einen Gartenzaun?',
                answer:
                  'Die genauen Kosten für eine professionelle Planung Ihres Gartens schwanken stark von Region zu Region und hängen natürlich auch vom Umfang der Planung ab. Wir empfehlen, sich zunächst mit unseren Experten in Verbindung zu setzen und im Rahmen der Bedarfsanalyse zu prüfen, ob Sie überhaupt einen Landschaftsbauer oder Architekten für Ihre Gartenplanung benötigen. Vieles lässt sich mit fachkundigem Rat und einem guten Online Gartenplaner heute alleine planen.',
              },
            ],
          },
        ],
        logo: {
          data: {
            id: 175,
            attributes: {
              name: 'leadquelle-logo.svg',
              alternativeText: null,
              caption: null,
              width: 180,
              height: 41,
              formats: null,
              hash: 'leadquelle_logo_7a57e30208',
              ext: '.svg',
              mime: 'image/svg+xml',
              size: 18.54,
              url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/leadquelle_logo_7a57e30208.svg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2023-03-27T11:20:02.505Z',
              updatedAt: '2023-03-27T11:20:02.505Z',
            },
          },
        },
        favicon: {
          data: {
            id: 115,
            attributes: {
              name: 'android-icon-192x192.png',
              alternativeText: 'android-icon-192x192.png',
              caption: 'android-icon-192x192.png',
              width: 192,
              height: 192,
              formats: {
                thumbnail: {
                  ext: '.png',
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/thumbnail_android_icon_192x192_4a5c0fcf46.png',
                  hash: 'thumbnail_android_icon_192x192_4a5c0fcf46',
                  mime: 'image/png',
                  name: 'thumbnail_android-icon-192x192.png',
                  path: null,
                  size: 18.19,
                  width: 156,
                  height: 156,
                },
              },
              hash: 'android_icon_192x192_4a5c0fcf46',
              ext: '.png',
              mime: 'image/png',
              size: 19.29,
              url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/android_icon_192x192_4a5c0fcf46.png',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2022-01-04T16:32:50.824Z',
              updatedAt: '2022-01-04T16:32:50.824Z',
            },
          },
        },
        questionnaires_entry_question: 'Welches Ziel möchten Sie erreichen?',
        questionnaires_relations: {
          data: [
            {
              id: 7,
              attributes: {
                name: 'Terasse',
                // @ts-ignore
                createdAt: '2023-03-06T18:25:24.162Z',
                updatedAt: '2023-03-06T18:25:24.721Z',
                publishedAt: '2023-03-06T18:25:24.719Z',
                description: null,
                priority: 2,
                icon: {
                  data: {
                    id: 173,
                    attributes: {
                      name: 'Terrasse_2fcfef5608.svg',
                      alternativeText: null,
                      caption: null,
                      width: 372,
                      height: 408,
                      formats: null,
                      hash: 'Terrasse_2fcfef5608_6bfa642461',
                      ext: '.svg',
                      mime: 'image/svg+xml',
                      size: 35.93,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Terrasse_2fcfef5608_6bfa642461.svg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2023-03-06T18:24:52.522Z',
                      updatedAt: '2023-03-06T18:24:52.522Z',
                    },
                  },
                },
              },
            },
            {
              id: 2,
              attributes: {
                name: 'Maler',
                // @ts-ignore
                createdAt: '2021-12-03T10:20:46.466Z',
                updatedAt: '2022-05-09T07:48:40.391Z',
                publishedAt: '2021-12-03T10:38:54.157Z',
                description: 'Neue Farbe für Fassaden und Innenräume...',
                priority: 5,
                icon: {
                  data: {
                    id: 125,
                    attributes: {
                      name: 'maler.svg',
                      alternativeText: 'maler.svg',
                      caption: 'maler.svg',
                      width: 45,
                      height: 51,
                      formats: null,
                      hash: 'maler_7dc875b12e',
                      ext: '.svg',
                      mime: 'image/svg+xml',
                      size: 2.59,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/maler_7dc875b12e.svg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2022-01-04T16:32:51.673Z',
                      updatedAt: '2022-01-04T16:32:51.673Z',
                    },
                  },
                },
              },
            },
            {
              id: 9,
              attributes: {
                name: 'Garten- und Landschaftsbau',
                // @ts-ignore
                createdAt: '2023-03-06T18:25:52.522Z',
                updatedAt: '2023-03-06T18:25:53.082Z',
                publishedAt: '2023-03-06T18:25:53.079Z',
                description: null,
                priority: 5,
                icon: {
                  data: {
                    id: 170,
                    attributes: {
                      name: 'Gartenbau_14b4d34d05.svg',
                      alternativeText: null,
                      caption: null,
                      width: 339,
                      height: 391,
                      formats: null,
                      hash: 'Gartenbau_14b4d34d05_e3dc138db5',
                      ext: '.svg',
                      mime: 'image/svg+xml',
                      size: 11.01,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Gartenbau_14b4d34d05_e3dc138db5.svg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2023-03-06T18:24:51.749Z',
                      updatedAt: '2023-03-06T18:24:51.749Z',
                    },
                  },
                },
              },
            },
            {
              id: 8,
              attributes: {
                name: 'Zaun',
                // @ts-ignore
                createdAt: '2023-03-06T18:25:38.380Z',
                updatedAt: '2023-03-06T18:25:38.999Z',
                publishedAt: '2023-03-06T18:25:38.998Z',
                description: null,
                priority: 3,
                icon: {
                  data: {
                    id: 171,
                    attributes: {
                      name: 'Zaun_52e43d7cf3.svg',
                      alternativeText: null,
                      caption: null,
                      width: 405,
                      height: 403,
                      formats: null,
                      hash: 'Zaun_52e43d7cf3_097e70d80c',
                      ext: '.svg',
                      mime: 'image/svg+xml',
                      size: 15.45,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Zaun_52e43d7cf3_097e70d80c.svg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2023-03-06T18:24:51.799Z',
                      updatedAt: '2023-03-06T18:24:51.799Z',
                    },
                  },
                },
              },
            },
          ],
        },
        questionnaires_advantages: {
          id: 10,
          personalized_advice:
            '<b>Persönliche Unterstützung</b><br>rund um das Thema Immobilien',
          years_of_experience:
            '<b>Über 10 Jahre Erfahrung</b><br>im Immobiliengeschäft',
          custom_service:
            '<b>100 % Individuell</b><br>Wir erfüllen Ihre Wünsche',
        },
        appointment: null,
      },
    },
  ],
};

export const questionnaire: {
  data: { id: number; attributes: Questionnaire }[];
} = {
  data: [
    {
      id: 6,
      attributes: {
        name: 'Wintergarten',
        // @ts-ignore
        createdAt: '2023-03-06T18:25:08.088Z',
        updatedAt: '2023-03-20T10:31:00.744Z',
        publishedAt: '2023-03-06T18:25:08.833Z',
        description: null,
        priority: 1,
        icon: {
          data: {
            id: 172,
            attributes: {
              name: 'Wi_Ga1_4b4c56d9b8.svg',
              alternativeText: null,
              caption: null,
              width: 436,
              height: 407,
              formats: null,
              hash: 'Wi_Ga1_4b4c56d9b8_4332319236',
              ext: '.svg',
              mime: 'image/svg+xml',
              size: 13.53,
              url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Wi_Ga1_4b4c56d9b8_4332319236.svg',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2023-03-06T18:24:51.803Z',
              updatedAt: '2023-03-06T18:24:51.803Z',
              related: {
                data: [
                  {
                    id: 6,
                    attributes: {
                      __type: 'api::questionnaire.questionnaire',
                      name: 'Wintergarten',
                      createdAt: '2023-03-06T18:25:08.088Z',
                      updatedAt: '2023-03-20T10:31:00.744Z',
                      publishedAt: '2023-03-06T18:25:08.833Z',
                      description: null,
                      priority: 1,
                    },
                  },
                ],
              },
            },
          },
        },
        questions: [
          {
            id: 12,
            question: 'Was möchten Sie versichern?',
            answers: [
              { id: 50, answer_value: 'Alles', answer_icon: { data: null } },
              { id: 51, answer_value: 'Nichts', answer_icon: { data: null } },
            ],
          },
          {
            id: 13,
            question: 'Möchten Sie weiss, einfarbig oder mehrfarbig?',
            answers: [
              { id: 52, answer_value: 'Weiss', answer_icon: { data: null } },
              {
                id: 53,
                answer_value: 'Einfarbig',
                answer_icon: { data: null },
              },
              { id: 54, answer_value: 'Bunt', answer_icon: { data: null } },
              {
                id: 55,
                answer_value: 'Mehrfarbig',
                answer_icon: { data: null },
              },
              {
                id: 56,
                answer_value: 'Weiß nicht',
                answer_icon: {
                  data: {
                    id: 172,
                    attributes: {
                      name: 'Wi_Ga1_4b4c56d9b8.svg',
                      alternativeText: null,
                      caption: null,
                      width: 436,
                      height: 407,
                      formats: null,
                      hash: 'Wi_Ga1_4b4c56d9b8_4332319236',
                      ext: '.svg',
                      mime: 'image/svg+xml',
                      size: 13.53,
                      url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/Wi_Ga1_4b4c56d9b8_4332319236.svg',
                      previewUrl: null,
                      provider: 'aws-s3',
                      provider_metadata: null,
                      createdAt: '2023-03-06T18:24:51.803Z',
                      updatedAt: '2023-03-06T18:24:51.803Z',
                      related: {
                        data: [
                          {
                            id: 6,
                            attributes: {
                              __type: 'api::questionnaire.questionnaire',
                              name: 'Wintergarten',
                              createdAt: '2023-03-06T18:25:08.088Z',
                              updatedAt: '2023-03-20T10:31:00.744Z',
                              publishedAt: '2023-03-06T18:25:08.833Z',
                              description: null,
                              priority: 1,
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

export const staticContent: {
  data: { id: number; attributes: StaticContent };
} = {
  data: {
    id: 2,
    attributes: {
      // @ts-ignore
      createdAt: '2021-12-07T12:50:30.878Z',
      updatedAt: '2023-04-11T07:34:13.148Z',
      imprint:
        '# Impressum\n\n${client_address}\n\n\n### Kontakt\nTelefon: ${contact_phone}\nE-Mail: ${contact_email}\n\n${client_vat}\n\n### Haftung für Links\nUnser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.\n\nBei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
      privacy: null,
      hero_section: {
        id: 1,
        hero_advantage: [
          {
            id: 1,
            description: 'Formular ausfüllen<br>und Bedarf festhalten',
            icon: {
              data: {
                id: 184,
                attributes: {
                  name: 'advantage1.svg',
                  alternativeText: null,
                  caption: null,
                  width: 44,
                  height: 44,
                  formats: null,
                  hash: 'advantage1_93733a454f',
                  ext: '.svg',
                  mime: 'image/svg+xml',
                  size: 0.88,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/advantage1_93733a454f.svg',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-11T07:34:01.358Z',
                  updatedAt: '2023-04-11T07:34:01.358Z',
                },
              },
            },
          },
          {
            id: 2,
            description: 'Kostenlos & unverbindlich Angebot erhalten',
            icon: {
              data: {
                id: 186,
                attributes: {
                  name: 'advantage2.svg',
                  alternativeText: null,
                  caption: null,
                  width: 44,
                  height: 48,
                  formats: null,
                  hash: 'advantage2_00796e72fc',
                  ext: '.svg',
                  mime: 'image/svg+xml',
                  size: 1.15,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/advantage2_00796e72fc.svg',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-11T07:34:01.435Z',
                  updatedAt: '2023-04-11T07:34:01.435Z',
                },
              },
            },
          },
          {
            id: 3,
            description: 'Bestes Preis-<br>Leistungs-Verhältnis',
            icon: {
              data: {
                id: 185,
                attributes: {
                  name: 'advantage3.svg',
                  alternativeText: null,
                  caption: null,
                  width: 47,
                  height: 48,
                  formats: null,
                  hash: 'advantage3_76d3360c2d',
                  ext: '.svg',
                  mime: 'image/svg+xml',
                  size: 1.33,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/advantage3_76d3360c2d.svg',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-11T07:34:01.362Z',
                  updatedAt: '2023-04-11T07:34:01.362Z',
                },
              },
            },
          },
        ],
      },
      video_section: {
        id: 1,
        video: {
          data: {
            id: 180,
            attributes: {
              name: 'video.mp4',
              alternativeText: null,
              caption: null,
              width: null,
              height: null,
              formats: null,
              hash: 'video_47128c60d3',
              ext: '.mp4',
              mime: 'video/mp4',
              size: 1816.21,
              url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/video_47128c60d3.mp4',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2023-04-11T07:24:15.288Z',
              updatedAt: '2023-04-11T07:24:15.288Z',
            },
          },
        },
        video_thumbnail: {
          data: {
            id: 179,
            attributes: {
              name: 'video-thumbnail 12.09.45.png',
              alternativeText: null,
              caption: null,
              width: 1733,
              height: 921,
              formats: {
                large: {
                  ext: '.png',
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/large_video_thumbnail_12_09_45_296fc0e365.png',
                  hash: 'large_video_thumbnail_12_09_45_296fc0e365',
                  mime: 'image/png',
                  name: 'large_video-thumbnail 12.09.45.png',
                  path: null,
                  size: 256.35,
                  width: 1000,
                  height: 531,
                },
                small: {
                  ext: '.png',
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/small_video_thumbnail_12_09_45_296fc0e365.png',
                  hash: 'small_video_thumbnail_12_09_45_296fc0e365',
                  mime: 'image/png',
                  name: 'small_video-thumbnail 12.09.45.png',
                  path: null,
                  size: 73.12,
                  width: 500,
                  height: 266,
                },
                medium: {
                  ext: '.png',
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/medium_video_thumbnail_12_09_45_296fc0e365.png',
                  hash: 'medium_video_thumbnail_12_09_45_296fc0e365',
                  mime: 'image/png',
                  name: 'medium_video-thumbnail 12.09.45.png',
                  path: null,
                  size: 150.97,
                  width: 750,
                  height: 399,
                },
                thumbnail: {
                  ext: '.png',
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/thumbnail_video_thumbnail_12_09_45_296fc0e365.png',
                  hash: 'thumbnail_video_thumbnail_12_09_45_296fc0e365',
                  mime: 'image/png',
                  name: 'thumbnail_video-thumbnail 12.09.45.png',
                  path: null,
                  size: 20.09,
                  width: 245,
                  height: 130,
                },
              },
              hash: 'video_thumbnail_12_09_45_296fc0e365',
              ext: '.png',
              mime: 'image/png',
              size: 144.28,
              url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/video_thumbnail_12_09_45_296fc0e365.png',
              previewUrl: null,
              provider: 'aws-s3',
              provider_metadata: null,
              createdAt: '2023-04-11T07:23:55.263Z',
              updatedAt: '2023-04-11T07:23:55.263Z',
            },
          },
        },
      },
      services_section: {
        id: 1,
        call_to_action_banner_title:
          'Wir helfen Ihnen unverbindlich und kostenlos, den besten Profi zu finden.',
        process_title: 'Absolut kostenlos und risikofrei Anfrage senden!',
        process_advantage_title: 'Unser Service',
        process_step: [
          {
            id: 1,
            description:
              'Kontaktformular mit den Daten Ihres Anliegens einsenden',
            icon: {
              data: {
                id: 181,
                attributes: {
                  name: 'step1.svg',
                  alternativeText: null,
                  caption: null,
                  width: 650,
                  height: 650,
                  formats: null,
                  hash: 'step1_38cdbaae39',
                  ext: '.svg',
                  mime: 'image/svg+xml',
                  size: 1.1,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/step1_38cdbaae39.svg',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-11T07:28:54.148Z',
                  updatedAt: '2023-04-11T07:28:54.148Z',
                },
              },
            },
          },
          {
            id: 2,
            description:
              'Innerhalb von 24h erhalten Sie einen Rückruf von unserem Expertenteam',
            icon: {
              data: {
                id: 182,
                attributes: {
                  name: 'step2.svg',
                  alternativeText: null,
                  caption: null,
                  width: 1000,
                  height: 1000,
                  formats: null,
                  hash: 'step2_446495c8b3',
                  ext: '.svg',
                  mime: 'image/svg+xml',
                  size: 2.77,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/step2_446495c8b3.svg',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-11T07:28:54.192Z',
                  updatedAt: '2023-04-11T07:28:54.192Z',
                },
              },
            },
          },
          {
            id: 3,
            description:
              'Individuelle und zielgerechte Erfassung Ihres Anliegens',
            icon: {
              data: {
                id: 181,
                attributes: {
                  name: 'step1.svg',
                  alternativeText: null,
                  caption: null,
                  width: 650,
                  height: 650,
                  formats: null,
                  hash: 'step1_38cdbaae39',
                  ext: '.svg',
                  mime: 'image/svg+xml',
                  size: 1.1,
                  url: 'https://landing-pages-images-local.s3.eu-central-1.amazonaws.com/step1_38cdbaae39.svg',
                  previewUrl: null,
                  provider: 'aws-s3',
                  provider_metadata: null,
                  createdAt: '2023-04-11T07:28:54.148Z',
                  updatedAt: '2023-04-11T07:28:54.148Z',
                },
              },
            },
          },
        ],
        process_advantage: [
          { id: 1, description: '100% kostenlos & unverbindlich' },
          { id: 2, description: 'Keine Auftragspflicht' },
        ],
      },
      reviews_section: {
        id: 1,
        title: 'Zufriedenheit unserer Kunden',
        call_to_action_banner_title:
          'Konnten wir Sie überzeugen?<br />Lassen Sie sich beraten',
      },
      questions_section: { id: 1, title: 'Häufig gestellte Fragen' },
    },
  },
};
