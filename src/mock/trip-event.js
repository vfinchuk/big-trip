import { getRandomArrayItem, getRandomIntegerNumber} from '../utils';
import {Description, EventTypeEnum, LOCATIONS, MillisecondsEnum} from '../mock/consts';

/**
 * @param {EventType} types
 * @return {EventType}
 */
const getRandomType = (types) => {
  const values = Object.values(types);

  return values[Math.floor(Math.random() * values.length)];
};

const generateDescription = (description) => {
  const sentences = description.split(`. `);

  let result = ``;

  for (let i = 1; i <= getRandomIntegerNumber(1, 3); i++) {
    result += `${getRandomArrayItem(sentences)}.`;
  }

  return result;
};


/**
 * @param {EventType} type
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
 * @param {Array} locations
 * @param {string} eventType
 * @return {string}
 */
const getRandomLocation = (locations, eventType) => {
  locations = locations.filter((location) => location.eventTypes.has(eventType));

  return locations[Math.floor(Math.random() * locations.length)];
};

let lastPointDate = Date.now();

const generateTripEvent = () => {

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


const generateTripEvents = (count) => {

  return new Array(count)
    .fill(``)
    .map(generateTripEvent);

};

export {generateTripEvent, generateTripEvents};
