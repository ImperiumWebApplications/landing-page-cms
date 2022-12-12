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
    <RadioGroup value={props.value} onChange={props.onChange}>
      {props.options.map((option) => (
        <RadioGroup.Option
          key={option}
          value={option}
          className="inline-flex items-center gap-3 py-2 align-middle cursor-pointer mr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-md"
        >
          {({ checked }) => {
            return (
              <>
                {checked ? (
                  <CheckIcon className="h-4 w-6 md:h-6 md:w-6 fill-secondary" />
                ) : (
                  <CircleIcon className="h-4 w-6 md:h-6 md:w-6 stroke-tertiary" />
                )}
                <RadioGroup.Label as="p">{option}</RadioGroup.Label>
              </>
            );
          }}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
