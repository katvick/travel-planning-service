import { FilterType } from '../const';
import { isPointsFuture } from './utils';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointsFuture(point.dateFrom))
};

export {filter};
