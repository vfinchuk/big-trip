import {formatDate, getTripTotalAmount} from './utils';
import {createTripInfoTemplate} from './components/trip-info';
import {createSiteMenuTemplate} from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createTripPointEditFormTemplate} from './components/trip-point-edit-form';
import {createTripDayBoardTemplate} from './components/trip-day-board';
import {createTripDayItemTemplate} from './components/trip-day-item';
import {createTripEventTemplate} from './components/trip-event';


import {FilterNames, MenuNames} from './const';
import {generateTripEvents} from './mock/trip-event';

import {render, RenderPosition} from './utils';

const TRIP_EVENT_COUNT = 20;


/* header elements */
const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripMainMenuTitle = headerElement.querySelectorAll(`h2`)[0];

/* render header elements */
render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(tripMainMenuTitle, createSiteMenuTemplate(MenuNames), `afterend`);
render(tripControlsElement, createFilterTemplate(FilterNames), `beforeend`);


const tripPointsElement = document.querySelector(`.trip-events`);

const tripPoints = generateTripEvents(TRIP_EVENT_COUNT);

tripPoints.sort((prev, it) => {
  const prevItemDate = new Date(prev.time.start);
  const itemDate = new Date(it.time.start);

  return prevItemDate - itemDate;
});

const totalAmountElement = headerElement.querySelector(`.trip-info__cost-value`);
totalAmountElement.textContent = getTripTotalAmount(tripPoints);

render(tripPointsElement, createSortTemplate(), `beforeend`);
render(tripPointsElement, createTripPointEditFormTemplate(tripPoints[0]), `beforeend`);
render(tripPointsElement, createTripDayBoardTemplate(), `beforeend`);


const tripDayBoard = tripPointsElement.querySelector(`.trip-days`);

render(tripDayBoard, createTripDayItemTemplate(tripPoints), `beforeend`);
const tripDayItem = tripPointsElement.querySelectorAll(`.trip-days__item`);


tripPoints.forEach((point) => {
  tripDayItem.forEach((dayItem) => {
    const tripEventBoard = dayItem.querySelector(`.trip-events__list`);

    const eventDate = formatDate(point.time.start);
    const dayItemDate = dayItem.querySelector(`.day__date`).getAttribute(`datetime`);

    if (Date.parse(eventDate) === Date.parse(dayItemDate)) {
      render(tripEventBoard, createTripEventTemplate(point), `beforeend`);
    }
  });
});
