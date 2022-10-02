import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './tasks-api-service.js';

const AUTHORIZATION = 'Basic kjsdHd434bLXShn0';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';

import { generatePoint } from './mock/point.js';
import { offers } from './mock/offers.js';
import { destinations } from './mock/destinations.js';

const newPointButtonElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const points = Array.from({ length: 10 }, generatePoint);

const pointsModel = new PointsModel(points, new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(offers);
const destinationsModel = new DestinationsModel(destinations);
const filterModel = new FilterModel();

const pagePresenter = new MainPresenter(eventsElement, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  pagePresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, newPointButtonElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
pagePresenter.init();

