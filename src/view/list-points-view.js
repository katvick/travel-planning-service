import { createElement } from '../render.js';

const createListPointsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListPointsView {
  #element = null;

  get template() {
    return createListPointsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
