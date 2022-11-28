import type { ComponentProps } from 'react';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

import type { LocationOption } from '../hooks/useLocationOptions';
import { Button } from './Button';

type RadioGroupProps = {
  options: LocationOption[];
  value: string | null | undefined;
  setValue: (value: string) => void;
  onSubmit: () => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  setValue,
  onSubmit,
}) => {
  return (
    <div className="w-full h-auto md:h-[calc(100%-75px)] flex flex-col justify-between">
      <div className="w-full my-8">
        <div className="w-full max-w-md mx-auto md:mx-0">
          <HeadlessRadioGroup value={value ?? ''} onChange={setValue}>
            <div className="space-y-4">
              {options.map((option) => (
                <HeadlessRadioGroup.Option
                  key={option.key}
                  value={option.label}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-secondary'
                        : ''
                    }
            ${
              checked
                ? 'bg-secondary bg-opacity-75 text-[white]'
                : 'bg-[#FAFAFA] border-[1px] border-primary'
            }
              relative flex cursor-pointer rounded-2xl px-6 py-4 md:rounded-3xl  md:px-12 md:py-6 focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-6 md:gap-12">
                          {option.Icon ? (
                            <option.Icon
                              className={`w-[40px] h-[40px] md:w-[56px] md:h-[56px] ${
                                checked ? 'fill-[white]' : 'fill-gray'
                              }`}
                            />
                          ) : undefined}
                          <HeadlessRadioGroup.Label
                            as="p"
                            className={`text-left font-medium md:text-lg pr-6 ${
                              checked ? 'text-[white]' : 'text-gray'
                            }`}
                          >
                            {option.label}
                            {option.description ? (
                              <span className="block text-xs tracking-tight font-normal text-[black] opacity-50">
                                {option.description}
                              </span>
                            ) : undefined}
                          </HeadlessRadioGroup.Label>
                        </div>
                        <div className="shrink-0 text-white">
                          {checked ? (
                            <CheckIcon className="h-4 w-6 md:h-6 md:w-6" />
                          ) : (
                            <CircleIcon className="h-4 w-6 md:h-6 md:w-6" />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </HeadlessRadioGroup.Option>
              ))}
            </div>
          </HeadlessRadioGroup>
        </div>
      </div>
      <div className="w-full text-center md:text-right">
        <Button
          className="my-8 flex-shrink-0"
          onClick={onSubmit}
          disabled={!value}
        >
          Bestätigen und weiter
        </Button>
      </div>
    </div>
  );
};

const CheckIcon = (props: ComponentProps<'svg'>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CircleIcon = (props: ComponentProps<'svg'>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={11} className="stroke-secondary" />
    </svg>
  );
};
