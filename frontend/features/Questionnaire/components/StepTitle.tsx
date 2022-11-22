import styled from 'styled-components';

import { devices } from '../../../config/breakpoints.config';

export const StyledStepTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 2rem;

  @media screen and (${devices.md}) {
    font-size: 2.25rem;
    line-height: 2.75rem;
    margin-bottom: 3rem;
  }

  @media screen and (${devices.lg}) {
    font-size: 2.5rem;
    line-height: 3rem;
  }
`;
