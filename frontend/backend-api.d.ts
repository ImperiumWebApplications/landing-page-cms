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

interface Video {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
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
type VideoObject = { data: DataObject<Video> };

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
type VideoTitle = string;
type VideoDescription = string;
type LogoFooter = ImageObject;
type LogoHeader = ImageObject;
type Favicon = ImageObject;

interface ConnectedQuestionnaire {
  name: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  publishedAt: PublishedAt;
  description?: string;
  icon?: ImageObject;
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

interface CallToActionSection {
  id: number;
  __component: string;
  title?: string;
  subtitle?: string;
  service_description?: string;
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

interface VideoSection {
  id: number;
  __component: string;
  video_title?: VideoTitle;
  video_description?: VideoDescription;
}

type Sections =
  | HeroSection
  | StatisticsSection
  | CallToActionSection
  | ReviewsSection
  | ImagesSection
  | VideoSection;

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
  logo_footer?: LogoFooter;
  logo_header?: LogoHeader;
  favicon?: Favicon;
  questionnaire?: Questionnaire;
  sections?: Sections[];
}

type LandingPageObjectList = DataObject<LandingPage>[];

interface StaticContent {
  user_step_one?: string;
  user_step_two?: string;
  user_step_three?: string;
  video_file?: VideoObject;
  video_thumbnail?: ImageObject;
}

type StaticContentObject = DataObject<StaticContent>;

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

export interface BackendAPI {
  '/landing-pages': {
    GET: {
      response: APIResponse<LandingPageObjectList>;
    };
  };
  '/static-content': {
    GET: {
      response: APIResponse<StaticContentObject>;
    };
  };
}
