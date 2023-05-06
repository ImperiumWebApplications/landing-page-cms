import React from 'react';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import type {
  LandingPage,
  LandingPageLanguage,
  StaticContent,
} from '../../lib/strapi';
import { useLanguageContext } from '../../context/Language';
import { isFunnelRoute } from '../../utils/isFunnelRoute';
import { i18n } from '../../config/i18n.config';

import { Logo } from '../Logo';
import { Navigation } from './components/Navigation';

type HeaderProps = {
  content: LandingPage;
  staticContent: StaticContent;
};

export const Header: React.FC<HeaderProps> = ({ content, staticContent }) => {
  const { language } = useLanguageContext();

  const router = useRouter();
  const isFunnel = isFunnelRoute(router);

  const navigation = getNavigation(staticContent, language);

  return (
    <header
      id="header"
      className={isFunnel ? 'md:relative md:z-10' : 'min-[1400px]:mt-[50px]'}
    >
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.2 }}
        className="content-wrapper-xl relative z-[2] flex h-auto min-h-[3rem] w-full"
      >
        <div
          className={`flex w-full items-center ${
            isFunnel ? 'justify-center py-2' : 'justify-between py-4 md:py-8'
          }`}
        >
          <Logo
            image={content.logo?.data?.attributes}
            className={
              isFunnel
                ? 'h-[60px] w-[180px]'
                : 'h-[60px] w-[180px] md:h-[80px] md:w-[200px]'
            }
          />
          {!isFunnel ? <Navigation items={navigation} /> : null}
        </div>
      </motion.div>
    </header>
  );
};

const getNavigation = (
  content: StaticContent,
  language: LandingPageLanguage,
) => {
  const navigation = {
    home: {
      href: '/',
      label: i18n[language].HOME,
    },
    video: content.video_section?.navigation_item?.anchor_id
      ? {
          href: `/#${content.video_section.navigation_item.anchor_id}`,
          label: content.video_section?.navigation_item?.label,
        }
      : undefined,
    services: content.services_section?.navigation_item?.anchor_id
      ? {
          href: `/#${content.services_section.navigation_item.anchor_id}`,
          label: content.services_section?.navigation_item?.label,
        }
      : undefined,
    process: content.services_section?.process_navigation_item?.anchor_id
      ? {
          href: `/#${content.services_section.process_navigation_item.anchor_id}`,
          label: content.services_section?.process_navigation_item?.label,
        }
      : undefined,
    reviews: content.reviews_section?.navigation_item?.anchor_id
      ? {
          href: `/#${content.reviews_section?.navigation_item.anchor_id}`,
          label: content.reviews_section?.navigation_item?.label,
        }
      : undefined,
    questions: content.questions_section?.navigation_item?.anchor_id
      ? {
          href: `/#${content.questions_section?.navigation_item.anchor_id}`,
          label: content.questions_section?.navigation_item?.label,
        }
      : undefined,
  };

  return Object.values(navigation).filter(
    (item) => item?.href && item?.label,
  ) as { href: string; label: string }[];
};
