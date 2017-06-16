import classNames from 'classnames';
import React, { Component } from 'react';
import socialUtils from '../../utils/socialUtils';
import GameLayout from '../gameLayout';
import WinPhrase from './winPhrase';

class Social extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => this.init();
    this.onReplay = () => this.init();
    this.progressReduce = () => this.setState(state => ({ progress: socialUtils.progressChange(state.progress - 5) }));
    this.onHatAnimationEnd = () => this.setState({ hatHappy: null });

    this.init = this.init.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  init() {
    this.intervalId = setInterval(this.progressReduce, 1500);
    let children = [];

    for (let i = 0; i < 4; i++) {
      children.push(socialUtils.getChild());
    }

    this.setState({ stopped: false, children, last: null, progress: 0, hatHappy: null });
  }

  onProfessionSelect(professionId) {
    return () => {
      const { children, progress } = this.state;
      const newChildren = [].concat(children);

      const last = newChildren.pop();
      newChildren.unshift(socialUtils.getChild());
      const happy = professionId === last.professionId;
      let newProgress = progress;
      newProgress += happy ? 10 : -15;

      if (newProgress === 100) clearInterval(this.intervalId);

      this.setState({
        last: {
          ...last,
          happy
        },
        hatHappy: !happy,
        progress: socialUtils.progressChange(newProgress),
        children: newChildren
      });
    };
  }

  renderProfessions() {
    let professions = [];

    for (let i = 1; i <= 10; i++) {
      professions.push(
        <li key={i} onClick={this.onProfessionSelect(i)}>
          <img src={`../../images/social/prof${i}.svg`}/>
        </li>
      );
    }

    return (
      <ul className="professions">
        {professions}
      </ul>
    );
  }

  renderGame() {
    const { children, last, progress, hatHappy } = this.state;
    const hasHatMood = typeof hatHappy === 'boolean';

    const hatMood = {
      'is-sad': hasHatMood && !hatHappy,
      'is-happy': hasHatMood && hatHappy
    };

    return (
      <div>
        {this.renderProfessions()}
        <div className={classNames('hat', hatMood)} onAnimationEnd={this.onHatAnimationEnd}>
          <img src="../../images/social/hat.svg" />
        </div>
        <div className="children">
          {children.map(({ id, professionId }, key) => {
            return (
              <div className="child" key={key}>
                <img src={`../../images/social/child${id}.svg`}/>
                <div className="comics-thought">
                  <p>
                    <strong>THOUGHT</strong>
                    <img className="profession" src={`../../images/social/prof${professionId}.svg`}/>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {last ? (
          <div className="last-child">
            <img src={`../../images/social/child${last.id}.svg`}/>
            <img className={classNames('mouth', { 'is-sad': !last.happy })} src={`../../images/social/mouth.svg`}/>
          </div>
        ) : null}
        <div className="progress">
          <div className="current-progress" style={{ width: `${progress}%` }}/>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state) return null;

    const { onSubjectsClick } = this.props;
    const { progress } = this.state;

    return (
      <GameLayout
        className="social-layout"
        title="Распределяющая шляпа"
        onSubjectsClick={onSubjectsClick}
        onReplay={this.onReplay}
      >
        {progress === 100 ? <WinPhrase /> : this.renderGame()}
      </GameLayout>
    );
  }
}

export default Social;
