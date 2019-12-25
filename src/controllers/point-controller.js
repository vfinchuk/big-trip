import TripPointEditComponent from '../components/trip-point-edit';
import TripPointComponent from '../components/trip-point';

import {render, RenderPosition, replace} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class PointController {
  /**
   * Trip point controller
   * @param {HTMLElement} container
   * @param {Object} onDataChange
   * @param {Object} onViewChange
   */
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;

    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
  }

  /**
   * Render trip point method
   * @param {Object} point
   */
  render(point) {
    const oldTripPointComponent = this._tripPointComponent;
    const oldTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointComponent(point);
    this._tripPointEditComponent = new TripPointEditComponent(point);

    this._tripPointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscapeKeyDown);
    });

    this._tripPointEditComponent.saveHandler = (newData) => {
      this._onDataChange(this, point, Object.assign({}, newData));
      this._replaceEditToPoint();
    };

    this._tripPointEditComponent.closeHandler = () => {
      this._tripPointEditComponent.reset(); // TODO How reset data ?
      this._replaceEditToPoint();
    };

    if (oldTripPointComponent && oldTripPointEditComponent) {
      replace(this._tripPointComponent, oldTripPointComponent);
      replace(this._tripPointEditComponent, oldTripPointEditComponent);
    } else {
      render(this._container, this._tripPointComponent, RenderPosition.BEFOREEND);
    }
  }

  /**
   * Set default state point element
   */
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  /**
   * Replace point to point edit form
   * @private
   */
  _replacePointToEdit() {
    this._onViewChange();

    replace(this._tripPointEditComponent, this._tripPointComponent);
    this._mode = Mode.EDIT;
  }

  /**
   *
   * @private
   */
  _replaceEditToPoint() {
    // this._tripPointEditComponent.reset();

    replace(this._tripPointComponent, this._tripPointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  /**
   *
   * @param evt
   * @private
   */
  _onEscapeKeyDown(evt) {
    const isEscapeKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscapeKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscapeKeyDown);
    }
  }

}
