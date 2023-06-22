import { useEffect, useState } from 'react';
import Link from 'next/link';
import { resetCookieConsentValue } from 'react-cookie-consent';

import type { LandingPage, StaticContent } from '../../lib/strapi';
import { i18n } from '../../config/i18n.config';
import { useLanguageContext } from '../../context/Language';

import { Logo } from '../Logo';
import { COOKIE_CONSENT_NAME } from '../CookieConsent';

type FooterProps = {
  content: LandingPage;
  staticContent: StaticContent;
};

export const Footer: React.FC<FooterProps> = ({ content, staticContent }) => {
  const { language } = useLanguageContext();
  const [AGBContent, setAGBContent] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/landing-pages`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Get the current domain
        const currentDomain = window.location.host;
        // Iterate over the landing pages
        data.data.forEach((landingPage: any) => {
          // If the domain matches the current domain
          if (landingPage.attributes.domain === currentDomain) {
            setAGBContent(landingPage.attributes.agb)
          }
        });
      });
  },[])

  const onResetCookies = () => {
    window.scrollTo(0, 0);
    resetCookieConsentValue(COOKIE_CONSENT_NAME);
  };

  return (
    <footer className="flex h-auto w-full bg-primary text-tertiary">
      <div className="content-wrapper w-full py-6 md:py-10">
        <div className="flex w-full flex-col justify-center gap-4 md:gap-6">
          <div className="mx-auto flex w-56 items-center justify-center rounded-md bg-[white]/95 py-2 px-2">
            <Logo
              className="mx-auto block w-48"
              image={content.logo?.data?.attributes}
              colorless
            />
          </div>
          <nav className="flex flex-row flex-wrap items-center justify-center gap-x-4 md:gap-x-12">
            {staticContent.footer?.links?.map((navItem, i) => {
              if (!navItem.href || !navItem.label) return null;

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

            {AGBContent && (
                            <Link
                              key={"sadasd"}
                              href={"/agb"}
                              className="my-[2px] block font-normal text-secondary hover:text-[white]"
                            >
                              AGB
                            </Link>
            )}
            <button
              type="button"
              className="my-[2px] cursor-pointer text-left font-normal text-secondary hover:text-[white]"
              onClick={onResetCookies}
            >
              {staticContent.footer?.revoke_consent_label ?? 'Reset cookies'}
            </button>
          </nav>
          <div className="h-[1px] w-full bg-secondary" />
          <div className="text-center">
            {content.client_address ? (
              <div className="inline text-sm">{content.client_address}</div>
            ) : null}
            {content.contact_email ? (
              <>
                <div className="hidden px-4 md:inline">|</div>
                <div className="mt-3 block text-sm md:mt-0 md:inline">
                  <a
                    className="font-normal"
                    href={`mailto:${content.contact_email}?subject=${i18n[language].NEW_REQUEST}`}
                  >
                    {content.contact_email}
                  </a>
                </div>
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
