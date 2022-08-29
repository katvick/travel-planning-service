import { filter } from '../utils/filter';

export const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    points: filterPoints(points)
  })
);
