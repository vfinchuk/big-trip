import {createElement} from '../utils';
import {getMenu} from '../mock/site-menu';

/**
 *
 * @return {string}
 */
const createSiteMenuTemplate = () => {
  const menuItems = getMenu().map((item) => {
    return `<a class="trip-tabs__btn  ${item.isChecked ? `trip-tabs__btn--active` : `` }" href="#">${item.title}</a>`;
  }).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuItems}
     </nav>`
  );
};

export default class SiteMenu {

  getTemplate() {
    return createSiteMenuTemplate();
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
