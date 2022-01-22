import styled from 'styled-components';
import dynamic from 'next/dynamic';
import hexRgb from 'hex-rgb';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';

import { Rating, ReviewsSection as IReviewsSection } from '../backend-api';
import { Section } from '../components/Section';
import { swiperNavigationCss } from '../config/swiper.config';
import { devices } from '../config/breakpoints.config';

const ClientSideOnlyReview = dynamic<{ content: Rating }>(
  () => import('../components/Review').then((mod) => mod.Review),
  { ssr: false },
);

const StyledReviewsSection = styled(Section)`
  text-align: center;
  background: linear-gradient(
    to bottom,
    ${({ theme }) =>
        hexRgb(theme.colors.primary, { format: 'css', alpha: 0.1 })}
      60%,
    white 60%
  );

  & > .content-wrapper {
    max-width: 60rem;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.secondary};
  }

  .heading-prefix {
    display: inline-block;
    margin: 1rem auto;
    font-size: 0.9rem;
    letter-spacing: 0.5px;

    @media screen and (${devices.md}) {
      margin: 2rem auto;
    }
  }

  .heading {
    font-size: 2rem;
    margin-bottom: 2rem;

    @media screen and (${devices.md}) {
      font-size: 3rem;
      margin-bottom: 4rem;
    }
  }

  ${({ theme }) => swiperNavigationCss(theme.colors.secondary)};
`;

export const ReviewsSection: React.FunctionComponent<{
  id: string;
  content: IReviewsSection;
}> = ({ id, content }) => {
  return (
    <StyledReviewsSection id={id}>
      {content.rating?.length && (
        <>
          <span className="heading-prefix">Zufriedenheit unserer Kunden</span>
          <h2 className="heading">Sehr Gut!</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination
            loop
          >
            {content.rating?.map((rating, i) => {
              return (
                <SwiperSlide key={i}>
                  <ClientSideOnlyReview content={rating} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </StyledReviewsSection>
  );
};
