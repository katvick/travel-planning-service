import PagePresenter from './presenter/page-presenter.js';


const filtersElement = document.querySelector('.trip-controls__filters'); //
const EventsElement = document.querySelector('.trip-events');
const pagePresenter = new PagePresenter();

pagePresenter.init(filtersElement, EventsElement);

