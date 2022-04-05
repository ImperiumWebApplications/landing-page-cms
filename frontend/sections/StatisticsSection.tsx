import Image from 'next/image';
import styled from 'styled-components';

import type { StatisticsSection as IStatisticsSection } from '../backend-api';
import { Section } from '../components/Section';
import { devices } from '../config/breakpoints.config';

const StyledStatisticsSection = styled(Section)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary};

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
    <StyledStatisticsSection id={id} fullWidth>
      {content.background_image?.data?.attributes ? (
        <Image
          src={content.background_image.data.attributes.url}
          alt={content.background_image.data.attributes.alternativeText}
          layout="fill"
          objectFit="cover"
        />
      ) : undefined}
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
