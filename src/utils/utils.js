import dayjs from 'dayjs';

const humanizePointDate = (date, format) => dayjs(date).format(format);

export {
  humanizePointDate
};
