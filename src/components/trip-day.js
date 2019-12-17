import AbstractComponent from './abstract-component';
import moment from 'moment';
import {MonthNamesEnum} from '../const';

/**
 *
 * @param {int} date - timestamp
 * @param {int} dayCount - ordinal day number
 * @return {string}
 */
const createTripDayTemplate = (date, dayCount) => {
  if (date && dayCount) {
    const dateTime = moment(date).format(`YYYY-MM-DD`);
    const day = new Date(date).getDate();
    const monthNumber = new Date(date).getMonth();
    const month = MonthNamesEnum[monthNumber].slice(0, 3);

    return (
      `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${dateTime}">${month} ${day}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
    );
  }

  return `<li class="trip-days__item  day">
            <div class="day__info">
            </div>
            <ul class="trip-events__list"></ul>
          </li>`;
};


export default class TripDay extends AbstractComponent {
  /**
   * Create TripDay
   * @param {Object} date
   * @param {int} dayCount
   */
  constructor(date, dayCount) {
    super();

    this._dayCount = dayCount;
    this._date = date;
  }

  /**
   *
   * @return {string}
   */
  getTemplate() {
    return createTripDayTemplate(this._date, this._dayCount);
  }

}
