import AbstractComponent from './abstract-component';

/**
 *
 * @return {string}
 */
const createNoPointsTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoPoints extends AbstractComponent {

  getTemplate() {
    return createNoPointsTemplate();
  }

}
