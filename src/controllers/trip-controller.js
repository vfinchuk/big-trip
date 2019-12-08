import {render, RenderPosition, replace} from '../utils/render';
import {groupTripPointsByDay} from '../mock/trip-event';

import TripPointEditComponent from '../components/trip-point-edit';
import TripPointComponent from '../components/trip-point';

import SortComponent from '../components/sort';
import BoardComponent from '../components/board';
import TripDayComponent from '../components/trip-day';
import NoPointsComponent from '../components/no-points';

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


export default class TripController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
    this._noPointsComponent = new NoPointsComponent();
  }

  _createTripDay(date, counter) {
    return new TripDayComponent(date, counter);
  }

  render(points) {

    if (points.length < 0) {
      /* Rendering no trip points massage */
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {

      /* Rendering sort and tripBoard elements */
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._boardComponent, RenderPosition.BEFOREEND);

      /* Rendering trip day elements */
      const tripPointsByDay = groupTripPointsByDay(points);

      [...tripPointsByDay].map((day, index) => {

        render(this._boardComponent.getElement(), this._createTripDay(day[1].date, day[1].counter), RenderPosition.BEFOREEND);

        const tripDayItemPointList = this._boardComponent.getElement()
          .querySelectorAll(`.trip-days__item`)[index]
          .querySelector(`.trip-events__list`);

        day[1].points.map((point) => {
          renderTripPoint(tripDayItemPointList, point);
        });
      });

    }

  }

}
