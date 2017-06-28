export const LETTERS = `Молодость - прекрасная пора.
 Что же пожелать вам остается?
 Счастья в этом мире и добра.
 В дальние края пусть жизнь несется!`.split('');

export const SYMBOLS_REGEXP = /[\s?!.-]/;

const LETTERS_COUNT_OBJ = LETTERS.map(letter => letter.toLowerCase()).reduce((props, letter) => {
  if (SYMBOLS_REGEXP.test(letter)) return props;

  if (props[letter]) props[letter] += 1;
  else props[letter] = 1;

  return props;
}, {});

export const LETTERS_COUNT = Object
  .keys(LETTERS_COUNT_OBJ)
  .sort()
  .map(letter => ({ letter, count: LETTERS_COUNT_OBJ[letter] }));