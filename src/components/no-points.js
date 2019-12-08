import {createElement} from '../utils';

/**
 *
 * @return {string}
 */
const createNoPointsTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoPoints {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoPointsTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
