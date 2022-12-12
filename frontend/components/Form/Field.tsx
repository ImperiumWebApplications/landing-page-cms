import cx from 'classnames';

import type { Validator } from './Form.config';

import { TextField, TextFieldProps } from './components/TextField';
import { CheckboxFieldProps } from './components/CheckboxField';
import { SelectFieldProps } from './components/SelectField';
import {
  RadioGroupField,
  RadioGroupFieldProps,
} from './components/RadioGroupField';

export type CommonFieldProps = {
  id: string;
  label?: string;
  value: string | undefined;
  validators?: Validator[];
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export type FieldProps =
  | TextFieldProps
  | RadioGroupFieldProps
  | CheckboxFieldProps
  | SelectFieldProps;

export const Field = ({ className, ...props }: FieldProps) => {
  switch (props.type) {
    case 'text':
      return (
        <FieldWrapper className={className} type={props.type}>
          <TextField {...props} />
        </FieldWrapper>
      );
    case 'email':
      return (
        <FieldWrapper className={className} type={props.type}>
          <TextField {...props} />
        </FieldWrapper>
      );
    case 'radio':
      return (
        <FieldWrapper className={className} type={props.type}>
          <RadioGroupField {...props} />
        </FieldWrapper>
      );
    // case 'checkbox':
    //   return <CheckboxField {...props} />;
    // case 'select':
    //   return <SelectField {...props} />;
    default:
      throw new Error('Unknown field type');
  }
};

type FieldWrapperProps = {
  className?: string;
  children?: React.ReactNode;
  type?: string;
};

const FieldWrapper = ({ className, children, type }: FieldWrapperProps) => {
  return (
    <div className={cx('max-w-md', className)} data-field={type}>
      {children}
    </div>
  );
};
