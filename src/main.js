import PagePresenter from './presenter/page-presenter.js';


const filtersElement = document.querySelector(".trip-controls__filters"); //
const EventsElement = document.querySelector(".trip-events");
// const pointContainer = tripEventsContainer.querySelector('.trip-events__list');
// const editContainer = pointContainer.querySelector('.trip-events__item');
const pagePresenter = new PagePresenter();

pagePresenter.init(filtersElement, EventsElement);

