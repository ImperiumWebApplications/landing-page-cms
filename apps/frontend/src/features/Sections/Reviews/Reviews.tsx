import { ComponentPropsWithoutRef, forwardRef, useCallback } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Swiper as SwiperType } from 'swiper';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import { ChevronLeftIcon, ChevronRightIcon } from '../../../components/Icons';
import { CallToActionBanner } from '../../../components/Banner';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { SectionContainer } from '../SectionContainer';
import { ReviewsSectionContent } from '../SectionMapper';
import { useSectionContext } from '../SectionContext';

import { Reviews_OLD } from './Reviews_OLD';
import { ReviewProps } from './components/Review';

const SwiperModules = [Navigation, Pagination, A11y];

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
});

const SWIPER_ID = 'review-slider';

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
  const isTabletBreakpoint = useMediaQuery(`(min-width: 768px)`);
  const { state } = useSectionContext();

  // Using a ref does not work since we dynamically import the Swiper component
  const getSwiperInstance = useCallback(() => {
    const swiperElement = document.getElementById(SWIPER_ID);
    if (!swiperElement) return null;
    return (swiperElement as HTMLElement & { swiper: SwiperType }).swiper;
  }, []);

  if (!state.isNewDesign) return <Reviews_OLD {...props} />;

  if (!props.content.rating?.length) return null;

  return (
    <SectionContainer id={props.id} className="my-10 md:my-[70px]">
      <h2 className="mb-6 text-center text-xl text-primary md:text-4xl">
        Zufriedenheit unserer Kunden
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
                <Review content={rating} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <NavigationButton
          className="-left-4 xl:-left-10"
          aria-label="Zurück"
          onClick={() => getSwiperInstance()?.slidePrev()}
        >
          <ChevronLeftIcon aria-hidden="true" className="w-2 stroke-[white]" />
        </NavigationButton>
        <NavigationButton
          className="-right-4 xl:-right-10"
          aria-label="Weiter"
          onClick={() => getSwiperInstance()?.slideNext()}
        >
          <ChevronRightIcon aria-hidden="true" className="w-2 stroke-[white]" />
        </NavigationButton>
      </div>
      <CallToActionBanner
        data-testid="reviews-cta"
        description="Konnten wir Sie überzeugen?<br />Lassen Sie sich beraten"
        className="mt-6 mb-14 md:my-14"
      />
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
