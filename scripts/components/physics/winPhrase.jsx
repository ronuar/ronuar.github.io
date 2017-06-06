import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';

class PhysicsWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <div>Что не убивает</div>
        <div>делает</div>
        <div>силь<mark>н</mark>ее</div>
        <div>ЕГЭ не</div>
        <div>убивает</div>
      </div>
    );
  }
}

export default saveToLocalStorage(PhysicsWinPhrase, 'н', 'physics');
