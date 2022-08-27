import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointsView from '../view/no-points-view.js';
import { render } from '../framework/render';

export default class BoardPresenter {
  #listPointsComponent = new ListPointsView();
  #filtersContainer = null;
  #eventsContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listDestinations = null;
  #listOffers = null;

  constructor(filtersContainer, eventsContainer, pointsModel) {
    this.#filtersContainer = filtersContainer;
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint = (point, listOffers, listDestinations) => {
    const pointComponent = new PointView(point, listOffers, listDestinations);
    const editPointComponent = new EditPointView(point, listOffers, listDestinations);

    const replaceItemToForm = () => {
      this.#listPointsComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToItem = () => {
      this.#listPointsComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceItemToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('reset', (evt) => {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listPointsComponent.element);
  };

  #renderBoard = () => {
    if (this.#listPoints.every((point) => point.isArchive)) {
      render(new NoPointsView(), this.#eventsContainer);
    } else {
      render(new FiltersView(), this.#filtersContainer);
      render(new SortingView(), this.#eventsContainer);
      render(this.#listPointsComponent, this.#eventsContainer);

      this.#listPoints.forEach((point) => {
        this.#renderPoint(point, this.#listOffers, this.#listDestinations);
      });
    }
  };

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listDestinations = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderBoard();
  };
}

