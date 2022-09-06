import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import { updatePoint } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointDay, sortPointPrice } from '../utils/point.js';

export default class MainPresenter {
  #listPointsComponent = new ListPointsView();
  #sortComponent = new SortingView();
  #eventsContainer = null;
  #pointsModel = null;
  #listDestinations = null;
  #listOffers = null;

  #listPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPagePoints = [];

  constructor(eventsContainer, pointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#sourcedPagePoints = [...this.#pointsModel.points];

    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderPage();
  };

  #hundleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #hundlePointChange = (updatedPoint) => {
    this.#listPoints = updatePoint(this.#listPoints, updatedPoint);
    this.#sourcedPagePoints = updatePoint(this.#sourcedPagePoints, updatePoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#listOffers, this.#listDestinations);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#listPoints.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPointPrice);
        break;
      default:
        this.#listPoints = [...this.#sourcedPagePoints];
    }

    this.#currentSortType = sortType;
  };

  #hundleSortTypeChange = (sortType) => {
    // Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    // Очищаем список
    // Рендерим список заново
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

