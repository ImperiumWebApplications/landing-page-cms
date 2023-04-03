import { motion } from 'framer-motion';
import cx from 'classnames';

export const Steps: React.FC = () => {
  return (
    <div className="content-wrapper-xl">
      <motion.div
        className="relative z-10 mt-8 flex flex-col items-start justify-between gap-6 rounded-md bg-primary px-2 py-6 text-[white] md:-mt-14 md:flex-row md:items-center md:gap-0"
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        {STEPS.map((step, i) => {
          const delay = 200 + 200 * i;

          return (
            <motion.div
              key={i}
              data-testid="step"
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
                  {step.svg}
                </div>
                <span dangerouslySetInnerHTML={{ __html: step.title }} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

/** Assets */

const FormSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44.458" height="44.394">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="#fff" d="M12.848 15.616H.5" />
        <path stroke="#fff" d="M20.407 8.058H.5" />
        <path stroke="#fff" d="M24.916.5H.5" />
        <path
          d="M43.346 9.154a1.225 1.225 0 0 0 0-1.729l-6.2-6.193a1.222 1.222 0 0 0-1.731 0L12.337 24.308c-.283.285-4.308 10.42-4.459 10.794a1.222 1.222 0 0 0 1.591 1.591c.357-.144 10.524-4.185 10.793-4.463Z"
          stroke="#fff"
        />
        <path stroke="#fff" d="M38.047 8.748 17.399 29.371" />
        <path stroke="#fff" d="m12.342 24.31 7.923 7.923" />
        <path stroke="#fff" d="m8.609 33.284 2.684 2.684" />
        <path
          d="M34.51 24.999h9.448v18.895H.5V24.999h5.669"
          className="stroke-secondary"
        />
      </g>
    </svg>
  );
};

const HandsSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="46.974" height="47.75">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="m34.124 40.676 8.711-3.925c3.162-1.424 5.15 3.156 2.157 4.5-13.231 5.962-12.189 6-17.449 6a32.449 32.449 0 0 1-13.349-3.034c-1.809-.8-5.283.493-9.5 1.559a2.518 2.518 0 0 1-3.044-1.75c-.26-.938-1.315-4.18-1.14-5.045a2.506 2.506 0 0 1 2.074-1.994c3.321-.525 13.392-2.5 18.76-.946l11.18 3.242c3.189.926 1.779 5.71-1.41 4.784L19.366 40.66"
          className="stroke-secondary"
        />
        <path
          d="M43.36 32.7a5.862 5.862 0 0 0 .206-1.384c.25-8.193-10.783-22.732-10.783-22.732C32.657 6.997 36.67.499 36.67.499H18.815s4.011 6.5 3.887 8.085c0 0-11.035 14.515-10.783 22.708a6 6 0 0 0 .057.676"
          stroke="#fff"
        />
        <path
          d="M13.828 11.977s1.726 1.673 3.982-.668 1.754-2.729 4.89-2.676h10.081s3.626-.743 4.88 1.431.8 3.846 2.55 4.806"
          stroke="#fff"
        />
        <path
          d="M23.947 28.883a6.663 6.663 0 0 0 3.854 1.608 3.208 3.208 0 0 0 3.4-2.973c0-1.642-1.626-2.454-3.4-2.973-1.839-.576-3.4-1.331-3.4-2.973a3.208 3.208 0 0 1 3.4-2.973 3.507 3.507 0 0 1 2.953 1.5"
          stroke="#fff"
        />
        <path data-name="Linie 54" stroke="#fff" d="M27.801 16.389v16.312" />
      </g>
    </svg>
  );
};

const OffersSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="43.613" height="47.897">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M28.49 28.408c-1.545-1.545-5.286-1.748-6.667 1.188-1.382-2.936-5.122-2.732-6.667-1.187-1.82 1.442-1.554 4.682-.009 6.227a50.3 50.3 0 0 0 6.339 5.878.535.535 0 0 0 .673 0 50.3 50.3 0 0 0 6.341-5.878c1.549-1.546 1.815-4.786-.01-6.228Z"
          stroke="#fff"
        />
        <path
          d="M2.736 24.305v23.092h37.993V24.305"
          className="stroke-secondary"
        />
        <path className="stroke-secondary" d="M.5 11.68h42.613v8.884H.5z" />
        <path className="stroke-secondary" d="M21.806 23.942V11.68" />
        <path className="stroke-secondary" d="M21.806 47.397v-2.505" />
        <path
          d="M26.878.5h0a5.074 5.074 0 0 0-5.073 5.073v6.106h5.073a5.072 5.072 0 0 0 5.073-5.073V5.573A5.073 5.073 0 0 0 26.878.5Z"
          className="stroke-secondary"
        />
        <path
          d="M16.732 11.679a5.072 5.072 0 0 1-5.073-5.073V5.573A5.074 5.074 0 0 1 16.732.5h0a5.063 5.063 0 0 1 2.632.736"
          className="stroke-secondary"
        />
      </g>
    </svg>
  );
};

const STEPS = [
  {
    title: 'Formular ausfüllen<br>und Bedarf festhalten',
    svg: <FormSvg />,
  },
  {
    title: 'Kostenlos & unverbindlich Angebot erhalten',
    svg: <OffersSvg />,
  },
  {
    title: 'Bestes Preis-<br>Leistungs-Verhältnis',
    svg: <HandsSvg />,
  },
];
