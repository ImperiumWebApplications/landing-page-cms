import React from 'react';
import styled from 'styled-components';

import { Box } from '@strapi/design-system';

const ProgressbarBase = styled(Box)<{
  value: number;
  progressBackgroundColor: string;
}>`
  width: 100%;
  margin: 6px auto 6px auto;

  &:before {
    background-color: ${({ theme, progressBackgroundColor }) =>
      theme.colors[progressBackgroundColor]};
    border-radius: ${({ theme }) => theme.borderRadius};
    bottom: 0;
    content: '';
    position: absolute;
    top: 0;
    width: ${({ value }) => `${value}%`};
  }
`;

type ProgressBarProps = {
  min?: number;
  max?: number;
  value?: number;
  children?: React.ReactNode;
  size?: 'S' | 'M';
  backgroundColor?: string;
  progressBackgroundColor?: string;
};

export const ProgressBar = ({
  min = 0,
  max = 100,
  value = 0,
  children,
  size = 'M',
  backgroundColor = 'neutral600',
  progressBackgroundColor = 'neutral0',
  ...props
}: ProgressBarProps) => {
  return (
    <ProgressbarBase
      hasRadius
      aria-label={children}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      height={size === 'S' ? 1 : 2}
      position="relative"
      role="progressbar"
      value={value}
      width={size === 'S' ? '78px' : '102px'}
      background={backgroundColor}
      progressBackgroundColor={progressBackgroundColor}
      {...props}
    />
  );
};
