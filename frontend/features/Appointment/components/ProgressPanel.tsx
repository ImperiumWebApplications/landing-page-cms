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
      <div className="flex md:hidden flex-row -mr-7 -ml-7 -mt-8">
        {steps.map((_, key) => {
          const isStepAhead = key > state.index;
          return (
            <div
              key={key}
              className={`w-full h-2 ${
                key === steps.length - 1 ? 'rounded-r-sm' : ''
              } ${key === 0 ? 'rounded-l-sm' : ''} ${
                isStepAhead ? '' : 'bg-secondary'
              }`}
            />
          );
        })}
      </div>
      <div
        className="hidden md:flex flex-col gap-7 pr-10 lg:pr-16 pt-2 border-r-[3px] border-dashed border-secondary"
        data-progress-panel
      >
        {steps.map((step, key) => {
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
      className={`w-full pb-2 pt-3 text-lg leading-none rounded-lg border-primary border-[1px] transition-colors ${
        isActive ? 'text-[white] bg-primary' : 'text-primary'
      } ${
        !disabled ? 'hover:bg-primary hover:text-[white] cursor-pointer' : ''
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
