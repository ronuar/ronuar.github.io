import { COLORS_CLASSES } from '../constants/biologyConstants';

export default {
  rand(min = 0, max = 1) {
    const num = Math.random()*(max - min) + min;

    return Math.round(num);
  },

  getColorsClasses() {
    let colors = [].concat(COLORS_CLASSES);
    let resultColors = [];
    const length = colors.length;

    for (let i = 0; i < length; i++) {
      let index = this.rand(0, colors.length - 1);

      resultColors.push(colors.splice(index, 1)[0]);
    }

    return resultColors;
  }
};