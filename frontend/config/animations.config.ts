import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;
