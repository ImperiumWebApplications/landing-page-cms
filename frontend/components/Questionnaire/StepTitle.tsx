import styled from 'styled-components';

import { devices } from '../../config/breakpoints.config';

export const StyledStepTitle = styled.h1`
  text-align: center;
  font-size: 1.75rem;
  line-height: 2.25rem;
  margin-bottom: 2rem;

  @media screen and (${devices.sm}) {
    font-size: 2.5rem;
    line-height: 3rem;
    margin-bottom: 3rem;
  }

  @media screen and (${devices.xl}) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`;
