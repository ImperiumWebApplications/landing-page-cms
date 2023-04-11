import cx from 'classnames';
import { ReactSVG } from 'react-svg';

import type { StaticContent } from '../../../../lib/strapi';
import { ArrowRight, CheckCircleIcon } from '../../../../components/Icons';

type StaticServicesSection = NonNullable<StaticContent['services_section']>;

type ServiceProcessProps = {
  className?: string;
  title: StaticServicesSection['process_title'];
  steps: StaticServicesSection['process_step'];
  processAdvantageTitle: StaticServicesSection['process_advantage_title'];
  processAdvantages: StaticServicesSection['process_advantage'];
};

export const ServiceProcess: React.FC<ServiceProcessProps> = (props) => {
  const title = props.title;
  const steps = props.steps?.filter(
    ({ description, icon }) => description && icon?.data?.attributes?.url,
  );

  if (!steps?.length) return null;

  const advantagesTitle = props.processAdvantageTitle;
  const advantages = props.processAdvantages?.filter(
    ({ description }) => !!description,
  );

  return (
    <div
      className={cx(
        'mx-auto max-w-[1400px] bg-tertiary py-20 md:rounded-md',
        props.className,
      )}
    >
      <div className="content-wrapper">
        <h2 className="mb-4 text-center text-base leading-tight md:mb-8 md:text-2xl">
          {title}
        </h2>
        <div className="my-8 flex flex-col justify-between gap-10 md:my-16 md:flex-row">
          {steps.map((step, i) => {
            return (
              <div
                key={step.id}
                className="relative flex flex-1 flex-col items-center justify-center text-center"
              >
                {step.icon?.data?.attributes?.url ? (
                  <ReactSVG
                    src={step.icon.data.attributes.url}
                    className="h-16 w-16 md:h-24 md:w-24"
                    wrapper="span"
                  />
                ) : null}
                <span className="mt-4 block font-bold md:mt-8">
                  {step.description}
                </span>
                {i !== steps.length - 1 ? (
                  <div
                    className={cx(
                      'absolute -right-[35%] hidden lg:block',
                      i === 1 ? 'top-[20%] rotate-180' : 'top-[30%]',
                    )}
                  >
                    <ConnectLineSvg />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {advantagesTitle && advantages?.length ? (
          <div className="mt-12 text-center text-primary md:mt-0">
            <span className="font-bold">{props.processAdvantageTitle}</span>
            {advantages.map(({ id, description }) => {
              return (
                <div key={id} className="block md:inline-block">
                  <ArrowRight
                    aria-hidden="true"
                    className="mx-4 hidden stroke-primary md:inline-block"
                    strokeWidth={2}
                  />
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mr-2 inline-block h-4 w-4 fill-primary md:hidden"
                  />
                  <span className="text-sm md:text-base">{description}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ConnectLineSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="212.768" height="21.081">
      <path
        d="M.446.948s85.991 42.86 212 0"
        fill="none"
        className="stroke-secondary"
        strokeWidth="2"
      />
    </svg>
  );
};
