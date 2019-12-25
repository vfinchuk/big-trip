import {getRandomIntegerNumber, getRandomArrayItem} from '../utils/common';
import {EventTypeEnum, Description} from './consts';

const cityEventTypes = Object.values(EventTypeEnum)
  .filter((type) => type.group === `transfer`)
  .map((type) => type.code);

/**
 *
 * @param {string} description
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
 * @const {Array} Predefined list of available locations.
 */
export const LOCATIONS = [
  {
    name: `Amsterdam`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Berlin`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Stockholm`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Amsterdam`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Geneva`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Barcelona`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Airport-1`,
    type: `airport`,
    eventTypes: new Set([`train`, `taxi`, `drive`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Airport-2`,
    type: `airport`,
    eventTypes: new Set([`train`, `taxi`, `drive`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Restaurant 1`,
    type: `restaurant`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `restaurant`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Restaurant 2`,
    type: `restaurant`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `restaurant`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Hotel 1`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `check-in`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Hotel 2`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `check-in`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Museum 1`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `sightseeing`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Museum 2`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `sightseeing`]),
    description: generateDescription(Description),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  }
];
