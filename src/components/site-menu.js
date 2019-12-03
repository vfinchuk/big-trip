import {createElement} from '../utils';

const createSiteMenuMarkup = (menuItem, isActive) => {
  const activeClass = isActive ? `trip-tabs__btn--active` : ``;
  return (
    `<a class="trip-tabs__btn  ${activeClass}" href="#">${menuItem}</a>`
  );
};

const createSiteMenuTemplate = (menuItems) => {

  const mainMenuItemsMarkup = menuItems.map((it, i) => createSiteMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${mainMenuItemsMarkup}
     </nav>`
  );
};

export default class SiteMenu {
  constructor(menuItems) {
    this._menuItems = menuItems;

    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItems);
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
