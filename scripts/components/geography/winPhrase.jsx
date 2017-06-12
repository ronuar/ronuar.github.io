import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

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

export default saveToLocalStorage(GeographyWinPhrase, SUBJECTS_INFO.geography);
