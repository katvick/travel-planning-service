import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

import { generatePoint } from './mock/point.js';
import { offers } from './mock/offers.js';
import { destinations } from './mock/destinations.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const points = Array.from({ length: 10 }, generatePoint);

const pointsModel = new PointsModel(points);
const offersModel = new OffersModel(offers);
const destinationsModel = new DestinationsModel(destinations);
const filterModel = new FilterModel();

const pagePresenter = new MainPresenter(eventsElement, pointsModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);

filterPresenter.init();
pagePresenter.init();

