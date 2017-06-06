import classNames from 'classnames';
import React, { Component } from 'react';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class Mathematics extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();

    this.init = this.init.bind(this);
  }

  init() {
    this.setState({ data: 1 });
  }

  render() {
    if (!this.state) return null;

    const { onSubjectsClick } = this.props;

    return (
      <GameLayout
        className="mathematics-layout"
        title="Остановка времени"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        Mathematics
      </GameLayout>
    );
  }
}

export default Mathematics;
