import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import ListPointsView from '../view/list-points-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class PagePresenter {
  listComponent = new ListPointsView();

  init = (filtersContainer, eventsContainer, pointsModel) => {
    this.filtersContainer = filtersContainer;
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.listPoints = [...this.pointsModel.getPoints()];

    render(new FiltersView(), filtersContainer);
    render(new SortingView(), eventsContainer);
    render(this.listComponent, eventsContainer);
    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(
        new PointView(this.listPoints[i]),
        this.listComponent.getElement()
      );
    }
  };
}
