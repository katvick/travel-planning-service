import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import { SortType } from '../const.js';
import { sortPointDay, sortPointPrice } from '../utils/point.js';

export default class MainPresenter {
  #listPointsComponent = new ListPointsView();
  #sortComponent = new SortingView();
  #eventsContainer = null;
  #pointsModel = null;
  #listOffers = null;
  #listDestinations = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(eventsContainer, pointsModel, offersModel, destinationsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#listOffers = offersModel;
    this.#listDestinations = destinationsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return this.#pointsModel.sort(sortPointDay);
      case SortType.PRICE:
        return this.#pointsModel.sort(sortPointPrice);
    }

    return this.#pointsModel;
  }

  get offers() {
    return this.#listOffers;
  }

  get destinations() {
    return this.#listDestinations;
  }

  init = () => {
    this.#renderPage();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    // здесь будем вызывать обновление модели
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.offers, this.destinations);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearListPoints();
    this.#renderListPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listPointsComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.offers, this.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => {
      this.#renderPoint(point, this.offers, this.destinations);
    });
  };

  #renderNoPoints = () => {
    render(new NoPointsView(), this.#eventsContainer);
  };

  #renderListPoints = () => {
    const points = this.points;

    render(this.#listPointsComponent, this.#eventsContainer);
    this.#renderPoints(points);
  };

  #clearListPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPage = () => {
    if (this.points.every((point) => point === null)) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderListPoints();
  };

}

