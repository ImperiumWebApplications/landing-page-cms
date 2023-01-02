import { forwardRef, Fragment, useEffect } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import cx from 'classnames';

import type { CommonFieldProps } from '../Field';
import { CheckIcon, ChevronDownIcon } from '../../Icons';
import { Label } from './Label';

export const SELECT_FIELD_BUTTON_TEST_ID = 'select-field-button';

export type SelectFieldProps = CommonFieldProps & {
  type: 'select';
  value: string | undefined;
  onChange: (value: string) => void;
  options: readonly string[];
  loading?: boolean;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
  };
};

export const SelectField = (props: SelectFieldProps) => {
  const { options, value, onChange } = props;

  useEffect(() => {
    if (options.length && !value) onChange(options?.[0]);
  }, [options, value, onChange]);

  return (
    <>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Listbox
        as="div"
        className="relative"
        id={props.id}
        value={props.value ?? ''}
        onChange={props.onChange}
        disabled={!props.options.length}
      >
        <ListboxButton {...props.buttonProps} value={props.value ?? ''} />
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
        >
          <ListboxOptions options={props.options} />
        </Transition>
      </Listbox>
    </>
  );
};

type ListboxButtonProps = SelectFieldProps['buttonProps'] & {
  value: string;
};

const ListboxButton = ({
  value,
  loading,
  className,
  disabled,
  ...props
}: ListboxButtonProps) => {
  return (
    <Listbox.Button
      {...props}
      disabled={disabled || loading}
      data-testid={SELECT_FIELD_BUTTON_TEST_ID}
      className={cx(
        `h-14 w-full rounded-md border-2 border-tertiary bg-[white] py-[17px] pr-12 pl-4 text-left align-middle tracking-wide ${
          disabled || loading
            ? `cursor-not-allowed brightness-95 ${loading ? 'shimmer' : ''}`
            : 'cursor-pointer transition-all hover:border-secondary'
        }`,
        className,
      )}
    >
      {/** Insert \200B (zero-width-whitespace) so that the button has the correct height */}
      <span
        className={`block truncate leading-normal empty:after:content-['\\200B'] ${
          loading || disabled ? 'text-gray' : 'text-[black]'
        }`}
      >
        {loading ? 'Wird geladen...' : value}
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon className="h-7 w-7 text-gray" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
};

type ListboxOptionsProps = {
  options: readonly string[];
};

// eslint-disable-next-line react/display-name
const ListboxOptions = forwardRef<HTMLUListElement, ListboxOptionsProps>(
  (props, ref) => {
    return (
      <Listbox.Options
        ref={ref}
        className="absolute top-[3.5rem] left-0 z-50 ml-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[white] py-1 text-gray shadow-lg ring-1 ring-[black] ring-opacity-5 focus:outline-none"
      >
        {props.options.map((option) => (
          <Listbox.Option
            key={option}
            value={option}
            className={({ active }) =>
              `relative w-full cursor-default select-none py-2 pr-10 pl-8 before:content-none ${
                active ? 'bg-tertiary' : ''
              }`
            }
          >
            {({ selected }) => (
              <>
                <span
                  className={`block leading-normal ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {option}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-secondary">
                    <CheckIcon
                      className="h-5 w-5 fill-secondary"
                      aria-hidden="true"
                    />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    );
  },
);
