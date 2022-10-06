import AbstractView from '../framework/view/abstract-view.js';

const createErrorTemplate = () => '<p class="trip-events__msg">Oops, something went wrong!</p>';

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
