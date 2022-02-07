interface APIResponse<T> {
  success: boolean;
  data: T;
}

interface CurrentUser {
  id: number;
  name: string;
  default_currency: string;
  locale: string;
  lang: number;
  email: string;
  phone: string;
  activated: boolean;
  last_login: string;
  created: string;
  modified: string;
  signup_flow_variation: string;
  has_created_company: boolean;
  is_admin: number;
  active_flag: boolean;
  timezone_name: string;
  timezone_offset: string;
  role_id: number;
  icon_url: string;
  is_you: boolean;
  company_id: number;
  company_name: string;
  company_domain: string;
  company_country: string;
  company_industry: string;
  language: {
    language_code: string;
    country_code: string;
  };
}

interface Lead {
  id: string;
  title: string;
  owner_id: number;
  creator_id: number;
  label_ids: string[];
  person_id: number;
  organization_id: null | number;
  source_name: string;
  is_archived: boolean;
  was_seen: boolean;
  value: {
    amount: number;
    currency: string;
  };
  expected_close_date: null | string;
  next_activity_id: number;
  add_time: string;
  update_time: string;
  visible_to: string;
  cc_email: string;
}

interface Note {
  id: number;
  active_flag: boolean;
  add_time: string;
  content: string;
  deal: {
    title: string;
  };
  lead_id: null | number;
  deal_id: null | number;
  last_update_user_id: number;
  org_id: null | number;
  organization: {
    name: string;
  };
  person: {
    name: string;
  };
  person_id: number;
  pinned_to_lead_flag: boolean;
  pinned_to_deal_flag: boolean;
  pinned_to_organization_flag: boolean;
  pinned_to_person_flag: boolean;
  update_time: string;
  user: {
    email: string;
    icon_url: string;
    is_you: boolean;
    name: string;
  };
  user_id: number;
}

interface Person {
  id: number;
  company_id: number;
  owner_id: unknown;
  org_id: unknown;
  name: string;
  first_name: string;
  last_name: string;
  open_deals_count: number;
  related_open_deals_count: number;
  closed_deals_count: number;
  related_closed_deals_count: number;
  participant_open_deals_count: number;
  participant_closed_deals_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  won_deals_count: number;
  related_won_deals_count: number;
  lost_deals_count: number;
  related_lost_deals_count: number;
  active_flag: boolean;
  phone: [
    {
      value: string;
      primary: boolean;
      label: string;
    },
  ];
  email: [
    {
      value: string;
      primary: boolean;
      label: string;
    },
  ];
  first_char: string;
  update_time: string;
  add_time: string;
  visible_to: string;
  marketing_status: string;
  picture_id: unknown;
  next_activity_date: string;
  next_activity_time: string;
  next_activity_id: number;
  last_activity_id: number;
  last_activity_date: string;
  last_incoming_mail_time: string;
  last_outgoing_mail_time: string;
  label: number;
  org_name: string;
  owner_name: string;
  cc_email: string;
  related_objects: {
    user: unknown;
  };
}

type FieldType =
  | 'address'
  | 'date'
  | 'daterange'
  | 'double'
  | 'enum'
  | 'monetary'
  | 'org'
  | 'people'
  | 'phone'
  | 'set'
  | 'text'
  | 'time'
  | 'timerange'
  | 'user'
  | 'varchar'
  | 'varchar_auto'
  | 'visible_to';

interface PersonField {
  id: number;
  key: string;
  name: string;
  order_nr: number;
  field_type: FieldType;
  add_time: string;
  update_time: string;
  last_updated_by_user_id: null | string;
  active_flag: boolean;
  edit_flag: boolean;
  index_visible_flag: boolean;
  details_visible_flag: boolean;
  add_visible_flag: boolean;
  important_flag: boolean;
  bulk_edit_allowed: boolean;
  searchable_flag: boolean;
  filtering_allowed: boolean;
  sortable_flag: boolean;
  options: { id: number; label: string }[];
  mandatory_flag: boolean;
}

interface SearchResult {
  result_score: number;
  item: {
    id: number;
    type: string;
    name: string;
    phones: string[];
    emails: string[];
    visible_to: number;
    owner: { id: number };
    organization: number | null;
    custom_fields: string[];
    notes: string[];
  };
}

interface SearchResults {
  items: SearchResult[];
}

export interface PipedriveAPI {
  '/users/me': {
    GET: {
      response: APIResponse<CurrentUser>;
      query: {
        api_token: string;
      };
    };
  };
  '/leads': {
    POST: {
      response: APIResponse<Lead>;
      body: {
        title: string;
        person_id: number;
        organization_id?: string;
        value?: { amount: number; currency: string };
        expected_close_date?: string;
        owner_id?: string;
        label_ids?: string[];
        visible_to?: 1 | 3 | 5 | 7;
        was_seen?: boolean;
      };
      query: {
        api_token: string;
      };
    };
  };
  '/notes': {
    POST: {
      response: APIResponse<Note>;
      body: {
        lead_id: string;
        person_id?: number;
        org_id?: number;
        deal_id?: number;
        user_id?: string;
        content: string;
        pinned_to_lead_flag?: 0 | 1;
        pinned_to_deal_flag?: 0 | 1;
        pinned_to_organization_flag?: 0 | 1;
        pinned_to_person_flag?: 0 | 1;
      };
      query: {
        api_token: string;
      };
    };
  };
  '/persons': {
    POST: {
      response: APIResponse<Person>;
      body: {
        name: string;
        email: { value: string; primary: boolean; label: string }[];
        phone: { value: string; primary: boolean; label: string }[];
        [key: string]: unknown;
        owner_id?: number;
        org_id?: number;
        visible_to?: 1 | 3 | 5 | 7;
        marketing_status?:
          | 'no_consent'
          | 'unsubscribed'
          | 'subscribed'
          | 'archived';
      };
      query: {
        api_token: string;
      };
    };
  };
  '/persons/search': {
    GET: {
      response: APIResponse<SearchResults>;
      query: {
        api_token: string;
        term: string;
        fields: string;
        exact_match?: boolean;
      };
    };
  };
  '/personFields': {
    GET: {
      response: APIResponse<PersonField[]>;
      query: {
        api_token: string;
      };
    };
    POST: {
      response: APIResponse<PersonField>;
      body: {
        name: string;
        field_type: FieldType;
      };
      query: {
        api_token: string;
      };
    };
  };
}
