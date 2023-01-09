import type { MouseEvent } from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import type { Media } from '../../../lib/strapi';
import { isSvg } from '../../../utils/isSvg';

const ReactSVG = dynamic(
  // @ts-ignore
  () => import('react-svg').then((mod) => mod.ReactSVG),
  { ssr: false },
);

type SelectableOptionProps = {
  label: string;
  selected: boolean;
  icon?: Media;
  onSelectHandler: (event: MouseEvent) => void;
};

export const SelectableOption: React.FC<SelectableOptionProps> = ({
  label,
  selected,
  icon,
  onSelectHandler,
}) => {
  const isSvgIcon = isSvg(icon?.data?.attributes?.ext);

  return (
    <div
      role="button"
      className={`icon group relative grid h-auto w-[calc(50%-0.5rem)] cursor-pointer grid-cols-1 grid-rows-[4rem_1fr] place-content-center rounded-lg border-[1px] p-4 shadow-md transition-all hover:bg-secondary md:w-40 md:grid-rows-[86px_1fr] lg:w-48 lg:p-6 ${
        selected
          ? 'border-secondary bg-secondary'
          : 'border-tertiary bg-[#FAFAFA]'
      }`}
      onClick={onSelectHandler}
      data-selected={selected ? 'true' : 'false'}
    >
      <div className="icon mx-auto">
        {icon?.data?.attributes && !isSvgIcon && (
          <Image
            className={`h-16 w-16 md:h-[86px] md:w-[86px]`}
            src={icon.data.attributes.url}
            alt={icon.data.attributes.alternativeText ?? ''}
            fill
          />
        )}
        {icon?.data?.attributes && isSvgIcon && (
          <ReactSVG
            wrapper="svg"
            className={`h-16 w-16 md:h-[86px] md:w-[86px]`}
            beforeInjection={(svg) => {
              svg.removeAttribute('height');
              svg.removeAttribute('width');
            }}
            loading={() => <IconPlaceholder />}
            fallback={() => <IconPlaceholder />}
            src={icon.data.attributes.url}
          />
        )}
        {!icon?.data ? <IconPlaceholder /> : null}
      </div>
      <div
        className={`mt-2 flex items-center justify-center pt-2 text-center font-semibold leading-tight group-hover:text-[white] xl:text-lg xl:leading-tight ${
          selected ? 'text-[white]' : 'text-primary'
        }`}
      >
        {label}
      </div>
    </div>
  );
};

const IconPlaceholder = () => {
  return (
    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-secondary opacity-10 md:h-12 md:w-12 lg:h-16 lg:w-16" />
  );
};
