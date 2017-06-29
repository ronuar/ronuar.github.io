import { LETTERS, SYMBOLS_REGEXP } from '../constants/literatureConstants';

export default {
  defineLettersInfo() {
    const lettersCountObj = LETTERS.map(letter => letter.toLowerCase()).reduce((props, letter) => {
      if (SYMBOLS_REGEXP.test(letter)) return props;

      if (props[letter]) props[letter] += 1;
      else props[letter] = 1;

      return props;
    }, {});

    return Object
      .keys(lettersCountObj)
      .sort()
      .map(letter => ({ letter, count: lettersCountObj[letter] }));
  },

  getLettersCount() {
    return this.defineLettersInfo().reduce((count, info) => {
      return count + info.count
    }, 0);
  }
};