import type { MouseEvent } from 'react';

import type { Questionnaire } from '../../../lib/strapi';
import {
  QuestionnaireAnswer,
  useQuestionnaireContext,
} from '../context/Questionnaire';

import { SelectableOption } from './SelectableOption';

export type SingleChoiceEventHandler = ({
  event,
  input,
}: {
  event: MouseEvent;
  input: QuestionnaireAnswer;
}) => void;

type SingleChoiceProps = {
  customSelectHandler?: SingleChoiceEventHandler;
  question: { id: number; title: string };
  answers: NonNullable<
    NonNullable<Questionnaire['questions']>[number]['answers']
  >;
};

export const SingleChoice: React.FC<SingleChoiceProps> = ({
  question,
  answers,
  customSelectHandler,
}) => {
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
    <div className="flex flex-wrap items-stretch justify-center gap-[10px] md:gap-4">
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
    </div>
  );
};
