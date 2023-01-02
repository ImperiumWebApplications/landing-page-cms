import { cloneElement, useMemo } from 'react';

import Link from 'next/link';
import cx from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large' | 'fullWidth';

type CommonButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  label?: string;
  description?: string;
  Icon?: React.ReactElement;
};

type LinkButtonProps = CommonButtonProps & {
  to?: string;
};

type RegularButtonProps = CommonButtonProps & {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const BUTTON_TEST_ID = 'button';
export type ButtonProps = LinkButtonProps & RegularButtonProps;

export const Button = (props: ButtonProps) => {
  if (props.to && props.onClick)
    throw new Error('Button cannot have both a link and an onClick handler');

  if (!props.to && !props.onClick)
    throw new Error('Button must have either a link or an onClick handler');

  const variant = props.variant ?? 'secondary';
  const size = props.size ?? 'medium';

  const sizeStyle = getButtonSizeClasses(size, {
    description: props.description,
  });
  const variantStyle = getButtonVariantClasses(variant, {
    disabled: props.disabled,
  });

  const className = cx(
    `relative rounded-md ${sizeStyle} ${variantStyle}`,
    props.className,
  );

  const ButtonLabel = useMemo(() => {
    return (
      <>
        <div className="inline-block">
          <span className={`block ${props.description ? 'font-semibold' : ''}`}>
            {props.label}
          </span>
          {props.description ? (
            <span className="block text-sm font-normal normal-case tracking-normal opacity-95">
              {props.description}
            </span>
          ) : undefined}
        </div>
        {props.Icon ? (
          <span className="ml-4">
            {cloneElement(props.Icon, {
              ...props.Icon.props,
              className: cx(props.Icon.props?.className, 'inline-block'),
            })}
          </span>
        ) : undefined}
      </>
    );
  }, [props.label, props.description, props.Icon]);

  if (props.to) {
    return (
      <Link
        href={props.to}
        role="button"
        className={className}
        data-testid={BUTTON_TEST_ID}
      >
        {ButtonLabel}
      </Link>
    );
  }

  if (props.onClick) {
    return (
      <button
        onClick={props.onClick}
        className={className}
        disabled={props.disabled || props.loading}
        data-testid={BUTTON_TEST_ID}
      >
        <span className="spinner" style={{ opacity: props.loading ? 1 : 0 }} />
        <span
          className="inline-flex items-center"
          style={{ opacity: props.loading ? 0 : 1 }}
        >
          {ButtonLabel}
        </span>
      </button>
    );
  }

  return null;
};

export const getButtonVariantClasses = (
  variant: ButtonVariant,
  options?: { disabled?: boolean },
) => {
  const { disabled } = options ?? {};

  switch (variant) {
    case 'primary':
      return disabled
        ? 'text-[gray] bg-tertiary opacity-75 cursor-default'
        : 'text-[white] bg-primary hover:brightness-[105%] transition:all shining-button shadow-sm';
    case 'secondary':
      return disabled
        ? 'text-[gray] bg-tertiary opacity-75 cursor-default'
        : 'text-[white] bg-secondary hover:brightness-[105%] transition:all shining-button shadow-sm';
    case 'tertiary':
      return disabled
        ? 'text-gray bg-tertiary opacity-75 cursor-default'
        : 'text-gray bg-tertiary hover:brightness-[102%] transition:all shining-button shadow-sm';
  }
};

export const getButtonSizeClasses = (
  variant: ButtonSize,
  options?: { description?: string },
) => {
  switch (variant) {
    case 'small':
      return 'inline-block pt-3 pb-2 px-4';
    case 'medium':
      return 'inline-block pt-4 pb-3 px-8';
    case 'large':
      return `inline-block ${
        !!options?.description ? 'pt-4 pb-3 px-10' : 'pt-6 pb-5 px-8'
      }`;
    case 'fullWidth':
      return 'inline-block w-full pt-6 pb-5 px-10';
  }
};
