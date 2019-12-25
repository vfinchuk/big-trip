import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/common';
import {EventTypeEnum, MillisecondsEnum} from '../mock/consts';
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
 *
 * @param {object} type
 * @return {string}
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
 *
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

  const type = getRandomType(EventTypeEnum);

  return {
    currentLocation: getRandomArrayItem(LOCATIONS),
    price: getRandomIntegerNumber(10, 150),
    dateStart,
    dateEnd,
    offers,
    type,
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
