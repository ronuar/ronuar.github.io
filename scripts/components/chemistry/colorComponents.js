import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chemistryUtils from '../../utils/chemistryUtils';
import SmallFlask from './smallFlask';

class ColorComponents extends Component {
  render() {
    const { red, green, blue, created } = this.props;
    const rgb = chemistryUtils.defineRGBColor({ red, green, blue });

    const color = created ? `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})` : '';

    return (
      <div className="color-components">
        <SmallFlask className={classNames({ 'is-created': created })} color={color}/>
        <div className="color red">{red}</div>
        <div className="color green">{green}</div>
        <div className="color blue">{blue}</div>
      </div>
    );
  }
}

ColorComponents.propTypes = {
  created: PropTypes.bool,
  red: PropTypes.number,
  green: PropTypes.number,
  blue: PropTypes.number
};

ColorComponents.defaultProps = {
  created: false
};

export default ColorComponents;
