import classNames from 'classnames';
import React, { Component } from 'react';
import physicsUtils from '../../utils/physicsUtils';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class Physics extends Component {
  constructor(props) {
    super(props);

    this.container = {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      stopped: false
    };

    this.state = {
      balls: physicsUtils.initBalls(this.container.width, this.container.height)
    };

    this.moveBalls = this.moveBalls.bind(this);
    this.onBallClick = this.onBallClick.bind(this);

    this.intervalId = setInterval(this.moveBalls, 16);
  }

  moveBalls() {
    const { width, height } = this.container;
    this.setState(({ balls }) => {
      const hasStop = physicsUtils.hasBallsStop(balls);

      if (hasStop) clearInterval(this.intervalId);

      return {
        balls: physicsUtils.moveBalls(balls, width, height),
        stopped: hasStop
      };
    });
  }

  onBallClick(id) {
    return () => {
      this.setState({ balls: physicsUtils.slowDownBalls(this.state.balls, id) });
    }
  }

  render() {
    const { balls, stopped } = this.state;
    const { onSubjectsClick } = this.props;

    return (
      <GameLayout className={classNames("physics-layout", { 'is-finish': stopped })} title="Остановка времени" onSubjectsClick={onSubjectsClick}>
        <div className="balls-container">
          {balls.map(({ size, color, x, y, id }) => (
            <span
              className="ball"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `${color}`,
                top: y,
                left: x
              }}
              onClick={this.onBallClick(id)}
            />
          ))}
        </div>
        {stopped ? <WinPhrase /> : null}
      </GameLayout>
    );
  }
}

export default Physics;
