import type { Validator } from './Form.config';

import { TextField, TextFieldProps } from './components/TextField';
import { CheckboxFieldProps } from './components/CheckboxField';
import { SelectFieldProps } from './components/SelectField';
import { RadioGroupFieldProps } from './components/RadioGroupField';

export type CommonFieldProps = {
  id: string;
  label?: string;
  value: string | undefined;
  validators?: Validator[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export type FieldProps =
  | TextFieldProps
  | RadioGroupFieldProps
  | CheckboxFieldProps
  | SelectFieldProps;

export const Field = (props: FieldProps) => {
  switch (props.type) {
    case 'text':
      return <TextField {...props} />;
    case 'email':
      return <TextField {...props} />;
    // case 'radio':
    //   return <RadioGroupField {...props} />;
    // case 'checkbox':
    //   return <CheckboxField {...props} />;
    // case 'select':
    //   return <SelectField {...props} />;
    default:
      throw new Error('Unknown field type');
  }
};
