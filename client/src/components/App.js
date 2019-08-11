import React, { useState, useEffect, useReducer } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Register from './Register';
import Login from './Login';
import Toolbar from './Toolbar';
import NewGame from './NewGame';
import Games from './Games';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? '#222' : '#eee')};
    background-color: ${props => (props.whiteColor ? 'white' : '#222')};
    font-family: "Open Sans";
  }
`;

const Div = styled('div')`
`;

const initialState = {
  startDate: new Date(),
  players: [],
};

function reducer(state, action) {
  const players = [...state.players];

  switch (action.type) {
    case 'input_details':
      return { ...state, ...action.payload };
    case 'change_date':
      return { ...state, startDate: action.payload };
    case 'add_player':
      return { ...state, players: [...state.players, { playerName: state.playerName, score: 0, role: 'Merlin' }] };
    case 'increment':
      players[action.payload].score += 1;
      return { ...state, players };
    case 'decrement':
      players[action.payload].score -= 1;
      return { ...state, players };
    case 'game_data':
      return { ...state, gameData: action.payload };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    username,
    password,
    password2,
    startDate,
    players,
    playerName,
    title,
    gameData,
  } = state;

  // console.log(state);

  const handleRegister = () => axios.post('/register', { username, password, password2 });

  const handleLogin = () => axios.post('/login', { username, password });

  const handleChange = e => dispatch({ type: 'input_details', payload: { [e.target.name]: e.target.value } });

  const handleChangeDate = date => dispatch({ type: 'change_date', payload: date });

  const handleAddPlayer = playerName ? () => dispatch({ type: 'add_player' }) : null;

  const handleIncrement = i => dispatch({ type: 'increment', payload: i });

  const handleDecrement = i => dispatch({ type: 'decrement', payload: i });

  const handleAddGame = () => axios.post('/game', { title, startDate, players });

  const getGames = () => {
    axios.get('/game')
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: 'game_data', payload: data });
      });
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle whiteColor />
      <Toolbar />
      <Div>
        {gameData && <Games gameData={gameData} />}
        <NewGame
          startDate={startDate}
          handleChangeDate={handleChangeDate}
          handleChange={handleChange}
          handleAddPlayer={handleAddPlayer}
          players={players}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleAddGame={handleAddGame}
        />
        <Register handleChange={handleChange} handleRegister={handleRegister} />
        <Login handleChange={handleChange} handleLogin={handleLogin} />
      </Div>
    </React.Fragment>
  );
};

export default App;
