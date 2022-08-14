import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import editFormView from '../view/edit-form-view';
import { render } from '../render.js';

export default class PagePresenter {
  listComponent = new ListView();

  init = (filtersContainer, eventsContainer) => {
    this.filtersContainer = filtersContainer;
    this.eventsContainer = eventsContainer;

    render(new FiltersView(), filtersContainer);
    render(new SortingView(), eventsContainer);
    render(this.listComponent, eventsContainer);
    render(new editFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  };
}
