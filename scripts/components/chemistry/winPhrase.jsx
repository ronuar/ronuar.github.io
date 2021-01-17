import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';
import { SUBJECTS_INFO } from '../../constants/commonConstants';

class ChemistryWinPhrase extends Component {
  render() {
    return (
      <div className="phrase">
        <div>
          <div className="circle">
            <div className="content">
              <p>Миксуй</p>
            </div>
          </div>
          <img className="splatter" src="../../images/USE/chemistry/orange-blot.png" />
        </div>
        <div>
          <div className="circle">
            <div className="content">
              <p>Т<mark>о</mark>лько</p>
            </div>
          </div>
          <img className="splatter" src="../../images/USE/chemistry/green-blot.png" />
        </div>
        <div>
          <div className="circle">
            <div className="content">
              <p>Лучшее</p>
            </div>
          </div>
          <img className="splatter" src="../../images/USE/chemistry/pink-blot.png" />
        </div>
      </div>
    );
  }
}

export default saveToLocalStorage(ChemistryWinPhrase, SUBJECTS_INFO.chemistry);
