import React from 'react';
import Image from 'next/image';

import { ReviewsSectionContent } from '../../SectionMapper';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import { useLanguageContext } from '../../../../context/Language';
import { i18n } from '../../../../config/i18n.config';

export type ReviewProps = {
  content: NonNullable<ReviewsSectionContent['rating']>[0];
  expanded: boolean;
  onExpand: () => void;
};

export const Review: React.FC<ReviewProps> = ({
  content,
  expanded,
  onExpand,
}) => {
  const { language } = useLanguageContext();
  const isMinTabletWidth = useMediaQuery(`(min-width: 480px)`);

  return (
    <div className="relative mx-2 mt-12 mb-8 flex h-[100%] flex-col justify-center rounded-md bg-tertiary px-5 pt-[25px] pb-5 text-center shadow-sm md:mt-24 md:h-[80%] md:px-10 md:pb-[60px] md:pt-[60px]">
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
          {isMinTabletWidth || expanded || content.description.length < 300
            ? content.description
            : `${content.description?.substring(0, 300)}...`}
          {!isMinTabletWidth && content.description.length > 300 && (
            <span className="block font-semibold opacity-75" onClick={onExpand}>
              {expanded
                ? ` ${i18n[language].SHOW_LESS}`
                : ` ${i18n[language].SHOW_MORE}`}
            </span>
          )}
        </p>
      )}
      <span
        aria-label="Name"
        className="block text-sm font-bold text-primary md:text-base"
      >
        {content.name}
      </span>
      <span className="text-sm md:text-base">{content.biography}</span>
    </div>
  );
};
