import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';

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

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderBoard();
  };

  #renderSort = () => {
    render(new SortingView(), this.#eventsContainer);
  };

  #renderPoint = (point, listOffers, listDestinations) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent.element);
    pointPresenter.init(point, listOffers, listDestinations);
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

}

