import React, { Component } from 'react';

import Geography from './geography';
import Physics from './physics';
import Mathematics from './mathematics';
import Informatics from './informatics';
import Russian from './russian';
import LettersHendecagon from './lettersHendecagon';

const subjectsContainers = {
  geography: <Geography />,
  physics: <Physics />,
  math: <Mathematics />,
  informatics: <Informatics />,
  ru: <Russian />
};

const data = [
  { key: 'pusher' },
  { key: 'geography', color: '#ed4941', title: 'География', letter: 'ь' },
  { key: 'informatics', color: '#02d565', title: 'Информатика', letter: 'е' },
  { key: 'pusher' },
  { key: 'math', color: '#5c47d8', title: 'Математика', letter: 'в' },
  { key: 'pusher' },
  { key: 'pusher' },
  { key: 'com', color: '#fab218', title: 'Обществознание' },
  { key: 'pusher' },
  { key: 'physics', color: '#25a6ef', title: 'Физика', letter: 'н' },
  { key: 'literature', color: '#01CC90', title: 'Литература' },
  { key: 'pusher' },
  { key: 'ru', color: '#FF642D', title: 'Русский язык', letter: 'у' },
  { key: 'letters' },
  { key: 'pusher' },
  { key: 'english', color: '#4371F4', title: 'Английский язык' },
  { key: 'biology', color: '#78C82A', title: 'Биология' },
  { key: 'pusher' },
  { key: 'chemistry', color: '#ac46fb', title: 'Химия' },
  { key: 'history', color: '#f53d6d', title: 'История' },
];

class SubjectsHexagon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: null
    };

    this.onSubjectSelect = subject => () => this.setState({ subject });
  }

  render() {
    const { subject } = this.state;

    if (subject) return React.cloneElement(subjectsContainers[subject], { onSubjectsClick: this.onSubjectSelect(null) });

    const lettersSubjects = data.map(({ key, letter, color }) => ({ key, letter, color }));

    return (
      <ul className="clr subjects">
        {data.map(({ key, color, title }, index) => {
          if (key === 'pusher') return <li key={index} className="pusher" />;
          if (key === 'letters') return <LettersHendecagon key="letters" lettersSubjects={lettersSubjects} />;

          return (
            <li key={key} className={key} onClick={this.onSubjectSelect(key)}>
              <div style={{ background: color }}>
                <img src={`../../images/${key}.svg`} alt={key} />
                <h2>{title}</h2>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SubjectsHexagon;
