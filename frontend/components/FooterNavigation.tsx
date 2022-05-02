import styled from 'styled-components';
import Link from 'next/link';
import TagManager from 'react-gtm-module';
import { resetCookieConsentValue } from 'react-cookie-consent';
import { useRouter } from 'next/router';

import { COOKIE_CONSENT_NAME } from './CookieConsent';
import { navigationItems } from '../config/navigation.config';
import {
  ConsentConfig,
  setConsentConfig,
} from '../lib/analytics/setConsentConfig';

const StyledFooterNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  a,
  button {
    display: block;
    margin: 0.25rem 0;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.tertiary};

    &.active,
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    border: none;
    background: none;
    padding: 0;
    font-family: ${({ theme }) => theme.font};
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const FooterNavigation: React.FunctionComponent = () => {
  const router = useRouter();

  const onResetCookies = () => {
    window.scrollTo(0, 0);
    resetCookieConsentValue(COOKIE_CONSENT_NAME);
    TagManager.dataLayer({
      dataLayer: setConsentConfig('consent', 'update', ConsentConfig.Denied),
    });
  };

  return (
    <StyledFooterNavigation>
      {navigationItems.map((navItem, i) => {
        const isActive = router.pathname === navItem.href;
        return (
          <Link key={i} href={navItem.href} passHref>
            <a className={isActive ? 'active' : undefined}>{navItem.label}</a>
          </Link>
        );
      })}
      <button type="button" onClick={onResetCookies}>
        Cookie-Erlaubnis widerrufen
      </button>
    </StyledFooterNavigation>
  );
};
