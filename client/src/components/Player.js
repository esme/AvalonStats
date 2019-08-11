import React from 'react';
import styled from 'tachyons-components';

const Div = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const Player = ({ details, handleIncrement, handleDecrement }) => (
  <Div>
    <div>
      <span>Player: </span>
      <span>{details.playerName}</span>
    </div>
    <div>
      <span>Role: </span>
      <span>Merlin</span>
    </div>
    <div>
      <span>Score: </span>
      <button type="button" onClick={handleDecrement}>&#8211;</button>
      <span>{details.score}</span>
      <button type="button" onClick={handleIncrement}>+</button>
    </div>
  </Div>
);

export default Player;
