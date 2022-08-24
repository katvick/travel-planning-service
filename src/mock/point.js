import { getRandomInteger } from '../utils/utils-for-mock';
import { getRandomElement } from '../utils/utils-for-mock';
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
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomElement(destinations).id,
    id: getRandomInteger(1, 100),
    type: typePoint,
    offers: [getRandomInteger(1, 3), getRandomInteger(1, 3)],
  };
};
