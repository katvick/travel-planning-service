import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class PagePresenter {
  #listComponent = new ListPointsView();
  #filtersContainer = null;
  #eventsContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listDestinations = null;
  #listOffers = null;

  init = (filtersContainer, eventsContainer, pointsModel) => {
    this.#filtersContainer = filtersContainer;
    this.#eventsContainer = eventsContainer;

    this.#pointsModel = pointsModel;
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    render(new FiltersView(), this.#filtersContainer);
    render(new SortingView(), this.#eventsContainer);
    render(this.#listComponent, this.#eventsContainer);
    render(new EditPointView(this.#listPoints[0], this.#listDestinations, this.#listOffers),this.#listComponent.getElement());

    this.#listPoints.forEach((point) => {
      render(new PointView(point, this.#listOffers, this.#listDestinations), this.#listComponent.getElement());
    });

  };
}
