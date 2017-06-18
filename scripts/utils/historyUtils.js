import { ATTRACTIONS_KEYS } from '../constants/historyConstants';

export default {
  rand(min = 0, max = 1) {
    const num = Math.random()*(max - min) + min;

    return Math.round(num);
  },

  getAttractionsPositions() {
    return ATTRACTIONS_KEYS.map(key => ({
      key,
      top: this.rand(0, window.innerHeight * 0.8 - 180),
      right: this.rand(0, window.innerWidth - 100)
    }));
  }
};
