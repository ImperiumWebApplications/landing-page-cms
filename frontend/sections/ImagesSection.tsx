import styled, { useTheme } from 'styled-components';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { ImagesSection as IImagesSection } from '../backend-api';
import { Section } from '../components/Section';
import { Animation } from '../components/Animation';
import { ButtonProps } from '../components/Button';
import { startQuestionnaire } from '../config/navigation.config';
import { devices } from '../config/breakpoints.config';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ClientSideOnlyButton = dynamic<ButtonProps>(
  () => import('../components/Button').then((mod) => mod.Button),
  { ssr: false },
);

const StyledImagesSection = styled(Section)`
  .images {
    display: none;

    @media screen and (${devices.sm}) {
      position: relative;
      display: grid;
      grid-template-rows: auto;
      row-gap: 0.5rem;
      column-gap: 0.5rem;
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 3rem;
    }

    @media screen and (${devices.md}) {
      grid-template-columns: repeat(3, 1fr);
    }

    & .image-wrapper:first-of-type > span > img {
      border-top-left-radius: ${({ theme }) => theme.borderRadius};
    }

    & .image-wrapper:last-of-type > span > img {
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 150px;
      max-width: 450px;
    }
  }

  .callout {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 80rem;
    margin-top: 2rem;
    margin-bottom: 3rem;

    @media screen and (${devices.lg}) {
      flex-direction: row;
      column-gap: 5rem;
    }

    .headline {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -2px;
      opacity: 0.75;
      margin-bottom: 2rem;

      @media screen and (${devices.xl}) {
        font-size: 3rem;
      }
    }

    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 2rem;
      width: 100%;

      > div {
        width: 100%;
      }

      @media screen and (${devices.md}) {
        flex-direction: row;
        column-gap: 3rem;
      }

      span {
        display: block;
        margin-bottom: 0.5rem;
        opacity: 0.75;
        text-transform: uppercase;
        letter-spacing: +0.25px;
        font-size: 0.9rem;
      }
    }
  }
`;

export const ImagesSection: React.FunctionComponent<{
  id: string;
  phoneNumber: string | undefined;
  content: IImagesSection;
}> = ({ id, phoneNumber, content }) => {
  const theme = useTheme();
  const isDesktopBreakpoint = useMediaQuery(`(${devices.xl})`);

  return (
    <StyledImagesSection id={id}>
      <div className="images">
        {content.images?.data?.length &&
          content.images.data.map((image, i) => {
            return (
              <div key={i} className="image-wrapper">
                <Image
                  src={image.attributes.url}
                  alt={image.attributes.alternativeText}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            );
          })}
      </div>
      <Animation type="fadeUp" duration={300} delay={300}>
        <div className="callout">
          <div className="headline">Konnten wir Sie überzeugen?</div>
          <div className="buttons">
            <div className="consultancy">
              <span>Lassen sie sich beraten</span>
              <ClientSideOnlyButton
                href={startQuestionnaire.href}
                label={startQuestionnaire.label}
                color={theme.colors.secondary}
                fullWidth={isDesktopBreakpoint ? false : true}
                fixedWidth={isDesktopBreakpoint ? '20rem' : undefined}
                icon={
                  <ArrowRightCircleFill
                    size={20}
                    style={{ paddingLeft: '0.25rem' }}
                  />
                }
              />
            </div>
            {phoneNumber && (
              <div className="call">
                <span>Oder rufen Sie einfach an</span>
                <ClientSideOnlyButton
                  href={`tel:${phoneNumber}`}
                  label={phoneNumber}
                  color={theme.colors.primary}
                  fullWidth={isDesktopBreakpoint ? false : true}
                  fixedWidth={isDesktopBreakpoint ? '20rem' : undefined}
                />
              </div>
            )}
          </div>
        </div>
      </Animation>
    </StyledImagesSection>
  );
};
