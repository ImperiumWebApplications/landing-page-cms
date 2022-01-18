import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { ImageObject } from '../backend-api';
import { devices } from '../config/breakpoints.config';

const StyledLogo = styled.div`
  max-width: 200px;
  margin-right: 2rem;
  cursor: pointer;
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
        <a href="/" aria-label="Homepage">
          <Image
            src={image.data.attributes.url}
            alt={image.data.attributes.alternativeText}
            width={image.data.attributes.width}
            height={image.data.attributes.height}
          />
        </a>
      )}
    </StyledLogo>
  );
};
