import {render, RenderPosition} from '../utils/render';
import {groupTripPointsByDay} from '../mock/trip-point';

import SortComponent, {SortType} from '../components/sort';
import BoardComponent from '../components/board';
import TripDayComponent from '../components/trip-day';
import NoPointsComponent from '../components/no-points';

import PointController from './point-controller';


export default class TripController {
  /**
   * Trip controller
   * @param {HTMLElement} container
   */
  constructor(container) {

    this._container = container;

    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
    this._noPointsComponent = new NoPointsComponent();

    this._pointControllers = [];
    this._points = [];
    this._pointsByDay = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  /**
   * Render trip board
   * @param {Array} points
   */
  render(points) {
    this._points = points;
    this._pointsByDay = groupTripPointsByDay(points);

    if (points.length < 0) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {

      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._boardComponent, RenderPosition.BEFOREEND);

      this._renderTripPointsByDay(this._pointsByDay, this._onDataChange, this._onViewChange);
    }
  }

  /**
   * Rendering trip points
   * @param {Array} points
   *
   * @return {Array}
   * @private
   */
  _renderTripPoints(points) {
    const tripDay = new TripDayComponent();
    const boardElement = this._boardComponent.getElement();

    render(boardElement, tripDay, RenderPosition.BEFOREEND);

    const tripEventsListElement = boardElement.querySelector(`.trip-events__list`);
    return points.map((point) => {
      this._renderTripPoint(point, tripEventsListElement);
    });
  }

  /**
   * Render trip points by day
   * @param {Array} pointsByDay
   * @private
   */
  _renderTripPointsByDay(pointsByDay) {
    [...pointsByDay].map((day, index) => {
      const tripDay = new TripDayComponent(day[1].date, index + 1);
      render(this._boardComponent.getElement(), tripDay, RenderPosition.BEFOREEND);

      const tripEventsListElement = tripDay.getElement().querySelector(`.trip-events__list`);

      day[1].points.map((point) => {
        this._renderTripPoint(point, tripEventsListElement);
      });
    });
  }

  /**
   * Rendering trip point element
   * @param {Object} point
   * @param {HTMLElement} container
   *
   * @private
   */
  _renderTripPoint(point, container) {
    const pointController = new PointController(container, this._onDataChange, this._onViewChange);

    this._pointControllers.push(pointController);
    pointController.render(point);
  }

  /**
   *
   * @param {Object} pointController
   * @param {Object} oldData
   * @param {Object} newData
   *
   * @private
   */
  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  /**
   * Callback before point will change
   *
   * @private
   */
  _onViewChange() {
    if (this._pointControllers) {
      this._pointControllers.forEach((pointController) => {
        pointController.setDefaultView();
      });
    }
  }

  /**
   * Sorting trip events
   * @param {string} sortType
   *
   * @private
   */
  _onSortTypeChange(sortType) {

    let sortedPoints = [];
    switch (sortType) {
      case SortType.TIME:
        sortedPoints = this._points.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
        break;
      case SortType.PRICE:
        sortedPoints = this._points.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        sortedPoints = groupTripPointsByDay(this._points);
        break;
    }

    this._boardComponent.getElement().innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      this._renderTripPointsByDay(this._pointsByDay);
    } else {
      this._renderTripPoints(sortedPoints);
    }
  }
}
