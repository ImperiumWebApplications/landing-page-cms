import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';

import type { MediaAttributes } from '../../lib/strapi';

type LogoProps = {
  image?: MediaAttributes | null;
  colorless?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

export const Logo: React.FC<LogoProps> = (props) => {
  if (!props.image?.url) return null;
  return (
    <Link href="/" aria-label="Homepage" className="relative">
      <Image
        src={props.image?.url}
        alt={props.image.alternativeText ?? ''}
        width={props.image.width ?? 300}
        height={props.image.height ?? 60}
        className={cx(
          props.className,
          props.colorless ? 'colorless-filter' : '',
          'object-contain object-left',
        )}
        priority
      />
    </Link>
  );
};
