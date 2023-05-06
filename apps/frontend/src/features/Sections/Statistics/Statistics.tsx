import Image from 'next/image';

import { SectionContainer } from '../SectionContainer';
import { StatisticsSectionContent } from '../SectionMapper';

type StatisticsSectionProps = {
  content: StatisticsSectionContent;
};

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  content,
}) => {
  return (
    <SectionContainer className="relative my-12 bg-secondary" fullWidth>
      {content.background_image?.data?.attributes ? (
        <Image
          src={content.background_image.data.attributes.url}
          alt={content.background_image.data.attributes.alternativeText ?? ''}
          style={{ opacity: 0.75 }}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 1200px"
          fill
        />
      ) : undefined}
      <div className="absolute h-full w-full backdrop-blur-md" />
      <div className="content-wrapper grid grid-cols-[repeat(auto-fit,1fr)] gap-x-8 gap-y-4 pt-4 pb-8 sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] sm:gap-y-8">
        {content.number?.map(({ label, number, number_suffix }, i) => {
          if (!number || !label) return;
          return (
            <div
              key={i}
              data-testid="statistics-number"
              className="relative p-4 text-5xl font-semibold text-[white] after:absolute after:bottom-2 after:left-4 after:h-1 after:w-8 after:bg-[white] after:content-[''] lg:text-6xl"
            >
              <span className="mb-4 block text-base">{label}</span>
              {toLocaleString(number)}
              {number_suffix}
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

const toLocaleString = (n: number, sep = '.') => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};
