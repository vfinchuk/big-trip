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

  return points.map((point, index, array) => {
    const pointTimeStamp = Date.parse(moment(point.time.start).format(`YYYY-MM-DD`));
    const nextPointTimeStamp = index === (array.length - 1)
      ? pointTimeStamp
      : Date.parse(moment(array[index + 1].time.start).format(`YYYY-MM-DD`));

    if (pointTimeStamp !== nextPointTimeStamp) {
      dayCount++;
      return createTripDayMarkup(dayCount, moment(point.time.start).format(`YYYY-MM-DD`));
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
