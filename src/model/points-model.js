import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';

export default class PointsModel extends Observable {
  #points = Array.from({ length: 5 }, generatePoint);

  get points() {
    return this.#points;
  }
}


