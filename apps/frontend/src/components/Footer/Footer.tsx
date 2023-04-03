import Link from 'next/link';
import { resetCookieConsentValue } from 'react-cookie-consent';

import type { LandingPage } from '../../lib/strapi';

import { Logo } from '../Logo';
import { COOKIE_CONSENT_NAME } from '../CookieConsent';
import { navigationItems } from '../../config/navigation.config';

type FooterProps = {
  content: LandingPage;
};

export const Footer: React.FC<FooterProps> = ({ content }) => {
  const onResetCookies = () => {
    window.scrollTo(0, 0);
    resetCookieConsentValue(COOKIE_CONSENT_NAME);
  };

  return (
    <footer className="flex h-auto w-full bg-primary text-tertiary">
      <div className="content-wrapper w-full py-6 md:py-10">
        <div className="flex w-full flex-col justify-center gap-4 md:gap-6">
          <Logo
            className="mx-auto block w-40 md:w-44"
            image={content.logo?.data?.attributes}
            colorless
          />
          <nav className="flex flex-row flex-wrap items-center justify-center gap-x-4 md:gap-x-12">
            {navigationItems.map((navItem, i) => {
              return (
                <Link
                  key={i}
                  href={navItem.href}
                  className="my-[2px] block font-normal text-secondary hover:text-[white]"
                >
                  {navItem.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="my-[2px] cursor-pointer text-left font-normal text-secondary hover:text-[white]"
              onClick={onResetCookies}
            >
              Cookie-Erlaubnis widerrufen
            </button>
          </nav>
          <div className="h-[1px] w-full bg-secondary" />
          <div className="text-center">
            {content.client_address ? (
              <div className="inline text-sm">{content.client_address}</div>
            ) : null}
            {content.contact_email ? (
              <>
                <div className="inline px-4">|</div>
                <div className="inline text-sm">{content.contact_email}</div>
              </>
            ) : null}
          </div>
          <div className="text-center text-sm">
            &copy; {`${new Date().getFullYear()} ${content.brand_name}`}
          </div>
        </div>
      </div>
    </footer>
  );
};
