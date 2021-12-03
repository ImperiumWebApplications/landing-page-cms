/** Generics */
interface DataObject<T> {
  id: number;
  attributes: T;
}
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}
interface Image {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
}
type ImageObject = { data: DataObject<Image> };
type ImageObjectList = { data: DataObject<Image>[] };

/** Specifics */

type SEOTitle = string;
type SEODescription = string;
type Domain = string;
type BrandName = string;
type ColorPrimary = string;
type ColorSecondary = string;
type ColorTertiary = string;
type ColorText = string;
type ContactEmail = string;
type ContactPhone = string;
type CreatedAt = string;
type UpdatedAt = string;
type PublishedAt = string;
type ClientAddress = string;
type ClientVAT = string;
type ServiceType = string;
type LogoFooter = ImageObject;
type LogoHeader = ImageObject;
type Favicon = ImageObject;

interface ConnectedQuestionnaire {
  name: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  publishedAt: PublishedAt;
  description?: string;
  icon: ImageObject;
}
interface Questionnaire {
  id: number;
  entry_question: string;
  questionnaires: ConnectedQuestionnaireObjectList;
  advantage: { id: number; first_line: string; second_line: string }[];
}
type ConnectedQuestionnaireObjectList = {
  data: DataObject<ConnectedQuestionnaire>[];
};

interface HeroSection {
  id: number;
  __component: string;
  title?: string;
  subtitle?: string;
  description?: string;
  background_image?: ImageObject;
}

interface StatisticNumber {
  id: number;
  label?: string;
  number?: number;
  number_suffix?: string | null;
}
interface StatisticsSection {
  id: number;
  __component: string;
  background_image?: ImageObject;
  number?: StatisticNumber[];
}

interface Rating {
  id: number;
  name?: string;
  biography: ?string;
  description?: string;
  avatar?: ImageObject;
}

interface ReviewsSection {
  id: number;
  __component: string;
  rating?: Rating[];
}

interface ImagesSection {
  id: number;
  __component: string;
  images?: ImageObjectList;
}

type Sections = HeroSection | StatisticsSection | ReviewsSection | ImageSection;

interface LandingPage {
  seo_title?: SEOTitle;
  seo_description?: SEODescription;
  domain: Domain;
  brand_name?: BrandName;
  color_primary?: ColorPrimary;
  color_secondary?: ColorSecondary;
  color_tertiary?: ColorTertiary;
  color_text?: ColorText;
  contact_email?: ContactEmail;
  contact_phone?: ContactPhone;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  publishedAt: PublishedAt;
  client_address?: ClientAddress;
  client_vat?: ClientVAT;
  service_type?: ServiceType;
  logo_footer?: LogoFooter;
  logo_header?: LogoHeader;
  favicon?: Favicon;
  questionnaire?: Questionnaire;
  sections?: Sections[];
}

type LandingPageObjectList = DataObject<LandingPage>[];

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
interface APIResponse<T> {
  data: T;
  meta: {
    pagination: Pagination;
  };
}

enum RelationalFields {
  LogoFooter = 'logo_footer',
  LogoHeader = 'logo_header',
  Favicon = 'favicon',
  Questionnaire = 'questionnaire',
  ConnectedQuestionnaires = `${RelationalFields.Questionnaire}.questionnaires`,
  QuestionnaireIcon = `${RelationalFields.Questionnaire}.icon`,
  QuestionnaireAdvantage = `${RelationalFields.Questionnaire}.advantage`,
}

export interface BackendAPI {
  '/landing-pages': {
    GET: {
      query: {
        populate?: RelationalFields;
        'filters[domain][$eq]'?: string;
        'filters[brand_name][$eq]'?: string;
        'filters[service_type][$eq]'?: string;
        'populate[sections][populate]'?: '*';
      };
      response: APIResponse<LandingPageObjectList>;
    };
  };
}
