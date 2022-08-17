import { createElement } from '../render.js';
import { humanizePointDate } from '../utils.js';
import { humanizePointDateUI } from '../utils.js';
import { humanizePointTimeUI } from '../utils.js';
import { humanizePointDateMarkup } from '../utils.js';

const createPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, id, offers, type } = point;

  // рандом даты
  const pointDate = humanizePointDate(dateFrom);
  const pointDateUI = humanizePointDateUI(dateFrom);
  const pointTimeFromUI = humanizePointTimeUI(dateFrom);
  const pointTimeToUI = humanizePointTimeUI(dateTo);
  const pointDateFromMarkup = humanizePointDateMarkup(dateFrom);
  const pointDateToMarkup = humanizePointDateMarkup(dateTo);

  return `<li class='trip-events__item' id=${id}>
        <div class='event'>
            <time class='event__date' datetime=${pointDate}>${pointDateUI}</time>
            <div class='event__type'>
                <img class='event__type-icon' width='42' height='42' src='img/icons/${type}.png' alt='Event type icon'>
            </div>
            <h3 class='event__title'>${type} ${destination.name}</h3>
            <div class='event__schedule'>
                <p class='event__time'>
                    <time class='event__start-time' datetime=${pointDateFromMarkup}>${pointTimeFromUI}</time>
                    &mdash;
                    <time class='event__end-time' datetime=${pointDateToMarkup}>${pointTimeToUI}</time>
                </p>
            </div>
            <p class='event__price'>
                &euro;&nbsp;<span class='event__price-value'>${basePrice}</span>
            </p>
            <h4 class='visually-hidden'>Offers:</h4>
            <ul class='event__selected-offers'>
                <li class='event__offer' id=${offers.id}>
                    <span class='event__offer-title'>${offers.title}</span>
                    &plus;&euro;&nbsp;
                    <span class='event__offer-price'>${offers.price}</span>
                </li>
            </ul>
            <button class='event__rollup-btn' type='button'>
                <s pan class='visually-hidden'>Open event</s>
            </button>
        </div>
    </li>`;
};

export default class PointView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
