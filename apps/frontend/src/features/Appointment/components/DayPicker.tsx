import de from 'date-fns/locale/de';
import { DayPicker as ReactDayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type DayPickerProps = {
  onDayClick: (day: Date) => void;
  disabledWeekdays: number[];
  date?: Date;
};

export const DayPicker: React.FC<DayPickerProps> = ({
  onDayClick,
  disabledWeekdays,
  date,
}) => {
  const today = new Date();

  return (
    <>
      <style>{`.rdp { --rdp-accent-color: var(--color-primary); }`}</style>
      <ReactDayPicker
        mode="single"
        locale={de}
        selected={date}
        onDayClick={onDayClick}
        disabled={[
          {
            before: today,
          },
          {
            dayOfWeek: disabledWeekdays,
          },
        ]}
      />
    </>
  );
};
