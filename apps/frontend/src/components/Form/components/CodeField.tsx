import { useLayoutEffect } from 'react';

import CodeInputField from 'react-auth-code-input';
import cx from 'classnames';

import type { CommonFieldProps } from '../Field';
import { Label } from './Label';
import { setNativeValue } from '../../../utils/setNativeValue';

export type CodeFieldProps = CommonFieldProps & {
  type: 'code';
  value: string | undefined;
  onChange: (value: string) => void;
  length: number;
  inputProps?: {
    className?: string;
  };
};

export const CodeField = (props: CodeFieldProps) => {
  // Set values natively since 'react-auth-code-input' does
  // not expose a value prop to set the initial value.
  useLayoutEffect(() => {
    if (!props.value) return;

    const values = props.value.split('');
    const query = `[aria-label*="${props.label}."]`;
    const inputs = document.querySelectorAll<HTMLInputElement>(query);
    inputs.forEach((input, i) => setNativeValue(input, values[i]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor={props.id}>{props.label}</Label>
      <CodeInputField
        inputClassName={cx(
          'appearance-none inline-block w-10 h-[52px] text-xl text-center uppercase focus:-outline-offset-1 focus:outline-1 focus:outline-primary border-y-2 border-l-[1px] border-[black]/10 first-of-type:border-l-2 first-of-type:rounded-tl-md first-of-type:rounded-bl-md last-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:border-r-2',
          props.inputProps?.className,
        )}
        ariaLabel={props.label}
        onChange={props.onChange}
        length={props.length}
        allowedCharacters={'numeric'}
      />
    </>
  );
};
