import styled from 'styled-components';
import CookieConsentModal from 'react-cookie-consent';
import cx from 'classnames';

import { devices } from '../../config/breakpoints.config';
import { getButtonSizeClasses, getButtonVariantClasses } from '../Button';

export const COOKIE_CONSENT_NAME = 'lq-pages-cc';

const StyledCookieConsent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  z-index: 98;

  .CookieConsent {
    position: absolute;
    z-index: 99;
    background: white;
    padding: 2rem;
    bottom: 2rem !important;
    right: 1rem;
    width: calc(100% - 2rem);
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: 0.9rem;
    line-height: 1.25rem;
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;

    @media screen and (${devices.sm}) {
      width: 25rem;
      padding: 4rem 2rem;
      right: 2rem;
    }

    .title {
      display: block;
      margin-bottom: 1rem;
      color: black;
      opacity: 0.85;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: +1px;
      font-size: 0.8rem;
    }
  }
`;

export type CookiesAllowed = 'Yes' | 'No' | 'NotAnswered';
export type CookieConsentProps = {
  consent: CookiesAllowed;
  setConsent: React.Dispatch<React.SetStateAction<CookiesAllowed>>;
};

export const CookieConsent: React.FunctionComponent<CookieConsentProps> = ({
  consent,
  setConsent,
}) => {
  if (consent !== 'NotAnswered') return <></>;

  return (
    <StyledCookieConsent>
      <CookieConsentModal
        disableStyles={true}
        enableDeclineButton={true}
        expires={30}
        buttonText="Cookies erlauben"
        buttonClasses={cx(
          'relative rounded-md mt-4',
          getButtonVariantClasses('primary'),
          getButtonSizeClasses('medium'),
        )}
        onAccept={() => setConsent('Yes')}
        ariaAcceptLabel="Cookies erlauben"
        declineButtonText="Ablehnen"
        declineButtonClasses={cx(
          'relative rounded-md mt-4 mr-4',
          getButtonVariantClasses('tertiary'),
          getButtonSizeClasses('medium'),
        )}
        onDecline={() => setConsent('No')}
        ariaDeclineLabel="Cookies ablehnen"
        cookieName={COOKIE_CONSENT_NAME}
      >
        <span className="title">Hinweis</span>
        Diese Webseite nutzt Cookies und Tracking-Technologien. Ein Teil ist zur
        Nutzung erforderlich. Andere Technologien dienen dem Ausspielen
        personalisierter Werbung oder der Auswertung des Nutzerverhaltens. Mit
        einem Klick auf <strong>Cookies erlauben</strong> genehmigen Sie uns die
        Datenverarbeitung und Weitergabe an Dritte gemäß der{' '}
        <a href="/datenschutz" target="_blank">
          Datenschutzerklärung
        </a>
        .
      </CookieConsentModal>
    </StyledCookieConsent>
  );
};
