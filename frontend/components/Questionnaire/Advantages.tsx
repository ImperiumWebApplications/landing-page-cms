import styled, { useTheme } from 'styled-components';
import hexRgb from 'hex-rgb';
import { CheckmarkCircle } from '@styled-icons/ionicons-outline';

import type { LandingPage } from '../../lib/strapi';
import { devices } from '../../config/breakpoints.config';

const StyledAdvantages = styled.div`
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) =>
    hexRgb(theme.colors.primary, { format: 'css', alpha: 0.1 })};

  & > .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    row-gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;

    @media screen and (${devices.md}) {
      padding-left: 4rem;
      padding-right: 4rem;
    }

    @media screen and (${devices.md}) {
      flex-direction: row;
      align-items: center;
      column-gap: 3rem;
      row-gap: unset;
    }

    .advantage {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      column-gap: 1rem;

      .advantage-content {
        line-height: 1.5rem;
        span {
          display: block;
          font-weight: 700;
        }
      }
    }
  }
`;

export const Advantages: React.FC<{
  content?: NonNullable<LandingPage['questionnaire']>['advantage'];
}> = ({ content }) => {
  const theme = useTheme();

  return (
    <StyledAdvantages id="advantages">
      <div className="content-wrapper">
        {content?.length &&
          content.map((advantage, i) => {
            return (
              <div key={i} className="advantage">
                <CheckmarkCircle
                  color={theme.colors.success}
                  width={50}
                  height={50}
                />
                <div className="advantage-content">
                  <span>{advantage.first_line}</span>
                  {advantage.second_line}
                </div>
              </div>
            );
          })}
      </div>
    </StyledAdvantages>
  );
};
