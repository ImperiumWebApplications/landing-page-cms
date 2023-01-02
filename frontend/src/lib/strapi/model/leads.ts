/**
 * /api/leads
 */

import type {
  DateField,
  NumberField,
  Relation,
  RepeatableComponent,
  TextField,
} from './content-types';
import type { LandingPage } from './landing-page';

export type Lead = {
  salutation?: TextField;
  first_name?: TextField;
  last_name?: TextField;
  phone?: TextField;
  email?: TextField;
  postal_code?: TextField;
  city?: TextField;
  landing_page?: Relation<LandingPage>;
  appointment_requests?: RepeatableComponent<AppointmentRequest>;
  questionnaire_results?: RepeatableComponent<QuestionnaireResult>;
};

export type AppointmentRequest = {
  location?: TextField;
  duration?: NumberField;
  proposed_date?: DateField;
};

export type QuestionnaireResult = {
  question?: TextField;
  answer?: TextField;
};
