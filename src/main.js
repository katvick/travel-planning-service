import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/points-model.js';


const filtersElement = document.querySelector('.trip-controls__filters'); //
const eventsElement = document.querySelector('.trip-events');
const pagePresenter = new PagePresenter();
const pointsModel = new PointsModel;

pagePresenter.init(filtersElement, eventsElement, pointsModel);

