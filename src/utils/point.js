import dayjs from 'dayjs';

const humanizePointDate = (date, format) => dayjs(date).format(format);

const isPointsFuture = (date) => dayjs().isSame(date, 'day') || dayjs().isBefore(date, 'day');

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  humanizePointDate,
  isPointsFuture,
  sortPointDay,
  sortPointPrice
};
