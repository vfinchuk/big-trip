import AbstractComponent from './abstract-component';
import {EventTypeEnum, LOCATIONS} from '../mock/consts';
import {moment} from '../utils/common';
import {getEventPlaceholder} from '../mock/trip-point';

/**
 *
 * @param {object} types
 * @param {object} currentType
 * @param {string} typeGroup - filtered types by pointed group [transfer, activity]
 * @return {string|*}
 */
const createEventTypeMarkup = (types, currentType, typeGroup) => {
  return Object.values(types)
    .filter((type) => type.group === typeGroup)
    .map((type, index) => {
      return (
        `<div class="event__type-item">
        <input
        id="event-type-${type.code}-${index}"
        class="event__type-input  visually-hidden"
        type="radio" name="event-type"
        value="${type.code}"
        ${currentType.code === type.code ? `checked` : ``}
        />
        <label class="event__type-label  event__type-label--${type.code}" for="event-type-${type.code}-${index}">${type.code}</label>
       </div>`
      );
    }).join(`\n`);
};

/**
 *
 * @param {array} locations - all available locations
 * @param {object} currentLocation
 * @return {string|*}
 */
const createDestinationMarkup = (locations, currentLocation) => {
  return locations.map((location) => {
    return (
      `<option
        value="${location.name}"
        ${currentLocation.name === location.name ? `checked` : ``}
        ></option>`
    );
  }).join(`\n`);
};

/**
 *
 * @param {map} offers
 * @return {string}
 */
const createOffersMarkup = (offers) => {
  return [...offers.values()].map((offer, index) => {
    return `<div class="event__offer-selector">
               <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${index}" type="checkbox" name="event-offer-comfort"
               ${offer.isChecked ? `checked` : ``}
               >
               <label class="event__offer-label" for="event-offer-comfort-${index}">
                 <span class="event__offer-title">${offer.title}</span>
                 &plus;
                 &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
               </label>
            </div>`;
  }).join(``);
};

/**
 *
 * @param {array} photos
 * @return {string|*}
 */
const createPhotosMarkup = (photos) => {
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`
    );
  }).join(`\n`);
};

/**
 *
 * @param {object} point
 * @return {string}
 */
const createTripPointEditTemplate = (point) => {
  const {type, location, price, photos, dateStart, dateEnd, offers, description} = point;

  const destinations = createDestinationMarkup(LOCATIONS, location);

  const offersList = createOffersMarkup(offers);

  const transferTypes = createEventTypeMarkup(EventTypeEnum, type, `transfer`);
  const activityTypes = createEventTypeMarkup(EventTypeEnum, type, `activity`);

  const startTime = moment(dateStart).format(`HH:mm`);
  const endTime = moment(dateEnd).format(`HH:mm`);

  const startDate = moment(dateStart).format(`YYYY/MM/DD`);
  const endDate = moment(dateEnd).format(`YYYY/MM/DD`);

  const images = createPhotosMarkup(photos);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.code}.png" alt="Event type icon">
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
             ${type.code} ${getEventPlaceholder(type)} 
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${location.name}" list="destination-list-1">
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
            ${offersList}
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


export default class TripPointEdit extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createTripPointEditTemplate(this._point);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

}
