import { useState } from 'react';

import type { CommonFieldProps } from '../Field';
import { Label } from './Label';

export type TextFieldProps = CommonFieldProps & {
  type: 'text' | 'email';
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const TextField = (props: TextFieldProps) => {
  const [error, setError] = useState<string | undefined>();

  const onFocusHandler: React.FocusEventHandler = () => {
    setError(undefined);
  };

  const onBlurHandler: React.FocusEventHandler = () => {
    if (props.validators?.length)
      props.validators.some((validator) => {
        const isValid = validator.regex.test(props.value ?? '');
        if (isValid) return false;

        setError(validator.message);
        return true;
      });
  };

  return (
    <div className="relative">
      <Label htmlFor={props.id}>{props.label}</Label>
      <input
        {...props.inputProps}
        type={props.type}
        className={`w-full rounded-lg border-2 border-solid px-4 py-3 text-base tracking-wide outline-[black]/10 transition-all hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          error ? 'border-[indianred]' : 'border-[black]/10'
        }`}
        name={props.id}
        autoComplete={props.id}
        aria-label={props.label}
        value={props.value ?? ''}
        onChange={props.onChange}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
      <span className="absolute -bottom-5 left-0 block text-xs text-[indianred]">
        {error}
      </span>
    </div>
  );
};
