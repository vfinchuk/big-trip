import flatpickr from 'flatpickr';
import AbstractSmartComponent from './abstract-smart-component';
import {EventTypes} from '../mock/consts';
import moment from 'moment';
import {getEventPlaceholder, getLocationsByEventType} from '../mock/trip-point';

require(`flatpickr/dist/themes/material_blue.css`);

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
  return [...offers].map((offer) => {
    const [code, data] = offer;
    return `<div class="event__offer-selector">
               <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${code}-1" type="checkbox" name="event-offer-${code}"
               ${data.isChecked ? `checked` : ``}
               >
               <label class="event__offer-label" for="event-offer-comfort-${code}-1">
                 <span class="event__offer-title">${data.title}</span>
                 &plus;
                 &euro;&nbsp;<span class="event__offer-price">${data.price}</span>
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

  const {type, currentLocation, locations, price, dateStart, dateEnd, isFavorite, offers} = point;

  const destinations = createDestinationMarkup(locations, currentLocation);

  const offersList = createOffersMarkup(offers);

  const transferTypes = createEventTypeMarkup(EventTypes, currentLocation.type, `transfer`);
  const activityTypes = createEventTypeMarkup(EventTypes, currentLocation.type, `activity`);

  const startTime = moment(dateStart).format(`HH:mm`);
  const endTime = moment(dateEnd).format(`HH:mm`);

  const startDate = moment(dateStart).format(`YYYY/MM/DD`);
  const endDate = moment(dateEnd).format(`YYYY/MM/DD`);

  const images = createPhotosMarkup(currentLocation.photos);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentLocation.name}" list="destination-list-1" autocomplete="off">
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

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" 
          ${isFavorite ? `checked` : ``}
          >
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
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
            <p class="event__destination-description">${currentLocation.description}</p>
  
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${images}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};


export default class TripPointEdit extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._point = point;
    this._flatpickr = null;

    this._changePointTypeHandler = this._changePointTypeHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._selectOffersHandler = this._selectOffersHandler.bind(this);
    this._selectFavoriteHandler = this._selectFavoriteHandler.bind(this);

    this._subscribeEventsHandler();

    this._applyFlatpickr();
  }

  recoveryListeners() {
    this._subscribeEventsHandler();
  }

  getTemplate() {
    return createTripPointEditTemplate(this._point);
  }

  /**
   *
   */
  rerender() {
    super.rerender();
  }

  /**
   *
   */
  reset() {
    const point = this._point;
    // TODO how reset data ?
  }

  /**
   *
   * @private
   */
  _subscribeEventsHandler() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((input) => {
      input.addEventListener(`click`, this._changePointTypeHandler);
    });

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, this._changePriceHandler);

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._changeDestinationHandler);

    element.querySelectorAll(`.event__offer-checkbox`).forEach((offer) => {
      offer.addEventListener(`change`, this._selectOffersHandler);
    });

    element.querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, this._selectFavoriteHandler);
  }

  /**
   * Render Flatpickr
   * @private
   */
  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const pointDuration = new Map([
      [`event-start-time`, this._point.dateStart],
      [`event-end-time`, this._point.dateEnd]
    ]);

    this.getElement().querySelectorAll(`.event__input--time`)
      .forEach((input) => {
        let minDate = null;
        let minTime = null;

        if (input.name === `event-end-time`) {
          minDate = pointDuration.get(`event-start-time`);
          minTime = moment(pointDuration.get(`event-start-time`)).format(`H:m`);
        }

        this._flatpickr = flatpickr(input, {
          allowInput: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: pointDuration.get(input.name),
          enableTime: true,
          time_24hr: true,
          minDate,
          minTime,
          onReady(selectedDates, dateStr, instance) {
            instance.close();
          },
        });
      });
  }

  /**
   *
   * @param {Function} callback
   */
  set saveHandler(callback) {
    this.registerObserver(`form`, `submit`, (evt) => {
      evt.preventDefault();
      callback(this._point);
    });
  }

  /**
   * Close form handler
   * @param {Function} callback
   */
  set closeHandler(callback) {
    this.registerObserver(`form`, `reset`, (evt) => {
      evt.preventDefault();
      callback();
    });
  }

  /**
   * Change trip point type handler
   * @param {Event} evt
   * @private
   */
  _changePointTypeHandler(evt) {
    if (evt.target.value === this._point.type.code) {
      return;
    }

    const selectedEventType = EventTypes[evt.target.value.toUpperCase().replace(/-.+$/, ``)];

    this._point.locations = getLocationsByEventType(selectedEventType);
    this._point.type = Object.assign({}, selectedEventType);
    this.rerender();

    this.getElement().querySelector(`.event__input--destination`).value = ``;
  }

  /**
   * Change price handler
   * @param {Event} evt
   * @private
   */
  _changePriceHandler(evt) {
    if (evt.target.value === this._point.price) {
      return;
    }

    this._point.price = evt.target.value;
    this.rerender();
  }

  /**
   * Change point destination handler
   * @param {Event} evt
   * @private
   */
  _changeDestinationHandler(evt) {
    if (evt.target.value === this._point.currentLocation.name) {
      return;
    }

    const selectedLocation = this._point.locations.find((location) => location.name === evt.target.value);

    if (!selectedLocation) {
      return;
    }

    this._point.currentLocation = selectedLocation;
    this.rerender();
  }

  /**
   * Select offers handler
   * @param {Event} evt
   * @private
   */
  _selectOffersHandler(evt) {
    const selectedOfferName = evt.target.name.replace(/event-offer-/, ``);
    const offer = this._point.offers.get(selectedOfferName);

    if (offer.isChecked === evt.target.checked) {
      return;
    }

    offer.isChecked = evt.target.checked;
    this.rerender();
  }

  /**
   * Select favorite point
   * @private
   */
  _selectFavoriteHandler() {
    this._point.isFavorite = !this._point.isFavorite;
    this.rerender();
  }
}
