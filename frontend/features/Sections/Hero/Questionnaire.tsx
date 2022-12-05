import { useMemo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowForward } from '@styled-icons/fluentui-system-filled';

import { Animation } from '../../../components/Animation/Animation';
import { devices } from '../../../config/breakpoints.config';
import { HeroSectionDescription } from './Description';
import { SectionContainer } from '../SectionContainer';
import { HeroSectionContent } from '../SectionMapper';
import { byPriority } from './utils/sortQuestionnaires';
import { Tile } from './components/Tile';

const StyledHeroSectionContainer = styled(SectionContainer)`
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

    @media screen and (${devices.md}) {
      grid-template-columns: 35rem auto;
      column-gap: 5rem;
    }

    .background {
      display: none;
      position: relative;
      z-index: -1;
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

type HeroSectionQuestionnaireProps = {
  id: string;
  content: HeroSectionContent;
};

export const HeroSectionQuestionnaire: React.FC<
  HeroSectionQuestionnaireProps
> = (props) => {
  const questionnaireTiles = useMemo(() => {
    return props.content.questionnaire?.questionnaires?.data
      .sort(byPriority)
      .map((connectedQuestionnaire, i) => {
        return <Tile key={i} content={connectedQuestionnaire} />;
      });
  }, [props.content.questionnaire?.questionnaires]);

  const entryQuestion = useMemo(() => {
    return (
      <>
        {props.content.questionnaire?.entry_question}{' '}
        <ArrowForward
          width={30}
          style={{
            transform: 'rotate(90deg)',
            margin: '0.25rem 0 0 0.25rem',
          }}
        />
      </>
    );
  }, [props.content.questionnaire?.entry_question]);

  return (
    <StyledHeroSectionContainer id={props.id}>
      <div className="intro">
        <Animation type="fadeRight" delay={400}>
          <HeroSectionDescription content={props.content} />
        </Animation>
        <Animation type="fadeLeft" delay={400}>
          <div className="background">
            {props.content.background_image?.data.attributes && (
              <Image
                src={props.content.background_image?.data.attributes.url}
                alt={
                  props.content.background_image?.data.attributes
                    ?.alternativeText ?? ''
                }
                layout="fill"
                objectFit="cover"
                quality={90}
                priority
              />
            )}
          </div>
        </Animation>
      </div>
      <Animation type="fadeUp" delay={600}>
        <div className="questionnaires">
          <h3 className="entry-question">
            {props.content.questionnaire?.entry_question
              ? entryQuestion
              : undefined}
          </h3>
          <div className="tiles">
            {props.content.questionnaire?.questionnaires
              ? questionnaireTiles
              : undefined}
          </div>
        </div>
      </Animation>
    </StyledHeroSectionContainer>
  );
};
