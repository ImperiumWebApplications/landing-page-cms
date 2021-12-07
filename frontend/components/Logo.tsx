import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { ImageObject } from '../backend-api';
import { devices } from '../config/breakpoints.config';

const StyledLogo = styled.div`
  max-width: 240px;
  margin-right: 2rem;
  cursor: pointer;
  @media screen and (${devices.md}) {
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
              width={image.data.attributes.width}
              height={image.data.attributes.height}
            />
          </a>
        </Link>
      )}
    </StyledLogo>
  );
};
