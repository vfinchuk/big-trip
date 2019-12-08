/* Import utils and constants */
import {RenderPosition, render, replace} from './utils/render';
import {getTotalAmount} from './utils/common';
import {getTripPoints, groupTripPointsByDay} from './mock/trip-event';

/* Import app components */
import SiteMenuComponent from './components/site-menu';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import TripPointEditComponent from './components/trip-point-edit';
import BoardComponent from './components/board';
import TripDayComponent from './components/trip-day';
import TripPointComponent from './components/trip-point';
import NoPointsComponent from './components/no-points';

const TRIP_POINT_COUNT = 20;

/**
 * Rendering trip point element
 * @param {HTMLElement} dayItemElement
 * @param {object} point
 */
const renderTripPoint = (dayItemElement, point) => {

  const onEscapeKeyDown = (evt) => {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscapeKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    }
  };

  const replaceEditToPoint = () => {
    replace(tripPoint, editTripPoint);
  };

  const replacePointToEdit = () => {
    replace(editTripPoint, tripPoint);
  };

  const tripPoint = new TripPointComponent(point);
  const editTripPoint = new TripPointEditComponent(point);

  tripPoint.setEditButtonClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscapeKeyDown);
  });

  editTripPoint.setSubmitHandler(replaceEditToPoint);

  render(dayItemElement, tripPoint, RenderPosition.BEFOREEND);
};

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
if (tripPoints.length > 0) {
  const boardComponent = new BoardComponent();

  /* Rendering sort and tripBoard elements */
  render(tripEventsElement, new SortComponent(), RenderPosition.BEFOREEND);
  render(tripEventsElement, boardComponent, RenderPosition.BEFOREEND);

  /* Rendering trip day elements */
  const tripPointsByDay = groupTripPointsByDay(tripPoints);

  [...tripPointsByDay].map((day, index) => {
    render(boardComponent.getElement(), new TripDayComponent(day[1].date, day[1].counter), RenderPosition.BEFOREEND);

    const tripDayItemPointList = boardComponent.getElement()
      .querySelectorAll(`.trip-days__item`)[index]
      .querySelector(`.trip-events__list`);

    day[1].points.map((point) => {
      renderTripPoint(tripDayItemPointList, point);
    });
  });

} else {

  /* Rendering no trip points massage */
  render(tripEventsElement, new NoPointsComponent(), RenderPosition.BEFOREEND);
}
