import { getRandomInteger } from '../utils.js';
import { getRandomElement } from '../utils.js';
import { DESTINATIOS } from './destinations.js';

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
  // const offersPoint = OFFERS.find((item) => item.type === typePoint);
  // const offersId = offersPoint.offers.map((offer) => offer.id);

  return {
    basePrice: getRandomInteger(300, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomElement(DESTINATIOS).id,
    id: getRandomInteger(1, 100),
    type: typePoint,
    offers: [1, 3],
  };
};
