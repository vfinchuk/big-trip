import {createElement} from '../utils/render';

/**
 * Base component interface
 *
 * @abstract
 */
export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw Error(`Can't instantiate AbstractComponent, only concrete one`);
    }

    this._element = null;
    this._observers = [];

  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._subscribeObservers();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  /**
   * Subscribe observers on element
   * @private
   */
  _subscribeObservers() {
    this._observers.forEach((handler) => {
      const {selector, eventType, callback, selectAll} = handler;

      if (selectAll) {
        this.getElement().querySelectorAll(selector).forEach((element) => {
          element.addEventListener(eventType, callback);
        });
      } else {
        this.getElement().querySelector(selector).addEventListener(eventType, callback);
      }

    });
  }

  /**
   * Register new observer on element
   * @param {String} selector
   * @param {String} eventType
   * @param {function} callback
   * @param {boolean} selectAll
   */
  registerObserver(selector, eventType, callback, selectAll = false) {
    if (!(selector, eventType, callback)) {
      throw Error(`Should pass all params`);
    }

    this._observers.push({selector, eventType, callback, selectAll});

    if (selectAll) {
      this.getElement().querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventType, callback);
      });
    } else {
      this.getElement().querySelector(selector).addEventListener(eventType, callback);
    }
  }
}
