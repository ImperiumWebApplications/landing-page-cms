import type { QuestionnaireQuestion } from '../../backend-api';
import type { SingleChoiceEventHandler } from './SingleChoice';
import { StyledStepTitle } from './StepTitle';
import { SingleChoice } from './SingleChoice';
import { Placeholder } from './Placeholder';

export const Question: React.FunctionComponent<{
  data: QuestionnaireQuestion;
  customSelectHandler?: SingleChoiceEventHandler;
}> = ({ data: { id, question: title, answers }, customSelectHandler }) => {
  if (!title || !answers) return <Placeholder />;

  return (
    <div aria-label="question">
      <StyledStepTitle className="title">{title}</StyledStepTitle>
      <SingleChoice
        question={{ id, title }}
        answers={answers}
        customSelectHandler={customSelectHandler}
      />
    </div>
  );
};
