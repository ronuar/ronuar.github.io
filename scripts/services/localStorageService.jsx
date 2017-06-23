import React from 'react';
import store from 'store';

const saveToLocalStorage = (Component, subjectInfo) => class extends React.Component {
  componentDidMount() {
    saveProgress(subjectInfo);
  }

  render() {
    return <Component />;
  }
};

function saveProgress({ key: name, letter, phrase }) {
  const progressInfo = store.get('progressInfo') || [];

  if (progressInfo.map(l => l.name).indexOf(name) === -1) progressInfo.push({ letter, name, phrase });

  store.set('progressInfo', progressInfo);
}

export { saveToLocalStorage, store, saveProgress };
