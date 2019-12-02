import {getRandomArrayItem, getRandomIntegerNumber} from '../utils';
import {Services, Cities, EventTypes, Description} from '../const';


const generateDescription = (description) => {
  const sentences = description.split(`. `);

  let result = ``;

  for (let i = 1; i <= getRandomIntegerNumber(1, 3); i++) {
    result += `${getRandomArrayItem(sentences)}.`;
  }

  return result;
};


const generateAdditionalServices = (options) => {
  const result = new Set();

  if (Math.random() >= 0.5) {
    for (let i = 0; i <= getRandomIntegerNumber(0, 2); i++) {
      result.add(getRandomArrayItem(options));
    }
  }

  return result;
};

export const generateEventPhotos = (count) => {
  const photos = [];

  new Array(count)
    .fill(``)
    .forEach(() => {
      photos.push(`http://picsum.photos/300/150?r=${Math.random()}`);
    });

  return photos;
};

const generateSchedule = () => {
  const startDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffDayValue = sign * getRandomIntegerNumber(0, 7);
  const diffTimeValue = sign * getRandomIntegerNumber(0, 23);
  const durationMinutes = getRandomIntegerNumber(30, 300);

  startDate.setDate(startDate.getDate() + diffDayValue);
  startDate.setHours(diffTimeValue);

  const endDate = new Date(startDate);
  endDate.setMinutes(startDate.getMinutes() + durationMinutes);

  return {
    start: startDate,
    end: endDate,
    duration: durationMinutes,
  };
};


const generateTripEvent = () => {

  return {
    type: getRandomArrayItem(EventTypes),
    city: getRandomArrayItem(Cities),
    photos: generateEventPhotos(getRandomIntegerNumber(2, 7)),
    time: generateSchedule(),
    price: getRandomIntegerNumber(10, 150),
    extraServices: generateAdditionalServices(Services),
    description: generateDescription(Description),
  };

};


const generateTripEvents = (count) => {

  return new Array(count)
    .fill(``)
    .map(generateTripEvent);

};

export {generateTripEvent, generateTripEvents};
