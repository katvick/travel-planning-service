import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic dfghnYG6438';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';

const newPointButtonElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);
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

filterPresenter.init();
pagePresenter.init();

Promise.all([offersModel.init(), destinationsModel.init()])
  .then(() => pointsModel.init())
  .then(() => {
    render(newPointButtonComponent, newPointButtonElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });

