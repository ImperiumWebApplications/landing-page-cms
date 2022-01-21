import type { MouseEvent } from 'react';
import styled from 'styled-components';

import type { QuestionnaireAnswer } from '../../backend-api';
import type { QuestionnaireItem } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { SelectableOption } from './SelectableOption';
import { devices } from '../../config/breakpoints.config';
import { goToStep } from '../../utils/goToStep';

const StyledSingleChoice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;

  @media screen and (${devices.sm}) {
    column-gap: 2rem;
    row-gap: 2rem;
  }

  @media screen and (${devices.xl}) {
    column-gap: 4rem;
    row-gap: 4rem;
  }

  [role='button'] {
    cursor: pointer;
  }
`;

export type SingleChoiceEventHandler = ({
  event,
  input,
}: {
  event: MouseEvent;
  input: QuestionnaireItem;
}) => void;

export const SingleChoice: React.FunctionComponent<{
  question: { id: number; title: string };
  answers: QuestionnaireAnswer[];
  customSelectHandler?: SingleChoiceEventHandler;
}> = ({ question, answers, customSelectHandler }) => {
  const { state, dispatch } = useQuestionnaireContext();

  const defaultClickHandler: SingleChoiceEventHandler = ({ event, input }) => {
    event.preventDefault();
    dispatch({
      type: 'SAVE_ANSWER',
      payload: {
        currentIndex: state.currentIndex,
        item: { question: input.question, answer: input.answer },
      },
    });
    goToStep(dispatch, state.currentIndex + 1);
  };

  const onClickHandler = customSelectHandler ?? defaultClickHandler;
  const currentAnswer = state.questionnaire[state.currentIndex]?.answer.value;

  return (
    <StyledSingleChoice>
      {answers.map(({ id: answer_id, answer_icon, answer_value }) => {
        return !!answer_value ? (
          <SelectableOption
            key={answer_id}
            label={answer_value}
            selected={currentAnswer === answer_value}
            icon={answer_icon}
            onSelectHandler={(event) =>
              onClickHandler({
                event,
                input: {
                  question: { id: question.id, value: question.title },
                  answer: { id: answer_id, value: answer_value },
                },
              })
            }
          />
        ) : undefined;
      })}
    </StyledSingleChoice>
  );
};
