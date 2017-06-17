const ANIMALS = ['bear', 'butterfly', 'cat', 'dog', 'duck', 'eagle', 'elephant', 'fox', 'frog',
  'horse', 'panda', 'parrot', 'pig', 'rabbit', 'snake', 'squirrel', 'tiger', 'wolf'];

export const CARD_TYPE = {
  picture: 1,
  translation: 2
};

const PICTURE_CARDS = ANIMALS.map(animal => ({ key: animal, type: CARD_TYPE.picture }));
const TRANSLATION_CARDS = ANIMALS.map(animal => ({ key: animal, type: CARD_TYPE.translation }));

export const CARDS = [].concat(PICTURE_CARDS, TRANSLATION_CARDS);
