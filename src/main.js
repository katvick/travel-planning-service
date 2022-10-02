import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic kjsdHd434bLXShn0';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';

const newPointButtonElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new PointsApiService(END_POINT, AUTHORIZATION));
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
offersModel.init();
destinationsModel.init();
pointsModel.init();

