import { RadioGroup } from '@headlessui/react';

import type { CommonFieldProps } from '../Field';
import { CheckIcon, CircleIcon } from '../../Icons';

export type RadioGroupFieldProps = CommonFieldProps & {
  type: 'radio';
  value: string | undefined;
  onChange: (value: string) => void;
  options: readonly string[];
};

export const RadioGroupField = (props: RadioGroupFieldProps) => {
  return (
    <RadioGroup value={props.value ?? ''} onChange={props.onChange}>
      {props.options.map((option) => (
        <RadioGroup.Option
          key={option}
          value={option}
          data-testid={option}
          className="group mr-8 inline-flex cursor-pointer items-center gap-3 rounded-md py-2 align-middle transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          {({ checked }) => {
            return (
              <>
                {checked ? (
                  <CheckIcon className="h-6 w-6 fill-secondary" />
                ) : (
                  <CircleIcon className="h-6 w-6 stroke-tertiary group-hover:stroke-secondary" />
                )}
                <RadioGroup.Label>{option}</RadioGroup.Label>
              </>
            );
          }}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
