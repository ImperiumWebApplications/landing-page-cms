import React from 'react';
import styled from 'styled-components';

import { LandingPage } from '../backend-api';
import { headerButton } from '../config/navigation.config';
import { MobileNavigation } from './MobileNavigation';
import { Logo } from './Logo';
import { Button } from './Button';
import { Animation } from './Animation';
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
      height: auto;
      position: relative;
      z-index: 15;
    }
  }
`;

export const Header: React.FunctionComponent<{ content: LandingPage }> = ({
  content,
}) => {
  return (
    <Animation type="fadeDown" duration={200}>
      <StyledHeader id="header">
        <div className="content-wrapper">
          <Logo image={content.logo_header} />
          <Button
            href={headerButton.href}
            label={headerButton.label}
            className="button"
          />
          <MobileNavigation />
        </div>
      </StyledHeader>
    </Animation>
  );
};
