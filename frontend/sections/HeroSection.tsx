import { useMemo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowForward } from '@styled-icons/fluentui-system-filled';
import { CheckCircle } from '@styled-icons/boxicons-solid/CheckCircle';
import { Telephone } from '@styled-icons/foundation';

import type {
  EntryQuestionnaire,
  FunnelTarget,
  HeroSection as IHeroSection,
} from '../backend-api';
import { Section } from '../components/Section';
import { QuestionnaireTile } from '../components/QuestionnaireTile';
import { Button } from '../components/Button';
import { Animation } from '../components/Animation';
import { devices } from '../config/breakpoints.config';
import { byPriority } from '../utils/sortQuestionnairesByPriority';

const StyledHeroSection = styled(Section)<{ funnelTarget: FunnelTarget }>`
  overflow-x: clip;

  @media screen and (${devices.md}) {
    padding-top: ${({ funnelTarget }) =>
      funnelTarget === 'Call' ? '2rem' : 0};
  }

  p {
    max-width: 30rem;
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

  .content-wrapper {
    @media screen and (${devices.specifics.flatDesktop}) {
      padding-top: 0;
    }
  }

  .intro {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;

    @media screen and (${devices.md}) {
      grid-template-columns: 35rem auto;
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
          font-size: ${({ funnelTarget }) =>
            funnelTarget === 'Call' ? '2.5rem' : '2.1rem'};
          line-height: ${({ funnelTarget }) =>
            funnelTarget === 'Call' ? '3.25rem' : '2.75rem'};
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 1fr;
      column-gap: 1rem;
      row-gap: 1rem;

      @media screen and (${devices.md}) {
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        align-items: stretch;
        flex-wrap: wrap;
      }
    }
  }

  .booking {
    margin-top: 2rem;
    margin-bottom: 4rem;
    position: relative;

    @media screen and (${devices.md}) {
      margin-top: -35rem;
      margin-bottom: 10rem;
    }

    @media screen and (${devices.specifics.flatDesktop}) {
      margin-top: -36rem;
    }

    @media screen and (${devices.xxl}) {
      margin-top: -32rem;
    }

    .booking-description {
      svg {
        fill: ${({ theme }) => theme.colors.secondary};
      }
    }

    .booking-action {
      margin: 1rem 0 3rem 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      row-gap: 2rem;

      @media screen and (${devices.md}) {
        margin: 2rem 0 2rem 0;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        row-gap: unset;
        column-gap: 3rem;
      }

      .direct-call {
        text-align: right;

        span {
          display: inline-block;
          margin-right: 0.25rem;
          font-size: 0.875rem;

          @media screen and (${devices.md}) {
            display: block;
            margin-right: unset;
          }
        }

        a {
          font-size: 1rem;
          border-bottom: 2px dashed ${({ theme }) => theme.colors.tertiary};
          padding-bottom: 0.125rem;
          font-weight: 700;
          transition: all 200ms ease;
          color: ${({ theme }) => theme.colors.primary};

          @media (hover) {
            &:hover {
              border-bottom: 2px dashed ${({ theme }) => theme.colors.secondary};
            }
          }

          @media screen and (${devices.md}) {
            font-size: 1.25rem;
          }

          svg {
            width: 18px;
            vertical-align: sub;

            @media screen and (${devices.md}) {
              width: 28px;
            }
          }
        }
      }
    }

    .booking-benefit,
    .booking-benefit-sep {
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: 0.5rem;
      font-size: 13px;

      svg {
        fill: #dadada;
        vertical-align: sub;
      }
    }

    .booking-benefit-sep {
      display: none;
      @media screen and (${devices.md}) {
        display: inline-block;
        color: #dadada;
      }
    }
  }
`;

const FIRST_SENTENCE_REGEX = /^.*?[.!?](?:\s|$)(?!.*\))/;

export const HeroSection: React.FunctionComponent<{
  id: string;
  content: IHeroSection;
  questionnaire: EntryQuestionnaire | undefined;
  funnelTarget: FunnelTarget | undefined;
  serviceType: string | undefined;
  contactPhone: string | undefined;
}> = ({
  id,
  content,
  questionnaire,
  funnelTarget,
  serviceType,
  contactPhone,
}) => {
  const firstSentence = content.description?.match(FIRST_SENTENCE_REGEX)?.[0];

  const questionnaireTiles = useMemo(() => {
    return questionnaire?.questionnaires?.data
      .sort(byPriority)
      .map((connectedQuestionnaire, i) => {
        return (
          <QuestionnaireTile key={i} questionnaire={connectedQuestionnaire} />
        );
      });
  }, [questionnaire?.questionnaires]);

  const entryQuestion = useMemo(() => {
    return (
      <>
        {questionnaire?.entry_question}{' '}
        <ArrowForward
          width={30}
          style={{
            transform: 'rotate(90deg)',
            margin: '0.25rem 0 0 0.25rem',
          }}
        />
      </>
    );
  }, [questionnaire?.entry_question]);

  return (
    <StyledHeroSection id={id} funnelTarget={funnelTarget ?? 'Questionnaire'}>
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
        {funnelTarget === 'Questionnaire' ? (
          <div className="questionnaires">
            <h3 className="entry-question">
              {questionnaire?.entry_question ? entryQuestion : undefined}
            </h3>
            <div className="tiles">
              {questionnaire?.questionnaires ? questionnaireTiles : undefined}
            </div>
          </div>
        ) : (
          <div className="booking">
            <p className="booking-description">
              Buchen Sie Ihr <strong>Beratungsgespräch</strong>{' '}
              <ArrowForward
                width={26}
                style={{
                  transform: 'rotate(120deg)',
                  margin: '1rem 0 0 0.25rem',
                }}
              />
            </p>
            <div className="booking-action">
              <Button label="Jetzt Termin vereinbaren" href="/booking" />
              {contactPhone && (
                <div className="direct-call">
                  <span>oder rufen Sie einfach an: </span>
                  <a href="/to">
                    <Telephone /> {contactPhone}
                  </a>
                </div>
              )}
            </div>
            <span className="booking-benefit">
              <CheckCircle size={16} /> Kostenlos & Unverbindlich
            </span>
            <span className="booking-benefit-sep">–</span>
            <span className="booking-benefit">
              <CheckCircle size={16} /> Lokale {serviceType ?? 'Expertise'} aus
              Ihrer Region
            </span>
          </div>
        )}
      </Animation>
    </StyledHeroSection>
  );
};
