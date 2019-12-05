import {moment} from '../const';
import {createElement, convertMinutesToHours} from '../utils';

const generateAdditionalServicesMarkup = (options) => {
  return Array.from(options)
    .map((option) => {
      const {type, name, price} = option;

      return (
        `<li class="event__offer">
          <span class="event__offer-title">${type} ${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`
      );
    })
    .join(`\n`);
};


const createTripPointTemplate = (point) => {

  const {type, city, price, time, extraServices} = point;

  const {start, end, duration} = time;

  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);

  const startDate = moment(start).format(`YYYY-MM-DD`);
  const endDate = moment(end).format(`YYYY-MM-DD`);

  const durationTime = convertMinutesToHours(duration);

  const services = generateAdditionalServicesMarkup(extraServices);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${services}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class TripPoint {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
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
