import AbstractComponent from './abstract-component';
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


export default class SiteMenu extends AbstractComponent {

  getTemplate() {
    return createSiteMenuTemplate();
  }

}
