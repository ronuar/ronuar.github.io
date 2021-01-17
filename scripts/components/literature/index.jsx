import classNames from 'classnames';
import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import { LETTERS } from '../../constants/literatureConstants';
import literatureUtils from '../../utils/literatureUtils';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class Literature extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.componentWillUnmount = () => this.unbind();
    this.onReplay = () => this.init();
    this.onPressedClear = () => this.setState({ pressed: null });

    this.init = this.init.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  init() {
    const lettersInfo = literatureUtils.defineLettersInfo();
    Mousetrap.bind(lettersInfo.map(({ letter }) => letter), this.onKeyPress);

    this.setState({ letters: lettersInfo, pressed: null, showedLetters: [], finished: false });
  }

  unbind() {
    Mousetrap.unbind(literatureUtils.defineLettersInfo().map(({ letter }) => letter));
  }

  onKeyPress(e) {
    const { letters, showedLetters } = this.state;
    const eventKey = e.key || String.fromCharCode(e.keyCode);

    const newShowedLetters = [...showedLetters];
    const newLetters = [...letters];
    const index = newLetters.map(({ letter }) => letter).indexOf(eventKey);
    const hasUpdateCount = newLetters[index].count !== 0;
    newLetters[index].count += hasUpdateCount ? -1 : 0;
    newShowedLetters.push(eventKey);

    const hasFinished = newShowedLetters.length === literatureUtils.getLettersCount();
    if (hasFinished) newShowedLetters.push('.', '.', '-', '?', '!');

    this.setState({
      letters: newLetters,
      pressed: hasUpdateCount ? eventKey : null,
      showedLetters: hasUpdateCount ? newShowedLetters : showedLetters,
      finished: hasFinished
    });
  }

  render() {
    if (!this.state) return null;

    const { letters, pressed, showedLetters, finished } = this.state;
    const { onSubjectsClick } = this.props;
    const workShowedLetters = [].concat(showedLetters);

    return (
      <GameLayout
        className="literature-layout"
        title="Создание рифм"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        <div className={classNames("paper-wrap", { 'is-finished': finished })}>
          <img src="../../images/USE/literature/paper.png" />
          <div className="poem">
            {LETTERS.map((symbol, key) => {
              const index = workShowedLetters.indexOf(symbol.toLowerCase());
              const hasShowSymbol = index !== -1;
              if (hasShowSymbol) workShowedLetters.splice(index, 1);

              return (
                <span
                  key={key}
                  className={classNames({ 'is-hidden': !hasShowSymbol })}
                >
                  {symbol}
                </span>
              );
            })}
          </div>
        </div>
        {finished ? <WinPhrase /> : (
          <div className="letters">
            {letters.map(({ letter, count }) => {
              return (
                <span
                  key={letter}
                  className={classNames('info', {
                    'is-empty': count === 0,
                    'is-pressed': pressed === letter
                  })}
                >
                <span className="letter" onTransitionEnd={this.onPressedClear}>{letter}</span>
                <span className="count">{count}</span>
              </span>
              );
            })}
          </div>
        )}
      </GameLayout>
    );
  }
}

export default Literature;
