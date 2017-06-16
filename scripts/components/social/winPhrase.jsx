import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

class SocialWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <h1>
          <div>Собой</div>
          <div>Будь</div>
          <div>Получится</div>
          <div>Вс<mark>е</mark></div>
          <div>У&nbsp;Тебя</div>
        </h1>
      </div>
    );
  }
}

export default saveToLocalStorage(SocialWinPhrase, SUBJECTS_INFO.com);
