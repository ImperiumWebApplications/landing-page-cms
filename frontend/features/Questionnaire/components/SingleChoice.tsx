import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { devices } from '../../../config/breakpoints.config';
import { Questionnaire } from '../../../lib/strapi';
import {
  QuestionnaireAnswer,
  useQuestionnaireContext,
} from '../context/Questionnaire';
import { SelectableOption } from './SelectableOption';

const StyledSingleChoice = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;

  @media screen and (${devices.md}) {
    column-gap: 2rem;
    row-gap: 2rem;
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
  input: QuestionnaireAnswer;
}) => void;

export const SingleChoice: React.FunctionComponent<{
  question: { id: number; title: string };
  answers: NonNullable<
    NonNullable<Questionnaire['questions']>[number]['answers']
  >;
  customSelectHandler?: SingleChoiceEventHandler;
}> = ({ question, answers, customSelectHandler }) => {
  const { state, dispatch } = useQuestionnaireContext();

  const defaultClickHandler: SingleChoiceEventHandler = ({ event, input }) => {
    event.preventDefault();
    dispatch({
      type: 'setAnswer',
      payload: {
        index: state.index,
        item: { question: input.question, answer: input.answer },
      },
    });
    dispatch({ type: 'setIndex', payload: { index: state.index + 1 } });
  };

  const onClickHandler = customSelectHandler ?? defaultClickHandler;
  const currentAnswer = state.questionnaire[state.index]?.answer.value;

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
