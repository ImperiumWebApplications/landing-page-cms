import React from 'react';

import { ReactSVG } from 'react-svg';
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

  const LogoContent =
    props.image?.ext === '.svg' ? (
      <ReactSVG
        data-testid="logo-svg"
        className={cx(
          'svg-logo-wrapper',
          props.className,
          props.colorless ? 'colorless-filter' : '',
        )}
        beforeInjection={(svg) => {
          svg.removeAttribute('height');
          svg.removeAttribute('width');
          svg.removeAttribute('x');
          svg.removeAttribute('y');
        }}
        src={props.image.url}
      />
    ) : (
      <Image
        data-testid="logo-image"
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
    );

  return (
    <Link
      href="/"
      aria-label="Homepage"
      className="relative"
      data-testid="logo-wrapper"
    >
      {LogoContent}
    </Link>
  );
};
