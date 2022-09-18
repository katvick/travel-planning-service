import Observable from '../framework/observable.js';
import { offers } from '../mock/offers.js';

export default class OffersModel extends Observable {
  #offers = offers;

  get offers() {
    return this.#offers;
  }
}


