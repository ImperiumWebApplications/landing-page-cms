import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';

import type { ReviewProps } from './components/Review';
import { SectionContainer } from '../SectionContainer';
import { ReviewsSectionContent } from '../SectionMapper';

import { useThemeColor } from '../../../hooks/useThemeColor';

const Review = dynamic<ReviewProps>(
  () => import('./components/Review').then((mod) => mod.Review),
  {
    ssr: false,
  },
);

type ReviewsSectionProps = {
  id: string;
  content: ReviewsSectionContent;
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = (props) => {
  const primaryHex = useThemeColor('primary');

  return (
    <SectionContainer
      id={props.id}
      className="my-12 text-center"
      style={{
        background: `linear-gradient(${primaryHex}1A 60%, white 60%)`,
      }}
    >
      <div className="content-wrapper max-w-[60rem] pt-12 md:py-12">
        {props.content.rating?.length && (
          <>
            <span className="mx-auto inline-block text-sm tracking-wide md:my-8">
              Zufriedenheit unserer Kunden
            </span>
            <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">
              Sehr Gut!
            </h2>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation
              pagination
              loop
            >
              {props.content.rating?.map((rating, i) => {
                return (
                  <SwiperSlide key={i} className="mb-8">
                    <Review content={rating} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
    </SectionContainer>
  );
};
