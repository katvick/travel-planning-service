import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointsView from '../view/no-points-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #listPointsComponent = new ListPointsView();
  #eventsContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listDestinations = null;
  #listOffers = null;

  constructor(eventsContainer, pointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderSort = () => {
    render(new SortingView(), this.#eventsContainer);
  };

  #renderPoint = (point, listOffers, listDestinations) => {
    const pointComponent = new PointView(point, listOffers, listDestinations);
    const editPointComponent = new EditPointView(point, listOffers, listDestinations);

    const replaceItemToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const replaceFormToItem = () => {
      replace(pointComponent, editPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceItemToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setSaveClickHandler(() => {
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setCancelClickHandler(() => {
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listPointsComponent.element);
  };

  #renderPoints = () => {
    this.#listPoints.forEach((point) => {
      this.#renderPoint(point, this.#listOffers, this.#listDestinations);
    });
  };

  #renderNoPoints = () => {
    render(new NoPointsView(), this.#eventsContainer);
  };

  #renderListPoints = () => {
    render(this.#listPointsComponent, this.#eventsContainer);
    this.#renderPoints();
  };

  #renderBoard = () => {
    if (this.#listPoints.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderListPoints();
  };

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderBoard();
  };
}

