import type { LandingPage } from '../../lib/strapi';

import { FooterNavigation } from './components/FooterNavigation';
import { ContactIcons } from './components/ContactIcons';
import { Logo } from '../Logo';

type FooterProps = {
  content: LandingPage;
};

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="flex h-auto min-h-[3rem] w-full bg-primary text-tertiary">
      <div className="content-wrapper grid w-full grid-cols-1 grid-rows-3 gap-y-4 py-8 md:grid-cols-[auto_1fr_auto] md:grid-rows-1 md:gap-y-0">
        <div className="flex w-full flex-col pr-8 lg:justify-between lg:pr-16">
          <Logo image={content.logo?.data.attributes} colorless />
          {content.brand_name && (
            <span className="mt-4 block text-sm lowercase">
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
    </footer>
  );
};
