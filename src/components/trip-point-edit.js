import {moment, EventTypes, Cities, Services} from '../const';
import {createElement} from '../utils';

const createEventTypeMarkup = (types, currentType) => {
  return types.map((type, index) => {

    return (
      `<div class="event__type-item">
        <input 
        id="event-type-${type}-${index}" 
        class="event__type-input  visually-hidden" 
        type="radio" name="event-type" 
        value="${type}"
        ${currentType === type ? `checked` : ``}
        />
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${type}</label>
       </div>`
    );
  })
    .join(`\n`);
};

const createDestinationMarkup = (cities, currentCity) => {
  return cities.map((city) => {
    return (
      `<option 
        value="${city}"
        ${currentCity === city ? `checked` : ``}
        ></option>`
    );
  })
    .join(`\n`);
};

const createAdditionalServicesMarkup = (services, currentServices) => {
  return services.map((service, index) => {
    const {type, name, price} = service;

    let isCurrent = false;
    Array.from(currentServices).forEach((currentService) => {
      const {type: currentType, name: currentName, price: currentPrice} = currentService;

      if (type === currentType && name === currentName && price === currentPrice) {
        isCurrent = true;
      }
    });

    return (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${index}" type="checkbox" name="event-offer-comfort" 
          ${isCurrent ? `checked` : ``}
          >
          <label class="event__offer-label" for="event-offer-comfort-${index}">
            <span class="event__offer-title">${type} ${name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${price}</span>
          </label>
       </div>`
    );
  })
   .join(`\n`);
};

const createPhotosMarkup = (photos) => {
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`
    );
  })
    .join(`\n`);
};


const createTripPointEditTemplate = (point) => {


  const {type, city, price, photos, time, extraServices, description} = point;
  const {start, end} = time;

  const transferTypes = createEventTypeMarkup(EventTypes.slice(0, 7), type);
  const activityTypes = createEventTypeMarkup(EventTypes.slice(7), type);

  const destinations = createDestinationMarkup(Cities, city);

  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);

  const startDate = moment(start).format(`YYYY/MM/DD`);
  const endDate = moment(end).format(`YYYY/MM/DD`);

  const services = createAdditionalServicesMarkup(Services, extraServices);

  const images = createPhotosMarkup(photos);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${transferTypes}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${activityTypes}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate} ${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${services}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${images}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};


export default class TripPointEdit {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return createTripPointEditTemplate(this._point);
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
