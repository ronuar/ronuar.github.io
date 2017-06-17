import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

class SocialWinPhrase extends Component {
  render() {
    const message = SUBJECTS_INFO.english.phrase;
    const messageHtml = message.split('').map(letter => <span>{letter}{letter === '.' ? '\n' : null}</span>);
    messageHtml.push(<span>.</span>);

    return (
      <div className="phrase">
        <div className="txt text-flow">{messageHtml}</div>
      </div>
    );
  }
}

export default saveToLocalStorage(SocialWinPhrase, SUBJECTS_INFO.english);
