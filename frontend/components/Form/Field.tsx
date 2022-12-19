import cx from 'classnames';

import { TextField, TextFieldProps } from './components/TextField';
import { CheckboxField, CheckboxFieldProps } from './components/CheckboxField';
import { SelectField, SelectFieldProps } from './components/SelectField';
import { CodeField, CodeFieldProps } from './components/CodeField';
import {
  RadioGroupField,
  RadioGroupFieldProps,
} from './components/RadioGroupField';

export type Validator = {
  regex: RegExp;
  message: string;
};

export type CommonFieldProps = {
  id: string;
  label?: string;
  validators?: readonly Validator[];
  className?: string;
};

export type FieldProps =
  | CodeFieldProps
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
    case 'checkbox':
      return (
        <FieldWrapper className={className} type={props.type}>
          <CheckboxField {...props} />
        </FieldWrapper>
      );
    case 'select':
      return (
        <FieldWrapper className={className} type={props.type}>
          <SelectField {...props} />
        </FieldWrapper>
      );
    case 'code':
      return (
        <FieldWrapper className={className} type={props.type}>
          <CodeField {...props} />
        </FieldWrapper>
      );
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
