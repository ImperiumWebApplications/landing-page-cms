import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledButton = styled.a<{
  color: string | undefined;
  fullWidth: boolean | undefined;
  fixedWidth: string | undefined;
}>`
  display: block;
  width: ${({ fixedWidth, fullWidth }) =>
    fixedWidth ? fixedWidth : fullWidth ? '100%' : 'auto'};
  max-width: ${({ fullWidth, fixedWidth }) =>
    !fullWidth && !fixedWidth ? '18rem' : 'unset'};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ color, theme }) => color ?? theme.colors.primary};
  color: white;
  text-transform: uppercase;
  padding: 1rem 1.75rem 0.75rem 1.75rem;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: +0.25px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  text-align: left;

  &:disabled {
    opacity: 0.8;
    cursor: no-drop;
  }
`;

export interface ButtonProps {
  label: string;
  href?: string;
  color?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  fixedWidth?: string;
  icon?: React.ReactElement;
  onClickHandler?: React.MouseEventHandler;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  href,
  label,
  color,
  className,
  disabled,
  fixedWidth,
  fullWidth,
  onClickHandler,
  icon: Icon,
}) => {
  const defaultClasses = disabled
    ? 'call-to-action'
    : 'call-to-action shining-button';

  const classes = [defaultClasses, className].join(' ');
  const defaultProps = { fixedWidth, fullWidth, color, className: classes };

  if (href)
    return (
      <Link href={href} passHref>
        <StyledButton as="a" {...defaultProps}>
          {label} {Icon ? Icon : undefined}
        </StyledButton>
      </Link>
    );
  if (onClickHandler)
    return (
      <StyledButton
        as="button"
        disabled={disabled}
        onClick={onClickHandler}
        {...defaultProps}
      >
        {label} {Icon ? Icon : undefined}
      </StyledButton>
    );

  return <></>;
};
