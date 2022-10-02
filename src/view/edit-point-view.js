import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDate } from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import he from 'he';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 2,
  id: null,
  type: 'taxi',
  offers: [],
};

const createEventTypeListTemplate = (offers, point) => {
  const eventTypeListTemplate = offers.map(({type}) => `
    <div class='event__type-item'>
      <input id='event-type-${type}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${type}' 
      ${point.type === type ? 'checked' : ''}>
      <label class='event__type-label  event__type-label--${type}' for='event-type-${type}-1'>${type}</label>
    </div>
  `);

  return eventTypeListTemplate.join('');
};

const createCityListTemplate = (destinations) => {
  const cityListTemplate = destinations.map(({name}) => `
    <option value='${name}'></option>
  `);

  return cityListTemplate.join('');
};

const createOffersTemplate = (offers, offersSelected) => {
  const offersTemplate = offers.offers.map(({ id, title, price }, index) => `
    <div class='event__offer-selector'>
      <input class='event__offer-checkbox  visually-hidden' id='event-offer-${index + 1}' type='checkbox' name='event-offer-${title}' 
      ${offersSelected.find((item) => item.id === id) ? 'checked' : ''}>
      <label class='event__offer-label' for='event-offer-${index + 1}'>
        <span class='event__offer-title'>${title}</span>
        &plus;&euro;&nbsp;
        <span class='event__offer-price'>${price}</span>
      </label>
    </div>
  `);

  return offersTemplate.join('');
};

const createPicturesTemplate = (pictures) => {
  const picturesTemplate = pictures.map(({ src, description }) => `
    <img class='event__photo' src='${src}' alt='${description}'>
  `);

  return picturesTemplate.join('');
};

const createEditPointTemplate = (point, listOffers, listDestinations) => {
  const { basePrice, dateFrom, dateTo, destination, id, type } = point;
  const checkPoint = point.id !== null;

  const destinationByPoint = listDestinations.find((item) => destination === item.id);

  const offersByType = listOffers.find((item) => item.type === point.type);
  const offersSelected = offersByType.offers.filter((offer) => point.offers.includes(offer.id));

  const dataFromUI = humanizePointDate(dateFrom, 'DD/MM/YY HH:mm');
  const dataToUI = humanizePointDate(dateTo, 'DD/MM/YY HH:mm');

  const buttonCloseEvent = `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Close event</span>
  </button>`;

  return `<li class='trip-events__item' id=${id}>
  <form class='event event--edit' action='#' method='post'>
    <header class='event__header'>
      <div class='event__type-wrapper'>
        <label class='event__type  event__type-btn' for='event-type-toggle-1'>
          <span class='visually-hidden'>Choose event type</span>
          <img class='event__type-icon' width='17' height='17' src='img/icons/${type}.png' alt='Event type icon'>
        </label>
        <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>

        <div class='event__type-list'>
          <fieldset class='event__type-group'>
            <legend class='visually-hidden'>Event type</legend>
            ${createEventTypeListTemplate(listOffers, point)}
          </fieldset>
        </div>
      </div>

      <div class='event__field-group  event__field-group--destination'>
        <label class='event__label  event__type-output' for='event-destination-1'>
        ${type}
        </label>
        <input class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' value='${he.encode(destinationByPoint.name)}' list='destination-list-1'>
        <datalist id='destination-list-1'>
          ${createCityListTemplate(listDestinations)}
        </datalist>
      </div>

      <div class='event__field-group  event__field-group--time'>
        <label class='visually-hidden' for='event-start-time-1'>From</label>
        <input class='event__input  event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${dataFromUI}'>
        &mdash;
        <label class='visually-hidden' for='event-end-time-1'>To</label>
        <input class='event__input  event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${dataToUI}'>
      </div>

      <div class='event__field-group  event__field-group--price'>
        <label class='event__label' for='event-price-1'>
          <span class='visually-hidden'>Price</span>
          &euro;
        </label>
        <input class='event__input  event__input--price' id='event-price-1' type='number' name='event-price' value='${basePrice}'>
      </div>

      <button class='event__save-btn  btn  btn--blue' type='submit'>Save</button>
      <button class='event__reset-btn' type='reset' id='${checkPoint ? 'delete-btn' : 'cancel-btn'}'>${checkPoint ? 'Delete' : 'Cancel'}</button>
      ${checkPoint ? buttonCloseEvent : ''}
    
    </header>
    <section class='event__details'>
      <section class='event__section  event__section--offers'>
        <h3 class='event__section-title  event__section-title--offers'>Offers</h3>
        <div class='event__available-offers'>
          ${createOffersTemplate(offersByType, offersSelected)}
        </div>
      </section>

      <section class='event__section  event__section--destination'>
        <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
        <p class='event__destination-description'>${destinationByPoint.description}</p>
        <div class='event__photos-container'>
          <div class='event__photos-tape'>
            ${createPicturesTemplate(destinationByPoint.pictures)}
          </div>
        </div>

      </section>
    </section>
  </form>
</li>`;
};

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;

  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point = BLANK_POINT, offers, destinations) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;

    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setPointDeleteHandler = (callback) => {
    this._callback.pointDelete = callback;
    this.element.querySelector('#delete-btn').addEventListener('click', this.#pointDeleteHandler);
  };

  setPointResetHandler = (callback) => {
    this._callback.pointReset = callback;
    this.element.querySelector('#cancel-btn').addEventListener('click', this.#pointResetHandler);
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);

    if (this._state.id !== null) {
      this.setPointDeleteHandler(this._callback.pointDelete);
      this.setCloseClickHandler(this._callback.closeClick);
    } else {
      this.setPointResetHandler(this._callback.pointReset);
    }
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #changeCityHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    this.updateElement({
      destination: newDestination.id
    });
  };

  #changeOfferHandler = (evt) => {
    evt.preventDefault();
    const offers = [...this._state.offers];
    const offerId = +(evt.target.id.replace('event-offer-', ''));

    if (evt.target.checked) {
      offers.push(offerId);
    } else {
      const index = offers.indexOf(offerId);
      offers.splice(index, 1);
    }

    this.updateElement({
      offers: offers
    });
  };

  #changePriceHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      basePrice: evt.target.value
    });
  };

  #changeDateFromHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #changeDateToHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #pointDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointDelete(EditPointView.parseStateToPoint(this._state));
  };

  #pointResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointReset();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  #setDatepicker = () => {
    const { dateFrom, dateTo } = this._state;

    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: dateFrom,
        enableTime: true,
        onChange: this.#changeDateFromHandler
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: dateTo,
        enableTime: true,
        onChange: this.#changeDateToHandler
      }
    );
  };

  #setInnerHandlers = () => {
    this.#setDatepicker();
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOfferHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});
}
