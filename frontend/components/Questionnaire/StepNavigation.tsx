import type { MouseEvent } from 'react';
import hexRgb from 'hex-rgb';
import styled from 'styled-components';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@styled-icons/material-outlined';

import type { QuestionnaireContextState } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { goToStep } from '../../utils/goToStep';

const StyledStepNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  margin: 4rem 0;

  .prev[role='button'],
  .next[role='button'] {
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.2;
  }

  .prev[role='button'][data-status='true'],
  .next[role='button'][data-status='true'] {
    opacity: 1;
    cursor: pointer;
  }

  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 2rem;

    .navigation-item {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 45% 55% 48% 52% / 50% 46% 54% 50%;

      &[data-status='done'] {
        background-color: ${({ theme }) =>
          hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.5 })};
        background-position: 50% 50%;
        border: 2px solid white;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) =>
            hexRgb(theme.colors.secondary, { format: 'css', alpha: 1 })};
        }
      }

      &[data-status='active'] {
        background-color: ${({ theme }) => theme.colors.primary};
        background-repeat: no-repeat;
        background-position: 50% 50%;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.tertiary},
          0 0 0 4px
            ${({ theme }) =>
              hexRgb(theme.colors.primary, { format: 'css', alpha: 0.5 })};
      }

      &[data-status='open'] {
        width: 1rem;
        height: 1rem;
        background-color: white;
        box-sizing: border-box;
        border: 2px solid
          ${({ theme }) =>
            hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.75 })};
      }
    }
  }
`;

export const StepNavigation: React.FunctionComponent<{ stepCount: number }> = ({
  stepCount,
}) => {
  const { state, dispatch } = useQuestionnaireContext();

  const onItemClickHandler = (event: MouseEvent, key: number) => {
    event.preventDefault();

    const status = getStatusForGivenKey(key, state);
    if (status !== 'done') return;

    goToStep(dispatch, key);
  };

  const onPrevHandler = (event: MouseEvent) => {
    event.preventDefault();

    if (!isPrevButtonActive(state)) return;

    goToStep(dispatch, state.currentIndex - 1);
  };

  const onNextHandler = (event: MouseEvent) => {
    event.preventDefault();

    if (!isNextButtonActive(state)) return;

    goToStep(dispatch, state.currentIndex + 1);
  };

  return (
    <StyledStepNavigation>
      <div
        role="button"
        className="prev"
        onClick={onPrevHandler}
        data-status={isPrevButtonActive(state)}
      >
        <KeyboardArrowLeft width={24} height={24} />
      </div>
      <div className="navigation">
        {Array.from({ length: stepCount }).map((_, key) => {
          const status = getStatusForGivenKey(key, state);
          return (
            <div
              key={key}
              role="button"
              className="navigation-item"
              data-status={status}
              onClick={(event) => onItemClickHandler(event, key)}
            />
          );
        })}
      </div>
      <div
        role="button"
        className="next"
        onClick={onNextHandler}
        data-status={isNextButtonActive(state)}
      >
        <KeyboardArrowRight width={24} height={24} />
      </div>
    </StyledStepNavigation>
  );
};

const getStatusForGivenKey = (
  key: number,
  state: QuestionnaireContextState,
) => {
  if (key < state.currentIndex) return 'done';
  if (key === state.currentIndex) return 'active';
  if (key > state.currentIndex) {
    if (!!state.questionnaire[key]?.answer.value) return 'done';
    else return 'open';
  }
};

const isPrevButtonActive = (state: QuestionnaireContextState) => {
  return state.currentIndex !== 0;
};

const isNextButtonActive = (state: QuestionnaireContextState) => {
  return !!state.questionnaire[state.currentIndex + 1]?.answer.value;
};
