import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

import type { LocationOption } from '../hooks/useLocationOptions';
import { CheckIcon, CircleIcon } from '../../../components/Icons';
import { Button } from '../../../components/Button';

type LocationPickerProps = {
  options: LocationOption[];
  value: string | null | undefined;
  setValue: (value: string) => void;
  onSubmit: () => void;
};

export const LocationPicker: React.FC<LocationPickerProps> = ({
  options,
  value,
  setValue,
  onSubmit,
}) => {
  return (
    <div className="flex h-auto w-full flex-col justify-between md:h-[calc(100%-75px)]">
      <div className="my-8 w-full">
        <div className="mx-auto w-full max-w-md md:mx-0">
          <HeadlessRadioGroup value={value ?? ''} onChange={setValue}>
            <div className="space-y-4">
              {options.map((option) => (
                <HeadlessRadioGroup.Option
                  key={option.key}
                  value={option.label}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-white ring-2 ring-secondary ring-opacity-60 ring-offset-2'
                        : ''
                    }
            ${
              checked
                ? 'bg-secondary bg-opacity-75 text-[white] shadow-md'
                : 'border-[1px] border-tertiary bg-[#FAFAFA] shadow-md'
            }
              relative flex cursor-pointer rounded-2xl px-6 py-4 focus:outline-none md:rounded-3xl md:px-12 md:py-6`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-6 md:gap-12">
                          {option.Icon ? (
                            <option.Icon
                              className={`h-[40px] w-[40px] md:h-[56px] md:w-[56px] ${
                                checked ? 'fill-[white]' : 'fill-gray'
                              }`}
                            />
                          ) : undefined}
                          <HeadlessRadioGroup.Label
                            as="p"
                            className={`pr-6 text-left font-medium md:text-lg ${
                              checked ? 'text-[white]' : 'text-gray'
                            }`}
                          >
                            {option.label}
                            {option.description ? (
                              <span className="block text-xs font-normal tracking-tight text-[black] opacity-50">
                                {option.description}
                              </span>
                            ) : undefined}
                          </HeadlessRadioGroup.Label>
                        </div>
                        <div className="text-white shrink-0">
                          {checked ? (
                            <CheckIcon className="h-4 w-6 fill-secondary md:h-6 md:w-6" />
                          ) : (
                            <CircleIcon className="h-4 w-6 stroke-secondary md:h-6 md:w-6" />
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
          variant="primary"
          className="my-8 flex-shrink-0"
          onClick={onSubmit}
          disabled={!value}
          label="Bestätigen und weiter"
        />
      </div>
    </div>
  );
};
