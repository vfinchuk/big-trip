import {createElement} from '../utils';
import {moment, MonthNames} from '../const';

const createTripDayMarkup = (dayCount, date) => {

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

export const createTripDayTemplate = (points) => {

  let dayCount = 0;

  return points.map((it, i, array) => {

    const itemTimeStamp = Date.parse(moment(it.time.start).format(`YYYY-MM-DD`));
    let nextItemTimeStamp;

    if (i === (array.length - 1)) {
      nextItemTimeStamp = 0;
    } else {
      nextItemTimeStamp = Date.parse(moment(array[i + 1].time.start).format(`YYYY-MM-DD`));
    }

    if (itemTimeStamp !== nextItemTimeStamp) {
      dayCount++;
      return createTripDayMarkup(dayCount, moment(it.time.start).format(`YYYY-MM-DD`));
    }

    return ``;
  })
    .join(`\n`);

};


export default class TripDay {
  constructor(points) {
    this._points = points;

    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), true);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
