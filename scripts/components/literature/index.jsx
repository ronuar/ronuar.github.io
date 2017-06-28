import classNames from 'classnames';
import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import { LETTERS, LETTERS_COUNT, SYMBOLS_REGEXP } from '../../constants/literatureConstants';
import GameLayout from '../gameLayout';

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
    Mousetrap.bind(LETTERS_COUNT.map(({ letter }) => letter), this.onKeyPress);

    this.setState({ letters: LETTERS_COUNT, pressed: null, showedLetters: [] });
  }

  unbind() {
    Mousetrap.unbind(LETTERS_COUNT.map(({ letter }) => letter));
  }

  onKeyPress(e) {
    const { letters, showedLetters } = this.state;

    const newShowedLetters = [].concat(showedLetters);
    const newLetters = [].concat(letters);
    const index = newLetters.map(({ letter }) => letter).indexOf(e.key);
    const hasUpdateCount = newLetters[index].count !== 0;
    newLetters[index].count += hasUpdateCount ? -1 : 0;
    newShowedLetters.push(e.key);

    this.setState({
      letters: newLetters,
      pressed: hasUpdateCount ? e.key : null,
      showedLetters: hasUpdateCount ? newShowedLetters : showedLetters
    });
  }

  render() {
    if (!this.state) return null;

    const { letters, pressed, showedLetters } = this.state;
    const { onSubjectsClick } = this.props;
    const workShowedLetters = [].concat(showedLetters);

    return (
      <GameLayout
        className="literature-layout"
        title="Создатель рифм"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        <div className="paper-wrap">
          <img src="../../images/literature/paper.png" />
          <div className="poem">
            {LETTERS.map((symbol, key) => {
              const index = workShowedLetters.indexOf(symbol.toLowerCase());
              const hasShowSymbol = index !== -1 || SYMBOLS_REGEXP.test(symbol);
              if (index !== -1) workShowedLetters.splice(index, 1);

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
      </GameLayout>
    );
  }
}

export default Literature;

//className={classNames({ 'is-hidden': !SYMBOLS_REGEXP.test(symbol) })}