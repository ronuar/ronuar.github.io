import classNames from 'classnames';
import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import mathematicsUtils from '../../utils/mathematicsUtils';
import { POINTS, DIRECTIONS, DIRECTIONS_NAMES } from '../../constants/mathematicsConstants';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class Mathematics extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();
    this.onTransitionEnd = () => this.setState({ clicked: false });

    this.onMove = this.onMove.bind(this);
    this.init = this.init.bind(this);
  }

  componentWillUnmount() {
    this.unbind();
  }

  onMove(direction) {
    const { top, left, right, bottom } = DIRECTIONS;
    return () => {
      const { currentStay, length, routeIndex, error } = this.state;

      if (error) return;

      const points = [].concat(this.state.points);
      const lastPoint = points[points.length - 1];
      let newX = lastPoint.x;
      let newY = lastPoint.y;

      if (direction === top) newY -= 20;
      if (direction === bottom) newY += 20;
      if (direction === left) newX -= 20;
      if (direction === right) newX += 20;

      const newPoint = { x: newX, y: newY };
      points.push(newPoint);

      const { direction: currentDirection, length: currentLength } = currentStay;
      const hasCorrectDirection = direction === currentDirection;
      const hasNewStay = hasCorrectDirection && length === currentLength - 1;
      const newCurrentStay = hasNewStay ? this.route[routeIndex + 1] : currentStay;

      this.setState({
          points,
          clicked: hasCorrectDirection,
          finished: !newCurrentStay.direction,
          error: !hasCorrectDirection || !newCurrentStay.direction,
          currentStay: newCurrentStay,
          routeIndex: hasNewStay ? routeIndex + 1 : routeIndex,
          length: hasNewStay ? 0 : length + 1
        }
      );
    };
  }

  unbind() {
    Mousetrap.unbind('left');
    Mousetrap.unbind('right');
    Mousetrap.unbind('up');
    Mousetrap.unbind('down');
  }

  init() {
    Mousetrap.bind('left', this.onMove(DIRECTIONS.left));
    Mousetrap.bind('right', this.onMove(DIRECTIONS.right));
    Mousetrap.bind('up', this.onMove(DIRECTIONS.top));
    Mousetrap.bind('down', this.onMove(DIRECTIONS.bottom));

    this.route = mathematicsUtils.defineRoute(POINTS);

    this.setState({
        points: [POINTS[0]],
        currentStay: this.route[0],
        length: 0,
        routeIndex: 0,
        clicked: false,
        finished: false,
        error: null
      }
    );
  }

  renderFinish() {

  }

  renderTipBadge(currentStay, error, clicked) {
    return (
      <span
        className={classNames("tip", { 'is-clicked': clicked, 'is-error': error })}
        onTransitionEnd={this.onTransitionEnd}
        onClick={error ? this.onReplay : null}
      >
        {error ? (
          <span>
            <img src="../../images/refresh.svg"/>
            <div className="message">Заново</div>
          </span>) : (
          <span>
            <img src="../../images/arrow.svg" className={DIRECTIONS_NAMES[currentStay.direction]}/>
            <span className="length">{currentStay.length}</span>
          </span>)
        }
      </span>
    );
  }

  render() {
    if (!this.state) return null;

    const { points, currentStay, clicked, finished, error } = this.state;
    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="mathematics-layout"
        title="Самое первое задание"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        <div className="grid">
          <svg width={541} height={441}>
            <defs>
              <pattern id="pixel" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pixel)"/>
            <circle r={3} cx={40} cy={240}/>
            <polyline id="points" points={mathematicsUtils.formatPoints(points)} fill="none" stroke="black"
                      strokeWidth={3}/>
          </svg>
          {finished ? <WinPhrase/> : this.renderTipBadge(currentStay, error, clicked)}
        </div>
      </GameLayout>
    );
  }
}

export default Mathematics;
