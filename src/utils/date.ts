import { DateTime } from 'luxon';

export const formatDate = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT);
