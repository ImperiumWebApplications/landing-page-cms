import React from 'react';
import Image from 'next/image';

import { ReviewsSectionContent } from '../../SectionMapper';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export type ReviewProps = {
  content: NonNullable<ReviewsSectionContent['rating']>[0];
};

export const Review_OLD: React.FC<ReviewProps> = ({ content }) => {
  const isTabletBreakpoint = useMediaQuery(`(min-width: 480px)`);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="relative mx-2 mt-14 mb-8 rounded-md bg-[white] px-6 pt-20 pb-8 shadow-md sm:mx-8 md:px-20 md:pt-24 md:pb-16">
      <div className="absolute -top-11 left-[calc(50%-50px)] z-10 h-[100px] w-[100px] before:absolute before:-left-[5px] before:-top-1 before:-z-[1] before:h-[55px] before:w-[110px] before:rounded-tl-md before:rounded-tr-md before:bg-primary before:content-[''] after:absolute after:-left-[5px] after:bottom-0 after:-z-[1] after:h-[55px] after:w-[110px] after:rounded-br-md after:rounded-bl-md after:bg-tertiary after:content-['']">
        {content.avatar?.data?.attributes ? (
          <Image
            src={content.avatar.data.attributes.url}
            alt={content.avatar.data.attributes.alternativeText ?? ''}
            width={100}
            height={100}
            className="object-cover"
          />
        ) : null}
      </div>
      {content.description && (
        <p className="mb-8 text-sm leading-relaxed sm:text-base">
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
      <h3 aria-label="Name">{content.name}</h3>
      <span>{content.biography}</span>
    </div>
  );
};
