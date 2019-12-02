import {FilterNames, MenuNames} from './const';
import {formatDate, getTripTotalAmount, render, RenderPosition} from './utils';
import {generateTripEvents} from './mock/trip-event';

import SiteMenuComponent from './components/site-menu';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import TripPointEditFormComponent from './components/trip-point-edit-form';
import BoardComponent from './components/board';
import TripDayComponent from './components/trip-day';
import TripPointComponent from './components/trip-point';

const TRIP_EVENT_COUNT = 10;

const renderTripPoint = (point, dayItemElement) => {
  const tripPoint = new TripPointComponent(point);
  const editTripPoint = new TripPointEditFormComponent(point);

  const editButton = tripPoint.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    dayItemElement.replaceChild(editTripPoint.getElement(), tripPoint.getElement());
  });

  const editForm = editTripPoint.getElement();
  editForm.addEventListener(`submit`, () => {
    dayItemElement.replaceChild(tripPoint.getElement(), editTripPoint.getElement());
  });

  render(dayItemElement, tripPoint.getElement(), RenderPosition.BEFOREEND);
};

/* header elements */
const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripMainMenuTitle = headerElement.querySelectorAll(`h2`)[0];

/* render header elements */
render(tripInfoElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(tripMainMenuTitle, new SiteMenuComponent(MenuNames).getElement(), RenderPosition.AFTEREND);
render(tripControlsElement, new FilterComponent(FilterNames).getElement(), RenderPosition.BEFOREEND);

const tripPoints = generateTripEvents(TRIP_EVENT_COUNT);

tripPoints.sort((prev, it) => {
  const prevItemDate = new Date(prev.time.start);
  const itemDate = new Date(it.time.start);

  return prevItemDate - itemDate;
});

const totalAmountElement = headerElement.querySelector(`.trip-info__cost-value`);
totalAmountElement.textContent = getTripTotalAmount(tripPoints);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);


const boardComponent = new BoardComponent();
render(tripEventsElement, boardComponent.getElement(), RenderPosition.BEFOREEND);


render(boardComponent.getElement(), new TripDayComponent(tripPoints).getElement(), RenderPosition.BEFOREEND);

const tripDayItem = boardComponent.getElement().querySelectorAll(`.trip-days__item`);


tripPoints.forEach((point) => {
  tripDayItem.forEach((dayItem) => {

    const tripEventBoard = dayItem.querySelector(`.trip-events__list`);

    const eventDate = formatDate(point.time.start);
    const dayItemDate = dayItem.querySelector(`.day__date`).getAttribute(`datetime`);

    if (Date.parse(eventDate) === Date.parse(dayItemDate)) {

      renderTripPoint(point, tripEventBoard);
    }
  });
});
