import type { AppointmentStep, DateFormStep } from '../AppointmentForm';

const isDatesStep = (step: AppointmentStep): step is DateFormStep => {
  return step.type === 'dates';
};

export const useAppointmentDuration = (steps: AppointmentStep[]) => {
  const datesConfig: DateFormStep | undefined = steps.find(isDatesStep);
  if (!datesConfig) return undefined;

  return datesConfig.options.duration;
};
