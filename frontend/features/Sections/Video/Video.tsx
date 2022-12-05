import styled, { useTheme } from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';
import { Play } from '@styled-icons/foundation';
import ReactMarkdown from 'react-markdown';

import { Button } from '../../../components/Button/Button';
import { Animation } from '../../../components/Animation/Animation';
import { startQuestionnaire } from '../../../config/navigation.config';
import { devices } from '../../../config/breakpoints.config';
import { SectionContainer } from '../SectionContainer';
import type { VideoSectionContent } from '../SectionMapper';

const StyledSectionContainer = styled(SectionContainer)`
  & > .content-wrapper {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    column-gap: 3rem;
    padding-top: 3rem;
    padding-bottom: 3rem;

    @media screen and (${devices.md}) {
      flex-direction: row;
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  .description {
    max-width: 30rem;

    p {
      margin: 2rem 0;
    }
  }

  .video {
    position: relative;
    margin: 2rem auto 4rem auto;

    @media screen and (${devices.md}) {
      margin: 0 auto;
    }

    /** Video Player */
    > div > div {
      position: relative;
      z-index: 12;
      width: 90vw !important;
      background-color: ${({ theme }) => theme.colors.tertiary};

      @media screen and (${devices.md}) {
        width: 426px !important;
        height: 240px !important;
      }

      @media screen and (${devices.lg}) {
        width: 640px !important;
        height: 360px !important;
      }
    }

    & > div::before {
      position: absolute;
      z-index: 11;
      content: '';
      width: 300px;
      height: 60px;
      right: -10px;
      top: -10px;
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${({ theme }) => theme.colors.secondary};
    }

    & > div::after {
      position: absolute;
      z-index: 11;
      content: '';
      width: 60px;
      height: 60px;
      left: -10px;
      bottom: -10px;
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &:hover .play-button {
      transform: scale(90%);
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.9);
    }

    .react-player__preview::before {
      content: '';
      position: absolute;
      z-index: 13;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      filter: brightness(20%);
      background-color: black;
    }

    .play-button {
      cursor: pointer;
      position: relative;
      z-index: 15;
      width: 4rem;
      height: 4rem;
      border: none;
      box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
      background-color: ${({ theme }) => theme.colors.secondary};
      border-radius: ${({ theme }) => theme.borderRadius};
      transition: all 0.2s ease-in-out;

      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

type VideoSectionProps = {
  id: string;
  content: VideoSectionContent;
};

export const VideoSection: React.FC<VideoSectionProps> = (props) => {
  const theme = useTheme();

  return (
    <StyledSectionContainer id={props.id}>
      <div className="description">
        <Animation type="fadeRight">
          <h2>{props.content?.video_title}</h2>
          <div>
            {props.content?.video_description ? (
              <ReactMarkdown>{props.content.video_description}</ReactMarkdown>
            ) : undefined}
          </div>
          <Button
            href={startQuestionnaire.href}
            label={startQuestionnaire.label}
            color={theme.colors.secondary}
            icon={
              <ArrowRightCircleFill
                size={20}
                style={{ paddingLeft: '0.25rem' }}
              />
            }
          />
        </Animation>
      </div>
      <div className="video">
        <Animation type="fadeLeft">
          <ReactPlayer
            url="/videos/video_b690cf2964.mp4"
            light="/images/video_thumbnail_643e7caa05.jpg"
            playing={true}
            controls={true}
            playIcon={
              <button
                className="play-button"
                type="button"
                aria-label="Play Video"
              >
                <Play color="white" />
              </button>
            }
          />
        </Animation>
      </div>
    </StyledSectionContainer>
  );
};
