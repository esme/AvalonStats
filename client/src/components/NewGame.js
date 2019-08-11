import React from 'react';
import styled from 'tachyons-components';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Player from './Player';

const Main = styled('div')`
  measure center pa4
`;

const Button = styled('button')`
  br2 b--black-20
  b ph3 pv2 input-reset ba bg-light-gray grow pointer f6 dib w-80
`;

const Div = styled('div')`
  mt3
`;

const Input = styled('input')`
  br2 b--black-20
  pt2 pb2 input-reset ba bg-transparent hover-white w-80
`;

const NewGame = ({
  startDate,
  handleChangeDate,
  handleChange,
  handleAddPlayer,
  players,
  handleIncrement,
  handleDecrement,
  handleAddGame,
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
        <h4>Add Player:</h4>
        <Input type="text" name="playerName" />
        <Button type="button" onClick={handleAddPlayer}>Create Player</Button>
      </Div>
      <Div>
        {players.length ? <h4>Players:</h4> : <br />}
        {players.map((el, i) => (
          <Player
            handleIncrement={() => handleIncrement(i)}
            handleDecrement={() => handleDecrement(i)}
            details={el}
            key={el.playerName}
          />
        ))}
      </Div>
      <Div>
        <Button type="button" onClick={handleAddGame}>Add Game</Button>
      </Div>
    </form>
  </Main>
);

export default NewGame;
