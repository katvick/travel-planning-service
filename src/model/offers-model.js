import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = null;

  constructor (offers) {
    super();
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }
}


