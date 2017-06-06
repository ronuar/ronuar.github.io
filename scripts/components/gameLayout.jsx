import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const GameLayout = ({ title, children, className, onSubjectsClick }) => (
  <div className={classNames('layout', className)}>
    <div className="header">
      <div className="hint">{title}</div>
      <button className="to-subjects" onClick={onSubjectsClick}>
        Предметы
        <img src="../../images/menu.svg" />
      </button>
    </div>
    <div className="game-window">
      {children}
    </div>
  </div>
);

GameLayout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSubjectsClick: PropTypes.func.isRequired
};

export default GameLayout;
