import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersView from './view/filters-view.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const pagePresenter = new BoardPresenter(eventsElement, pointsModel);
const filters = generateFilter(pointsModel.points);

render(new FiltersView(filters), filtersElement);

console.log(filters);

pagePresenter.init();

