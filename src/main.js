/* Import utils and constants */
import {moment, FilterNames, MenuNames} from './const';
import {getTripTotalAmount, render, RenderPosition} from './utils';
import {generateTripEvents} from './mock/trip-event';

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

const TRIP_EVENT_COUNT = 10;

/**
 * Rendering trip point element
 * @param {Node} dayItemElement
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

/* Sorting tripPoints data by start date */
const tripPoints = generateTripEvents(TRIP_EVENT_COUNT);
tripPoints.sort((prev, it) => {
  const prevItemDate = new Date(prev.time.start);
  const itemDate = new Date(it.time.start);

  return prevItemDate - itemDate;
});

/* Header elements */
const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);

/* Render header elements */
render(tripInfoElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement.children[0], new SiteMenuComponent(MenuNames).getElement(), RenderPosition.AFTEREND);
render(tripControlsElement.children[1], new FilterComponent(FilterNames).getElement(), RenderPosition.AFTEREND);

/* Show total trip sum */
const totalAmountElement = headerElement.querySelector(`.trip-info__cost-value`);
totalAmountElement.textContent = getTripTotalAmount(tripPoints);

const tripEventsElement = document.querySelector(`.trip-events`);
if (tripPoints.length > 0) {
  const boardComponent = new BoardComponent();

  /* Rendering sort and tripBoard elements */
  render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

  /* Rendering trip day elements */
  let TripDayCount = 1;
  tripPoints.forEach((point, index, array) => {
    const pointDate = moment(array[index].time.start).format(`YYYY-MM-DD`);
    const nexPointDate = index !== array.length - 1 ? moment(array[index + 1].time.start).format(`YYYY-MM-DD`) : false;

    if (nexPointDate !== pointDate) {
      render(boardComponent.getElement(), new TripDayComponent(point, TripDayCount).getElement(), RenderPosition.BEFOREEND);
      TripDayCount++;
    }
  });

  /* Rendering trip point elements */
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

  /* Rendering no trip points massage */
  render(tripEventsElement, new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
}


