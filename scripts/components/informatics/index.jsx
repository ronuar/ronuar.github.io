import classNames from 'classnames';
import React, { Component } from 'react';
import informaticsUtils from '../../utils/informaticsUtils';
import GameLayout from '../gameLayout';
import ResultBlock from './resultBlock';
import { PASSWORD } from '../../constants/informaticsConstants';

class Informatics extends Component {
  constructor(props) {
    super(props);

    this.intervalIds = {};

    this.clearIntervals = () => Object.keys(this.intervalIds || {})
      .map(index => this.intervalIds[index])
      .map(clearInterval);
    this.componentDidMount = () => this.init(false);
    this.componentWillUnmount = this.clearIntervals;
    this.onReplay = () => this.init(true);
    this.onMacbookToggle = () => this.setState({ isOpen: true });
    
    this.onGetSymbols = this.onGetSymbols.bind(this);
    this.init = this.init.bind(this);
  }

  init(isOpen) {
    this.clearIntervals();
    this.getSymbols = informaticsUtils.initSymbols();

    this.setState({ isOpen: isOpen, symbols: this.getSymbols(), fixedSymbols: {} });

    this.changeSymbol = (index, delay) => {
      setTimeout(() => this.intervalIds[index] = setInterval(this.onGetSymbols(index), 600), delay);
    };

    this.changeSymbol(0, 0);
    this.changeSymbol(1, 50);
    this.changeSymbol(2, 200);
    this.changeSymbol(3, 150);
    this.changeSymbol(4, 100);
    this.changeSymbol(5, 250);
  }

  onGetSymbols(index) {
    return () => {
      const { fixedSymbols } = this.state;
      let newSymbols = this.getSymbols(index);

      Object.keys(fixedSymbols)
        .map(Number)
        .map(symbolIndex => newSymbols[symbolIndex] = fixedSymbols[symbolIndex]);

      if (informaticsUtils.definePassword(fixedSymbols).length === PASSWORD.length) {
        this.clearIntervals();
      }

      this.setState({ symbols: newSymbols });
    };
  }

  onFixSymbol(index) {
    return () => {
      const { fixedSymbols, symbols } = this.state;
      fixedSymbols[index] = symbols[index];

      this.setState(state => ({ fixedSymbols: fixedSymbols }));
    };
  }

  render() {
    if (!this.state) return null;
    const { isOpen, symbols, fixedSymbols } = this.state;
    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="informatics-layout"
        title="Хакер"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        <div id="macbook-container">
          <div className={classNames("macbook", { 'is-open': isOpen })} onClick={this.onMacbookToggle}>
            <div className="macbook-lid">
              <div className="macbook-screen">
                <div className="macbook-content">
                  <p className="hack-message">Click to hack
                    <span className="blink">_</span><span> [password simple]</span>
                  </p>
                  <div className="password">
                    {symbols.map((symbol, index) => (
                      <span key={index} onClick={this.onFixSymbol(index)}>{symbol}</span>
                    ))}
                  </div>
                  <ResultBlock symbols={fixedSymbols} onReplay={this.onReplay} />
                </div>
              </div>
            </div>
            <div className="macbook-base" />
          </div>
        </div>
      </GameLayout>
    );
  }
}

export default Informatics;
