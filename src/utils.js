export const moment = require(`moment`);
/**
 *
 * @type {{AFTERBEGIN: string, BEFOREEND: string, AFTEREND: string}}
 */
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};
/**
 *
 * @param min {int}
 * @param max {int}
 * @return {number}
 */
export const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
/**
 *
 * @param array {array}
 * @return {*}
 */
export const getRandomArrayItem = (array) => {
  const randomArrayIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomArrayIndex];
};

/**
 *
 * @param points {array}
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

/**
 *
 * @param template {string}
 * @return {Node}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 *
 * @param  container {node}
 * @param element {node}
 * @param place {string}
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.append(element);
      container.insertAdjacentElement(RenderPosition.AFTEREND, element);
      break;
  }
};
