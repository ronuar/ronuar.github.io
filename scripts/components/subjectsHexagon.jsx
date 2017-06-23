import React, { Component } from 'react';

import Geography from './geography';
import Physics from './physics';
import Mathematics from './mathematics';
import Informatics from './informatics';
import Russian from './russian';
import Social from './social';
import English from './english';
import History from './history';
import Biology from './biology';

import LettersHendecagon from './lettersHendecagon';
import Phrases from './phrases';

import localStorageUtils from '../utils/localStorageUtils';
import { SUBJECTS_INFO } from '../constants/commonConstants';

const subjectsContainers = {
  geography: <Geography />,
  physics: <Physics />,
  math: <Mathematics />,
  informatics: <Informatics />,
  ru: <Russian />,
  com: <Social />,
  english: <English />,
  history: <History />,
  biology: <Biology />
};

const data = [
  { key: 'pusher' },
  SUBJECTS_INFO.geography,
  SUBJECTS_INFO.informatics,
  { key: 'pusher' },
  SUBJECTS_INFO.math,
  { key: 'pusher' },
  { key: 'pusher' },
  SUBJECTS_INFO.com,
  { key: 'pusher' },
  SUBJECTS_INFO.physics,
  SUBJECTS_INFO.literature,
  { key: 'pusher' },
  SUBJECTS_INFO.ru,
  { key: 'letters' },
  { key: 'pusher' },
  SUBJECTS_INFO.english,
  SUBJECTS_INFO.biology,
  { key: 'pusher' },
  SUBJECTS_INFO.chemistry,
  SUBJECTS_INFO.history,
];

class SubjectsHexagon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: null
    };

    this.onSubjectSelect = subject => () => this.setState({ subject });
  }

  componentDidMount() {
    localStorageUtils.defineProgressInfo();
    this.forceUpdate();
  }

  render() {
    const { subject } = this.state;

    if (subject) return React.cloneElement(subjectsContainers[subject], { onSubjectsClick: this.onSubjectSelect(null) });

    const lettersSubjects = data.map(({ key, letter, color }) => ({ key, letter, color }));

    return (
      <div className="parallax-layout">
        <div className="parallax-layer layer-back">
          <Phrases />
        </div>
        <div className="parallax-layer layer-base">
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
        </div>
      </div>
    );
  }
}

export default SubjectsHexagon;
