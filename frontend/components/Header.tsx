import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import type { LandingPage } from '../lib/strapi';
import {
  appointmentRoute,
  questionnaireRoute,
} from '../config/navigation.config';
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

        a img {
          object-position: ${({ centerLogo }) =>
            centerLogo ? 'center !important' : 'inherit'};
        }
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

export const Header: React.FC<{
  content: LandingPage;
}> = ({ content }) => {
  const _isFunnelRoute = isFunnelRoute(useRouter());

  const Navigation = useMemo(() => {
    if (_isFunnelRoute) return undefined;

    return (
      <>
        <Button
          href={
            content.funnel_target === 'Appointment'
              ? appointmentRoute
              : questionnaireRoute
          }
          label="Lassen Sie sich beraten"
          className="button"
        />
        <MobileNavigation />
      </>
    );
  }, [content.funnel_target, _isFunnelRoute]);

  return (
    <StyledHeader id="header" centerLogo={_isFunnelRoute}>
      <Animation className="animated-header" type="fadeDown" duration={200}>
        <div className="content-wrapper">
          <Logo image={content.logo?.data.attributes} />
          {Navigation}
        </div>
      </Animation>
    </StyledHeader>
  );
};
