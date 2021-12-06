import React from 'react';
import styled from 'styled-components';

import { LandingPage } from '../backend-api';
import { devices } from '../config/breakpoints.config';
import { MobileNavigation } from './MobileNavigation';
import { Logo } from './Logo';
import { Button } from './Button';
import { headerButton } from '../config/navigation.config';

const StyledHeader = styled.header`
  display: flex;
  height: auto;
  min-height: 4rem;
  padding: 1rem;

  @media screen and (${devices.md}) {
    padding: 2rem;
  }

  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Header: React.FunctionComponent<{ content: LandingPage }> = ({
  content,
}) => {
  return (
    <StyledHeader>
      <div className="content-wrapper">
        <Logo image={content.logo_header} />
        <Button href={headerButton.href} label={headerButton.label} />
        <MobileNavigation />
      </div>
    </StyledHeader>
  );
};
