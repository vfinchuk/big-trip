import {formatDate} from '../utils';
import {MonthNames} from '../const';

const createTripDayItemMarkup = (dayCount, date) => {

  const day = new Date(date).getDate();
  const monthNumber = new Date(date).getMonth();
  const month = MonthNames[monthNumber].slice(0, 3);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${date}">${month} ${day}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export const createTripDayItemTemplate = (events) => {

  let dayCount = 0;

  return events.map((it, i, array) => {

    const itemTimeStamp = Date.parse(formatDate(it.time.start));
    let nextItemTimeStamp;

    if (i === (array.length - 1)) {
      nextItemTimeStamp = 0;
    } else {
      nextItemTimeStamp = Date.parse(formatDate(array[i + 1].time.start));
    }

    if (itemTimeStamp !== nextItemTimeStamp) {
      dayCount++;
      return createTripDayItemMarkup(dayCount, formatDate(it.time.start));
    }

    return ``;
  })
    .join(`\n`);

};
