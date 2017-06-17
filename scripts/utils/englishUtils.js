import { CARDS } from '../constants/englishConstants';

export default {
  rand(min = 0, max = 1) {
    const num = Math.random()*(max - min) + min;

    return Math.round(num);
  },

  getCardsInfo() {
    const cards = [].concat(CARDS);
    const length = cards.length;
    let result = [];

    for (let i = 0; i < length; i++) {
      const index = this.rand(0, cards.length - 1);

      result.push(cards.splice(index, 1)[0]);
    }

    return result;
  }
};
