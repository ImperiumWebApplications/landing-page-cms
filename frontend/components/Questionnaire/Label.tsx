import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { devices } from '../../config/breakpoints.config';

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  letter-spacing: +0.25px;
  font-size: 0.9rem;

  @media screen and (${devices.md}) {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
`;

export const Label: React.FunctionComponent<
  ComponentPropsWithoutRef<'label'>
> = ({ children, ...props }) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};
