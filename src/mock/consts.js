
export const Description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

/**
 * @readonly
 * @enum {EventTypes}
 */
export const EventTypes = Object.freeze({
  BUS: {
    code: `bus`,
    group: `transfer`
  },
  DRIVE: {
    code: `drive`,
    group: `transfer`
  },
  FLIGHT: {
    code: `flight`,
    group: `transfer`
  },
  SHIP: {
    code: `ship`,
    group: `transfer`
  },
  TAXI: {
    code: `taxi`,
    group: `transfer`
  },
  TRAIN: {
    code: `train`,
    group: `transfer`
  },
  TRANSPORT: {
    code: `transport`,
    group: `transfer`
  },
  CHECK: {
    code: `check-in`,
    group: `activity`
  },
  RESTAURANT: {
    code: `restaurant`,
    group: `activity`
  },
  SIGHTSEEING: {
    code: `sightseeing`,
    group: `activity`
  }
});


/**
 * Enum for time in millisecond.
 *
 * @readonly
 * @enum {number}
 */
export const MillisecondsEnum = Object.freeze({
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
});
