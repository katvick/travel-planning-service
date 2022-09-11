import { getRandomInteger, getRandomElement } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { destinations } from './destinations.js';
import { TYPES } from '../const.js';

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(300, 1000),
  dateFrom: `2022-08-${getRandomInteger(26, 29)}T${getRandomInteger(10, 15)}:55:56.845Z`,
  dateTo: `2022-08-${getRandomInteger(29, 31)}T${getRandomInteger(16, 23)}:22:13.375Z`,
  destination: getRandomElement(destinations).id,
  id: nanoid(),
  type: generateType(),
  offers: [1, 2],
});
