import { useMemo, useState } from 'react';

import { format } from 'date-fns';

import type { DateOptions } from '../hooks/useDateOptions';
import type { DateFormStep } from '../AppointmentForm';
import type { AppointmentState } from '../context/Appointment';
import { DatePicker } from './DatePicker';
import { Button } from './Button';
import { CalendarIcon, ClockIcon } from '../../../components/Icons';

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
      <div className="w-full h-auto md:h-[calc(100%-75px)] flex flex-col justify-between">
        <div className="w-full max-w-md mx-auto md:mx-0 flex flex-col gap-6 my-8">
          {[...Array(options.count)].map((_, key) => {
            const selectedDate = values?.[key];

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                className={`px-6 py-4 md:px-14 md:py-8 border-secondary border-[1px] rounded-2xl md:rounded-3xl flex flex-row items-center gap-4 lg:gap-8 ${
                  selectedDate
                    ? 'bg-secondary text-[white] font-semibold lg:text-lg'
                    : 'bg-[#FAFAFA]'
                }`}
                onClick={() => setShowPicker(key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') setShowPicker(key);
                }}
              >
                <div className="w-full flex items-center gap-4">
                  <CalendarIcon
                    className={`block shrink-0 w-[24px] h-[24px] md:w-[40px] md:h-[40px] ${
                      selectedDate ? 'fill-[white]' : 'fill-gray'
                    }`}
                  />
                  <div
                    className="flex items-end w-full min-h-[30px] leading-tight box-border border-gray border-b-[1px]"
                    style={{ borderBottom: '1px solid var(--color-secondary)' }}
                  >
                    {selectedDate ? format(selectedDate, 'dd.MM.yyyy') : ''}
                  </div>
                </div>
                <div className="w-full flex items-center gap-4">
                  <ClockIcon
                    className={`block shrink-0 w-[24px] h-[24px] md:w-[40px] md:h-[40px] ${
                      selectedDate ? 'fill-[white]' : 'fill-gray'
                    }`}
                  />
                  <div
                    className="flex items-end w-full min-h-[30px] leading-tight box-border border-gray border-b-[1px]"
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
            className="my-8 flex-shrink-0"
            onClick={onSubmit}
            disabled={isInvalidDateList(values, options)}
          >
            Bestätigen und weiter
          </Button>
        </div>
      </div>
    </>
  );
};

const isInvalidDateList = (
  dates: AppointmentState['dates'],
  options: DateFormStep['options'],
) => {
  if (!dates) return true;

  let hasIncorrectValue = false;

  for (let i = 0; i < options.count; i++) {
    if (!dates[i] || !(dates[i] instanceof Date)) hasIncorrectValue = true;
  }

  return hasIncorrectValue;
};
