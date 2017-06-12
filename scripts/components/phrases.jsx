import classNames from 'classnames';
import React from 'react';
import { store } from '../services/localStorageService';
import { SUBJECTS_INFO } from '../constants/commonConstants';

const Phrases = () => {
  const progressInfo = store.get('progressInfo') || [];

  return (
    <div>
      {progressInfo.map(({ name, phrase }) => {
        return (
          <div key={name} className={classNames('hexagon', name)}>
            <li>
              <div style={{ background: SUBJECTS_INFO[name].color }}>
                <h2>{phrase}</h2>
              </div>
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default Phrases;
