import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import type { HeroSectionContent } from '../../SectionMapper';

import { questionnaireRoute } from '../../../../config/navigation.config';
import { isSvg } from '../../../../utils/isSvg';
import { slugifyRoute } from '../../../../utils/slugifyRoute';
import { byPriority } from '../utils/sortQuestionnaires';

const ReactSVG = dynamic(
  // @ts-ignore
  () => import('react-svg').then((mod) => mod.ReactSVG),
  { ssr: false },
);

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
    <div className="text-center md:mt-4">
      <h4 className="relative inline-block rounded-lg px-6 pb-1 pt-2 text-base text-[white] md:text-lg">
        <div className="absolute top-0 left-0 -z-10 h-full w-full rounded-lg bg-primary brightness-90" />
        <span data-testid="questionnaire-tiles-question">{entry_question}</span>
      </h4>
      <div
        data-testid="questionnaire-tiles-grid"
        className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8"
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
              className="hover:bg-white flex w-[calc(50%-8px)] cursor-pointer flex-col gap-2 rounded-xl border-4 border-solid border-[#f8f8f8] bg-[#f8f8f8] pt-4 pb-3 shadow-md transition-all hover:border-secondary hover:text-[black] md:max-w-[300px] md:flex-1 md:gap-4 md:pt-8 md:pb-6 md:shadow-2xl"
            >
              <div className="icon flex items-center justify-center">
                {attributes.icon?.data?.attributes && !isSvgIcon ? (
                  <Image
                    data-testid="tile-image"
                    src={attributes.icon.data.attributes.url}
                    className="h-12 w-12 object-contain md:h-[6rem] md:w-[6rem]"
                    alt={attributes.icon.data.attributes.alternativeText ?? ''}
                    width={attributes.icon.data.attributes.width ?? 0}
                    height={attributes.icon.data.attributes.height ?? 0}
                  />
                ) : null}
                {attributes.icon?.data?.attributes && isSvgIcon ? (
                  <ReactSVG
                    data-testid="tile-icon"
                    wrapper="svg"
                    className="h-12 w-12 md:h-[6rem] md:w-[6rem]"
                    beforeInjection={(svg) => {
                      svg.removeAttribute('width');
                      svg.removeAttribute('height');
                      svg.removeAttribute('x');
                      svg.removeAttribute('y');
                    }}
                    loading={() => <div className="loading" />}
                    src={attributes.icon.data.attributes.url}
                  />
                ) : null}
              </div>
              <span className="flex flex-grow items-center justify-center font-semibold leading-tight text-gray md:text-xl">
                {attributes.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
