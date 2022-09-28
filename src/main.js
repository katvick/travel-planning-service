import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FiltersView from './view/filters-view.js';
import { render } from './framework/render.js';

// import { generateFilter } from './mock/filter.js';
import { generatePoint } from './mock/point.js';
import { offers } from './mock/offers.js';
import { destinations } from './mock/destinations.js';

const filters = [
  {
    type: 'everything',
    name: 'EVERYTHING',
  }
];

const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const points = Array.from({ length: 10 }, generatePoint);

const pointsModel = new PointsModel(points);
const offersModel = new OffersModel(offers);
const destinationsModel = new DestinationsModel(destinations);
const filterModel = new FilterModel();
const pagePresenter = new MainPresenter(eventsElement, pointsModel, offersModel, destinationsModel);

// const filters = generateFilter(pointsModel.points);
render(new FiltersView(filters, 'everything'), filtersElement);

pagePresenter.init();

