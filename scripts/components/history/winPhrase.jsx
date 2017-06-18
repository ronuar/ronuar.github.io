import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

class HistoryWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <h1 className="title">
          <span className="title-part">Следуй</span>
          <span className="title-part">За</span>
          <span className="title-part">Меч<mark>т</mark>ой</span>
        </h1>
      </div>
    );
  }
}

export default saveToLocalStorage(HistoryWinPhrase, SUBJECTS_INFO.history);
