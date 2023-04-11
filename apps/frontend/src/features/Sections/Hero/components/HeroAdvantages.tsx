import { motion } from 'framer-motion';
import cx from 'classnames';
import { ReactSVG } from 'react-svg';

import type { StaticContent } from '../../../../lib/strapi';

type StaticHeroSection = NonNullable<StaticContent['hero_section']>;

type HeroAdvantagesProps = {
  advantages: StaticHeroSection['hero_advantage'];
};

export const HeroAdvantages: React.FC<HeroAdvantagesProps> = ({
  advantages,
}) => {
  if (!advantages?.length) return null;

  return (
    <div className="content-wrapper-xl">
      <motion.div
        className="relative z-10 mt-8 flex flex-col items-start justify-between gap-6 rounded-md bg-primary px-2 py-6 text-[white] md:-mt-14 md:flex-row md:items-center md:gap-0"
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        {advantages.map(({ id, description, icon }, i) => {
          if (!description || !icon?.data?.attributes?.url) return null;

          const delay = 200 + 200 * i;

          return (
            <motion.div
              key={id}
              data-testid="hero-step"
              className={cx(
                'flex h-full min-h-[40px] w-full flex-1 items-start px-4 leading-tight md:min-h-[60px] md:items-center md:justify-center md:px-0',
                i !== 0 ? 'border-[white]/50 md:border-l' : '',
              )}
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: delay / 1000 }}
            >
              <div className="flex max-w-[90%] items-center justify-center text-sm md:max-w-[200px] md:text-base lg:max-w-[280px] 3xl:max-w-[320px] 3xl:text-lg">
                <div className="mr-4 flex flex-shrink-0 items-center justify-center">
                  <ReactSVG src={icon.data.attributes.url} wrapper="span" />
                </div>
                <span dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
