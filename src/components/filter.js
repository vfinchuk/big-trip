import {createElement} from '../utils';
import {getFilters} from '../mock/filters';

const createFilterTemplate = () => {

  const filterItems = getFilters()
    .map((filter) => {
      return `<div class="trip-filters__filter">
        <input id="filter-${filter.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.title}" 
        ${filter.isChecked ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-everything">${filter.title}</label>
      </div>`;
    }).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItems} 
     <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );

};

export default class Filter {

  getTemplate() {
    return createFilterTemplate();
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
