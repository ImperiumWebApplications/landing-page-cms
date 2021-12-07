import styled from 'styled-components';
import Image from 'next/image';

import { HeroSection as IHeroSection, Questionnaire } from '../backend-api';
import { Section } from '../components/Section';
import { QuestionnaireTile } from '../components/QuestionnaireTile';
import { devices } from '../config/breakpoints.config';

const StyledHeroSection = styled(Section)`
  .intro {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;
    margin-top: 1rem;

    @media screen and (${devices.md}) {
      grid-template-columns: 30rem auto;
      column-gap: 5rem;
    }

    .background {
      display: none;
      position: relative;
      top: -170px;
      right: 0;
      width: 60vw;
      height: 50rem;

      @media screen and (${devices.md}) {
        display: block;
      }

      img {
        border-radius: ${({ theme }) => theme.borderRadius};
      }
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
    margin-top: 2rem;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 2rem;

    @media screen and (${devices.md}) {
      margin-top: -25rem;
      column-gap: 2rem;
    }
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
        <div className="background">
          {content.background_image?.data && (
            <Image
              src={content.background_image.data.attributes.url}
              width={content.background_image.data.attributes.width}
              height={content.background_image.data.attributes.height}
              alt={content.background_image?.data.attributes.alternativeText}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
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
