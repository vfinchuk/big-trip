import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/common';
import {Description, EventTypeEnum, LOCATIONS, MillisecondsEnum} from '../mock/consts';

/**
 *
 * @param types
 * @return {*}
 */
const getRandomType = (types) => {
  const values = Object.values(types);

  return values[Math.floor(Math.random() * values.length)];
};

/**
 *
 * @param description
 * @return {string}
 */
const generateDescription = (description) => {
  const sentences = description.split(`. `);

  let result = ``;

  for (let i = 1; i <= getRandomIntegerNumber(1, 3); i++) {
    result += `${getRandomArrayItem(sentences)}.`;
  }

  return result;
};


/**
 *
 * @param type
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

/**
 *
 * @param locations
 * @param eventType
 * @return {*}
 */
const getRandomLocation = (locations, eventType) => {
  locations = locations.filter((location) => location.eventTypes.has(eventType));

  return locations[Math.floor(Math.random() * locations.length)];
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
    dateStart + getRandomIntegerNumber(3, 6) * MillisecondsEnum.HOUR,
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
    location: getRandomLocation(LOCATIONS, type.code),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    price: getRandomIntegerNumber(10, 150),
    description: generateDescription(Description),
    dateStart,
    dateEnd,
    offers,
    type,
  };
};

/**
 *
 * @param count
 * @return {Array}
 */
export const getTripPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripPoint);
};

/**
 *
 * @param events
 * @return {*}
 */
export const groupTripPointsByDay = (events) => {
  let counter = 1;
  return events.reduce((days, point) => {
    let currentDay = new Date(point.dateStart).setHours(0, 0, 0, 0);

    if (days.has(currentDay)) {
      days.get(currentDay).points.push(point);
    } else {
      days.set(currentDay, {
        date: point.dateStart,
        counter,
        points: [point],
      });

      counter++;
    }

    return days;
  }, new Map());
};
