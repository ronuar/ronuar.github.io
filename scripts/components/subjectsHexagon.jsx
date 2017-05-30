import React, { Component } from 'react';

const data = [
  { key: 'pusher' },
  { key: 'geography', color: '#ed4941', title: 'География' },
  { key: 'informatics', color: '#02d565', title: 'Информатика' },
  { key: 'pusher' },
  { key: 'math', color: '#5c47d8', title: 'Математика' },
  { key: 'pusher' },
  { key: 'pusher' },
  { key: 'com', color: '#fab218', title: 'Обществознание' },
  { key: 'pusher' },
  { key: 'physics', color: '#25a6ef', title: 'Физика' },
  { key: 'literature', color: '#01CC90', title: 'Литература' },
  { key: 'pusher' },
  { key: 'ru', color: '#FF642D', title: 'Русский язык' },
  { key: 'pusher' },
  { key: 'pusher' },
  { key: 'english', color: '#4371F4', title: 'Английский язык' },
  { key: 'biology', color: '#78C82A', title: 'Биология' },
  { key: 'pusher' },
  { key: 'chemistry', color: '#ac46fb', title: 'Химия' },
  { key: 'history', color: '#f53d6d', title: 'История' },
];

class SubjectsHexagon extends Component {
  render() {
    return (
      <ul className="clr subjects">
        {data.map(({ key, color, title }) => {
          if (key === 'pusher') return <li className="pusher" />;

          return (
            <li className={key}>
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

SubjectsHexagon.propTypes = {};

export default SubjectsHexagon;
