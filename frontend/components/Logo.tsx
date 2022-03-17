import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

import { ImageObject } from '../backend-api';
import { devices } from '../config/breakpoints.config';

const StyledLogo = styled.div`
  width: 100%;
  min-width: 180px;
  max-width: 200px;
  height: 100%;
  min-height: 60px;
  max-height: 80px;
  margin-right: 2rem;
  cursor: pointer;
  position: relative;

  @media screen and (${devices.sm}) {
    max-width: 300px;
  }
`;

export const Logo: React.FunctionComponent<{
  image: ImageObject | undefined;
}> = ({ image }) => {
  return (
    <StyledLogo>
      {image?.data && (
        <Link href="/" aria-label="Homepage" passHref>
          <a>
            <Image
              src={image.data.attributes.url}
              alt={image.data.attributes.alternativeText}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      )}
    </StyledLogo>
  );
};
