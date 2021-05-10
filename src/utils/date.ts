import { DateTime, Interval } from 'luxon';

export const formatDate = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT);

export const formatAge = (date: Date) => {
  const interval = Interval.fromDateTimes(date, new Date());
  const { days, months, weeks, years } = interval
    .toDuration(['days', 'months', 'weeks', 'years'])
    .toObject();

  if (years) return `${Math.floor(years)} year${years > 1 ? 's' : ''} old`;
  if (months) return `${Math.floor(months)} month${months > 1 ? 's' : ''} old`;
  if (weeks) return `${Math.floor(weeks)} week${weeks > 1 ? 's' : ''} old`;
  if (days && days >= 1) return `${Math.floor(days)} day${days > 1 ? 's' : ''} old`;
  if (days && days < 1) return `Just planted!`;

  throw new Error("Can't calculate age of plant");
};

export const formatTime = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_24_SIMPLE);

export const formatHour = (date: Date, withUnit: boolean = false) =>
  `${DateTime.fromJSDate(date).toUTC().hour}${withUnit ? 'h' : ''}`;
