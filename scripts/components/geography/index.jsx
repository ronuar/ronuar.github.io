import React, { Component } from 'react';
import geographyUtils from '../../utils/geographyUtils';

import '../../../styles/geography.scss';

const COLORS = ["#397d69", "#11b8dd", "#696978", "#47654d", "#498c60", "#134351"];
const COUNT = 8;

class Geography extends Component {
  constructor(props) {
    super(props);

    const { innerWidth, innerHeight } = window;
    this.state = {
      mountains: geographyUtils.generateMountains(innerWidth, innerHeight, COUNT, COLORS)
    };
    
    this.onHide = this.onHide.bind(this);
    this.onClick = this.onClick.bind(this);
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
    const { innerWidth, innerHeight } = window;

    return (
      <div className="geography-container">
        <svg
          className="mountains"
          viewBox={`0 0 ${innerWidth} ${innerHeight}`}
          preserveAspectRatio="xMidYMax meet"
        >
          {this.renderMountains()}
        </svg>
      </div>
    );
  }
}

Geography.propTypes = {};

export default Geography;
