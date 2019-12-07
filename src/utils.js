export const moment = require(`moment`);

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomArrayItem = (array) => {
  const randomArrayIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomArrayIndex];
};


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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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
