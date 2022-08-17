import { generatePoint } from '../fish/point.js';

export default class PointsModel {
  points = Array.from({ length: 3 }, generatePoint);

  getPoints = () => this.points;
}
