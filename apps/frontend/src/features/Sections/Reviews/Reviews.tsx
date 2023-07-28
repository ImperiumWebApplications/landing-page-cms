import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Swiper as SwiperType } from 'swiper';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import type { StaticContent } from '../../../lib/strapi';
import { i18n } from '../../../config/i18n.config';
import { useLanguageContext } from '../../../context/Language';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../components/Icons';

import { SectionContainer } from '../SectionContainer';
import { ReviewsSectionContent } from '../SectionMapper';

const SwiperModules = [Navigation, Pagination, A11y];

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
});

const SWIPER_ID = 'review-slider';

const Review = dynamic(
  () => import('./components/Review').then((mod) => mod.Review),
  {
    ssr: false,
  },
);

type ReviewsSectionProps = {
  content: ReviewsSectionContent;
  staticContent: StaticContent['reviews_section'];
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = (props) => {
  const isTabletBreakpoint = useMediaQuery(`(min-width: 768px)`);
  const { language } = useLanguageContext();

  const [expanded, setExpanded] = useState(false);
  const onExpand = useCallback(() => setExpanded(!expanded), [expanded]);

  // Using a ref does not work since we dynamically import the Swiper component
  const getSwiperInstance = useCallback(() => {
    const swiperElement = document.getElementById(SWIPER_ID);
    if (!swiperElement) return null;
    return (swiperElement as HTMLElement & { swiper: SwiperType }).swiper;
  }, []);

  if (!props.content.rating?.length) return null;

  return (
    <SectionContainer data-section="reviews" className="my-10 md:my-[70px]">
      <h2
        id={props.staticContent?.navigation_item?.anchor_id ?? undefined}
        style={{ scrollMarginTop: '64px' }}
        className="mb-6 text-center text-xl text-primary md:text-4xl"
      >
        {props.staticContent?.title}
      </h2>
      <div data-testid="reviews-slider" className="review-slider relative">
        <Swiper
          id={SWIPER_ID}
          modules={SwiperModules}
          slidesPerView={isTabletBreakpoint ? 2 : 1}
          pagination
          loop
        >
          {props.content.rating?.map((rating, i) => {
            return (
              <SwiperSlide key={i} className="mb-8">
                <Review
                  content={rating}
                  expanded={expanded}
                  onExpand={onExpand}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <NavigationButton
          className="-left-4 xl:-left-10"
          aria-label={i18n[language].BACK}
          onClick={() => getSwiperInstance()?.slidePrev()}
        >
          <ChevronLeftIcon aria-hidden="true" className="w-2 stroke-[white]" />
        </NavigationButton>
        <NavigationButton
          className="-right-4 xl:-right-10"
          aria-label={i18n[language].NEXT}
          onClick={() => getSwiperInstance()?.slideNext()}
        >
          <ChevronRightIcon aria-hidden="true" className="w-2 stroke-[white]" />
        </NavigationButton>
      </div>
    </SectionContainer>
  );
};

// eslint-disable-next-line react/display-name
const NavigationButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={cx(
        'absolute top-[50%] z-10 hidden h-7 w-7 items-center justify-center rounded-full bg-secondary md:flex',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
