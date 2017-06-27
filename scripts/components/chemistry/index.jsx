import React, { Component } from 'react';
import chemistryUtils from '../../utils/chemistryUtils';
import { COLORS } from '../../constants/chemistryConstants';
import GameLayout from '../gameLayout';
import Flask from './flask';
import ColorFlask from './colorFlask';
import ColorComponents from './colorComponents';
import WinPhrase from './winPhrase';

class Chemistry extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();

    this.init = this.init.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(component) {
    return value => {
      const { color: oldColor, created: oldCreated } = this.state;
      const newColor = { ...oldColor, [component]: value };
      const newCreated = [].concat(oldCreated);
      const colorKey = chemistryUtils.getColorKey(newColor);
      if (colorKey && !oldCreated.includes(colorKey)) newCreated.push(colorKey);

      this.setState(state => ({ color: newColor, created: newCreated, hasNewGame: false }));
    }
  }

  init() {
    this.setState({ color: { red: 0, green: 0, blue: 0 }, created: [], hasNewGame: true });
  }

  render() {
    if (!this.state) return null;

    const { color, created, hasNewGame } = this.state;
    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="chemistry-layout"
        title="Микс красок"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        {created.length === COLORS.length ? <WinPhrase /> : [
          <div className="color-flasks" key="flasks">
            <ColorFlask color="red" hasNewGame={hasNewGame} onChange={this.onColorChange('red')} />
            <ColorFlask color="green" hasNewGame={hasNewGame} onChange={this.onColorChange('green')} />
            <ColorFlask color="blue" hasNewGame={hasNewGame} onChange={this.onColorChange('blue')} />
          </div>,
          <div className="tips" key="tips">
            {COLORS.map(color => (
              <ColorComponents {...color} created={created.includes(color.key)} />
            ))}
          </div>,
          <Flask color={color} key="flask" />
        ]}
      </GameLayout>
    );
  }
}

export default Chemistry;
