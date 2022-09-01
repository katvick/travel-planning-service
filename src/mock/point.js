import { getRandomInteger, getRandomElement } from '../utils/utils-for-mock';
import { destinations } from './destinations.js';

const generateType = () => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

export const generatePoint = () => {
  const typePoint = generateType();

  return {
    basePrice: getRandomInteger(300, 1000),
    dateFrom: `2022-08-${getRandomInteger(26, 29)}T${getRandomInteger(10, 15)}:55:56.845Z`,
    dateTo: `2022-08-${getRandomInteger(29, 31)}T${getRandomInteger(16, 23)}:22:13.375Z`,
    destination: getRandomElement(destinations).id,
    id: getRandomInteger(1, 100),
    type: typePoint,
    offers: [getRandomInteger(1, 3), getRandomInteger(1, 3)],
  };
};
