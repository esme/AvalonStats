import React, { useState, useEffect, useReducer } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Register from './Register';
import Login from './Login';
import Toolbar from './Toolbar';
import NewGame from './NewGame';
import Games from './Games';
import reducer from './reducer';

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
  user: {},
  winningTeam: 'resistance',
  playerName: '',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    username,
    password,
    password2,
    startDate,
    players,
    title,
    gameData,
    user,
    winningTeam,
  } = state;

  let { playerName } = state;

  console.log(state);

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

  const handleAddPlayer = () => {
    let playerExists = false;
    if (playerName) {
      players.forEach((el) => {
        if (el.playerName === playerName) {
          playerExists = true;
        }
      });
      if (!playerExists) {
        dispatch({ type: 'add_player' });
      }
    }
  };

  const handleSelectTeam = e => dispatch({ type: 'select_team', payload: { [e.target.id]: e.target.value } });

  const handleSelectRole = (e, i) => dispatch({ type: 'select_role', payload: { playerRole: e.target.value, i } });

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
              handleAddGame={handleAddGame}
              handleSelectRole={handleSelectRole}
              handleSelectTeam={handleSelectTeam}
              winningTeam={winningTeam}
              playerName={playerName}
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
