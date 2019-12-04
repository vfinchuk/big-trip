import {moment, FilterNames, MenuNames} from './const';
import {getTripTotalAmount, render, RenderPosition} from './utils';
import {generateTripEvents} from './mock/trip-event';

import SiteMenuComponent from './components/site-menu';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import TripPointEditComponent from './components/trip-point-edit';
import BoardComponent from './components/board';
import TripDayComponent from './components/trip-day';
import TripPointComponent from './components/trip-point';
import NoPointsComponent from './components/no-points';

const TRIP_EVENT_COUNT = 10;

const renderTripPoint = (dayItemElement, point) => {

  const onEscapeKeyDown = (evt) => {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscapeKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    }
  };

  const replaceEditToPoint = () => {
    dayItemElement.replaceChild(tripPoint.getElement(), editTripPoint.getElement());
  };

  const replacePointToEdit = () => {

    dayItemElement.replaceChild(editTripPoint.getElement(), tripPoint.getElement());
  };

  const tripPoint = new TripPointComponent(point);
  const editTripPoint = new TripPointEditComponent(point);

  const editButton = tripPoint.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscapeKeyDown);
  });

  const editForm = editTripPoint.getElement();
  editForm.addEventListener(`submit`, () => replaceEditToPoint);

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

if (tripPoints.length > 0) {
  render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

  const boardComponent = new BoardComponent();
  render(tripEventsElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

  render(boardComponent.getElement(), new TripDayComponent(tripPoints).getElement(), RenderPosition.BEFOREEND);

  const tripDays = boardComponent.getElement().querySelectorAll(`.trip-days__item`);

  tripDays.forEach((day) => {
    const tripPointList = day.querySelector(`.trip-events__list`);
    const dayDate = day.querySelector(`.day__date`).getAttribute(`datetime`);

    tripPoints.filter((point) => {
      const pointDate = moment(point.time.start).format(`YYYY-MM-DD`);
      if (pointDate === dayDate) {
        renderTripPoint(tripPointList, point);
      }
    });
  });
} else {
  render(tripEventsElement, new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
}


