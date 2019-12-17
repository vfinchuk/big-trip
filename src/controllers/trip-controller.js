import moment from 'moment';
import {render, RenderPosition, replace} from '../utils/render';
import {groupTripPointsByDay} from '../mock/trip-point';

import TripPointEditComponent from '../components/trip-point-edit';
import TripPointComponent from '../components/trip-point';

import SortComponent, {SortType} from '../components/sort';
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

/**
 *
 * @param {Object} board
 * @param {Object} dayElement
 * @param {Array} points
 */
function renderTripPoints(board, dayElement, points) {
  render(board.getElement(), dayElement, RenderPosition.BEFOREEND);

  const tripDayItemPointList = board.getElement().querySelector(`.trip-events__list`);

  points.map((point) => {
    renderTripPoint(tripDayItemPointList, point);
  });
}

/**
 *
 * @param {Object} board
 * @param {HTMLElement} dayElement
 * @param {Array} pointsByDay
 */
function renderTripPointsByDays(board, dayElement, pointsByDay) {
  [...pointsByDay].map((day, index) => {

    render(board.getElement(), dayElement(day[1].date, day[1].counter), RenderPosition.BEFOREEND);

    const tripDayItemPointList = board.getElement()
      .querySelectorAll(`.trip-days__item`)[index]
      .querySelector(`.trip-events__list`);

    day[1].points.map((point) => {
      renderTripPoint(tripDayItemPointList, point);
    });
  });
}

export default class TripController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
    this._noPointsComponent = new NoPointsComponent();
  }

  /**
   * Return TripDayComponent
   * @param {Object|null} date
   * @param {int|null} counter
   * @return {TripDay}
   * @private
   */
  _createTripDay(date, counter) {
    return new TripDayComponent(date, counter);
  }

  /**
   * Render trip board
   * @param {Array} points
   */
  render(points) {

    if (points.length < 0) {
      /**
       * Rendering no trip points massage
       */
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {

      /**
       * Rendering sort and tripBoard elements
       */
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._boardComponent, RenderPosition.BEFOREEND);

      /**
       * Render trip points
       */
      const pointsByDay = groupTripPointsByDay(points);
      renderTripPointsByDays(this._boardComponent, this._createTripDay, pointsByDay);

      /**
       * Sorting event listener
       */
      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedPoints = [];
        switch (sortType) {
          case SortType.TIME:
            sortedPoints = points.slice().sort((a, b) => {
              const durationA = moment.duration(
                  moment(a.dateEnd).diff(moment(a.dateStart))
              );
              const durationB = moment.duration(
                  moment(b.dateEnd).diff(moment(b.dateStart))
              );

              return durationB - durationA;
            });
            break;
          case SortType.PRICE:
            sortedPoints = points.slice().sort((a, b) => b.price - a.price);
            break;
          case SortType.DEFAULT:
            sortedPoints = groupTripPointsByDay(points);
            break;
        }

        this._boardComponent.getElement().innerHTML = ``;

        if (sortType === SortType.DEFAULT) {
          renderTripPointsByDays(this._boardComponent, this._createTripDay, sortedPoints);
        } else {
          renderTripPoints(this._boardComponent, this._createTripDay(null, null), sortedPoints);
        }
      });
    }
  }
}
