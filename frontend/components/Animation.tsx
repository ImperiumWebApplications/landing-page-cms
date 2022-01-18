import React from 'react';
import styled, { css } from 'styled-components';
import { Animations, getAnimation } from '../config/animations.config';
import { useCastedRef } from '../hooks/useCastedRef';
import { useOnScreen } from '../hooks/useOnScreen';

const StyledAnimation = styled.div<AnimationProps & { isOnScreen: boolean }>`
  @media screen and (prefers-reduced-motion: reduce) {
    opacity: 1 !important;
  }

  ${({ isOnScreen, type, timing, duration, delay, iterationCount, fillMode }) =>
    isOnScreen
      ? css`
          animation-name: ${getAnimation(type) ?? Animations.fadeIn};
          animation-timing-function: ${timing ?? 'ease-out'};
          animation-duration: ${duration ?? 300}ms;
          animation-delay: ${delay ?? 0}ms;
          animation-iteration-count: ${iterationCount ?? 1};
          animation-fill-mode: ${fillMode ?? 'backwards'};
        `
      : css`
          opacity: 0;
        `}
`;

interface AnimationProps {
  type?: keyof typeof Animations;
  timing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
  delay?: number;
  duration?: number;
  iterationCount?: number;
  [key: string]: unknown;
}

export const Animation: React.FunctionComponent<AnimationProps> = (props) => {
  const ref = useCastedRef<HTMLDivElement>();
  const onScreen = useOnScreen<HTMLDivElement>(ref);

  return (
    <StyledAnimation
      ref={ref}
      isOnScreen={onScreen}
      type={props.type}
      timing={props.timing}
      duration={props.duration}
      delay={props.delay}
      iterationCount={props.iterationCount}
      fillMode={props.fillMode}
      {...props}
    >
      {props.children}
    </StyledAnimation>
  );
};
