import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class ColorFlask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    this.onChange = e => { this.setState({ value: e.target.value }); props.onChange(Number(e.target.value)); };
  }

  render() {
    const { color } = this.props;
    const { value } = this.state;

    return (
      <div className={classNames("color-flask", color)}>
        <div id="up"></div>
        <div id="hold">
          <div id="liquid" style={{ height: `${value}%` }}></div>
        </div>
        <input className={color} type="range" min="0" max="100" step="1" value={value} onChange={this.onChange} />
        <span className="value">{value}</span>
      </div>
    );
  }
}

ColorFlask.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func
};

export default ColorFlask;
