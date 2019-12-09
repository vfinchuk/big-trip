import AbstractComponent from './abstract-component';

/**
 *
 * @param {Array} filters
 * @return {string}
 */
const createFilterTemplate = (filters) => {

  const filtersTemplate = filters.map((filter) => {
    return `<div class="trip-filters__filter">
        <input id="filter-${filter.title.toLowerCase()}" 
        class="trip-filters__filter-input  visually-hidden" 
        type="radio" 
        name="trip-filter" 
        value="${filter.title.toLowerCase()}" 
        ${filter.isChecked ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-everything">${filter.title}</label>
      </div>`;
  }).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
     <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );

};


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

}
