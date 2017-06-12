import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

class MathematicsWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <div>самое</div>
        <div>с<mark>в</mark>етлое</div>
        <div>впереди</div>
      </div>
    );
  }
}

export default saveToLocalStorage(MathematicsWinPhrase, SUBJECTS_INFO.math);
