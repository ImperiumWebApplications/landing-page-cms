import type { QuestionnaireQuestion } from '../../backend-api';
import type { SingleChoiceEventHandler } from './SingleChoice';
import { StyledStepTitle } from './StepTitle';
import { SingleChoice } from './SingleChoice';
import { Placeholder } from './Placeholder';

export const Question: React.FunctionComponent<{
  data: QuestionnaireQuestion;
  customSelectHandler?: SingleChoiceEventHandler;
}> = ({ data, customSelectHandler }) => {
  if (!data.question || !data.answers) return <Placeholder />;

  return (
    <div aria-label="question">
      <StyledStepTitle className="title">{data.question}</StyledStepTitle>
      <SingleChoice
        question={{ id: data.id, title: data.question }}
        answers={data.answers}
        customSelectHandler={customSelectHandler}
      />
    </div>
  );
};
