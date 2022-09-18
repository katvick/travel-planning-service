import Observable from '../framework/observable.js';
import { destinations } from '../mock/destinations.js';

export default class DestinationsModel extends Observable {
  #destinations = destinations;

  get destinations() {
    return this.#destinations;
  }

}


