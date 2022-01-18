import styled, { useTheme } from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';
import { Play } from '@styled-icons/foundation';

import type {
  StaticContent,
  VideoSection as IVideoSection,
} from '../backend-api';
import { Button } from '../components/Button';
import { startQuestionnaire } from '../config/navigation.config';
import { Section } from '../components/Section';
import { Animation } from '../components/Animation';
import { devices } from '../config/breakpoints.config';

const StyledVideoSection = styled(Section)`
  .content-wrapper {
    display: flex;
    flex-direction: column;
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
    margin: 2rem auto 0 auto;

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

export const VideoSection: React.FunctionComponent<{
  id: string;
  content?: IVideoSection;
  staticContent?: StaticContent;
}> = ({ id, staticContent, content }) => {
  const theme = useTheme();

  return (
    <StyledVideoSection id={id}>
      <div className="description">
        <Animation type="fadeRight">
          <h2>{content?.video_title}</h2>
          <p>{content?.video_description}</p>
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
          {staticContent?.video_file?.data && (
            <ReactPlayer
              url={staticContent.video_file?.data.attributes.url}
              light={staticContent.video_thumbnail?.data?.attributes.url}
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
          )}
        </Animation>
      </div>
    </StyledVideoSection>
  );
};
