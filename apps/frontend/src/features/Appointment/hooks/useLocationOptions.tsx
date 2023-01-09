import { ComponentProps, ReactElement } from 'react';
import {
  BusinessIcon,
  DiscussionIcon,
  HouseIcon,
  VirtualIcon,
} from '../../../components/Icons/Icons';
import { LandingPage } from '../../../lib/strapi';

export type LocationConfig = NonNullable<
  LandingPage['appointment']
>['appointment_location'];

export type LocationOption = {
  position: number;
  key: string;
  label: string;
  description?: string;
  Icon: (props: ComponentProps<'svg'>) => ReactElement;
};

const configureLocationMap = (
  content: LandingPage,
): Record<keyof LocationConfig | string, Omit<LocationOption, 'key'>> => ({
  appointment_location_at_home: {
    position: 0,
    label: 'Zuhause',
    Icon: HouseIcon,
  },
  appointment_location_on_site: {
    position: 1,
    label: 'Im Geschäft',
    description: content.client_address?.replace(/\n/g, ', ') ?? undefined,
    Icon: BusinessIcon,
  },
  appointment_location_virtual: {
    position: 2,
    label: 'Online-Meeting',
    Icon: VirtualIcon,
  },
  appointment_location_to_be_discussed: {
    position: 3,
    label: 'Nach Absprache',
    Icon: DiscussionIcon,
  },
});

export const useLocationOptions = (site: LandingPage) => {
  const options: LocationOption[] = [];

  if (!site.appointment?.appointment_location) return options;

  const locationMap = configureLocationMap(site);

  Object.entries(site.appointment.appointment_location).forEach(
    ([key, isSelected]) => {
      if (isSelected === true) options.push({ key, ...locationMap[key] });
    },
  );

  return options.sort((a, b) => (a.position > b.position ? 1 : -1));
};
