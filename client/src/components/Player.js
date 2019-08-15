import React from 'react';
import styled from 'styled-components';

const Input = styled('input')`
  width: 225px;
  border: 1px solid #eee;
  outline: none;
`;

const Wrapper = styled('div')`
  padding: 5px 0;
`;

const Div = styled('div')`
  display: flex;
  justify-content: space-between;
  height: 24px;
`;

const Select = styled('select')`
  background-color: #f2f2f2;
  border: none;
`;

const Player = ({
  i,
  playerName,
  playerRole,
  handleChangePlayer,
}) => (
  <Wrapper>
    <Div>
      <span>Player: </span>
      <Input name="playerName" value={playerName} onChange={e => handleChangePlayer(e, i)} />
    </Div>
    <Div>
      <span>Role: </span>
      <Select name="playerRole" defaultValue={playerRole} onChange={e => handleChangePlayer(e, i)}>
        <option value="merlin">Merlin</option>
        <option value="percival">Percival</option>
        <option value="vt">Loyal Servant of Arthur</option>
        <option value="lady">Lady of the Lake</option>
        <option value="morgana">Morgana</option>
        <option value="spy">Spy</option>
        <option value="assassin">Assassin</option>
        <option value="oberon">Oberon</option>
        <option value="mordred">Mordred</option>
      </Select>
    </Div>
  </Wrapper>
);

export default Player;
