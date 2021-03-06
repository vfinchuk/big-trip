import {getRandomIntegerNumber, shuffleArray} from '../utils/common';
import {EventTypes, MillisecondsEnum} from '../mock/consts';
import {LOCATIONS} from '../mock/locations';

/**
 *
 * @param {object} types
 * @return {*}
 */
const getRandomType = (types) => {
  const values = Object.values(types);

  return values[Math.floor(Math.random() * values.length)];
};

/**
 * Get rand locations by event type
 * @param {Object} eventType
 * @return {Array}
 */
export const getLocationsByEventType = (eventType) => {
  const eventTypeLocations = LOCATIONS.filter((location) => location.eventTypes.has(eventType.code));
  return shuffleArray(eventTypeLocations).slice(0, getRandomIntegerNumber(2, 4));
};


/**
 * Return placeholder by type event
 * @param {Object} type
 * @return {String}
 */
export const getEventPlaceholder = (type) => {
  let placeholder = ``;

  if (type.group === `activity`) {
    placeholder = `in`;
  } else if (type.group === `transfer`) {
    placeholder = `to`;
  }

  return placeholder;
};


let lastPointDate = Date.now();

/**
 * Return trip point data
 * @return {{location: *, photos: Array, price: number, description: string, dateStart: number, dateEnd: number, offers: Map, type: *}}
 */
export const getTripPoint = () => {

  const dateStart = getRandomIntegerNumber(
      lastPointDate,
      lastPointDate + getRandomIntegerNumber(0, 3) * MillisecondsEnum.HOUR
  );

  const dateEnd = getRandomIntegerNumber(
      dateStart + getRandomIntegerNumber(0, 3) * MillisecondsEnum.HOUR,
      dateStart + getRandomIntegerNumber(3, 6) * MillisecondsEnum.HOUR
  );

  lastPointDate = dateEnd;

  const offers = new Map([
    [
      `luggage`, {
        isChecked: Math.random() >= 0.5,
        title: `Add luggage`,
        price: 10
      }
    ],
    [
      `switch`, {
        isChecked: Math.random() >= 0.5,
        title: `Switch to comfort class`,
        price: 10
      }
    ],
    [
      `meal`, {
        isChecked: Math.random() >= 0.5,
        title: `Add meal`,
        price: 2
      }
    ],
    [
      `seats`, {
        isChecked: Math.random() >= 0.5,
        title: `Chose seats`,
        price: 9
      }
    ],
  ]);

  const type = getRandomType(EventTypes);
  const locations = getLocationsByEventType(type);
  const currentLocation = locations[getRandomIntegerNumber(1, locations.length - 1)];


  return {
    isFavorite: Math.random() >= 0.5,
    currentLocation,
    price: getRandomIntegerNumber(10, 150),
    locations,
    dateStart,
    dateEnd,
    offers,
    type
  };
};

/**
 *
 * @param {int} count
 * @return {Array}
 */
export const getTripPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripPoint);
};

/**
 *
 * @param {Array} points
 * @return {*}
 */
export const groupTripPointsByDay = (points) => {
  return points.reduce((days, point) => {
    let currentDay = new Date(point.dateStart).setHours(0, 0, 0, 0);

    if (days.has(currentDay)) {
      days.get(currentDay).points.push(point);
    } else {
      days.set(currentDay, {
        date: point.dateStart,
        points: [point],
      });
    }

    return days;
  }, new Map());
};
