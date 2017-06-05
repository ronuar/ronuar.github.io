import React from 'react';
import store from 'store';

const saveToLocalStorage = (Component, letter, subject) => class extends React.Component {
  componentDidMount() {
    const letters = store.get('letters') || [];

    if (letters.indexOf(letter) === -1) letters.push({ name: letter, subject });

    store.set('letters', letters);
  }

  render() {
    return <Component />;
  }
};

export { saveToLocalStorage, store };
