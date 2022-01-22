import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { LandingPage } from '../backend-api';
import { headerButton } from '../config/navigation.config';
import { MobileNavigation } from './MobileNavigation';
import { Logo } from './Logo';
import { Button } from './Button';
import { Animation } from './Animation';
import { devices } from '../config/breakpoints.config';
import { isFunnelRoute } from '../utils/isFunnelRoute';

const StyledHeader = styled.header<{ centerLogo: boolean }>`
  .animated-header {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    height: auto;
    min-height: 4rem;

    .content-wrapper {
      display: flex;
      align-items: center;
      justify-content: ${({ centerLogo }) =>
        centerLogo ? 'center' : 'space-between'};
      width: 100%;

      & > div:first-of-type {
        margin-right: ${({ centerLogo }) => (centerLogo ? '0' : '2rem')};
      }
    }
  }

  .button {
    display: none;

    @media screen and (${devices.md}) {
      display: block;
      height: auto;
      position: relative;
      z-index: 15;
    }
  }
`;

export const Header: React.FunctionComponent<{ content: LandingPage }> = ({
  content,
}) => {
  const _isFunnelRoute = isFunnelRoute(useRouter());

  return (
    <StyledHeader id="header" centerLogo={_isFunnelRoute}>
      <Animation className="animated-header" type="fadeDown" duration={200}>
        <div className="content-wrapper">
          <Logo image={content.logo_header} />
          {!_isFunnelRoute && (
            <>
              <Button
                href={headerButton.href}
                label={headerButton.label}
                className="button"
              />
              <MobileNavigation />
            </>
          )}
        </div>
      </Animation>
    </StyledHeader>
  );
};
