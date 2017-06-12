import { DIRECTIONS } from '../constants/mathematicsConstants';

export default {
  formatPoints(points) {
    return points
      .map(({ x, y }) => `${x},${y}`)
      .join(' ');
  },

  defineRoute(points) {
    return points.map((point, index) => {
      if (index === points.length - 1) return {};

      const nextPoint = points[index+1];
      let item = null;
      if (nextPoint.x < point.x) {
        item = { direction: DIRECTIONS.left, length: (point.x - nextPoint.x) / 20 };
      }
      if (nextPoint.x > point.x) {
        item = { direction: DIRECTIONS.right, length: (nextPoint.x - point.x) / 20 };
      }
      if (nextPoint.y < point.y) {
        item = { direction: DIRECTIONS.top, length: (point.y - nextPoint.y) / 20 };
      }
      if (nextPoint.y > point.y) {
        item = { direction: DIRECTIONS.bottom, length: (nextPoint.y - point.y) / 20 };
      }

      return item;
    });
  }
};
