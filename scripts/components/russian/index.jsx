import classNames from 'classnames';
import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import russianUtils from '../../utils/russianUtils';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';
import { DIRECTIONS } from '../../constants/russianConstants';

class Russian extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();

    this.init = this.init.bind(this);
    this.createLetter = this.createLetter.bind(this);
    this.moveLetters = this.moveLetters.bind(this);
    this.showPhrase = () => this.setState({ showPhrase: true });
    this.clearIntervals = this.clearIntervals.bind(this);
    this.onBackpackMove = this.onBackpackMove.bind(this);
  }

  componentWillUnmount() {
    this.unbind();
    this.clearIntervals();
  }

  onBackpackMove(direction) {
    return () => {
      const newLine = this.state.backpackLine + direction;
      if (newLine < 1 || newLine > 5) return;

      this.setState({ backpackLine: newLine });
    };
  }

  unbind() {
    Mousetrap.unbind('left');
    Mousetrap.unbind('right');
  }

  clearIntervals() {
    clearInterval(this.creationIntervalId);
    clearInterval(this.moveIntervalId);
  }

  init() {
    Mousetrap.bind('left', this.onBackpackMove(DIRECTIONS.left));
    Mousetrap.bind('right', this.onBackpackMove(DIRECTIONS.right));

    this.clearIntervals();

    this.setState({ backpackLine: 3, letters: [], scale: 0.2, finished: false, showPhrase: false });
    this.creationIntervalId = setInterval(this.createLetter, 500);
    this.moveIntervalId = setInterval(this.moveLetters, 16);
  }

  createLetter() {
    const { letters } = this.state;
    const letter = russianUtils.createLetter();
    const newLetters = [letter].concat(letters);

    this.setState({ letters: newLetters });
  }

  moveLetters() {
    const { letters, scale, backpackLine } = this.state;
    let newLetters = [].concat(letters);
    let catchedLetter = null;
    let finished = false;

    const topBorder = russianUtils.borderByScale(scale);

    newLetters = newLetters
      .filter(letter => {
        if (letter.line === backpackLine &&
          russianUtils.hasCatch(letter, topBorder)) {
          catchedLetter = letter;

          return false;
        }

        if (letter.top < 600) return true;
      })
      .map(letter => {
      letter.top += 4;
      return letter;
    });

    let newScale = scale;
    if (!catchedLetter) newScale = scale;
    else {
      newScale += !catchedLetter.character ? 0.05 : -0.05;
    }

    if (newScale < 0.2) newScale += 0.05;
    if (newScale > 0.7) {
      this.clearIntervals();
      this.unbind();
      newLetters = [];
      finished = true;
      setTimeout(this.showPhrase, 3500);
    }

    this.setState({
      letters: newLetters,
      scale: newScale,
      finished
    });
  }

  render() {
    if (!this.state) return null;

    const { backpackLine, letters, scale, finished, showPhrase } = this.state;
    const { onSubjectsClick } = this.props;
    let mood;

    return (
      <GameLayout
        className={classNames("russian-layout")}
        title="Сбор в школу (используй стрелочки)"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        <div
          style={{ transform: `scale(${scale})`  }}
          className={classNames('backpack', `line-${backpackLine}`, { 'is-finished': finished })}
        />
        {letters.map(({ line, id, top, character, name }) => {
          mood = character ? 'happy' : 'angry';
          return (
            <div
              key={id}
              style={{ top }}
              className={classNames('letter', `line-${line}`)}
            >
              {name}
              <img src={`../../images/${mood}.png`} className={mood} />
            </div>
          );
        })}
        {finished && showPhrase ? <WinPhrase /> : null}
        {finished && !showPhrase ? (
          <div className="frame">
            <div className="invisible-men">
              <div className="leg left">
                <div className="shoe"></div>
              </div>
            </div>
          </div>
        ): null}
      </GameLayout>
    );
  }
}

export default Russian;
