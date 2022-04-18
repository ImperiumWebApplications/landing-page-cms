import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { fadeIn, fadeOut } from '../config/animations.config';
import { navigationItems } from '../config/navigation.config';
import { devices } from '../config/breakpoints.config';

const StyledMobileMenu = styled.div<{ open: boolean }>`
  display: block;

  @media screen and (${devices.md}) {
    display: none;
  }

  .burger {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    z-index: 12;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    overflow-x: hidden;

    div {
      position: relative;
      width: 2rem;
      height: 0.25rem;
      border-radius: ${({ theme }) => theme.borderRadius};
      background: ${({ theme, open }) =>
        open ? theme.colors.tertiary : theme.colors.primary};
      transition: all 0.3s ease-in-out;
      transform-origin: 1px;
    }

    div:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    div:nth-child(2) {
      opacity: ${({ open }) => (open ? 0 : 1)};
      transform: ${({ open }) =>
        open ? 'translateX(100px)' : 'translateX(0)'};
    }

    div:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
  .sidebar-backdrop {
    position: fixed;
    z-index: 9;
    display: block;
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    animation: ${({ open }) => (open ? fadeIn : fadeOut)} 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.9;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    .sidebar {
      position: fixed;
      z-index: 10;
      display: block;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      outline: 0;

      nav {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

        a {
          color: ${({ theme }) => theme.colors.tertiary};
          font-size: 32px;
          font-weight: 400;
          padding: 1rem;

          &.active,
          &:hover {
            color: ${({ theme }) => theme.colors.secondary};
          }
        }
      }
    }
  }
`;

export const MobileNavigation: React.FunctionComponent = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (open) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'visible';
  }, [open]);

  return (
    <StyledMobileMenu open={open}>
      <div
        aria-label="Mobile Navigation Toggle"
        className="burger"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') setOpen(!open);
        }}
      >
        <div />
        <div />
        <div />
      </div>
      <div
        aria-label="sidebar"
        className="sidebar-backdrop"
        aria-hidden={!open}
        tabIndex={open ? 1 : -1}
      >
        <div className="sidebar">
          <nav>
            {navigationItems.map((navItem, i) => {
              const isActive = router.pathname === navItem.href;
              return (
                <Link key={i} href={navItem.href} passHref>
                  <a className={isActive ? 'active' : undefined}>
                    {navItem.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </StyledMobileMenu>
  );
};
