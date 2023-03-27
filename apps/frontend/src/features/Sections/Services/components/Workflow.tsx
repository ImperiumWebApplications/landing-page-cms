import cx from 'classnames';
import { ComponentProps } from 'react';

type WorkflowProps = {
  className?: string;
};

export const Workflow: React.FC<WorkflowProps> = (props) => {
  return (
    <div
      className={cx(
        'flex flex-col justify-between gap-10 md:flex-row',
        props.className,
      )}
    >
      {STEPS.map(({ title, Icon }, i) => {
        return (
          <div
            key={i}
            className="relative flex flex-1 flex-col items-center justify-center text-center"
          >
            <Icon className="h-16 w-16 md:h-24 md:w-24" />
            <span className="mt-4 block font-bold md:mt-8">{title}</span>
            {i !== STEPS.length - 1 ? (
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
  );
};

const Step1Svg: React.FC<ComponentProps<'svg'>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90.816 90.687"
      {...props}
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="stroke-secondary"
      >
        <path d="M26.237 31.893H1" />
        <path d="M41.685 16.446H1" />
        <path d="M50.9 1H1" />
        <path d="M88.566 18.686a2.5 2.5 0 0 0 0-3.533L75.903 2.495a2.5 2.5 0 0 0-3.537 0L25.2 49.657c-.579.583-8.8 21.3-9.113 22.061a2.5 2.5 0 0 0 3.252 3.251c.729-.293 21.509-8.553 22.058-9.121Z" />
        <path d="m77.737 17.858-42.2 42.149" />
        <path d="m25.202 49.661 16.193 16.193" />
        <path d="m17.573 68.001 5.485 5.486" />
        <path d="M70.507 51.07h19.309v38.62H1V51.07h11.586" />
      </g>
    </svg>
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

const STEPS = [
  {
    title: 'Kontaktformular mit den Daten Ihres Anliegens einsenden',
    Icon: Step1Svg,
  },
  {
    title:
      'Innerhalb von 24h erhalten Sie einen Rückruf von unserem Expertenteam',
    Icon: Step1Svg,
  },
  {
    title: 'Individuelle und zielgerechte Erfassung Ihres Anliegens',
    Icon: Step1Svg,
  },
];
