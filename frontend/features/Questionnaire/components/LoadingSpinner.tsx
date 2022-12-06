import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.3rem solid rgba(255, 255, 255, 0.2);
  border-right: 0.3rem solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.3rem solid rgba(255, 255, 255, 0.2);
  border-left: 0.3rem solid #ffffff;
  transform: translateZ(0);
  animation: ${rotate360} 1.1s infinite linear;

  &::after {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
  }
`;
