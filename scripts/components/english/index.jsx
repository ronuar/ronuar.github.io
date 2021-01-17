import classNames from 'classnames';
import React, { Component } from 'react';
import englishUtils from '../../utils/englishUtils';
import { CARD_TYPE, CARDS } from '../../constants/englishConstants';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class English extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();

    this.init = this.init.bind(this);
    this.onCardFlip = this.onCardFlip.bind(this);
  }

  init() {
    const cards = englishUtils.getCardsInfo();

    this.setState({ cards, flipped: [], completed: [] });
  }

  onCardFlip(key) {
    return () => {
      const { cards, flipped, completed } = this.state;
      let newFlipped = [].concat(flipped);
      let newCompleted = [].concat(completed);
      const index = newFlipped.indexOf(key);

      if (index === -1) newFlipped.push(key);
      else newFlipped.splice(index, 1);

      if (newFlipped.length === 2) {
        if (cards[newFlipped[0]].key === cards[newFlipped[1]].key) newCompleted.push(newFlipped[0], newFlipped[1]);

        setTimeout(() => this.setState({ flipped: [] }), 1000);
        setTimeout(() => this.setState({ completed: newCompleted }), 1000);
      }

      this.setState({ flipped: newFlipped });
    }
  }

  renderGrid() {
    let grid = [];
    const { cards, flipped, completed } = this.state;

    for (let i = 0; i < 36; i++) {
      const { type, key } = cards[i];
      const cardFlipped = !flipped.includes(i);
      const cardCompleted = completed.includes(i);

      grid.push(
        <div className="grid-cell" key={i}>
          <div
            className={classNames('card', { 'is-flipped': cardFlipped, 'is-completed': cardCompleted })}
            onClick={this.onCardFlip(i)}
          >
            <div className="front">
              {type === CARD_TYPE.picture
                ? <img src={`../../images/USE/english/${key}.svg`} />
                : <span>{key}</span>
              }
            </div>
            <div className="back">
              <img src="../../images/USE/english/paw.jpg"/>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid">
        {grid}
      </div>
    );
  }

  render() {
    if (!this.state) return null;

    const { completed } = this.state;
    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="english-layout"
        title="Переводчик"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        {completed.length === CARDS.length ? <WinPhrase /> : this.renderGrid()}
      </GameLayout>
    );
  }
}

export default English;
