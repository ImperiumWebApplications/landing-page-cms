import styled from 'styled-components';

import type {
  FunnelTarget,
  HeroSection as IHeroSection,
} from '../../backend-api';
import { devices } from '../../config/breakpoints.config';

const StyledHeroSectionDescription = styled('div')<{
  funnelTarget: FunnelTarget;
}>`
  h1 {
    padding: 0.5rem 0 0.5rem 1rem;
    border-left: 2px dashed ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1rem;
    font-size: 1.4rem;
    line-height: 2rem;

    @media screen and (${devices.md}) {
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

  p {
    max-width: 30rem;
    font-size: 1rem;
    line-height: 1.75rem;

    @media screen and (${devices.sm}) {
      font-size: 1.125rem;
      line-height: 2rem;
    }
  }

  .extended-description {
    display: none;

    @media screen and (${devices.sm}) {
      display: inline;
    }
  }
`;

const FIRST_SENTENCE_REGEX = /^.*?[.!?](?:\s|$)(?!.*\))/;

export const HeroSectionDescription: React.FunctionComponent<{
  content: IHeroSection;
  funnelTarget: FunnelTarget | undefined;
}> = ({ content, funnelTarget }) => {
  const firstSentence = content.description?.match(FIRST_SENTENCE_REGEX)?.[0];

  return (
    <StyledHeroSectionDescription
      funnelTarget={funnelTarget ?? 'Questionnaire'}
    >
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
    </StyledHeroSectionDescription>
  );
};
