import classNames from 'classnames';
import React, { Component } from 'react';
import historyUtils from '../../utils/historyUtils';
import { ATTRACTIONS_KEYS } from '../../constants/historyConstants';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class History extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();
    this.onMouseMove = ({ pageX, pageY }) => this.setState({ x: pageX - 50, y: pageY - 110 });

    this.onAttractionClick = this.onAttractionClick.bind(this);
    this.init = this.init.bind(this);
  }

  init() {
    this.setState({ x: 0, y: 0, attractions: historyUtils.getAttractionsPositions(), lastFound: 0 });
  }

  onAttractionClick(key) {
    return () => {
      const { lastFound, attractions } = this.state;
      const newAttractions = [].concat(attractions);
      if (key !== lastFound + 1) return;

      const index = newAttractions.map(a => a.key).indexOf(key);
      newAttractions.splice(index, 1);

      this.setState({ attractions: newAttractions, lastFound: lastFound + 1 });
    };
  }

  renderGame() {
    const { x, y, attractions, lastFound } = this.state;

    return (
      <div>
        <div
          className="wall"
          onMouseMove={this.onMouseMove}
        >
          {attractions.map(({ top, right, key }) => {
            return (
              <div
                key={key}
                className="attraction" style={{ top: `${top}px`, right: `${right}px` }}
                onClick={this.onAttractionClick(key)}
              >
                <img src={`../../images/history/${key}.svg`} />
              </div>
            );
          })}
          <div className="flashlight" style={{ top: `${y}px`, left: `${x}px` }}/>
        </div>
        <div className="attractions-line">
          {ATTRACTIONS_KEYS.map(key => {
            const hasFound = key <= lastFound;

            return [
              <div className="picture">
                <img src={`../../images/history/${key}.svg`} />
                {hasFound ? <img className="found-mark" src="../../images/history/check-mark.svg" /> : null}
              </div>,
              <div className={classNames("arrow", { 'is-found': hasFound })} />
            ];
          })}
        </div>
      </div>
    );
  }

  render() {
    if (!this.state) return null;

    const { lastFound } = this.state;
    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="history-layout"
        title="Великие открытия"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        {lastFound !== ATTRACTIONS_KEYS.length ? this.renderGame() : <WinPhrase/>}
      </GameLayout>
    );
  }
}

export default History;
