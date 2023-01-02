import CookieConsentModal from 'react-cookie-consent';
import cx from 'classnames';

import { getButtonSizeClasses, getButtonVariantClasses } from '../Button';

export const COOKIE_CONSENT_NAME = 'lq-pages-cc';

export type CookiesAllowed = 'Yes' | 'No' | 'NotAnswered';
export type CookieConsentProps = {
  consent: CookiesAllowed;
  setConsent: React.Dispatch<React.SetStateAction<CookiesAllowed>>;
};

export const CookieConsent: React.FC<CookieConsentProps> = ({
  consent,
  setConsent,
}) => {
  if (consent !== 'NotAnswered') return <></>;

  return (
    <div className="absolute top-0 left-0 z-40 h-full w-full bg-[black] bg-opacity-5 backdrop-blur-sm">
      <div className="relative h-[98vh] w-full">
        <CookieConsentModal
          disableStyles={true}
          enableDeclineButton={true}
          expires={30}
          containerClasses="absolute z-50 bg-[white] p-8 bottom-8 right-4 w-[calc(100%-2rem)] h-auto rounded-md text-sm shadow-lg md:max-w-lg sm:width-[25rem] sm:right-8"
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
          <span className="my-4 block text-lg font-semibold uppercase tracking-wide text-[black] opacity-90">
            Hinweis
          </span>
          Diese Webseite nutzt Cookies und Tracking-Technologien. Ein Teil ist
          zur Nutzung erforderlich. Andere Technologien dienen dem Ausspielen
          personalisierter Werbung oder der Auswertung des Nutzerverhaltens. Mit
          einem Klick auf <strong>Cookies erlauben</strong> genehmigen Sie uns
          die Datenverarbeitung und Weitergabe an Dritte gemäß der{' '}
          <a href="/datenschutz" target="_blank">
            Datenschutzerklärung
          </a>
          .
        </CookieConsentModal>
      </div>
    </div>
  );
};
