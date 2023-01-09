import type {
  RepeatableComponent,
  Media,
  NumberField,
  TextField,
} from './content-types';

/**
 * /api/questionnaires
 */

export type Questionnaire = {
  name?: TextField;
  description?: TextField;
  priority?: NumberField;
  icon?: Media;
  questions?: RepeatableComponent<{
    question?: TextField;
    answers?: RepeatableComponent<{
      answer_value?: TextField;
      answer_icon?: Media;
    }>;
  }>;
};
