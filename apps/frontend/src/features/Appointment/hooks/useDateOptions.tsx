import type { LandingPage } from '../../../lib/strapi';

type AppointmentConfig = LandingPage['appointment'];

export type DateOptions = {
  count: number;
  duration: number;
  availabilities?: Record<string, { from: string; to: string }>;
};

export const useDateOptions = (config: AppointmentConfig): DateOptions => {
  return {
    count: 3,
    duration: parseDuration(config?.appointment_duration) ?? 60,
    availabilities: reduceAvailabilities(config?.appointment_availability),
  };
};

const parseDuration = (
  field: NonNullable<LandingPage['appointment']>['appointment_duration'],
) => {
  try {
    if (!field) return undefined;
    const duration = field.substring(1, field.length - 3);
    return parseInt(duration, 10);
  } catch {
    return undefined;
  }
};

const reduceAvailabilities = (
  field: NonNullable<LandingPage['appointment']>['appointment_availability'],
) => {
  if (!field) return undefined;

  return field.reduce(
    (prev, { day, from_time, to_time }) => ({
      ...prev,
      [day as string]: { from: from_time, to: to_time },
    }),
    {},
  );
};
