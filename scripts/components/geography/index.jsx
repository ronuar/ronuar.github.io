import React, { Component } from 'react';
import geographyUtils from '../../utils/geographyUtils';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

const COLORS = ["#397d69", "#11b8dd", "#696978", "#47654d", "#498c60", "#134351"];
const COUNT = 8;

class Geography extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();
    this.init = this.init.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  
  init() {
    const { innerWidth, innerHeight } = window;

    this.setState({ mountains: geographyUtils.generateMountains(innerWidth, innerHeight, COUNT, COLORS) });
  }

  onHide(key) {
    this.setState(prevState => {
      const newMountains = [].concat(prevState.mountains);
      const index = newMountains.map(({ key: mountainKey }) => mountainKey).indexOf(key);

      newMountains.splice(index, 1);
      return { mountains: newMountains };
    });
  }

  onClick(key) {
    return () => {
      this.setState(prevState => {
        const newMountains = prevState.mountains.map(mountain => {
          if (key === mountain.key) mountain.className = "is-hidden";

          return mountain;
        });

        setTimeout(() => this.onHide(key), 500);

        return { mountains: newMountains };
      });
    }
  }

  renderMountains() {
    if (!this.state) return null;

    const { mountains } = this.state;

    return mountains.map(({ color, points, snowPoints, x, x2, y, middle, className, key }) => (
      <g key={key} className={className} onClick={this.onClick(key)}>
        <polygon
          points={points}
          fill={color}
        />
        <polygon
          r="10"
          className="snow"
          points={snowPoints}
        />
      </g>
    ));
  }

  render() {
    if (!this.state) return null;

    const { mountains } = this.state;
    const { onSubjectsClick } = this.props;

    const rays = [];
    for (let i = 0; i < 10; i++) rays.push(<div key={i} className="ray"></div>);

    return (
      <GameLayout
        className="geography-layout"
        title="Кликалка по горам"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        <svg className="mountains">
          {this.renderMountains()}
        </svg>
        <div className="sun" />
        {mountains.length !== 0 ? null : <WinPhrase />}
      </GameLayout>
    );
  }
}

export default Geography;
