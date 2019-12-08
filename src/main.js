/* Import utils and constants */
import {RenderPosition, render} from './utils/render';
import {getTotalAmount} from './utils/common';
import {getTripPoints} from './mock/trip-event';

import TripController from './controllers/trip-controller';
/* Import app components */
import SiteMenuComponent from './components/site-menu';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';


const TRIP_POINT_COUNT = 20;

/* Sorting tripPoints data by start date */
const tripPoints = getTripPoints(TRIP_POINT_COUNT);

/* Header elements */
const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);

/* Render header elements */
render(tripInfoElement, new TripInfoComponent(), RenderPosition.AFTERBEGIN);
render(tripControlsElement.children[0], new SiteMenuComponent(), RenderPosition.AFTEREND);
render(tripControlsElement.children[1], new FilterComponent(), RenderPosition.AFTEREND);

/* Show total trip sum */
const totalAmountElement = headerElement.querySelector(`.trip-info__cost-value`);
totalAmountElement.textContent = getTotalAmount(tripPoints);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement);

tripController.render(tripPoints);
