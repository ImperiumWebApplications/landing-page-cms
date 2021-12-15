import React from 'react';
import styled from 'styled-components';

import { LandingPage } from '../backend-api';
import { headerButton } from '../config/navigation.config';
import { MobileNavigation } from './MobileNavigation';
import { Logo } from './Logo';
import { Button } from './Button';
import { devices } from '../config/breakpoints.config';

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 4rem;

  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .button {
    display: none;

    @media screen and (${devices.md}) {
      display: block;
      position: relative;
      z-index: 15;
    }
  }
`;

export const Header: React.FunctionComponent<{ content: LandingPage }> = ({
  content,
}) => {
  return (
    <StyledHeader id="header">
      <div className="content-wrapper">
        <Logo image={content.logo_header} />
        <div className="button">
          <Button href={headerButton.href} label={headerButton.label} />
        </div>
        <MobileNavigation />
      </div>
    </StyledHeader>
  );
};
