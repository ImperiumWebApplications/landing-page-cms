import { useState } from 'react';

import type { CommonFieldProps } from '../Field';
import { Label } from './Label';

export type TextFieldProps = CommonFieldProps & {
  type: 'text' | 'email';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
        className={`w-full p-4 text-base tracking-wide rounded-lg transition-all border-2 border-solid outline-tertiary focus:ring-2 focus:ring-secondary focus:ring-offset-2 hover:ring-secondary hover:ring-2 ${
          error ? 'border-[indianred]' : 'border-tertiary'
        }`}
        name={props.id}
        aria-label={props.label}
        value={props.value ?? ''}
        onChange={props.onChange}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
      <span className="block absolute bottom-0 left-0 px-4 text-sm text-[indianred]">
        {error}
      </span>
    </div>
  );
};
