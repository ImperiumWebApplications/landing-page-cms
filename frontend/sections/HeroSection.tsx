import styled from 'styled-components';
import Image from 'next/image';

import { HeroSection as IHeroSection, Questionnaire } from '../backend-api';
import { Section } from '../components/Section';
import { QuestionnaireTile } from '../components/QuestionnaireTile';

const StyledHeroSection = styled(Section)`
  .intro {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 30rem auto;
    column-gap: 5rem;

    .background {
      position: relative;
      top: -160px;
      right: 0;
      width: 60vw;
      height: 50rem;
    }

    .description {
      h1 {
        padding: 0.5rem 1rem;
        border-left: 2px dashed ${({ theme }) => theme.colors.secondary};
        margin-bottom: 2rem;

        span {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }

      p {
        font-size: 1.125rem;
        line-height: 2rem;
      }
    }
  }

  .questionnaires {
    position: relative;
    margin-top: -25rem;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 2rem;
  }
`;

export const HeroSection: React.FunctionComponent<{
  id: string;
  content: IHeroSection;
  questionnaire: Questionnaire | undefined;
}> = ({ id, content, questionnaire }) => {
  return (
    <StyledHeroSection id={id}>
      <div className="intro">
        <div className="description">
          <h1>
            {content.title} <span>{content.subtitle}</span>
          </h1>
          <p>{content.description}</p>
        </div>
        {content.background_image?.data && (
          <div className="background">
            <Image
              src={content.background_image.data.attributes.url}
              width={content.background_image.data.attributes.width}
              height={content.background_image.data.attributes.height}
              alt={content.background_image?.data.attributes.alternativeText}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>
      <div className="questionnaires">
        {questionnaire?.questionnaires &&
          questionnaire.questionnaires.data.map((connectedQuestionnaire, i) => {
            return (
              <QuestionnaireTile
                key={i}
                questionnaire={connectedQuestionnaire.attributes}
              />
            );
          })}
      </div>
    </StyledHeroSection>
  );
};
