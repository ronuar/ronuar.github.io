import React from 'react';
import store from 'store';

const saveToLocalStorage = (Component, { key: name, letter, phrase }) => class extends React.Component {
  componentDidMount() {
    const progressInfo = store.get('progressInfo') || [];

    if (progressInfo.map(l => l.name).indexOf(name) === -1) progressInfo.push({ letter, name, phrase });

    store.set('progressInfo', progressInfo);
  }

  render() {
    return <Component />;
  }
};

export { saveToLocalStorage, store };
