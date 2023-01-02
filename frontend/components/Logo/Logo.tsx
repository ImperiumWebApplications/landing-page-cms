import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';

import type { MediaAttributes } from '../../lib/strapi';

// const StyledLogo = styled.div`
//   a {
//     display: block;
//     position: relative;
//     cursor: pointer;

//     &.logo-medium {
//       width: 180px;
//       height: 45px;
//     }

//     &.logo-large {
//       width: 200px;
//       height: 50px;
//     }

//     @media screen and (${devices.sm}) {
//       &.logo-medium {
//         width: 260px;
//         height: 55px;
//       }

//       &.logo-large {
//         width: 300px;
//         height: 60px;
//       }
//     }

//     .colorless-filter {
//       filter: brightness(0) invert(1);
//     }
//   }
// `;

type LogoProps = {
  image?: MediaAttributes | null;
  colorless?: boolean;
  className?: string;
  priority?: boolean;
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
        priority={props.priority ?? false}
      />
    </Link>
  );
};
