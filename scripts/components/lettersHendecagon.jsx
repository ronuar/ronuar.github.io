import React from 'react';
import { store } from '../services/localStorageService';

const LettersHendecagon = ({ lettersSubjects }) => {
  const letters = store.get('letters') || [];

  return (
    <li className="letters">
      <div>
        <img src={`../../images/figure.png`} />
        <h2>Буквы</h2>
        {letters.map(({ name, subject }) => {
          const { key, color } = lettersSubjects.filter(letterSubject => letterSubject.key === subject)[0];

          return (
            <span key={subject} className="letter" style={{ color }} data-subject={key}>{name}</span>
          );
        })}
      </div>
    </li>
  );
};

export default LettersHendecagon;
