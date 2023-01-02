import type { Questionnaire } from '../../../lib/strapi';
import type { SingleChoiceEventHandler } from './SingleChoice';
import { StepTitle } from './StepTitle';
import { SingleChoice } from './SingleChoice';
import { QuestionnairePlaceholder } from '../QuestionnairePlaceholder';

export const Question: React.FC<{
  data: NonNullable<Questionnaire['questions']>[number];
  customSelectHandler?: SingleChoiceEventHandler;
}> = ({ data, customSelectHandler }) => {
  if (!data.question || !data.answers) return <QuestionnairePlaceholder />;

  return (
    <div aria-label="question">
      <StepTitle>{data.question}</StepTitle>
      <SingleChoice
        question={{ id: data.id, title: data.question }}
        answers={data.answers}
        customSelectHandler={customSelectHandler}
      />
    </div>
  );
};
