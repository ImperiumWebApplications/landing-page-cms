interface LandingPage {
  id: number;
  seo_title: string;
  seo_description: string;
  brand_name: string;
  color_primary: string;
  color_secondary: string;
  color_tertiary: string;
  color_text: string;
  phone: string;
  email: string;
  domain: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  navigation: [];
  sections: [];
  questionnaire: [];
  favicon: [];
  logo: [];
}

export interface BackendAPI {
  '/landing-pages': {
    GET: {
      query: {
        domain?: string;
      };
      response: LandingPage[];
    };
  };
}
