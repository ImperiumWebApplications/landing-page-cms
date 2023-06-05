import Image from 'next/image';

import type { MediaList } from '../../../lib/strapi/model';

type QualityBadgesProps = {
  badges?: MediaList | undefined;
};

export const QualityBadges: React.FC<QualityBadgesProps> = ({ badges }) => {
  if (!badges?.data?.length) return null;

  return (
    <div className="mt-6 flex flex-row items-center justify-center gap-x-12 p-2">
      {badges.data.map(({ attributes }, key) => {
        if (!attributes?.url) return null;
        return (
          <Image
            src={attributes.url}
            width={100}
            height={100}
            alt={attributes.alternativeText ?? 'badge'}
            className="object-contain"
          />
        );
      })}
    </div>
  );
};
