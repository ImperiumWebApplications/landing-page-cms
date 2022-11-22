import React from 'react';
import styled from 'styled-components';

const StyledProgress = styled.div`
  width: 100%;
  height: 0.5rem;
  overflow: hidden;
  background: #e1e4e8;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};

  .progress-bar {
    display: block;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    transition: 1s ease;
    transition-delay: 0.1s;
  }
`;

export const Progress: React.FunctionComponent<{ percentage: number }> = ({
  percentage,
}) => {
  return (
    <StyledProgress>
      <span
        className="progress-bar"
        style={{ width: `${percentage * 100}%` }}
      ></span>
    </StyledProgress>
  );
};
