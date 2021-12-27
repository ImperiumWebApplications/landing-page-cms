import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';

import { ServicesSection as IServicesSection } from '../backend-api';
import { Section } from '../components/Section';
import ReactMarkdown from 'react-markdown';
import { ProgressBar } from '../components/ProgressBar';
import { devices } from '../config/breakpoints.config';
import { swiperNavigationCss } from '../config/swiper.config';

const StyledServicesSection = styled(Section)`
  .content-wrapper {
    padding-bottom: 4rem;
  }

  .services-header {
    display: flex;
    white-space: nowrap;
    margin: 0 -1rem;
    padding: 1rem;
    padding-bottom: 0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 2rem;

    @media screen and (${devices.md}) {
      white-space: unset;
      overflow-x: unset;
      padding: unset;
      margin: unset;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      margin-bottom: 4rem;
    }

    &::-webkit-scrollbar {
      display: none;

      @media screen and (${devices.md}) {
        display: unset;
      }
    }

    button {
      cursor: pointer;
      border: none;
      border-right: 1px dashed white;
      border-left: 1px dashed white;
      background-color: ${({ theme }) => theme.colors.tertiary};
      color: ${({ theme }) => theme.colors.primary};
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: +0.5px;
      max-width: 12rem;
      flex-shrink: 0;
      white-space: pre-wrap;

      &:hover {
        filter: brightness(95%);
      }

      @media screen and (${devices.md}) {
        white-space: unset;
        max-width: unset;
        flex-shrink: unset;
      }
    }

    button:first-of-type {
      border-top-left-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
      border-left: none;
    }

    button:last-of-type {
      border-top-right-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
      border-right: none;
    }

    button.active {
      color: white;
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  .services-content {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 100%;

    @media screen and (${devices.md}) {
      grid-template-rows: 100%;
      grid-template-columns: 60% 40%;
    }

    @media screen and (${devices.lg}) {
      grid-template-columns: 50% 50%;
    }

    .description {
      @media screen and (${devices.md}) {
        margin-right: 5rem;
      }

      .title {
        color: ${({ theme }) => theme.colors.secondary};
        font-size: 2.25rem;
        line-height: 2.75rem;
        margin-bottom: 2rem;
      }

      .subtitle {
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .ratings {
        margin-top: 2rem;
        margin-right: 2rem;

        @media screen and (${devices.md}) {
          margin-top: 4rem;
          margin-right: 4rem;
        }
      }
    }

    .images {
      ${swiperNavigationCss()};

      img {
        border-radius: ${({ theme }) => theme.borderRadius};
      }

      .examples {
        margin-top: 2rem;

        p {
          font-size: 1.125rem;
          line-height: 2rem;

          strong {
            color: ${({ theme }) => theme.colors.secondary};
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }

        h3 {
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: +0.5px;
          text-transform: uppercase;
        }
      }
    }
  }
`;

export const ServicesSection: React.FunctionComponent<{
  id: string;
  serviceType: string | undefined;
  content: IServicesSection;
}> = ({ id, content, serviceType }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  if (!content.service_tab?.length) return <></>;

  const activeTabContent = content.service_tab[activeTab];

  return (
    <StyledServicesSection id={id}>
      <div className="services-header">
        {content.service_tab.map(({ tab_name }, i) => {
          return (
            tab_name && (
              <button
                type="button"
                key={i}
                onClick={() => setActiveTab(i)}
                className={i === activeTab ? 'active' : ''}
              >
                {tab_name}
              </button>
            )
          );
        })}
      </div>
      <div className="services-content">
        <div className="description">
          <h2 className="title">{activeTabContent.title}</h2>
          <p className="subtitle">{activeTabContent.subtitle}</p>
          <p>{activeTabContent.description}</p>
          <div className="ratings">
            <ProgressBar label="Kundenzufriedenheit" value={98} />
            {serviceType && (
              <ProgressBar label={`Kompetenz der ${serviceType}`} value={100} />
            )}
            <ProgressBar label="Erfolgreiche Vermittlungen" value={92} />
          </div>
        </div>
        <div className="images">
          {activeTabContent.service_images?.data?.length && (
            <Swiper modules={[Navigation, A11y]} navigation loop>
              {activeTabContent.service_images.data.map((image, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Image
                      src={image.attributes.url}
                      alt={image.attributes.alternativeText}
                      width={740}
                      height={380}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          <div className="examples">
            {activeTabContent.service_examples && (
              <>
                <h3>Beispielarbeiten:</h3>
                {
                  <ReactMarkdown>
                    {activeTabContent.service_examples.replace(
                      /\n/g,
                      ' **•** ',
                    )}
                  </ReactMarkdown>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </StyledServicesSection>
  );
};
