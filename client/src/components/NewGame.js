import React from 'react';
import styled from 'tachyons-components';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Player from './Player';

import {
  Main,
  Button,
  ButtonPill,
  Div,
  Input,
} from './StyledComponents';

const NewGame = ({
  startDate,
  handleChangeDate,
  handleChange,
  handleChangePlayer,
  handleAddPlayer,
  playersArr,
  playersRoleArr,
  handleAddGame,
  handleSelectTeam,
  winningTeam,
  tempName,
}) => {
  return (
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
          <Input type="text" name="title" placeholder="(optional)" />
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
          <Input type="text" name="tempName" onChange={e => handleChange(e)} value={tempName} />
          <Button type="button" onClick={handleAddPlayer} value="Create Player" />
        </Div>
        <Div>
          <h4>Players:</h4>
          {playersArr.map((el, i) => (
            <Player
              i={i}
              key={i}
              playerName={el}
              playerRole={playersRoleArr[i]}
              handleChangePlayer={handleChangePlayer}
            />
          ))}
        </Div>
        <Div>
          <ButtonPill type="button" onClick={handleAddGame} value="Add Game" />
        </Div>
      </form>
    </Main>
  );
};

export default NewGame;
