import AbstractComponent from './abstract-component';


/**
 *
 * @param {Array} points
 * @return {string}
 */
const createTripTotalTemplate = (points) => {
  const total = points.reduce((sum, point) => {
    sum += Array.from(point.offers).reduce((offersSum, offer) => {
      if (offer[1].isChecked) {
        offersSum += offer[1].price;
      }
      return offersSum;
    }, 0);
    sum += point.price;
    return sum;
  }, 0);
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
     </p>`
  );
};


export default class TripTotal extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createTripTotalTemplate(this._points);
  }
}
