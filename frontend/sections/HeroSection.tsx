import styled from 'styled-components';
import Image from 'next/image';
import { ArrowForward } from '@styled-icons/fluentui-system-filled';

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

  .content-wrapper {
    @media screen and (${devices.specifics.flatDesktop}) {
      padding-top: 0;
    }
  }

  .intro {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;

    @media screen and (${devices.sm}) {
      margin-top: 1rem;
    }

    @media screen and (${devices.md}) {
      grid-template-columns: 30rem auto;
      column-gap: 5rem;
    }

    .background {
      display: none;
      position: relative;
      top: -200px;
      right: 0;
      width: 60vw;
      height: 52rem;

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
        margin-bottom: 1rem;
        font-size: 1.4rem;
        line-height: 2rem;

        @media screen and (${devices.sm}) {
          font-size: 2.1rem;
          line-height: 2.75rem;
          margin-bottom: 2rem;
        }

        @media screen and (${devices.specifics.flatDesktop}) {
          font-size: 2rem;
          line-height: 2.5rem;
          margin-bottom: 1rem;
        }

        @media screen and (${devices.xxl}) {
          margin-top: 3rem;
          margin-bottom: 3rem;
        }

        span {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }

      p {
        font-size: 1rem;
        line-height: 1.75rem;

        @media screen and (${devices.sm}) {
          font-size: 1.125rem;
          line-height: 2rem;
        }

        .extended-description {
          display: none;

          @media screen and (${devices.sm}) {
            display: inline;
          }
        }
      }
    }
  }

  .questionnaires {
    margin-top: 2rem;
    margin-bottom: 2rem;
    position: relative;

    @media screen and (${devices.md}) {
      margin-top: -32.5rem;
      margin-bottom: 5rem;
    }

    @media screen and (${devices.specifics.flatDesktop}) {
      margin-top: -36rem;
    }

    @media screen and (${devices.xxl}) {
      margin-top: -23rem;
    }

    .entry-question {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;

      @media screen and (${devices.sm}) {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
    }

    .tiles {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: stretch;
      align-items: stretch;
      flex-wrap: wrap;
      column-gap: 1rem;
      row-gap: 1rem;
    }
  }
`;

const FIRST_SENTENCE_REGEX = /^.*?[.!?](?:\s|$)(?!.*\))/;

export const HeroSection: React.FunctionComponent<{
  id: string;
  content: IHeroSection;
  questionnaire: EntryQuestionnaire | undefined;
}> = ({ id, content, questionnaire }) => {
  const firstSentence = content.description?.match(FIRST_SENTENCE_REGEX)?.[0];

  return (
    <StyledHeroSection id={id}>
      <div className="intro">
        <Animation type="fadeRight" delay={400}>
          <div className="description">
            {content.title || content.subtitle ? (
              <h1
                dangerouslySetInnerHTML={{
                  __html: `${content.title} <span>${content.subtitle}</span>`,
                }}
              />
            ) : undefined}
            {content.description ? (
              <p>
                {firstSentence ?? content.description}
                {firstSentence ? (
                  <span className="extended-description">
                    {content.description.substring(firstSentence.length)}
                  </span>
                ) : undefined}
              </p>
            ) : undefined}
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
                priority
              />
            )}
          </div>
        </Animation>
      </div>
      <Animation type="fadeUp" delay={600}>
        <div className="questionnaires">
          <h3 className="entry-question">
            {questionnaire?.entry_question}{' '}
            <ArrowForward
              width={30}
              style={{
                transform: 'rotate(90deg)',
                margin: '0.25rem 0 0 0.25rem',
              }}
            />
          </h3>
          <div className="tiles">
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
        </div>
      </Animation>
    </StyledHeroSection>
  );
};
