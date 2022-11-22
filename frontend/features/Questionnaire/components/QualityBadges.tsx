import styled from 'styled-components';
import Image from 'next/image';
import hexRgb from 'hex-rgb';

import { devices } from '../../../config/breakpoints.config';

const badges = [
  {
    href: 'https://kagu-media.de/kostenloses-guetesiegel-fuer-ihre-webseite/',
    badgeSrc: '/images/kagu-gepruefte-webseite.png',
  },
  {
    href: 'https://tech-aktuell.de/',
    badgeSrc: '/images/tech-webseiten-check.png',
  },
];

const StyledQualityBadges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 3rem;
  padding: 0.5rem;
  margin-bottom: -2rem;

  @media screen and (${devices.md}) {
    margin-bottom: -6rem;
  }

  background-image: linear-gradient(
    to right,
    ${({ theme }) =>
      hexRgb(theme.colors.secondary, { format: 'css', alpha: 0 })},
    ${({ theme }) =>
      hexRgb(theme.colors.tertiary, { format: 'css', alpha: 1 })},
    ${({ theme }) =>
      hexRgb(theme.colors.secondary, { format: 'css', alpha: 0 })}
  );
`;

export const QualityBadges: React.FunctionComponent = () => {
  return (
    <StyledQualityBadges>
      {badges.map(({ href, badgeSrc }, key) => {
        return (
          <a key={key} href={href} target={'_blank'} rel="noreferrer noopener">
            <Image
              src={badgeSrc}
              width={120}
              height={120}
              objectFit="contain"
              alt="Webseiten-Siegel"
            />
          </a>
        );
      })}
    </StyledQualityBadges>
  );
};
