import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/points-model.js';


const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const pagePresenter = new PagePresenter(filtersElement, eventsElement, pointsModel);

// console.log(pointsModel);

pagePresenter.init();

