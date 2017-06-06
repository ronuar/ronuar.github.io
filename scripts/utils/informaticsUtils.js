export default {
  initSymbols() {
    let indexes = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    const first = ['f', 't', 'u', 's', 'o', 'n'];
    const second = ['a', 'i', 'p', 'q', 'v', 'e'];
    const third = ['l', 'z', 'm', 't', 'a', 'x'];
    const fourth = ['p', 'o', 'y', 'g', 'h', 'f'];
    const fifth = ['i', 'j', 'q', 'w', 'l', 'e'];
    const sixth = ['d', 'n', 'e', 'u', 'c', 'o'];

    return (symbolId) => {
      const symbolIndex = typeof symbolId === 'number' ? indexes[symbolId] : 0;
      indexes[symbolId] = symbolIndex === 5 ? 0 : symbolIndex + 1;

      return [first[indexes[0]], second[indexes[1]], third[indexes[2]],
        fourth[indexes[3]], fifth[indexes[4]], sixth[indexes[5]]];
    };
  },

  definePassword(symbols) {
    return Object.keys(symbols)
      .map(index => symbols[index])
      .join('');
  }
};
