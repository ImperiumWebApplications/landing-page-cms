import cx from 'classnames';
import { Fragment } from 'react';

import type { VideoSection } from '../../../../lib/strapi';

type StatisticsProps = {
  items?: NonNullable<VideoSection>['statistics'];
  locale?: string;
};

export const Statistics: React.FC<StatisticsProps> = (props) => {
  return (
    <div className="flex flex-wrap justify-between gap-8 pb-16">
      {props.items?.map((item, i) => {
        if (!item.label || !item.number) return null;

        return (
          <Fragment key={item.id}>
            {i !== 0 ? (
              <div className="hidden w-[1px] border-l border-secondary lg:block" />
            ) : null}
            <div
              data-testid="video-statistic"
              className={cx(
                'mx-auto inline-flex flex-col items-center justify-center gap-2 md:gap-4',
              )}
            >
              <div className="text-5xl font-bold text-primary lg:text-7xl">
                {formatNumber(item.number, props.locale ?? 'de')}
                {item.number_suffix}
              </div>
              <span className="text-sm text-secondary md:text-base">
                {item.label}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

const formatNumber = (number: number, locale: string) => {
  return new Intl.NumberFormat(locale).format(number);
};
