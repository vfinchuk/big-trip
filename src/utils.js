export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const year = castTimeFormat(date.getFullYear());
  const month = castTimeFormat(date.getMonth());
  const day = castTimeFormat(date.getDate());

  return `${year}-${month}-${day}`;
};

export const convertMinutesToHours = (minutes) => {
  if (minutes < 60) {
    return `${minutes}M`;
  } else if (minutes % 60 === 0) {
    return `${minutes / 60 }H`;
  } else {
    return `${ Math.floor(minutes / 60) }H ${minutes % 60}M`;
  }
};


export const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomArrayItem = (array) => {
  const randomArrayIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomArrayIndex];
};


export const getTripTotalAmount = (points) => {
  return points.reduce((sum, item) => {

    sum += Array.from(item.extraServices).reduce((servicesSum, service) => {
      servicesSum += service.price;
      return servicesSum;
    }, 0);
    sum += item.price;

    return sum;
  }, 0);
};

export const createElement = (template, returnNodeList = false) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return returnNodeList ? newElement : newElement.firstChild;
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
