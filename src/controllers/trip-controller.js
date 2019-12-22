import moment from 'moment';
import {render, RenderPosition} from '../utils/render';
import {groupTripPointsByDay} from '../mock/trip-point';

import SortComponent, {SortType} from '../components/sort';
import BoardComponent from '../components/board';
import TripDayComponent from '../components/trip-day';
import NoPointsComponent from '../components/no-points';

import PointController from './point-controller';

/**
 * Rendering trip points
 * @param {Object} boardComponent
 * @param {function} tripDayComponent
 * @param {Array} points
 * @param {callback} onDataChange
 * @param {callback}onVIewChange
 */
function renderTripPoints(boardComponent, tripDayComponent, points, onDataChange, onVIewChange) {

  const boardElement = boardComponent.getElement();
  render(boardElement, tripDayComponent(), RenderPosition.BEFOREEND);

  const tripEventsListElement = boardElement.querySelector(`.trip-events__list`);
  return points.map((point) => {
    const pointController = new PointController(tripEventsListElement, onDataChange, onVIewChange);
    pointController.render(point);
    return pointController;
  });
}

/**
 * Rendering trip points by day
 * @param {Object} boardComponent
 * @param {function} tripDayComponent
 * @param {Array} pointsByDay
 * @param {callback} onDataChange
 * @param {callback}onVIewChange
 */
function renderTripPointsByDay(boardComponent, tripDayComponent, pointsByDay, onDataChange, onVIewChange) {
  let pointControllersArray = [];

  [...pointsByDay].map((day, index) => {

    render(boardComponent.getElement(), tripDayComponent(day[1].date, day[1].counter), RenderPosition.BEFOREEND);

    const tripEventsListElement = boardComponent.getElement()
      .querySelectorAll(`.trip-days__item`)[index]
      .querySelector(`.trip-events__list`);

    day[1].points.map((point) => {
      const pointController = new PointController(tripEventsListElement, onDataChange, onVIewChange);
      pointController.render(point);

      pointControllersArray.push(pointController);
    });
  });

  return pointControllersArray;
}


export default class TripController {
  constructor(container) {

    this._container = container;

    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
    this._noPointsComponent = new NoPointsComponent();

    this._showedPointControllers = [];

    // this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    // this._onSortTypeChange = this._onSortTypeChange.bind(this);


  }


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


      const pointsByDay = groupTripPointsByDay(points);

      const newPointsByDay = renderTripPointsByDay(
          this._boardComponent,
          this._createTripDay,
          pointsByDay,
          this._onDataChange,
          this._onViewChange
      );

      this._showedPointControllers = this._showedPointControllers.concat(newPointsByDay);

    }
  }


  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  /**
   * Sorting event listener
   */
  // _setSortTypeChangeHandler(sortType) {
  //   let sortedPoints = [];
  //   switch (sortType) {
  //     case SortType.TIME:
  //       sortedPoints = points.slice().sort((a, b) => {
  //         const durationA = moment.duration(
  //           moment(a.dateEnd).diff(moment(a.dateStart))
  //         );
  //         const durationB = moment.duration(
  //           moment(b.dateEnd).diff(moment(b.dateStart))
  //         );
  //
  //         return durationB - durationA;
  //       });
  //       break;
  //     case SortType.PRICE:
  //       sortedPoints = points.slice().sort((a, b) => b.price - a.price);
  //       break;
  //     case SortType.DEFAULT:
  //       sortedPoints = groupTripPointsByDay(points);
  //       break;
  //   }
  //
  //   this._boardComponent.getElement().innerHTML = ``;
  //
  //   if (sortType === SortType.DEFAULT) {
  //     renderTripPointsByDays(this._boardComponent, this._createTripDay, sortedPoints);
  //   } else {
  //     renderTripPoints(this._boardComponent, this._createTripDay(null, null), sortedPoints);
  //   }
  // };
}
