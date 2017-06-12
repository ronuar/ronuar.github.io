import { store } from '../services/localStorageService';
import { SUBJECTS_INFO } from '../constants/commonConstants';

export default {
  defineProgressInfo() {
    const letters = store.get('letters');

    if (!letters) return;

    const progressInfo = letters.map(({ name, subject }) => ({
      name: subject,
      letter: name,
      phrase: SUBJECTS_INFO[subject].phrase
    }));

    store.remove('letters');
    store.set('progressInfo', progressInfo);
  }
};
