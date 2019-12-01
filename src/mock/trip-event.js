import {getRandomArrayItem, getRandomIntegerNumber} from '../utils';


const Description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;


const EventTypes = [
  `bus`,
  `drive`,
  `flight`,
  `ship`,
  `taxi`,
  `train`,
  `transport`,
  `trip`,
  `check-in`,
  `restaurant`,
  `sightseeing`,
];


const Cities = [
  `Amsterdam`,
  `Berlin`,
  `Stockholm`,
  `Geneva`,
  `Milan`,
  `Paris`,
  `Barcelona`
];


const AdditionalServices = [
  {
    type: `Add`,
    name: `luggage`,
    price: 10
  },
  {
    type: `Switch`,
    name: `to comfort class`,
    price: 150
  },
  {
    type: `Add`,
    name: `meal`,
    price: 2
  },
  {
    type: `Chose`,
    name: `seats`,
    price: 9
  },
];

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
    additionalServices: generateAdditionalServices(AdditionalServices),
    description: generateDescription(Description),
  };

};


const generateTripEvents = (count) => {

  return new Array(count)
    .fill(``)
    .map(generateTripEvent);

};

export {EventTypes, generateTripEvent, generateTripEvents};
