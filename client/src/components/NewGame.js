import React from 'react';
import styled from 'tachyons-components';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Player from './Player';

import {
  Main,
  Button,
  Div,
  Input,
} from './StyledComponents';

const NewGame = ({
  startDate,
  handleChangeDate,
  handleChange,
  handleAddPlayer,
  players,
  handleAddGame,
  handleSelectRole,
  handleSelectTeam,
  winningTeam,
  playerName,
}) => (
  <Main>
    <Div><h3>Add a Game</h3></Div>
    <Div>
      <h4>Date:</h4>
      <DatePicker
        selected={startDate}
        onChange={handleChangeDate}
      />
    </Div>
    <form onChange={e => handleChange(e)}>
      <Div>
        <h4>Title:</h4>
        <Input type="text" name="title" />
      </Div>
      <Div>
        <h4>Winning Team:</h4>
        <select id="winningTeam" onChange={handleSelectTeam} value={winningTeam}>
          <option value="resistance">Resistance</option>
          <option value="spies">Spies</option>
        </select>
      </Div>
      <Div>
        <h4>Add Player:</h4>
        <Input type="text" name="playerName" value={playerName} />
        <Button type="button" onClick={handleAddPlayer} value="Create Player" />
      </Div>
      <Div>
        {players.length ? <h4>Players:</h4> : <br />}
        {players.map((el, i) => (
          <Player
            i={i}
            details={el}
            key={el.playerName}
            handleSelectRole={handleSelectRole}
          />
        ))}
      </Div>
      <Div>
        <Button type="button" onClick={handleAddGame} value="Add Game" />
      </Div>
    </form>
  </Main>
);

export default NewGame;
