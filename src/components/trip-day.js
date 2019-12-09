import AbstractComponent from './abstract-component';
import {moment} from '../utils/common';
import {MonthNamesEnum} from '../const';

/**
 *
 * @param {int} date - timestamp
 * @param {int} dayCount - ordinal day number
 * @return {string}
 */
const createTripDayTemplate = (date, dayCount) => {

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
};


export default class TripDay extends AbstractComponent {
  constructor(date, dayCount) {
    super();

    this._dayCount = dayCount;
    this._date = date;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._dayCount);
  }

}
