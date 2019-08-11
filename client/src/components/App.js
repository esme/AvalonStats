import React, { useState, useEffect, useReducer } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
  }
`;

const initialState = {
  startDate: new Date(),
  players: [],
  user: null,
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
    case 'user':
      return { ...state, user: action.payload };
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
    user,
  } = state;

  // console.log(state);

  const handleRegister = (e) => {
    e.preventDefault();
    if (username) {
      axios.post('/register', { username, password, password2 })
        .then(({ data }) => console.log(data));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', { username, password })
      .then(({ data }) => {
        if (data) {
          window.location = '/games';
        } else {
          window.location = '/';
        }
      })
      .catch((error) => {
        window.location = '/';
      });
  };

  const handleChange = e => dispatch({ type: 'input_details', payload: { [e.target.name]: e.target.value } });

  const handleChangeDate = date => dispatch({ type: 'change_date', payload: date });

  const handleAddPlayer = playerName ? () => dispatch({ type: 'add_player' }) : null;

  const handleIncrement = i => dispatch({ type: 'increment', payload: i });

  const handleDecrement = i => dispatch({ type: 'decrement', payload: i });

  const handleAddGame = () => {
    axios.post('/game', { title, startDate, players })
      .then(({ data }) => console.log(data));
  };

  const getUser = () => {
    axios.get('/user')
      .then(({ data }) => {
        console.log(data);
        if (data) {
          dispatch({ type: 'user', payload: data });
        }
      });
  };

  const getGames = () => {
    axios.get('/game')
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: 'game_data', payload: data });
      });
  };

  useEffect(() => {
    getGames();
    getUser();
  }, []);

  return (
    <Router>
      <React.Fragment>
        <GlobalStyle whiteColor />
        <Toolbar user={user} />
      </React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login handleChange={handleChange} handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          render={() => <Register handleChange={handleChange} handleRegister={handleRegister} />}
        />
        <Route
          path="/newgame"
          render={() => (
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
          )}
        />
        <Route
          path="/games"
          render={() => gameData && <Games gameData={gameData} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
