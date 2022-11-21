import styled from 'styled-components';

import { devices } from '../../../config/breakpoints.config';
import type { LandingPage } from '../../../lib/strapi';
import { HeroSectionContent } from '../SectionMapper';

const StyledHeroSectionDescription = styled('div')<{
  funnelTarget: LandingPage['funnel_target'];
}>`
  h1 {
    padding: 0.5rem 0 0.5rem 1rem;
    border-left: 2px dashed ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1rem;
    font-size: 1.4rem;
    line-height: 2rem;

    @media screen and (${devices.md}) {
      font-size: ${({ funnelTarget }) =>
        funnelTarget === 'Appointment' ? '2.5rem' : '2.1rem'};
      line-height: ${({ funnelTarget }) =>
        funnelTarget === 'Appointment' ? '3.25rem' : '2.75rem'};
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

export const HeroSectionDescription: React.FC<{
  content: HeroSectionContent;
}> = (props) => {
  const firstSentence =
    props.content.description?.match(FIRST_SENTENCE_REGEX)?.[0];

  return (
    <StyledHeroSectionDescription
      funnelTarget={props.content.funnel ?? 'Questionnaire'}
    >
      {props.content.title || props.content.subtitle ? (
        <h1
          dangerouslySetInnerHTML={{
            __html: `${props.content.title} <span>${props.content.subtitle}</span>`,
          }}
        />
      ) : undefined}
      {props.content.description ? (
        <p>
          {firstSentence ?? props.content.description}
          {firstSentence ? (
            <span className="extended-description">
              {props.content.description.substring(firstSentence.length)}
            </span>
          ) : undefined}
        </p>
      ) : undefined}
    </StyledHeroSectionDescription>
  );
};
