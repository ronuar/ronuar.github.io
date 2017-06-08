import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';

class RussianWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <div className="line left"></div>
        <div className="line right"></div>
        <div className="bracket left"></div>
        <div className="bracket right"></div>
        <div className="small top">ЕГЭ длится</div>
        <div className="big">не вечно</div>
        <div className="small bottom">не <mark>у</mark>нывай</div>
        <div className="hide top"></div>
        <div className="hide bottom"></div>
      </div>
    );
  }
}

export default saveToLocalStorage(RussianWinPhrase, 'у', 'ru');
