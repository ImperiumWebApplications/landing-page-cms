import styled from 'styled-components';
import Image from 'next/image';

import type {
  EntryQuestionnaire,
  HeroSection as IHeroSection,
} from '../backend-api';
import { Section } from '../components/Section';
import { QuestionnaireTile } from '../components/QuestionnaireTile';
import { devices } from '../config/breakpoints.config';
import { Animation } from '../components/Animation';

const StyledHeroSection = styled(Section)`
  overflow-x: clip;

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
    margin-bottom: 2rem;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 1rem;

    @media screen and (${devices.md}) {
      margin-top: -25rem;
      margin-bottom: 5rem;
      column-gap: 2rem;
      row-gap: 2rem;
    }
  }
`;

export const HeroSection: React.FunctionComponent<{
  id: string;
  content: IHeroSection;
  questionnaire: EntryQuestionnaire | undefined;
}> = ({ id, content, questionnaire }) => {
  return (
    <StyledHeroSection id={id}>
      <div className="intro">
        <Animation type="fadeRight" delay={400}>
          <div className="description">
            <h1>
              {content.title} <span>{content.subtitle}</span>
            </h1>
            <p>{content.description}</p>
          </div>
        </Animation>
        <Animation type="fadeLeft" delay={400}>
          <div className="background">
            {content.background_image?.data && (
              <Image
                src={content.background_image.data.attributes.url}
                alt={content.background_image?.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </Animation>
      </div>
      <Animation type="fadeUp" delay={600}>
        <div className="questionnaires">
          {questionnaire?.questionnaires &&
            questionnaire.questionnaires.data.map(
              (connectedQuestionnaire, i) => {
                return (
                  <QuestionnaireTile
                    key={i}
                    questionnaire={connectedQuestionnaire}
                  />
                );
              },
            )}
        </div>
      </Animation>
    </StyledHeroSection>
  );
};
