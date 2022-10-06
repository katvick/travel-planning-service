import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { isPointsFuture } from '../utils/point.js';

export default class PointsModel extends Observable {
  #points = [];
  #pointsApiService = null;
  #pointsFuture = false;

  constructor (pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get pointsFuture() {
    return this.#pointsFuture;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this._notify(UpdateType.INIT);
    } catch(err) {
      this._notify(UpdateType.ERROR, err);
      throw new Error(err.message);
    }
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [
        newPoint,
        ...this.#points
      ];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
    };

    if (isPointsFuture(adaptedPoint.dateFrom)) {
      this.#pointsFuture = true;
    }

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  };
}


