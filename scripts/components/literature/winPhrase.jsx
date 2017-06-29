import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

class LiteratureWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <div><mark>Н</mark>икогда не сдавайся</div>
        <div>Чаще улыбайся</div>
      </div>
    );
  }
}

export default saveToLocalStorage(LiteratureWinPhrase, SUBJECTS_INFO.literature);
