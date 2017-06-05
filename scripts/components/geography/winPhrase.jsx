import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';

class GeographyWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        Свернув горы,
        <div>сможешь</div>
        <div>покорит<mark>ь</mark> и EГЭ</div>
      </div>
    );
  }
}

export default saveToLocalStorage(GeographyWinPhrase, 'ь', 'geography');
