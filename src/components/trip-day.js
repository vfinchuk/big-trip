import {moment, createElement} from '../utils';
import {MonthNames} from '../const';

const createTripDayTemplate = (point, dayCount) => {

  const date = moment(point.dateStart).format(`YYYY-MM-DD`);

  const day = new Date(date).getDate();
  const monthNumber = new Date(date).getMonth();
  const month = MonthNames[monthNumber].slice(0, 3);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${date}">${month} ${day}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};


export default class TripDay {
  constructor(point, dayCount) {
    this._dayCount = dayCount;
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._point, this._dayCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
