import de from 'date-fns/locale/de';
import { format, eachMinuteOfInterval } from 'date-fns';

type TimePickerProps = {
  duration?: number;
  date: Date;
  range?: { from: string; to: string };
  prevView: () => void;
  onTimeClick: (slot: Date) => void;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  date,
  prevView,
  range,
  duration,
  onTimeClick,
}) => {
  if (!range) return <NoResultsFallback date={date} goBack={prevView} />;

  const startDate = new Date(date);
  const [startHours, startMinutes] = range.from.split(':');
  startDate.setHours(parseInt(startHours, 10));
  startDate.setMinutes(parseInt(startMinutes, 10));

  const endDate = new Date(date);
  const [endHours, endMinutes] = range.to.split(':');
  endDate.setHours(parseInt(endHours, 10));
  endDate.setMinutes(parseInt(endMinutes, 10));

  const slots = eachMinuteOfInterval(
    { start: startDate, end: endDate },
    { step: duration ?? 60 },
  );
  return (
    <>
      <TimePickerHeader date={date} goBack={prevView} />
      <div className="flex flex-col gap-2 pb-4 px-12 h-[calc(400px-148px)] overflow-y-scroll">
        {slots.map((slot, key) => {
          const isSelected = slot.toISOString() === date.toISOString();
          return (
            <button
              key={key}
              onClick={() => onTimeClick(slot)}
              className={`block border-[1px] border-gray p-4 leading-none rounded-md lg:hover:border-secondary lg:hover:bg-secondary lg:hover:text-[white] transition-colors ${
                isSelected ? 'text-[white] bg-secondary' : 'text-gray'
              }`}
            >
              {format(slot, 'HH:mm')}
            </button>
          );
        })}
      </div>
    </>
  );
};

const TimePickerHeader = ({
  date,
  goBack,
}: {
  date: Date;
  goBack: () => void;
}) => {
  const formattedDate = format(date, 'EEEE, dd. LLLL yyyy', {
    locale: de,
  });

  return (
    <div className="w-full p-6 text-center">
      <span className="text-gray text-sm">{formattedDate}</span>
      <button
        onClick={goBack}
        className="block text-primary text-sm mx-auto py-2 underline font-normal"
      >
        zurück
      </button>
    </div>
  );
};

const NoResultsFallback = (props: { date: Date; goBack: () => void }) => {
  return (
    <>
      <TimePickerHeader {...props} />
      <div className="p-4 text-center text-sm">
        Leider ist keine Zeit an diesem Tag verfügbar. Bitte wähle einen anderen
        Tag.
      </div>
    </>
  );
};
