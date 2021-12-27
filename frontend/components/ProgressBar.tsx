import React from 'react';
import styled from 'styled-components';
import { devices } from '../config/breakpoints.config';

const PROGRESS_BAR_CLASS = 'bar';

// Helper function to generate the CSS for each data point
const getCSSForDataPoints = () => {
  let css = ``;
  for (let i = 0; i <= 100; i++) {
    css += `.${PROGRESS_BAR_CLASS}[data-point="${i}"] {
                width: ${i}%;
            }
        `;
  }
  return css;
};

const StyledProgressBar = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.tertiary};

  .${PROGRESS_BAR_CLASS} {
    margin-bottom: -2px; // To overlap with border of parent container
    border-bottom: 2px dashed ${({ theme }) => theme.colors.secondary};

    span {
      display: block;
      margin-bottom: 0.5rem;
      text-align: right;
      font-size: 1rem;
    }
  }

  ${getCSSForDataPoints()}

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
    letter-spacing: +1px;

    @media screen and (${devices.lg}) {
      font-size: 1.25rem;
    }
  }
`;

export const ProgressBar: React.FunctionComponent<{
  label: string;
  value: number;
}> = ({ label, value }) => {
  return (
    <StyledProgressBar>
      <span>{label}</span>
      <div className={PROGRESS_BAR_CLASS} data-point={value}>
        <span>{value}%</span>
      </div>
    </StyledProgressBar>
  );
};
