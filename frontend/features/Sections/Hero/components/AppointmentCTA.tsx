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
        className="text-lg shadow-lg"
        size="large"
      />
      <div className="mt-6 flex gap-8 text-sm text-[white]">
        {BENEFITS.map((benefit, key) => {
          return (
            <div key={key} className="flex items-center">
              <CheckCircleIcon className="h-5 w-5" /> {benefit}
            </div>
          );
        })}
      </div>
    </div>
  );
};
