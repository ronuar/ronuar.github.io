import { LETTERS, SCALES_INFO } from '../constants/russianConstants';

let id = 0;

export default {
  createLetter() {
    const random = (min, max) => Math.round(min -0.5 + Math.random() * (max - min + 1));

    const index = random(0, LETTERS.length-1);
    const character = random(0, 1);

    return {
      top: 10,
      index: this.uniqueId(),
      name: LETTERS[index],
      character,
      line: random(1, 5)
    }
  },

  uniqueId() {
    return ++id;
  },

  hasCatch(letter, border) {
    return letter.top > border;
  },

  borderByScale(scale) {
    const m = Math.pow(10, 3);
    const workScale = Math.round(scale*m)/m;

    return SCALES_INFO.filter(info => info.scale === workScale)[0].top;
  }
};
