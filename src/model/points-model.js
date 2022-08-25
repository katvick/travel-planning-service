import { generatePoint } from '../mock/point.js';
import { destinations } from '../mock/destinations.js';
import { offers } from '../mock/offers.js';

export default class PointsModel {
  #points = Array.from({ length: 5 }, generatePoint);
  #destinations = destinations;
  #offers = offers;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}


