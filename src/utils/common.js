export const moment = require(`moment`);

/**
 *
 * @param {int} min
 * @param {int} max
 * @return {number}
 */
export const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
/**
 *
 * @param {Array} array
 * @return {*}
 */
export const getRandomArrayItem = (array) => {
  const randomArrayIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomArrayIndex];
};

/**
 *
 * @param {Array} array
 * @return {Array}
 */
export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
