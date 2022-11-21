import styled from 'styled-components';
import Link from 'next/link';
import { Telephone } from '@styled-icons/foundation';
import { Mail } from '@styled-icons/fluentui-system-filled';
import { KeyboardArrowUp } from '@styled-icons/material-outlined';
import { devices } from '../config/breakpoints.config';

const StyledContactIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (${devices.md}) {
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 2px solid ${({ theme }) => theme.colors.tertiary};
    padding: 0.5rem;
    margin-right: 1rem;
    cursor: pointer;
    transition: border 0.3s ease-in-out;

    @media screen and (${devices.lg}) {
      margin-right: 2rem;
      width: 3rem;
      height: 3rem;
    }

    svg {
      fill: ${({ theme }) => theme.colors.tertiary};
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  .filled {
    position: relative;
    z-index: 0;
    overflow: hidden;
    border-color: transparent;
    transition: 0.2s transform ease-in-out;
    background-color: ${({ theme }) => theme.colors.tertiary};

    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }

    &::after {
      background-color: ${({ theme }) => theme.colors.primary};
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(0, 100%);
      transform-origin: top left;
      transition: 0.2s transform ease-out;
      will-change: transform;
      z-index: -1;
    }

    &:hover {
      svg {
        fill: ${({ theme }) => theme.colors.tertiary};
      }

      &::after {
        transform: translate(0, 0);
      }
    }
  }
`;

export const ContactIcons: React.FunctionComponent<{
  phone?: string | null;
  email?: string | null;
}> = ({ phone, email }) => {
  return (
    <StyledContactIcons>
      {phone && (
        <Link href={`tel:${phone}`} passHref>
          <a className="icon" aria-label="Telephone">
            <Telephone />
          </a>
        </Link>
      )}
      {email && (
        <Link href={`mailto:${email}`} passHref>
          <a className="icon" aria-label="Email">
            <Mail />
          </a>
        </Link>
      )}
      <div className="icon filled" onClick={() => window.scrollTo(0, 0)}>
        <KeyboardArrowUp />
      </div>
    </StyledContactIcons>
  );
};
