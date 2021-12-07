import styled from 'styled-components';
import Link from 'next/link';

import { devices } from '../config/breakpoints.config';
import React from 'react';

const StyledButton = styled.a<{
  color: string | undefined;
  fullWidth: boolean | undefined;
}>`
  display: none;
  max-width: ${({ fullWidth }) => (!fullWidth ? '15rem' : 'unset')};
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

  @media screen and (${devices.md}) {
    display: block;
    position: relative;
    z-index: 15;
  }
`;

export const Button: React.FunctionComponent<{
  href: string;
  label: string;
  color?: string;
  fullWidth?: boolean;
  icon?: React.ReactElement;
}> = ({ href, label, color, fullWidth, icon: Icon }) => {
  return (
    <Link href={href} passHref>
      <StyledButton
        color={color}
        fullWidth={fullWidth}
        className="call-to-action shining-button"
      >
        {label} {Icon ? Icon : undefined}
      </StyledButton>
    </Link>
  );
};
