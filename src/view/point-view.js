import { createElement } from '../render.js';
import { humanizePointDate } from '../utils/utils.js';

const createOffersTemplate = (offers) => {
  const offerTemplate = offers.map(({id, title, price}) => `
  <li class='event__offer' id='${id}'>
      <span class='event__offer-title'>${title}</span>
      &plus;&euro;&nbsp;
      <span class='event__offer-price'>${price}</span>
  </li>
  `);

  return offerTemplate.join('');
};

const createPointTemplate = (point, offers, destinations) => {
  const { basePrice, dateFrom, dateTo, destination, id, type } = point;

  const offersByType = offers.find((item) => item.type === point.type);
  const offersSelected = offersByType.offers.filter((item) => point.offers.includes(item.id));

  const destinationByPoint = destinations.find((item) => destination === item.id);

  const pointDateMarkup = humanizePointDate(dateFrom, 'YYYY-MM-DD');
  const pointDateUI = humanizePointDate(dateFrom, 'MMM D');
  const pointTimeFromUI = humanizePointDate(dateFrom, 'H:mm');
  const pointTimeToUI = humanizePointDate(dateTo, 'H:mm');
  const pointDateFromMarkup = humanizePointDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const pointDateToMarkup = humanizePointDate(dateTo, 'YYYY-MM-DDTHH:mm');

  return `<li class='trip-events__item' id=${id}>
        <div class='event'>
            <time class='event__date' datetime=${pointDateMarkup}>${pointDateUI}</time>
            <div class='event__type'>
                <img class='event__type-icon' width='42' height='42' src='img/icons/${type}.png' alt='Event type icon'>
            </div>
            <h3 class='event__title'>${type} ${destinationByPoint.name}</h3>
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
              ${createOffersTemplate(offersSelected)}
            </ul>
            <button class='event__rollup-btn' type='button'>
                <s pan class='visually-hidden'>Open event</s>
            </button>
        </div>
    </li>`;
};

export default class PointView {
  constructor(point, offers, destinations) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.offers, this.destinations);
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
