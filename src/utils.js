import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// const humanizePointFromDate = (date) => dayjs(date).format('D MMMM');
const humanizePointDate = (date) => dayjs(date).format('YYYY-MM-DD');
const humanizePointDateUI = (date) => dayjs(date).format('MMM D');
const humanizePointTimeUI = (date) => dayjs(date).format('H:mm');
const humanizePointDateMarkup = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

export {
  getRandomInteger,
  humanizePointDate,
  humanizePointDateUI,
  humanizePointTimeUI,
  humanizePointDateMarkup };
