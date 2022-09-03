import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #point = null;
  #listOffers = null;
  #listDestinations = null;

  #listPointsContainer = null;

  #pointComponent = null;
  #editPointComponent = null;

  constructor (listPointsContainer) {
    this.#listPointsContainer = listPointsContainer;
  }

  init = (point, listOffers, listDestinations) => {
    this.#point = point;
    this.#listOffers = listOffers;
    this.#listDestinations = listDestinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(this.#point, this.#listOffers, this.#listDestinations);
    this.#editPointComponent = new EditPointView(this.#point, this.#listOffers, this.#listDestinations);

    this.#pointComponent.setEditClickHandler(this.#hundleEditPointClick);
    this.#editPointComponent.setSaveClickHandler(this.#hundlePointSubmit);
    this.#editPointComponent.setCancelClickHandler(this.#hundleCancelEditPointClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#listPointsContainer);
      return;
    }

    if (this.#listPointsContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#editPointComponent.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  #replaceItemToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
  };

  #replaceFormToItem = () => {
    replace(this.#pointComponent, this.#editPointComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToItem();
      this.#removeEscEventListener();
    }
  };

  #addEscEventListener = () => {
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #removeEscEventListener = () => {
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #hundleEditPointClick = () => {
    this.#replaceItemToForm();
    this.#addEscEventListener();
  };

  #hundlePointSubmit = () => {
    this.#replaceFormToItem();
    this.#removeEscEventListener();
  };

  #hundleCancelEditPointClick = () => {
    this.#replaceFormToItem();
    this.#removeEscEventListener();
  };

}

