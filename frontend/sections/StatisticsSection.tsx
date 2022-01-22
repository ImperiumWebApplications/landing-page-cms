import styled from 'styled-components';

import type { StatisticsSection as IStatisticsSection } from '../backend-api';
import { Section } from '../components/Section';
import { devices } from '../config/breakpoints.config';

const StyledStatisticsSection = styled(Section)<{
  bgImage: string | undefined;
}>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary};
  background-image: url(${({ bgImage }) => bgImage});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @supports (-webkit-overflow-scrolling: touch) {
    background-attachment: scroll;
  }

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(0.5rem);
  }

  & > .content-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    column-gap: 2rem;
    row-gap: 1rem;

    @media screen and (${devices.sm}) {
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
      row-gap: 2rem;
    }
  }

  .number {
    position: relative;
    padding: 1rem;
    color: white;
    font-weight: 700;
    font-size: 3rem;

    @media screen and (${devices.lg}) {
      font-size: 4rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0.5rem;
      left: 1rem;
      width: 2rem;
      height: 4px;
      background-color: white;
    }

    .label {
      display: block;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

export const StatisticsSection: React.FunctionComponent<{
  id: string;
  content: IStatisticsSection;
}> = ({ id, content }) => {
  return (
    <StyledStatisticsSection
      id={id}
      bgImage={content.background_image?.data?.attributes.url}
      fullWidth
    >
      <div className="backdrop" />
      <div className="content-wrapper">
        {content.number &&
          content.number.map(({ label, number, number_suffix }, i) => {
            if (!number || !label) return;
            return (
              <div key={i} className="number">
                <span className="label">{label}</span>
                {toLocaleString(number)}
                {number_suffix}
              </div>
            );
          })}
      </div>
    </StyledStatisticsSection>
  );
};

const toLocaleString = (n: number, sep = '.') => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};
