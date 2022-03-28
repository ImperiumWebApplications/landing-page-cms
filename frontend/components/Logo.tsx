import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

import { ImageObject } from '../backend-api';
import { devices } from '../config/breakpoints.config';

const StyledLogo = styled.div`
  position: relative;
  cursor: pointer;
  width: 200px;
  height: 50px;
  margin-right: 2rem;

  @media screen and (${devices.sm}) {
    width: 300px;
    height: 60px;
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
              objectPosition="left center"
            />
          </a>
        </Link>
      )}
    </StyledLogo>
  );
};
