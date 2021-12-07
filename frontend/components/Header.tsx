import React from 'react';
import styled from 'styled-components';

import { LandingPage } from '../backend-api';
import { headerButton } from '../config/navigation.config';
import { MobileNavigation } from './MobileNavigation';
import { Logo } from './Logo';
import { Button } from './Button';

const StyledHeader = styled.header`
  display: flex;
  height: auto;
  min-height: 4rem;

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
    <StyledHeader id="header">
      <div className="content-wrapper">
        <Logo image={content.logo_header} />
        <Button href={headerButton.href} label={headerButton.label} />
        <MobileNavigation />
      </div>
    </StyledHeader>
  );
};
