import { DateTime, Interval } from 'luxon';

export const formatDate = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT);

export const formatAge = (date: Date) => {
  const interval = Interval.fromDateTimes(date, new Date());
  const { days, months, years } = interval.toDuration(['days', 'months', 'years']).toObject();

  if (years) return `${years} year${years > 1 ? 's' : ''} old`;
  if (months) return `${months} month${months > 1 ? 's' : ''} old`;
  if (days) return `${days} day${days > 1 ? 's' : ''} old`;

  throw new Error("Can't calculate age of plant");
};
