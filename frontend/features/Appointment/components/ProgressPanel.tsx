import { ComponentProps } from 'react';

import type { AppointmentStep } from '../AppointmentForm';
import { useAppointmentContext } from '../context/Appointment';

type ProgressPanelProps = {
  steps: AppointmentStep[];
};

export const ProgressPanel: React.FC<ProgressPanelProps> = ({ steps }) => {
  const { state, dispatch } = useAppointmentContext();

  return (
    <>
      <div className="-mr-7 -ml-7 -mt-8 flex flex-row md:hidden">
        {steps.map((_, key) => {
          const isStepAhead = key > state.index;
          return (
            <div
              key={key}
              className={`h-2 w-full ${
                key === steps.length - 1 ? 'rounded-r-sm' : ''
              } ${key === 0 ? 'rounded-l-sm' : ''} ${
                isStepAhead ? '' : 'bg-secondary'
              }`}
            />
          );
        })}
      </div>
      <div
        className="hidden flex-col gap-7 border-r-[3px] border-dashed border-secondary pr-10 pt-2 md:flex lg:pr-16"
        data-progress-panel
      >
        {steps.slice(0, -1).map((step, key) => {
          const isStepAhead = key >= state.index;
          const isFormSent = steps[state.index].type === 'confirmation';

          return (
            <ProgressPanelButton
              key={step.label}
              onClick={() => dispatch({ type: 'setIndex', payload: key })}
              isActive={state.index === key}
              disabled={isFormSent || isStepAhead}
            >
              {key + 1}. {step.label}
            </ProgressPanelButton>
          );
        })}
      </div>
    </>
  );
};

const ProgressPanelButton = ({
  isActive,
  disabled,
  children,
  onClick,
  ...props
}: {
  isActive: boolean;
} & ComponentProps<'button'>) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border-[1px] border-gray px-6 pb-2 pt-3 text-left text-lg leading-none transition-colors ${
        isActive ? 'bg-primary text-[white]' : 'text-gray'
      } ${
        !disabled ? 'cursor-pointer hover:bg-primary hover:text-[white]' : ''
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
