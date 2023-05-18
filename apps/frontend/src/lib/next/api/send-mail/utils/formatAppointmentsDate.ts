import { add, format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import de from 'date-fns/locale/de';

/**
 * Returns a formatted date string, e.g. "Montag, 01.01.2021 (10:00 - 11:00 Uhr)"
 */

export const formatAppointmentsDate = ({
  date,
  duration,
}: {
  date: string;
  duration: number;
}) => {
  const parsedDate = parseISO(date);
  const timeZone = 'Europe/Berlin';
  const zonedDate = utcToZonedTime(parsedDate, timeZone);

  const formattedDate = format(zonedDate, 'cccc, dd.MM.yyyy', { locale: de });

  const endDate = add(zonedDate, { minutes: duration });
  const formattedEndTime = format(endDate, 'kk:mm', { locale: de });
  const formattedStartTime = format(zonedDate, 'kk:mm', { locale: de });

  return `${formattedDate} (${formattedStartTime} Uhr - ${formattedEndTime} Uhr)`;
};
