import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import informaticsUtils from '../../utils/informaticsUtils';
import { PASSWORD } from '../../constants/informaticsConstants';
import WinPhrase from './winPhrase';

class InformaticsResultBlock extends Component {
  render() {
    const { symbols, onReplay } = this.props;
    const password = informaticsUtils.definePassword(symbols);

    if (password.length !== PASSWORD.length) return null;

    const hasWin = password === PASSWORD;

    return (
      <div className={classNames("result-block", { 'is-win': hasWin })}>
        {hasWin ? <WinPhrase/> : <span>ERROR <span onClick={onReplay}>[try again]</span></span>}
      </div>
    );
  }
}

InformaticsResultBlock.propTypes = {
  symbols: PropTypes.object,
  onReplay: PropTypes.func
};

export default InformaticsResultBlock;
