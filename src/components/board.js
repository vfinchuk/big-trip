import {createElement} from '../utils';

/**
 *
 * @return {string}
 */
const createBoardTemplate = () => `<ul class="trip-days"></ul>`;

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate(this._filters);
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
