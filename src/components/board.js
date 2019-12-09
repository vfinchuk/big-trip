import AbstractComponent from './abstract-component';

/**
 *
 * @return {string}
 */
const createBoardTemplate = () => `<ul class="trip-days"></ul>`;


export default class Board extends AbstractComponent {

  getTemplate() {
    return createBoardTemplate();
  }
}
