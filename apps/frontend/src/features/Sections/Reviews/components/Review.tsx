import React from 'react';
import Image from 'next/image';

import { ReviewsSectionContent } from '../../SectionMapper';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export type ReviewProps = {
  content: NonNullable<ReviewsSectionContent['rating']>[0];
};

export const Review: React.FC<ReviewProps> = ({ content }) => {
  const isTabletBreakpoint = useMediaQuery(`(min-width: 480px)`);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="relative mx-2 mt-12 mb-8 flex h-[75%] flex-col justify-center rounded-md bg-tertiary px-5 pt-[50px] pb-5 text-center shadow-sm md:mt-24 md:px-10 md:pb-12 md:pt-[70px]">
      <div className="absolute -top-11 left-[calc(50%-50px)] z-10 h-[80px] w-[80px]">
        {content.avatar?.data?.attributes ? (
          <Image
            src={content.avatar.data.attributes.url}
            alt={content.avatar.data.attributes.alternativeText ?? ''}
            width={80}
            height={80}
            className="h-full w-full rounded-full object-cover"
          />
        ) : null}
      </div>
      {content.description && (
        <p className="mb-4 text-sm leading-relaxed sm:text-base md:mb-8">
          {isTabletBreakpoint || isExpanded
            ? content.description
            : `${content.description?.substring(0, 300)}...`}
          {!isTabletBreakpoint && (
            <span
              className="font-semibold opacity-75"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? ' Weniger anzeigen' : ' Mehr anzeigen'}
            </span>
          )}
        </p>
      )}
      <span
        aria-label="Name"
        className="mb-2 block text-sm font-bold text-primary md:text-base"
      >
        {content.name}
      </span>
      <span className="text-sm md:text-base">{content.biography}</span>
    </div>
  );
};
