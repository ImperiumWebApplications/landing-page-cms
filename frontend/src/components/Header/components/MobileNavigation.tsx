import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { navigationItems } from '../../../config/navigation.config';
import { motion } from 'framer-motion';

export const MobileNavigation: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'visible';
  }, [open]);

  return (
    <div className="block md:hidden">
      <div
        aria-label="Mobile Navigation Toggle"
        className="relative z-10 flex h-8 w-8 cursor-pointer flex-col justify-around overflow-x-hidden border-none bg-[transparent] p-0"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') setOpen(!open);
        }}
      >
        <div
          className={`relative h-1 w-8 rounded-md ${
            open ? 'rotate-45 bg-tertiary' : 'rotate-0 bg-primary'
          } origin-[1px] transition-all`}
        />
        <div
          className={`relative h-1 w-8 rounded-md ${
            open
              ? 'translate-x-[100px] bg-tertiary'
              : 'translate-x-0 bg-primary'
          } origin-[1px] transition-all`}
        />
        <div
          className={`relative h-1 w-8 rounded-md ${
            open ? '-rotate-45 bg-tertiary' : 'rotate-0 bg-primary'
          } origin-[1px] transition-all`}
        />
      </div>
      <motion.div
        animate={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
        }}
        transition={{ duration: 0.2 }}
        aria-label="sidebar"
        aria-hidden={!open}
        tabIndex={open ? 1 : -1}
        className={`fixed top-0 left-0 z-[9] block h-full w-full bg-primary`}
      >
        <div className="fixed top-0 bottom-0 right-0 z-10 block h-[100vh] w-full outline-none">
          <nav className="relative flex h-[100vh] flex-col items-center justify-center">
            {navigationItems.map((navItem, i) => {
              const isActive = router.pathname === navItem.href;
              return (
                <Link
                  key={i}
                  href={navItem.href}
                  className={`px-4 py-8 text-4xl font-normal hover:text-secondary ${
                    isActive ? 'text-secondary' : 'text-tertiary'
                  }`}
                >
                  {navItem.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </div>
  );
};
