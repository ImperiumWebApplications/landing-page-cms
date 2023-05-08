import React from 'react';
import styled from 'styled-components';
import { Icon } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';
import { Check } from '@strapi/icons';

const IconBox = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;

const MultiSelectFieldIcon = () => {
  return (
    <IconBox
      justifyContent="center"
      alignItems="center"
      width={7}
      height={6}
      hasRadius
      aria-hidden
    >
      <Icon as={Check} />
    </IconBox>
  );
};

export default MultiSelectFieldIcon;
