import styled from 'styled-components';

import { LandingPage } from '../backend-api';
import { devices } from '../config/breakpoints.config';
import { FooterNavigation } from './FooterNavigation';
import { ContactIcons } from './ContactIcons';
import { Logo } from './Logo';

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.tertiary};

  & > .content-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 1rem;

    @media screen and (${devices.md}) {
      grid-template-rows: 100%;
      grid-template-columns: 320px 1fr auto;
      row-gap: 0;
    }
  }

  .logo-wrapper {
    margin-right: 1rem;

    @media screen and (${devices.lg}) {
      margin-right: 4rem;
    }

    .copyright {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      text-transform: lowercase;
    }
  }
`;

export const Footer: React.FunctionComponent<{ content: LandingPage }> = ({
  content,
}) => {
  return (
    <StyledFooter>
      <div className="content-wrapper">
        <div className="logo-wrapper">
          <Logo image={content.logo_footer} />
          {content.brand_name && (
            <span className="copyright">
              &copy; {`${new Date().getFullYear()} ${content.brand_name}`}
            </span>
          )}
        </div>
        <FooterNavigation />
        <ContactIcons
          phone={content.contact_phone}
          email={content.contact_email}
        />
      </div>
    </StyledFooter>
  );
};
