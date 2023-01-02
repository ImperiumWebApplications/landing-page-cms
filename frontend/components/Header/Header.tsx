import React, { useMemo } from 'react';

import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import type { LandingPage } from '../../lib/strapi';
import {
  appointmentRoute,
  questionnaireRoute,
} from '../../config/navigation.config';
import { isFunnelRoute } from '../../utils/isFunnelRoute';

import { Logo } from '../Logo';
import { Button } from '../Button';

import { MobileNavigation } from './components/MobileNavigation';

type HeaderProps = {
  content: LandingPage;
};

export const Header: React.FC<HeaderProps> = ({ content }) => {
  const router = useRouter();

  const isFunnel = isFunnelRoute(router);
  const isIndex = router.pathname === '/';
  const isAppointmentTarget = content.funnel_target === 'Appointment';

  const Navigation = useMemo(() => {
    if (isFunnel) return undefined;

    return (
      <>
        {!isAppointmentTarget || !isIndex ? (
          <Button
            variant="primary"
            size="large"
            className="z-15 relative hidden h-auto text-[0.9rem] uppercase tracking-wider md:block"
            label="Lassen Sie sich beraten"
            to={`/${
              isAppointmentTarget ? appointmentRoute : questionnaireRoute
            }`}
          />
        ) : null}
        <MobileNavigation />
      </>
    );
  }, [isAppointmentTarget, isFunnel, isIndex]);

  return (
    <header id="header">
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.2 }}
        className="content-wrapper relative z-[2] flex h-auto min-h-[3rem] w-full"
      >
        <div
          className={`flex w-full items-center py-4 md:py-8 ${
            isAppointmentTarget && isIndex
              ? 'justify-between md:justify-center'
              : isFunnel
              ? 'justify-center'
              : 'justify-between'
          }`}
        >
          <Logo
            image={content.logo?.data.attributes}
            className="h-[50px] w-[200px] sm:h-[60px] sm:w-[300px]"
          />
          {Navigation}
        </div>
      </motion.div>
    </header>
  );
};
