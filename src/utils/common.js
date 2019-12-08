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
 * @param {array} array
 * @return {*}
 */
export const getRandomArrayItem = (array) => {
  const randomArrayIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomArrayIndex];
};

/**
 *
 * @param {array} points
 * @return {int}
 */
export const getTotalAmount = (points) => {
  return points.reduce((sum, point) => {
    sum += Array.from(point.offers).reduce((offersSum, offer) => {
      if (offer[1].isChecked) {
        offersSum += offer[1].price;
      }
      return offersSum;
    }, 0);
    sum += point.price;
    return sum;
  }, 0);
};


