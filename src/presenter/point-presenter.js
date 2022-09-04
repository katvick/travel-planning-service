import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #point = null;
  #mode = Mode.DEFAULT;
  #listOffers = null;
  #listDestinations = null;

  #listPointsContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #editPointComponent = null;

  constructor (listPointsContainer, changeData, changeMode) {
    this.#listPointsContainer = listPointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  };

  #replaceItemToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToItem = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
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

  #hundlePointSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToItem();
    this.#removeEscEventListener();
  };

  #hundleCancelEditPointClick = () => {
    this.#replaceFormToItem();
    this.#removeEscEventListener();
  };

}

