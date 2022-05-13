import { useMemo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowForward } from '@styled-icons/fluentui-system-filled';

import type {
  EntryQuestionnaire,
  FunnelTarget,
  HeroSection,
} from '../../backend-api';
import { Section } from '../../components/Section';
import { QuestionnaireTile } from '../../components/QuestionnaireTile';
import { Animation } from '../../components/Animation';
import { devices } from '../../config/breakpoints.config';
import { byPriority } from '../../utils/sortQuestionnairesByPriority';
import { HeroSectionDescription } from './Description';

const StyledHeroSectionQuestionnaires = styled(Section)`
  overflow-x: clip;

  p {
    max-width: 30rem;
    font-size: 1rem;
    line-height: 1.75rem;

    @media screen and (${devices.sm}) {
      font-size: 1.125rem;
      line-height: 2rem;
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
`;

export const HeroSectionQuestionnaires: React.FunctionComponent<{
  id: string;
  content: HeroSection;
  funnelTarget: FunnelTarget;
  questionnaire: EntryQuestionnaire | undefined;
}> = ({ id, content, questionnaire, funnelTarget }) => {
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
    <StyledHeroSectionQuestionnaires id={id}>
      <div className="intro">
        <Animation type="fadeRight" delay={400}>
          <HeroSectionDescription
            content={content}
            funnelTarget={funnelTarget}
          />
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
            {questionnaire?.entry_question ? entryQuestion : undefined}
          </h3>
          <div className="tiles">
            {questionnaire?.questionnaires ? questionnaireTiles : undefined}
          </div>
        </div>
      </Animation>
    </StyledHeroSectionQuestionnaires>
  );
};
