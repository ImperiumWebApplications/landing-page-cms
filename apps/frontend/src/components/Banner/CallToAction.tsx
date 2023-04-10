import cx from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';

import { questionnaireRoute } from '../../config/navigation.config';

import { Button } from '../Button';
import { ArrowRight } from '../Icons';

type CallToActionBannerProps = {
  description: string;
} & HTMLMotionProps<'div'>;

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  description,
  className,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.8 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      className={cx(
        'relative flex flex-col items-center justify-between gap-8 rounded-lg bg-primary px-5 py-5 pb-0 md:flex-row md:px-14 md:py-10 lg:px-20 lg:py-12',
        className,
      )}
      {...rest}
    >
      <div
        className="max-w-2xl text-center text-xl font-bold text-[white] md:text-left md:text-2xl lg:text-3xl xl:text-[32px]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div>
        <Button
          variant="secondary"
          className="-mb-8 max-w-fit text-[0.9rem] md:mb-0"
          to={`/${questionnaireRoute}`}
          label="Beratung starten"
          Icon={<ArrowRight className="stroke-[white]" />}
        />
      </div>
    </motion.div>
  );
};
