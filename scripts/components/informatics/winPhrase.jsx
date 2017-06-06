import React, { Component } from 'react';
import { saveToLocalStorage } from '../../services/localStorageService';

const DELAY = 100;
const PHRASE = 'BECOME HARDER BETTER FASTER STRONGER CLEVERER';

class InformaticsWinPhrase extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };

    this.componentWillUnmount = () => clearInterval(this.intervalId);
    this.printLetter = () => this.setState(state => ({ text: PHRASE.substring(0, state.text.length + 1) }));

    this.intervalId = setInterval(this.printLetter, DELAY);
  }

  render() {
    return (
      <div className="phrase">
        <div>{this.state.text}</div>
      </div>
    );
  }
}

export default saveToLocalStorage(InformaticsWinPhrase, 'е', 'informatics');
