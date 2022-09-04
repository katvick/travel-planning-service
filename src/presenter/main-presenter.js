import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import { updatePoint } from '../utils/common.js';

export default class MainPresenter {
  #listPointsComponent = new ListPointsView();
  #sortComponent = new SortingView();
  #eventsContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listDestinations = null;
  #listOffers = null;

  #points = [];
  #pointPresenter = new Map();

  constructor(eventsContainer, pointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderPage();
  };

  #hundleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #hundlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#listOffers, this.#listDestinations);
  };

  #hundleSortTypeChange = (sortType) => {

  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsContainer);
    this.#sortComponent.setSortTypeChangeHundler(this.#hundleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent.element, this.#hundlePointChange, this.#hundleModeChange);
    pointPresenter.init(point, this.#listOffers, this.#listDestinations);
    this.#pointPresenter.set(point.id, pointPresenter);
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

  #clearListPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPage = () => {
    if (this.#listPoints.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderListPoints();
  };

}

