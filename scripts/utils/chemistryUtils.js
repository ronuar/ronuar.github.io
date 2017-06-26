import { COLORS } from '../constants/chemistryConstants';

export default {
  defineRGBColor({ red, green, blue }) {
    return {
      red: Math.round(255 * (red / 100)),
      green: Math.round(255 * (green / 100)),
      blue: Math.round(255 * (blue / 100))
    };
  },

  getColorKey({ red, green, blue }) {
    const color = COLORS.filter(color => color.red === red && color.green === green && color.blue === blue)[0];

    return color ? color.key : null;
  }
};
