import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

import { devices } from '../config/breakpoints.config';
import type { MediaAttributes } from '../lib/strapi';

const StyledLogo = styled.div`
  a {
    display: block;
    position: relative;
    cursor: pointer;

    &.logo-medium {
      width: 180px;
      height: 45px;
    }

    &.logo-large {
      width: 200px;
      height: 50px;
    }

    @media screen and (${devices.sm}) {
      &.logo-medium {
        width: 260px;
        height: 55px;
      }

      &.logo-large {
        width: 300px;
        height: 60px;
      }
    }

    .colorless-filter {
      filter: brightness(0) invert(1);
    }
  }
`;

export const Logo: React.FunctionComponent<{
  image?: MediaAttributes | null;
  colorless?: boolean;
  size?: 'logo-medium' | 'logo-large';
}> = ({ image, colorless, size }) => {
  return (
    <StyledLogo>
      {image && (
        <Link href="/" passHref>
          <a aria-label="Homepage" className={size ?? 'logo-large'}>
            <Image
              src={image.url}
              alt={image.alternativeText ?? image.url}
              layout="fill"
              objectFit="contain"
              objectPosition="left center"
              className={colorless ? 'colorless-filter' : undefined}
              priority
            />
          </a>
        </Link>
      )}
    </StyledLogo>
  );
};
