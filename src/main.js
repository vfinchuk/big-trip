import {createTripInfoTemplate} from './components/trip-info';
import {createMainMenuTemplate} from './components/main-menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createAddTripFormTemplate} from './components/add-trip-form';
import {createTripDayBoardTemplate} from './components/trip-day-board';
import {createTripDayItemTemplate} from './components/trip-day-item';
import {createTripEventTemplate} from './components/trip-event';


const TRIP_EVENT_COUNT = 3;


/**
 * Rendering template
 * @param {node} container - where to render template
 * @param {string} template - rendering template
 * @param {string} place - rendering position
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


/* header elements */
const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripMainMenuTitle = headerElement.querySelectorAll(`h2`)[0];

/* render header elements */
render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(tripMainMenuTitle, createMainMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate(), `beforeend`);


/* render sort-form, add-form, tripDayBoard elements */
const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createAddTripFormTemplate(), `beforeend`);
render(tripEventsElement, createTripDayBoardTemplate(), `beforeend`);

/* render tripDayItem element */
const tripDayBoard = tripEventsElement.querySelector(`.trip-days`);
render(tripDayBoard, createTripDayItemTemplate(), `beforeend`);

/* render trip events a day */
const tripEventBoard = tripEventsElement.querySelector(`.trip-events__list`);
new Array(TRIP_EVENT_COUNT)
  .fill(``)
  .forEach(
      () => render(tripEventBoard, createTripEventTemplate(), `beforeend`)
  );
