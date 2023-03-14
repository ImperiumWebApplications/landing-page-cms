import React from 'react';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import type { LandingPage } from '../../lib/strapi';
import { isFunnelRoute } from '../../utils/isFunnelRoute';
import { navigationItems } from '../../config/navigation.config';

import { Logo } from '../Logo';
import { Navigation } from './components/Navigation';

type HeaderProps = {
  content: LandingPage;
};

export const Header: React.FC<HeaderProps> = ({ content }) => {
  const router = useRouter();
  const isFunnel = isFunnelRoute(router);

  return (
    <header
      id="header"
      className={
        isFunnel ? 'md:relative md:z-10 md:shadow-sm' : 'min-[1400px]:mt-[50px]'
      }
    >
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.2 }}
        className="content-wrapper relative z-[2] flex h-auto min-h-[3rem] w-full"
      >
        <div
          className={`flex w-full items-center py-4 md:py-8 ${
            isFunnel ? 'justify-center' : 'justify-between'
          }`}
        >
          <Logo
            image={content.logo?.data?.attributes}
            className="h-[60px] w-[180px] md:h-[80px] md:w-[200px]"
          />
          {!isFunnel ? <Navigation items={navigationItems} /> : null}
        </div>
      </motion.div>
    </header>
  );
};
