import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizePointDate = (date, format) => dayjs(date).format(format);

export {
  getRandomInteger,
  getRandomElement,
  humanizePointDate
};
