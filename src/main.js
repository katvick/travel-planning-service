import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FiltersView from './view/filters-view.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pagePresenter = new MainPresenter(eventsElement, pointsModel, offersModel, destinationsModel);

const filters = generateFilter(pointsModel.points);
render(new FiltersView(filters), filtersElement);

pagePresenter.init();

