import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

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

export default saveToLocalStorage(PhysicsWinPhrase, SUBJECTS_INFO.physics);
