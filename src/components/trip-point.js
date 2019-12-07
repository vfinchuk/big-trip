import {createElement, moment} from '../utils';
import {getEventPlaceholder} from '../mock/trip-event';

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
    .join(`\n`);
};

const getDurationTimeFormat = (dateStart, dateEnd) => {
  const durationTime = moment.duration(
      moment(dateEnd).diff(moment(dateStart))
  );

  const hours = durationTime.hours();
  const minutes = durationTime.minutes();
  const minutesFormant = minutes >= 10 ? minutes : `0${minutes}`;

  if (hours === 0) {
    return `${minutesFormant}M`;
  } else if (minutes === 0) {
    return `${hours}H`;
  } else {
    return `${hours}H ${minutesFormant}M`;
  }

};

const createTripPointTemplate = (point) => {

  const {type, location, price, dateStart, dateEnd, offers} = point;

  const startTime = moment(dateStart).format(`HH:mm`);
  const endTime = moment(dateEnd).format(`HH:mm`);

  const startDate = moment(dateStart).format(`YYYY-MM-DD`);
  const endDate = moment(dateEnd).format(`YYYY-MM-DD`);

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
          ${generateOffersMarkup(offers)}
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
