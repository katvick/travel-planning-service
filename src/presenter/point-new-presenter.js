import EditPointView from '../view/edit-point-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {
  #listPointsContainer = null;
  #changeData = null;
  #editPointComponent = null;

  #destroyCallback = null;
  #listOffers = null;
  #listDestinations = null;

  constructor (listPointsContainer, changeData) {
    this.#listPointsContainer = listPointsContainer;
    this.#changeData = changeData;
  }

  init = (callback, listOffers, listDestinations) => {
    this.#destroyCallback = callback;
    this.#listOffers = listOffers;
    this.#listDestinations = listDestinations;

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView(undefined, this.#listOffers, this.#listDestinations);
    this.#editPointComponent.setFormSubmitHandler(this.#handlePointSubmit);
    this.#editPointComponent.setPointResetHandler(this.#handlePointReset);

    render(this.#editPointComponent, this.#listPointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handlePointSubmit = (point) => {
    point.id = nanoid();
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );

    this.destroy();
  };

  #handlePointReset = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

