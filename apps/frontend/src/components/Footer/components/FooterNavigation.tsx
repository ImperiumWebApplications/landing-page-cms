import Link from 'next/link';
import { useRouter } from 'next/router';
import { resetCookieConsentValue } from 'react-cookie-consent';

import { COOKIE_CONSENT_NAME } from '../../CookieConsent/CookieConsent';
import { navigationItems } from '../../../config/navigation.config';

export const FooterNavigation: React.FunctionComponent = () => {
  const router = useRouter();

  const onResetCookies = () => {
    window.scrollTo(0, 0);
    resetCookieConsentValue(COOKIE_CONSENT_NAME);
  };

  return (
    <nav className="flex flex-col">
      {navigationItems.map((navItem, i) => {
        const isActive = router.pathname === navItem.href;
        return (
          <Link
            key={i}
            href={navItem.href}
            className={`my-[2px] block font-normal ${
              isActive ? 'text-secondary' : 'text-tertiary hover:text-secondary'
            }`}
          >
            {navItem.label}
          </Link>
        );
      })}
      <button
        type="button"
        className="my-[2px] cursor-pointer text-left font-normal text-tertiary hover:text-secondary"
        onClick={onResetCookies}
      >
        Cookie-Erlaubnis widerrufen
      </button>
    </nav>
  );
};
