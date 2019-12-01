import {formatDate} from './utils';
import {createTripInfoTemplate} from './components/trip-info';
import {createMainMenuTemplate} from './components/main-menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createAddTripFormTemplate} from './components/add-trip-form';
import {createTripDayBoardTemplate} from './components/trip-day-board';
import {createTripDayItemTemplate} from './components/trip-day-item';
import {createTripEventTemplate} from './components/trip-event';


import {FilterNames, MenuNames} from './const';

import {generateTripEvents} from './mock/trip-event';

const TRIP_EVENT_COUNT = 20;

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
render(tripMainMenuTitle, createMainMenuTemplate(MenuNames), `afterend`);
render(tripControlsElement, createFilterTemplate(FilterNames), `beforeend`);


/* render sort-form, add-form, tripDayBoard elements */
const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createAddTripFormTemplate(), `beforeend`);
render(tripEventsElement, createTripDayBoardTemplate(), `beforeend`);


const tripEvents = generateTripEvents(TRIP_EVENT_COUNT);
const tripDayBoard = tripEventsElement.querySelector(`.trip-days`);

tripEvents.sort((prev, it) => {
  const prevItem = new Date(prev.time.start);
  const item = new Date(it.time.start);

  return prevItem - item;
});


/* render tripDayItem element */

render(tripDayBoard, createTripDayItemTemplate(tripEvents), `beforeend`);
const tripDayItem = tripEventsElement.querySelectorAll(`.trip-days__item`);


tripEvents.forEach((event) => {

  tripDayItem.forEach((dayItem) => {
    const tripEventBoard = dayItem.querySelector(`.trip-events__list`);

    const eventDate = formatDate(event.time.start);
    const dayItemDate = dayItem.querySelector(`.day__date`).getAttribute(`datetime`);

    if (Date.parse(eventDate) === Date.parse(dayItemDate)) {
      render(tripEventBoard, createTripEventTemplate(event), `beforeend`);
    }
  });

});
