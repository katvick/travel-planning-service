import { generatePoint } from '../mock/point.js';
import { DESTINATIOS } from '../mock/destinations.js';
import { OFFERS } from '../mock/offers.js';

export default class PointsModel {
  _points = Array.from({ length: 3 }, generatePoint);
  _destinations = DESTINATIOS;
  _offers = OFFERS;

  getPoints = () => this._points;
  getDestinations = () => this._destinations;
  getOffers = () => this._offers;
}


