import dayjs from 'dayjs';

const humanizePointDate = (date, format) => dayjs(date).format(format);

const isPointsFuture = (date) => dayjs.isSame(date, 'day');

export {
  humanizePointDate,
  isPointsFuture
};
