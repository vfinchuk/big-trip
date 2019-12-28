import moment from 'moment';
import AbstractComponent from '../components/abstract-component';

/**
 *
 * @param {array} points
 * @return {string}
 */
const createTripInfoTemplate = (points) => {

  let dates;
  if (points.length > 1) {
    let startTrip = moment(points[0].dateStart).format(`DD MMM`);
    let endTrip = moment(points.slice(-1)[0].dateStart).format(`DD MMM`);

    dates = `${startTrip.toUpperCase()}&nbsp;&mdash;&nbsp;${endTrip.toUpperCase()}`;
  } else {
    let startTrip = moment(points[0].dateStart).format(`MMM DD`);

    dates = startTrip.toUpperCase();
  }
  const cities = points.filter((point) => point.currentLocation.type === `city`)
    .map((point) => point.currentLocation.name);

  let title;
  if (cities.length > 3) {
    title = `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  } else {
    title = cities.reduce((result, city, index) => {
      result += `${city} ${index !== (cities.length - 1) ? ` &mdash; ` : ``}`;
      return result;
    }, ``);
  }

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>`
  );
};


export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }

}
