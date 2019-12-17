import AbstractComponent from './abstract-component';
import moment from 'moment';
import {getEventPlaceholder} from '../mock/trip-point';

/**
 *
 * @param {array} offers
 * @return {string}
 */
const generateOffersMarkup = (offers) => {
  return Array.from(offers)
    .filter((offer) => offer[1].isChecked === true)
    .map((offer) => {
      const {title, price} = offer[1];
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`
      );
    })
    .slice(0, 3)
    .join(`\n`);
};

/**
 * Return duration time in format: 4H 30M
 * @param {int} dateStart timestamp
 * @param {int} dateEnd timestamp
 * @return {string}
 */
const getDurationTimeFormat = (dateStart, dateEnd) => {
  const durationTime = moment.duration(
      moment(dateEnd).diff(moment(dateStart))
  );

  const days = durationTime.days();
  const hours = durationTime.hours();
  const minutes = durationTime.minutes();

  const daysFormat = days >= 10 ? days : `0${days}`;
  const minutesFormant = minutes >= 10 ? minutes : `0${minutes}`;

  if (minutes === 0) {
    return `${hours}H`;
  } else if (hours === 0) {
    return `${minutesFormant}M`;
  } else if (days === 0) {
    return `${hours}H ${minutesFormant}M`;
  } else {
    return `${daysFormat}D ${hours}H ${minutesFormant}M`;
  }

};

/**
 *
 * @param {object} point
 * @return {string}
 */
const createTripPointTemplate = (point) => {
  const timeFormat = `HH:mm`;
  const dateFormat = `YYYY-MM-DD`;
  const {type, location, price, dateStart, dateEnd, offers} = point;

  const startTime = moment(dateStart).format(timeFormat);
  const endTime = moment(dateEnd).format(timeFormat);

  const startDate = moment(dateStart).format(dateFormat);
  const endDate = moment(dateEnd).format(dateFormat);

  const offersList = generateOffersMarkup(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.code}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.code} ${getEventPlaceholder(type)} ${location.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
          </p>
          <p class="event__duration">${getDurationTimeFormat(dateStart, dateEnd)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class TripPoint extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

}
