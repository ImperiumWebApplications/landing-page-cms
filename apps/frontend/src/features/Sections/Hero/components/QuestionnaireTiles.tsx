import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import type { HeroSectionContent } from '../../SectionMapper';

import { questionnaireRoute } from '../../../../config/navigation.config';
import { isSvg } from '../../../../utils/isSvg';
import { slugifyRoute } from '../../../../utils/slugifyRoute';
import { byPriority } from '../utils/sortQuestionnaires';

const ReactSVG = dynamic(
  // @ts-ignore
  () => import('react-svg').then((mod) => mod.ReactSVG),
  { ssr: false, loading: () => <LoadingIcon /> },
);

// Used for icons, images, and loading skeleton in tiles
const iconClassName =
  'h-[60px] w-[60px] md:h-[74px] md:w-[74px] lg:h-[100px] lg:w-[100px]';

export type QuestionnaireTilesProps = {
  content: HeroSectionContent['questionnaire'];
};

export const QuestionnaireTiles: React.FC<QuestionnaireTilesProps> = (
  props,
) => {
  const { entry_question, questionnaires } = props.content ?? {};

  const sortedQuestionnaires = useMemo(() => {
    return questionnaires?.data.sort(byPriority);
  }, [questionnaires?.data]);

  if (!sortedQuestionnaires?.length) return null;

  return (
    <div className="pt-6 md:pt-0">
      <h4 className="text-center text-xl font-bold text-primary md:text-left md:text-2xl">
        <span data-testid="questionnaire-tiles-question">{entry_question}</span>
      </h4>
      <div
        data-testid="questionnaire-tiles-grid"
        className="mt-6 flex flex-wrap justify-start gap-2 sm:gap-4 md:flex-nowrap lg:gap-8"
      >
        {sortedQuestionnaires.map(({ attributes, id }) => {
          if (!attributes?.name) return null;

          const slug = slugifyRoute(attributes.name);
          const route = `/${questionnaireRoute}/${slug}-${id}`;

          const isSvgIcon = isSvg(attributes.icon?.data?.attributes?.ext);

          return (
            <Link
              key={id}
              role="button"
              href={route}
              className="group flex w-[calc(50%-8px)] max-w-[260px] flex-col items-center gap-4 rounded-md border border-solid border-secondary bg-[white] p-3 shadow-sm transition-all hover:border-primary hover:ring-2 hover:ring-primary hover:ring-offset-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:w-auto md:flex-1 md:rounded-lg md:p-6 md:shadow-lg"
            >
              <div className="icon flex items-center justify-center">
                {attributes.icon?.data?.attributes && !isSvgIcon ? (
                  <Image
                    data-testid="tile-image"
                    src={attributes.icon.data.attributes.url}
                    className={iconClassName}
                    alt={attributes.icon.data.attributes.alternativeText ?? ''}
                    width={attributes.icon.data.attributes.width ?? 0}
                    height={attributes.icon.data.attributes.height ?? 0}
                  />
                ) : null}
                {attributes.icon?.data?.attributes && isSvgIcon ? (
                  <ReactSVG
                    data-testid="tile-icon"
                    wrapper="svg"
                    src={attributes.icon.data.attributes.url}
                    className={iconClassName}
                    loading={() => <LoadingIcon />}
                    beforeInjection={(svg) => {
                      svg.removeAttribute('width');
                      svg.removeAttribute('height');
                      svg.removeAttribute('x');
                      svg.removeAttribute('y');
                    }}
                  />
                ) : null}
              </div>
              <span className="flex flex-grow items-center text-center text-sm font-semibold leading-tight text-primary md:justify-center md:text-base">
                {attributes.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const LoadingIcon = () => (
  <div
    className={cx(iconClassName, 'animate-pulse rounded-full bg-[black]/5 p-4')}
  >
    <span className="sr-only">Wird geladen</span>
  </div>
);
