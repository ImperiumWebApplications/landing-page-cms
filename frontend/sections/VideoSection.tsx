import styled, { useTheme } from 'styled-components';
import { Play } from '@styled-icons/foundation';
import ReactPlayer from 'react-player/lazy';

import { StaticContent } from '../backend-api';
import { Button } from '../components/Button';
import { videoButton } from '../config/navigation.config';
import { Section } from '../components/Section';
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
    > div {
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

    &::before {
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

    &::after {
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
      background-color: ${({ theme }) => theme.colors.primary};
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
  staticContent: StaticContent;
  serviceType?: string;
}> = ({ id, staticContent, serviceType }) => {
  const theme = useTheme();

  const partnerType = serviceType ?? 'Partner';
  const description = staticContent.video_description?.replace(
    '${service_type}',
    partnerType,
  );

  return (
    <StyledVideoSection id={id}>
      <div className="description">
        <h2>{staticContent.video_title}</h2>
        <p>{description}</p>
        <Button
          href={videoButton.href}
          label={videoButton.label}
          color={theme.colors.secondary}
        />
      </div>
      <div className="video">
        {staticContent.video_file?.data && (
          <ReactPlayer
            url={staticContent.video_file?.data.attributes.url}
            light={staticContent.video_thumbnail?.data?.attributes.url}
            playing={true}
            controls={true}
            playIcon={
              <button className="play-button" type="button">
                <Play color="white" />
              </button>
            }
          />
        )}
      </div>
    </StyledVideoSection>
  );
};
