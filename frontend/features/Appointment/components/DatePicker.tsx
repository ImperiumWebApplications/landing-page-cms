import { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';

import type { DateOptions } from '../hooks/useDateOptions';
import { TimePicker } from './TimePicker';
import { DayPicker } from './DayPicker';
import { CloseIcon } from '../../../components/Icons/Icons';

type DatePickerProps = {
  index: number;
  close: () => void;
  value?: Date;
  setValue: (value: Date) => void;
  duration: DateOptions['duration'];
  availabilities: DateOptions['availabilities'];
};

export const DatePicker: React.FC<DatePickerProps> = ({
  close,
  value,
  setValue,
  availabilities,
  duration,
  index,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [pickedDate, setPickedDate] = useState(value);
  const [view, setView] = useState<'day' | 'time'>(value ? 'time' : 'day');

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const disabledWeekdays = availabilities
    ? [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
        if (weekDay === 0) return !availabilities['Sunday'];
        if (weekDay === 1) return !availabilities['Monday'];
        if (weekDay === 2) return !availabilities['Tuesday'];
        if (weekDay === 3) return !availabilities['Wednesday'];
        if (weekDay === 4) return !availabilities['Thursday'];
        if (weekDay === 5) return !availabilities['Friday'];
        if (weekDay === 6) return !availabilities['Saturday'];
      })
    : [];

  const availableTimeRange =
    availabilities && pickedDate
      ? availabilities[format(pickedDate, 'eeee')]
      : undefined;

  return (
    <Transition show={isMounted} as={Fragment}>
      <Dialog onClose={close} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[black]/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4 md:ml-[10vw]">
            <Dialog.Panel className="w-full max-w-xs h-[400px] rounded-md bg-[white]">
              <Dialog.Title
                as="div"
                className="relative w-full bg-primary text-[white] font-semibold rounded-t-md p-2 text-center"
              >
                <span>Wunschtermin {index + 1}</span>
                <button
                  onClick={close}
                  className="absolute top-[calc(50%-6px)] right-4"
                  aria-label="Close"
                >
                  <CloseIcon className="stroke-[white]" />
                </button>
              </Dialog.Title>
              {view === 'day' ? (
                <DayPicker
                  date={pickedDate}
                  onDayClick={(day) => {
                    setPickedDate(day);
                    setView('time');
                  }}
                  disabledWeekdays={disabledWeekdays}
                />
              ) : undefined}
              {view === 'time' && pickedDate ? (
                <TimePicker
                  date={pickedDate}
                  onTimeClick={(slot) => {
                    setValue(slot);
                    close();
                  }}
                  prevView={() => setView('day')}
                  duration={duration}
                  range={availableTimeRange}
                />
              ) : undefined}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
