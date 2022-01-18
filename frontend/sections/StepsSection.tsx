import styled, { useTheme } from 'styled-components';

import { StaticContent } from '../backend-api';
import { Section } from '../components/Section';
import { Animation } from '../components/Animation';
import { devices } from '../config/breakpoints.config';

const StyledStepsSection = styled(Section)`
  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    @media screen and (${devices.md}) {
      flex-direction: row;
      column-gap: 2rem;
    }
  }

  .step {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.125rem;
    line-height: 1.5rem;
    letter-spacing: -0.5px;

    @media screen and (${devices.lg}) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    .step-number {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
      margin-right: 2rem;
      color: white;
      text-align: center;
      font-weight: 700;
      font-size: 2rem;
      line-height: 3.25rem;
      flex-shrink: 0;

      @media screen and (${devices.lg}) {
        width: 4.5rem;
        height: 4.5rem;
        font-size: 2.5rem;
        line-height: 4.75rem;
      }
    }

    &:nth-child(2) {
      .step-number {
        background-color: ${({ theme }) => theme.colors.secondary};
      }
    }

    &:nth-child(3) {
      .step-number {
        background-color: #848689;
      }
    }
  }
`;

export const StepsSection: React.FunctionComponent<{
  id: string;
  staticContent: StaticContent;
}> = ({ id, staticContent }) => {
  const theme = useTheme();

  const steps = [
    staticContent.user_step_one,
    staticContent.user_step_two,
    staticContent.user_step_three,
  ].filter((s) => !!s);

  return (
    <StyledStepsSection id={id} bgColor={theme.colors.tertiary}>
      {steps.length &&
        steps.map((step, i) => {
          const delay = 600 + 200 * i;
          return (
            <Animation key={i} className="step" type="fadeUp" delay={delay}>
              <div className="step">
                <div className="step-number">{i + 1}</div>
                {step}
              </div>
            </Animation>
          );
        })}
    </StyledStepsSection>
  );
};
