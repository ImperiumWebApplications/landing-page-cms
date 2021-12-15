import styled from 'styled-components';
import Link from 'next/link';

import React from 'react';

const StyledButton = styled.a<{
  color: string | undefined;
  fullWidth: boolean | undefined;
  fixedWidth: string | undefined;
}>`
  width: ${({ fixedWidth }) => fixedWidth ?? 'auto'};
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
`;

export const Button: React.FunctionComponent<{
  href: string;
  label: string;
  color?: string;
  fullWidth?: boolean;
  fixedWidth?: string;
  icon?: React.ReactElement;
}> = ({ href, label, color, fixedWidth, fullWidth, icon: Icon }) => {
  return (
    <Link href={href} passHref>
      <StyledButton
        color={color}
        fullWidth={fullWidth}
        fixedWidth={fixedWidth}
        className="call-to-action shining-button"
      >
        {label} {Icon ? Icon : undefined}
      </StyledButton>
    </Link>
  );
};
