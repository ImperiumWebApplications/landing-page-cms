import type { MouseEvent } from 'react';

import cx from 'classnames';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import type { Media } from '../../../lib/strapi';
import { useIconStyleOverrides } from '../../../hooks/useStyleOverrides';
import { isSvg } from '../../../utils/isSvg';
import { CheckCircleIcon } from '../../../components/Icons';

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
  const iconClassName = 'h-[78px] max-w-[100%] md:h-[96px]';

  useIconStyleOverrides();

  return (
    <div
      role="button"
      className={`icon icon-color-override group relative grid h-auto w-[calc(50%-5px)] max-w-xs cursor-pointer select-none grid-cols-1 grid-rows-[78px_1fr] place-content-center rounded-lg border-[1px] p-4 transition-all hover:border-primary hover:shadow-sm hover:ring-2 hover:ring-primary hover:ring-offset-2 md:grid-rows-[96px_1fr] lg:w-[180px] lg:p-6 ${
        selected ? 'border-primary' : 'border-secondary'
      }`}
      onClick={onSelectHandler}
      data-selected={selected ? 'true' : 'false'}
    >
      <div
        aria-hidden="true"
        className={cx(
          'absolute top-2 right-2 transition-all group-hover:block',
          selected ? 'block' : 'hidden',
        )}
      >
        <CheckCircleIcon className="h-6 w-6" />
      </div>
      <div className="mx-auto">
        {icon?.data?.attributes && !isSvgIcon && (
          <Image
            className={cx(iconClassName, 'object-contain')}
            src={icon.data.attributes.url}
            alt={icon.data.attributes.alternativeText ?? ''}
            width={icon.data.attributes.width ?? 100}
            height={icon.data.attributes.height ?? 100}
          />
        )}
        {icon?.data?.attributes && isSvgIcon && (
          <ReactSVG
            wrapper="svg"
            className={iconClassName}
            beforeInjection={(svg) => {
              svg.removeAttribute('height');
              svg.removeAttribute('width');
              svg.removeAttribute('x');
              svg.removeAttribute('y');
            }}
            loading={() => <IconPlaceholder />}
            fallback={() => <IconPlaceholder />}
            src={icon.data.attributes.url}
          />
        )}
        {!icon?.data ? <IconPlaceholder /> : null}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: label }}
        className={`mt-2 flex items-center justify-center pt-2 text-center text-sm font-bold leading-tight group-hover:text-primary md:text-base ${
          selected ? 'text-primary' : 'text-gray'
        }`}
      />
    </div>
  );
};

const IconPlaceholder = () => {
  return (
    <div className="h-[68px] w-[68px] flex-shrink-0 rounded-full bg-secondary opacity-10" />
  );
};
