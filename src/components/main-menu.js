const createMainMenuMarkup = (menuItem, isActive) => {
  const activeClass = isActive ? `trip-tabs__btn--active` : ``;
  return (
    `<a class="trip-tabs__btn  ${activeClass}" href="#">${menuItem}</a>`
  );
};

export const createMainMenuTemplate = (menuItems) => {

  const mainMenuItemsMarkup = menuItems.map((it, i) => createMainMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${mainMenuItemsMarkup}
     </nav>`
  );
};
