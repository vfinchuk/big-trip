const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date, withDate = false) => {
  const year = castTimeFormat(date.getFullYear());
  const month = castTimeFormat(date.getMonth());
  const day = castTimeFormat(date.getDate());

  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  if (withDate) {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return `${hours}:${minutes}`;
};


export const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomArrayItem = (array) => {
  const randomArrayIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomArrayIndex];
};
