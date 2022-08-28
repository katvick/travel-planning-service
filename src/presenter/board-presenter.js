import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointsView from '../view/no-points-view.js';
import { render, replace } from '../framework/render';

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
