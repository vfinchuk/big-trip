/* Import utils and constants */
import {RenderPosition, render} from './utils/render';
import {getTripPoints} from './mock/trip-point';
import {getFilters} from './mock/filters';

import TripController from './controllers/trip-controller';
/* Import app components */
import SiteMenuComponent from './components/site-menu';
import TripInfoComponent from './components/trip-info';
import TripTotalComponent from './components/trip-total';
import FilterComponent from './components/filter';


const TRIP_POINT_COUNT = 20;

/* Sorting tripPoints data by start date */
const tripPoints = getTripPoints(TRIP_POINT_COUNT);

/* Header elements */
const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);

/* Render header elements */
render(tripInfoElement, new TripTotalComponent(tripPoints), RenderPosition.AFTERBEGIN);
render(tripInfoElement, new TripInfoComponent(tripPoints), RenderPosition.AFTERBEGIN);
render(tripControlsElement.children[0], new SiteMenuComponent(), RenderPosition.AFTEREND);
render(tripControlsElement.children[1], new FilterComponent(getFilters()), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement);

tripController.render(tripPoints);
