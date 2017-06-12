import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';

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

export default saveToLocalStorage(MathematicsWinPhrase, 'в', 'math');
