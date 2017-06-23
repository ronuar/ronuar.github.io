import classNames from 'classnames';
import React, { Component } from 'react';
import biologyUtils from '../../utils/biologyUtils';
import { saveProgress } from '../../services/localStorageService';
import { FLOWER_PETALS, WORD_PETALS_STYLES } from '../../constants/biologyConstants';
import { SUBJECTS_INFO } from '../../constants/commonConstants';
import GameLayout from '../gameLayout';

class Biology extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();
    
    this.init = this.init.bind(this);
    this.onPetalClick = this.onPetalClick.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  init() {
    this.colors = biologyUtils.getColorsClasses();
    this.setState({ petals: [], finished: false });
  }

  onPetalClick(flower, petal) {
    return () => {
      let newPetals = [].concat(this.state.petals);
      newPetals.push({ flower, petal });

      if (newPetals.length === WORD_PETALS_STYLES.length) this.onFinish();

      this.setState({ petals: newPetals });
    };
  }

  onFinish() {
    saveProgress(SUBJECTS_INFO.biology);
    this.setState({ finished: true });
  }

  renderPetals(count, flowerIndex) {
    let petals = [];
    let heas = [];
    let index = -1;
    let inWord = false;

    for (let i = 0; i < count; i++) {
      this.state.petals.forEach(({ flower, petal }, wordPetalIndex) => {
        if (flower === flowerIndex && petal === i) index = wordPetalIndex;
      });

      inWord = index !== -1;

      petals.push(
        <span
          key={i}
          style={inWord ? WORD_PETALS_STYLES[index] : {}}
          className={classNames("petal", `p${i}`, { 'in-word': inWord })}
          onClick={inWord ? null : this.onPetalClick(flowerIndex, i)}
        >
          <span className="pet"/>
        </span>
      );
      heas.push(<span key={i} className={classNames("hea", `p${i}`)}/>);

      index = -1;
    }

    return [
      ...petals,
      <span className="mid">
        {heas}
      </span>
    ];
  }

  renderFlowers() {
    const { finished } = this.state;

    return (
      <div className={classNames('flowers', { 'is-finish': finished })}>
        {FLOWER_PETALS.map((count, index) => {
          return (
            <div key={index} className={classNames("flower", `flower${index + 1}`, this.colors[index], `f${count}`)}>
              {this.renderPetals(count, index)}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (!this.state) return null;

    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="biology-layout"
        title="Цветочек-отрывочек"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        {this.renderFlowers()}
      </GameLayout>
    );
  }
}

export default Biology;
