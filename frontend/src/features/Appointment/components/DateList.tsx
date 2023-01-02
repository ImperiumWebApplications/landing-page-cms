import { useMemo, useState } from 'react';

import { format } from 'date-fns';

import type { DateOptions } from '../hooks/useDateOptions';
import type { AppointmentState } from '../context/Appointment';
import { DatePicker } from './DatePicker';
import { CalendarIcon, ClockIcon } from '../../../components/Icons/Icons';
import { Button } from '../../../components/Button';

type DateListProps = {
  options: DateOptions;
  values?: AppointmentState['dates'];
  onSubmit: () => void;
  setValues: (values: AppointmentState['dates']) => void;
};

export const DateList: React.FC<DateListProps> = ({
  setValues,
  values,
  onSubmit,
  options,
}) => {
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const DatePickerDialog = useMemo(() => {
    if (showPicker === null) return undefined;

    const closePicker = () => {
      setShowPicker(null);
    };

    return (
      <DatePicker
        index={showPicker}
        close={closePicker}
        availabilities={options.availabilities}
        duration={options.duration}
        value={values?.[showPicker]}
        setValue={(value) => {
          setValues({ ...values, [showPicker]: value });
        }}
      />
    );
  }, [options.availabilities, options.duration, setValues, showPicker, values]);

  return (
    <>
      {/* */}
      {DatePickerDialog}
      {/* */}
      <div className="flex h-auto w-full flex-col justify-between md:h-[calc(100%-75px)]">
        <div className="mx-auto my-8 flex w-full max-w-md flex-col gap-6 md:mx-0">
          {[...Array(options.count)].map((_, key) => {
            const selectedDate = values?.[key];

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                className={`flex flex-row items-center gap-4 rounded-2xl px-6 py-4 md:rounded-3xl md:px-14 md:py-8 lg:gap-8 ${
                  selectedDate
                    ? 'bg-secondary font-semibold text-[white] shadow-md lg:text-lg'
                    : 'border-[1px] border-tertiary bg-[#FAFAFA] shadow-md'
                }`}
                onClick={() => setShowPicker(key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') setShowPicker(key);
                }}
              >
                <div className="flex w-full items-center gap-4">
                  <CalendarIcon
                    className={`block h-[24px] w-[24px] shrink-0 md:h-[40px] md:w-[40px] ${
                      selectedDate ? 'fill-[white]' : 'fill-gray'
                    }`}
                  />
                  <div
                    className="box-border flex min-h-[30px] w-full items-end border-b-[1px] border-gray leading-tight"
                    style={{ borderBottom: '1px solid var(--color-secondary)' }}
                  >
                    {selectedDate ? format(selectedDate, 'dd.MM.yyyy') : ''}
                  </div>
                </div>
                <div className="flex w-full items-center gap-4">
                  <ClockIcon
                    className={`block h-[24px] w-[24px] shrink-0 md:h-[40px] md:w-[40px] ${
                      selectedDate ? 'fill-[white]' : 'fill-gray'
                    }`}
                  />
                  <div
                    className="box-border flex min-h-[30px] w-full items-end border-b-[1px] border-gray leading-tight"
                    style={{ borderBottom: '1px solid var(--color-secondary)' }}
                  >
                    {selectedDate ? format(selectedDate, 'kk:mm') : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full text-center md:text-right">
          <Button
            variant="primary"
            className="my-8 flex-shrink-0"
            label="Bestätigen und weiter"
            onClick={onSubmit}
            disabled={!values || Object.values(values)?.length === 0}
          />
        </div>
      </div>
    </>
  );
};
