import { appointmentRoute } from '../../../../config/navigation.config';

import { Button } from '../../../../components/Button';
import { CheckCircleIcon } from '../../../../components/Icons';

const BENEFITS = ['Kostenlos & Unverbindlich', 'Am Wunschtermin'];

export const AppointmentCTA = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col">
      <Button
        to={appointmentRoute}
        label="Beratungsgespräch vereinbaren"
        variant="secondary"
        className="shadow-lg md:text-lg"
        size="large"
      />
      <div className="mt-6 flex flex-col items-center gap-2 text-sm text-[white] md:flex-row md:gap-8">
        {BENEFITS.map((benefit, key) => {
          return (
            <div key={key} className="flex items-center gap-x-1">
              <CheckCircleIcon className="h-5 w-5" />{' '}
              <span className="pt-[2px]">{benefit}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
