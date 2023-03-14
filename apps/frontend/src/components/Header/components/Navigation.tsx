import React, { Fragment } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { Menu, Transition } from '@headlessui/react';

import type { NavigationItem } from '../../../config/navigation.config';
import { CloseIcon } from '../../Icons';

type NavigationProps = {
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => {
        return (
          <>
            <Menu.Button
              aria-label="Toggle Navigation"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary p-2 shadow-sm md:bg-[white]"
            >
              {!open ? (
                <ThreeDotsIcon />
              ) : (
                <CloseIcon className="stroke-[white] stroke-2 md:stroke-primary" />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items
                className="absolute top-14 right-0 z-50 h-auto w-[280px] origin-top-right rounded-md bg-[white] p-2 shadow-md ring-2 ring-primary focus:outline-none md:shadow-2xl"
                static
              >
                <div className="flex flex-col">
                  {props.items.map((item) => (
                    <Menu.Item key={item.href} as={Fragment}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={cx(
                            'w-full px-4 py-6 text-primary md:py-4',
                            active
                              ? 'rounded-md bg-[black]/5'
                              : 'hover:bg-gray-100',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
};

const ThreeDotsIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18">
      <g transform="rotate(90 2 2)">
        <circle cx="2" cy="2" r="2" className="fill-[white] md:fill-primary" />
      </g>
      <g transform="rotate(90 -1.5 5.5)">
        <circle cx="2" cy="2" r="2" className="fill-[white] md:fill-primary" />
      </g>
      <g transform="rotate(90 -5 9)">
        <circle cx="2" cy="2" r="2" className="fill-[white] md:fill-primary" />
      </g>
    </svg>
  );
};
