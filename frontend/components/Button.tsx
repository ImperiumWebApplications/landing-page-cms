import styled from 'styled-components';
import Link from 'next/link';

import { devices } from '../config/breakpoints.config';

const StyledButton = styled.a<{ color: string | undefined }>`
  display: none;
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
}> = ({ href, label, color }) => {
  return (
    <Link href={href} passHref>
      <StyledButton color={color} className="call-to-action shining-button">
        {label}
      </StyledButton>
    </Link>
  );
};
