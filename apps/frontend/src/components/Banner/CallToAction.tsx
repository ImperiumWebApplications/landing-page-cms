import cx from 'classnames';

import { questionnaireRoute } from '../../config/navigation.config';

import { Button } from '../Button';
import { ArrowRight } from '../Icons';

type CallToActionBannerProps = {
  description: string;
  className?: string;
};

export const CallToActionBanner: React.FC<CallToActionBannerProps> = (
  props,
) => {
  return (
    <div
      className={cx(
        'relative flex flex-col items-center justify-between gap-8 rounded-lg bg-primary px-5 py-5 pb-0 md:flex-row md:px-14 md:py-10 lg:px-20 lg:py-12',
        props.className,
      )}
    >
      <div
        className="max-w-2xl text-center text-xl font-bold text-[white] md:text-left md:text-2xl lg:text-3xl xl:text-[32px]"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <div>
        <Button
          data-testid="video-cta-button"
          variant="secondary"
          className="-mb-8 w-[220px] text-[0.9rem] md:mb-0"
          to={`/${questionnaireRoute}`}
          label="Beratung starten"
          Icon={<ArrowRight className="stroke-[white]" />}
        />
      </div>
    </div>
  );
};
