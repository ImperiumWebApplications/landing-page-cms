import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { HeroSectionContent } from '../../SectionMapper';

import { questionnaireRoute } from '../../../../config/navigation.config';
import { isSvg } from '../../../../utils/isSvg';
import { slugifyRoute } from '../../../../utils/slugifyRoute';

import { byPriority } from '../utils/sortQuestionnaires';
import { ReactSVG } from 'react-svg';

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
    <div className="mt-4 text-center">
      <h4 className="relative inline-block rounded-lg px-6 pb-1 pt-2 text-lg text-[white]">
        <div className="absolute top-0 left-0 -z-10 h-full w-full rounded-lg bg-primary brightness-90" />
        <span>{entry_question}</span>
      </h4>
      <div className="mt-6 flex justify-center gap-8">
        {sortedQuestionnaires.map(({ attributes, id }) => {
          if (!attributes?.name) return null;

          const slug = slugifyRoute(attributes.name);
          const route = `/${questionnaireRoute}/${slug}-${id}`;

          const isSvgIcon = isSvg(attributes.icon?.data?.attributes?.ext);

          return (
            <Link key={id} href={route} passHref>
              <a
                role="button"
                className="hover:bg-white flex max-w-[300px] flex-1 cursor-pointer flex-col gap-8 rounded-xl border-4 border-solid border-[#f8f8f8] bg-[#f8f8f8] pt-8 pb-6 shadow-2xl transition-all hover:border-secondary hover:text-[black]"
              >
                <div className="flex items-center justify-center">
                  {attributes.icon?.data.attributes && !isSvgIcon ? (
                    <Image
                      data-testid="tile-image"
                      src={attributes.icon.data.attributes.url}
                      className="icon icon h-[5rem] w-[5rem]"
                      alt={
                        attributes.icon.data.attributes.alternativeText ?? ''
                      }
                      width={attributes.icon.data.attributes.width}
                      height={attributes.icon.data.attributes.height}
                    />
                  ) : null}
                  {attributes.icon?.data.attributes && isSvgIcon ? (
                    <ReactSVG
                      data-testid="tile-icon"
                      className="icon h-[5rem] w-[5rem]"
                      beforeInjection={(svg) => {
                        svg.classList.add('w-full');
                        svg.classList.add('h-full');
                        svg.classList.add('object-contain');
                      }}
                      loading={() => <div className="loading" />}
                      src={attributes.icon.data.attributes.url}
                    />
                  ) : null}
                </div>
                <span className="flex flex-grow items-center justify-center text-xl font-semibold leading-tight text-gray">
                  {attributes.name}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
