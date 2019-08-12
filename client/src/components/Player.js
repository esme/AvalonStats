import React from 'react';
import styled from 'tachyons-components';

const Div = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const Player = ({ details, handleSelectRole, i }) => (
  <Div>
    <div>
      <span>Player: </span>
      <span>{details.playerName}</span>
    </div>
    <div>
      <span>Role: </span>
      <select id="playerRole" onChange={e => handleSelectRole(e, i)}>
        <option value="merlin">Merlin</option>
        <option value="percival">Percival</option>
        <option value="vt">Loyal Servant of Arthur</option>
        <option value="lady">Lady of the Lake</option>
        <option value="morgana">Morgana</option>
        <option value="spy">Spy</option>
        <option value="assassin">Assassin</option>
        <option value="oberon">Oberon</option>
        <option value="mordred">Mordred</option>
      </select>
    </div>
  </Div>
);

export default Player;
