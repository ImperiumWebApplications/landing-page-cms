import styled from 'styled-components';
import Image from 'next/image';
import { ArrowForward } from '@styled-icons/fluentui-system-filled';
import { CheckCircle } from '@styled-icons/boxicons-solid/CheckCircle';

import { devices } from '../../../config/breakpoints.config';
import { appointmentRoute } from '../../../config/navigation.config';
import { Animation } from '../../../components/Animation';
import { Button } from '../../../components/Button';

import { HeroSectionDescription } from './Description';
import { HeroSectionContent } from '../SectionMapper';
import { SectionContainer } from '../SectionContainer';

const StyledSectionContainer = styled(SectionContainer)`
  margin-bottom: 2rem;

  @media screen and (${devices.md}) {
    margin-bottom: 4rem;
  }

  > .content-wrapper {
    position: relative;
    padding: 0;
  }

  .image-wrapper {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    img {
      border-radius: ${({ theme }) => theme.borderRadius};
    }
  }

  .intro {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(5px);
    padding: 1rem;
    width: 100%;
    max-width: 40rem;
    border-radius: ${({ theme }) => theme.borderRadius};

    @media screen and (${devices.md}) {
      padding: 3rem 2rem;
    }
  }

  .booking {
    .booking-description {
      margin-top: 1rem;
      max-width: 30rem;
      font-size: 1rem;
      line-height: 1.75rem;

      @media screen and (${devices.sm}) {
        font-size: 1.125rem;
        line-height: 2rem;
      }

      @media screen and (${devices.md}) {
        margin-top: 3rem;
      }

      svg {
        fill: ${({ theme }) => theme.colors.secondary};
      }
    }

    .booking-action {
      margin: 1rem 0 2rem 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      row-gap: 2rem;

      @media screen and (${devices.md}) {
        margin: 2rem 0 2rem 0;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        row-gap: unset;
        column-gap: 3rem;
      }

      .direct-call {
        text-align: left;

        @media screen and (${devices.md}) {
          text-align: right;
        }

        span {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;

          @media screen and (${devices.md}) {
            margin-bottom: 0;
          }
        }

        a {
          font-size: 1rem;
          border-bottom: 2px dashed ${({ theme }) => theme.colors.tertiary};
          padding-bottom: 0.125rem;
          font-weight: 700;
          transition: all 200ms ease;
          color: ${({ theme }) => theme.colors.primary};

          @media (hover) {
            &:hover {
              border-bottom: 2px dashed ${({ theme }) => theme.colors.secondary};
            }
          }

          @media screen and (${devices.md}) {
            font-size: 1.25rem;
          }

          svg {
            width: 20px;
            vertical-align: sub;

            @media screen and (${devices.md}) {
              width: 28px;
            }
          }
        }
      }
    }

    .booking-benefit,
    .booking-benefit-sep {
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: 0.5rem;
      font-size: 13px;

      svg {
        fill: #dadada;
        vertical-align: sub;
      }
    }

    .booking-benefit-sep {
      display: none;
      @media screen and (${devices.md}) {
        display: inline-block;
        color: #dadada;
      }
    }
  }
`;

type HeroSectionAppointmentProps = {
  id: string;
  content: HeroSectionContent;
};

export const HeroSectionAppointment: React.FC<HeroSectionAppointmentProps> = (
  props,
) => {
  return (
    <StyledSectionContainer id={props.id}>
      <Animation type="fadeIn" delay={200}>
        <div className="content-wrapper">
          <div className="image-wrapper">
            {props.content.background_image?.data.attributes && (
              <Image
                src={props.content.background_image.data.attributes.url}
                alt={
                  props.content.background_image?.data.attributes
                    .alternativeText ?? ''
                }
                layout="fill"
                objectFit="cover"
                quality={90}
                priority
              />
            )}
          </div>
          <div className="intro">
            <Animation type="fadeRight" delay={400}>
              <HeroSectionDescription content={props.content} />
            </Animation>
            <Animation type="fadeUp" delay={600}>
              <div className="booking">
                <p className="booking-description">
                  Buchen Sie Ihr <strong>Beratungsgespräch</strong>{' '}
                  <ArrowForward
                    width={26}
                    style={{
                      transform: 'rotate(120deg)',
                      margin: '1rem 0 0 0.25rem',
                    }}
                  />
                </p>
                <div className="booking-action">
                  <Button
                    href={appointmentRoute}
                    label="Kostenloses Gespräch buchen"
                    className="button"
                    fixedWidth="19.25rem"
                  />
                </div>
                <span className="booking-benefit">
                  <CheckCircle size={16} /> Kostenlos & Unverbindlich
                </span>
                <span className="booking-benefit-sep">–</span>
                <span className="booking-benefit">
                  <CheckCircle size={16} /> Lokale{' '}
                  {props.content.serviceType ?? 'Expertise'} aus Ihrer Region
                </span>
              </div>
            </Animation>
          </div>
        </div>
      </Animation>
    </StyledSectionContainer>
  );
};
